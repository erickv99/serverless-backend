import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { Product } from '../mocks/products';
import { v4 as uuidv4 } from 'uuid';

const dynamodbClient = new DynamoDBClient({ region: process.env.REGION });

export async function insertProduct(product: Product) {
  console.log('insertProduct::process', product);
  const productId = uuidv4();

  const putProductParams: PutCommandInput = {
    TableName: process.env.PRODUCTS_TABLE,
    Item: {
      ...product,
      id: productId,
    },
  };

  try {
    await dynamodbClient.send(new PutCommand(putProductParams));
    console.log('insertProduct::success');
  } catch (error) {
    console.error('insertProduct::error', error);
  }
}

export default dynamodbClient;
