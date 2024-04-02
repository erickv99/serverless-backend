import { z } from 'zod';

export default {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    count: { type: 'number' },
  },
  required: ['name'],
} as const;

export const productSchema = z.object({
  title: z.string().max(500),
  description: z.string(),
  price: z.number().int().positive().gt(0),
  count: z.number().int().positive().gt(0),
});
