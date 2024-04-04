import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 as uuidv4 } from 'uuid';
import { PutCommandInput, TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import schema, { productSchema } from './schema';
import dynamodbClient from '@utils/db';
import { logSource } from '@libs/logger';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  logSource('createProduct', event.body);

  const product = productSchema.parse(event.body);
  const productId = uuidv4();

  const { count, ...rest } = product;

  const putProductParams: PutCommandInput = {
    TableName: process.env.PRODUCTS_TABLE,
    Item: {
      ...rest,
      id: productId,
    },
  };

  const putStockParams: PutCommandInput = {
    TableName: process.env.STOCKS_TABLE,
    Item: {
      product_id: productId,
      count,
    },
  };

  try {
    await dynamodbClient.send(
      new TransactWriteCommand({
        TransactItems: [{ Put: putProductParams }, { Put: putStockParams }],
      })
    );

    return formatJSONResponse({
      message: `Product created`,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponse({
      statusCode: 500,
      body: 'An error occurred while saving the product!',
    });
  }
};

export const main = middyfy(createProduct);
