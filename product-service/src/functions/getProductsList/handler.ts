import {
  ValidatedAPIGatewayProxyEvent,
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from '@libs/api-gateway';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import dynamodbClient from '@utils/db';
import schema from '@functions/getProductsById/schema';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { logSource } from '@libs/logger';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (_: ValidatedAPIGatewayProxyEvent<typeof schema>) => {
  logSource('getProductsList');
  const scanCommand = new ScanCommand({
    TableName: process.env.PRODUCTS_TABLE,
  });

  try {
    const data = await dynamodbClient.send(scanCommand);
    const products = data.Items?.map((product) => unmarshall(product));
    return formatJSONResponse({ products });
  } catch (error) {
    console.error('Error in scan: ', error);
    throw new Error(`Error scanning table ${process.env.PRODUCTS_TABLE}`);
  }
};

export const main = getProductsList;
