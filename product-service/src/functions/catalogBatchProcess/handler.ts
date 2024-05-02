import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { SQSEvent } from 'aws-lambda';
import { insertProduct } from '@utils/db';
import { formatJSONResponse } from '@libs/api-gateway';

const snsClient = new SNSClient({ region: process.env.REGION });

const processBatchRequest = async (event: SQSEvent) => {
  for (const record of event.Records) {
    console.log('processBatchRequest::', record.body);

    const product = JSON.parse(record.body);
    await insertProduct(product);

    const snsParams = {
      TopicArn: process.env.CREATE_PRODUCT_TOPIC_SNS_ARN,
      Subject: 'new product',
      Message: JSON.stringify(product),
      MessageAttributes: {
        title: {
          DataType: 'String',
          StringValue: product.title,
        },
      },
    };

    await snsClient.send(new PublishCommand(snsParams));
  }
};

const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    await processBatchRequest(event);
    return formatJSONResponse({ message: 'product saved' });
  } catch (error) {
    console.error('catalogBatchProcess ', error);
    return formatJSONResponse({ message: 'something went wrong' });
  }
};

export const main = catalogBatchProcess;
