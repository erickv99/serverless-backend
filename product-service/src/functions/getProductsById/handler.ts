import { formatJSONResponse } from '@libs/api-gateway';
import sleep from '@libs/sleep';
import { products } from 'src/mocks/products';

const getProductsById = async (event) => {
  const productId = parseInt(event?.pathParameters?.id ?? 0);

  // simulate slow connection
  await sleep(1000);

  const product = products.find((product) => product.id === productId);

  if (product) {
    return formatJSONResponse({
      product,
    });
  } else {
    return formatJSONResponse(
      {
        message: 'Product not found',
      },
      404
    );
  }
};

export const main = getProductsById;
