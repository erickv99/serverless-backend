type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Bread',
    price: 1.5,
    image: 'http://example.com/images/bread.jpg',
  },
  {
    id: 2,
    name: 'Milk',
    price: 2.0,
    image: 'http://example.com/images/milk.jpg',
  },
  {
    id: 3,
    name: 'Eggs',
    price: 2.5,
    image: 'http://example.com/images/eggs.jpg',
  },
  {
    id: 4,
    name: 'Butter',
    price: 0.9,
    image: 'http://example.com/images/butter.jpg',
  },
  {
    id: 5,
    name: 'Cereal',
    price: 3.2,
    image: 'http://example.com/images/cereal.jpg',
  },
];
