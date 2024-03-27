import { formatJSONResponse } from '@libs/api-gateway';
import { products } from 'src/mocks/products';

const getProductsList = async () => {
  return formatJSONResponse({ products });
};

export const main = getProductsList;
