import { S3Event } from 'aws-lambda';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { parse } from 'csv-parse';
const s3Client = new S3Client({
  region: process.env.REGION,
});

const importFileParser = async (event: S3Event) => {
  console.log('importFileParser', `amount of records: ${event.Records.length}`);

  for (const record of event.Records) {
    const fileName = decodeURIComponent(record.s3.object?.key);
    console.log(`File uploaded: ${fileName}`);

    const s3File = await s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
      })
    );

    const fileAsText = await s3File.Body.transformToString('utf-8');
    console.log('fileAsText::', fileName, fileAsText);

    parse(fileAsText, { delimiter: ',' }, (error, data) => {
      if (error) {
        console.log(error);
        throw new Error('Something went wrong');
      }

      console.log('result', data);
    });
  }
};

export const main = importFileParser;
