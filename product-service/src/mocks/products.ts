export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
};

export const products: Product[] = [
  {
    id: '1',
    title: 'Bread',
    description: '',
    price: 1.5,
    count: 10,
  },
  {
    id: '2',
    title: 'Milk',
    description: '',
    price: 2.0,
    count: 11,
  },
  {
    id: '3',
    title: 'Eggs',
    description: '',
    price: 2.5,
    count: 12,
  },
  {
    id: '4',
    title: 'Butter',
    description: '',
    price: 0.9,
    count: 13,
  },
  {
    id: '5',
    title: 'Cereal',
    description: '',
    price: 3.2,
    count: 14,
  },
];
