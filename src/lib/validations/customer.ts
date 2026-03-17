import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['lead', 'active', 'inactive']),
  notes: z.string().optional(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
