import { formatJSONResponse } from '@libs/api-gateway';
import sleep from '@libs/sleep';
import { products } from 'src/mocks/products';

const getProductsList = async () => {
  await sleep(1000);

  return formatJSONResponse({ products });
};

export const main = getProductsList;
