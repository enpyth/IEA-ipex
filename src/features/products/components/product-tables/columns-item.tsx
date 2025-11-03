import { ColumnDef } from '@tanstack/react-table';
import { Item } from '@/types/database';

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'inserted_at',
    header: 'Inserted At'
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At'
  },
  {
    accessorKey: 'data',
    header: 'Data'
  },
  {
    accessorKey: 'image',
    header: 'Image'
  }
];
