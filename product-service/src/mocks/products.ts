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
    image:
      'https://www.backerhausveit.com/wp-content/uploads/2021/03/17783-1.jpg.webp',
  },
  {
    id: 2,
    name: 'Milk',
    price: 2.0,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/c/c8/Oat_milk_glass_and_bottles.jpg',
  },
  {
    id: 3,
    name: 'Eggs',
    price: 2.5,
    image:
      'https://images-prod.healthline.com/hlcmsresource/images/AN_images/health-benefits-of-eggs-1296x728-feature.jpg',
  },
  {
    id: 4,
    name: 'Butter',
    price: 0.9,
    image: 'https://cdn.britannica.com/27/122027-050-EAA86783/Butter.jpg',
  },
  {
    id: 5,
    name: 'Cereal',
    price: 3.2,
    image:
      'https://www.verywellhealth.com/thmb/mz1yXslWImJzSxx6cGqsLTzJrlk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/30D7A016-ABA5-48DD-BE39-3E7A223A03BF-96f2ba9e6c724dc9b2ba638b0c0f44a2.jpeg',
  },
];
