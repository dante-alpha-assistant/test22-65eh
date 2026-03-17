import { Customer } from './types/customer';

// In-memory store for customers (resets on server restart)
const customersMap = new Map<string, Customer>();

export const customersStore = {
  getAll(): Customer[] {
    return Array.from(customersMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getById(id: string): Customer | undefined {
    return customersMap.get(id);
  },

  create(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Customer {
    const customer: Customer = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    customersMap.set(customer.id, customer);
    return customer;
  },

  update(id: string, data: Partial<Omit<Customer, 'id' | 'createdAt'>>): Customer | null {
    const existing = customersMap.get(id);
    if (!existing) return null;
    const updated: Customer = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    customersMap.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return customersMap.delete(id);
  },
};
