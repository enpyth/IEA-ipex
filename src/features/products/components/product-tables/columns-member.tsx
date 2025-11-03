import { ColumnDef } from '@tanstack/react-table';
import { Membership } from '@/db/membership';

export const columns: ColumnDef<Membership>[] = [
  {
    accessorKey: 'full_name',
    header: 'Full Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'membership_type',
    header: 'Membership Type'
  },
  {
    accessorKey: 'verified',
    header: 'Verified'
  },
  {
    accessorKey: 'registered_at',
    header: 'Registered At'
  },
];
