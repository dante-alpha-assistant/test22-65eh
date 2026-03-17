export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'lead' | 'active' | 'inactive';
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
