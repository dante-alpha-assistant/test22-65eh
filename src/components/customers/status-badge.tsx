'use client';

import { Badge } from '@/components/ui/badge';
import { Customer } from '@/types/customer';

interface StatusBadgeProps {
  status: Customer['status'];
}

const variantMap: Record<Customer['status'], 'default' | 'secondary' | 'outline'> = {
  active: 'default',
  inactive: 'secondary',
  prospect: 'outline',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant={variantMap[status]} className="capitalize">
      {status}
    </Badge>
  );
}
