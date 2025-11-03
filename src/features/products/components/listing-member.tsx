import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns-member';
import { getMemberships } from '@/db/membership';

export default async function ListingMembership() {
  const data = await getMemberships();

  return (
    <ProductTable
      data={data}
      totalItems={data.length}
      columns={columns}
      url="/dashboard/membership/:id"
    />
  );
}
