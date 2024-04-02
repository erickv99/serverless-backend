import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { formatJSONResponse } from '@libs/api-gateway';
import dynamodbClient from '@utils/db';

const getProductsById = async (event) => {
  const productId = event?.pathParameters?.id ?? '0';

  const getProduct = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: { id: productId },
  };

  let product;
  try {
    product = await dynamodbClient.send(new GetCommand(getProduct));
  } catch (err) {
    console.error('====> ERROR::Product', err);
  }

  if (!product) {
    return formatJSONResponse({ message: 'Product not found' }, 404);
  }

  const getStock = {
    TableName: process.env.STOCKS_TABLE,
    Key: {
      product_id: productId,
    },
  };

  let stock;
  try {
    // Use imported dynamodbClient here
    stock = await dynamodbClient.send(new GetCommand(getStock));
  } catch (err) {
    console.error(err);
  }

  return formatJSONResponse({
    product: {
      ...product.Item,
      count: stock?.Item?.count ?? 0,
    },
  });
};

export const main = getProductsById;
