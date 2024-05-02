import { S3Event } from 'aws-lambda';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  GetQueueUrlCommand,
  SQSClient,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';
import csv from 'csv-parser';
import { Product } from '../../types';

const s3Client = new S3Client({
  region: process.env.REGION,
});
const sqsClient = new SQSClient({ region: process.env.REGION });

export const getQUrlByName = async (queueName: string): Promise<string> => {
  try {
    console.log('getQUrlByName', queueName);

    const response = await sqsClient.send(
      new GetQueueUrlCommand({
        QueueName: queueName,
      })
    );

    console.log('getQUrlByName', 'success');
    return response.QueueUrl;
  } catch (error) {
    console.log('getQUrlByName:error', error);
  }
};

const parseCsvFile = async <T>(
  file: GetObjectCommandOutput
): Promise<Array<T>> => {
  return new Promise((resolve) => {
    const parsedItems: Array<T> = [];

    file.Body.pipe(csv())
      .on('data', (data) => parsedItems.push(data))
      .on('end', () => resolve(parsedItems));
  });
};

const sendCsvToSNS = async (products: Array<Product>) => {
  console.log('sendCsvToSNS::sending to Q', products);
  const queueUrl = await getQUrlByName(process.env.CATALOG_ITEMS_QUEUE);
  for await (const product of products) {
    const body = JSON.stringify(product);
    const sqsParams = {
      QueueUrl: queueUrl,
      MessageBody: body,
    };
    try {
      await sqsClient.send(new SendMessageCommand(sqsParams));
      console.log('sendCsvToSNS', 'success');
    } catch (error) {
      console.error('sendCsvToSNS', error);
    }
  }
};

const importFileParser = async (event: S3Event) => {
  console.log('importFileParser', `amount of records: ${event.Records.length}`);

  for (const record of event.Records) {
    const fileName = decodeURIComponent(record.s3.object?.key);
    console.log(`File uploaded: ${fileName}`);

    // Parse and log
    const s3File = await s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
      })
    );
    const products: Array<Product> = await parseCsvFile(s3File);
    console.log('importFileParser', { products });

    // send to QUEUE
    await sendCsvToSNS(products);

    // Copy
    const fileNameWithNewFolder = fileName.replace('uploaded/', 'parsed/');
    const command = new CopyObjectCommand({
      CopySource: `${process.env.BUCKET_NAME}/${fileName}`,
      Bucket: process.env.BUCKET_NAME,
      Key: fileNameWithNewFolder,
    });
    await s3Client.send(command);
    console.log('file copied to', fileNameWithNewFolder);

    // Delete
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    });
    await s3Client.send(deleteCommand);
    console.log('file removed', fileName);
  }
};

export const main = importFileParser;
