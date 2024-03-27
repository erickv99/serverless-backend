import { formatJSONResponse } from '@libs/api-gateway';
import { products } from 'src/mocks/products';

const getProductsById = async (event) => {
  const productId = parseInt(event?.pathParameters?.id ?? 0);

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
