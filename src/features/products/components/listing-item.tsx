
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns-item';
import { getItems } from '@/db/items';

export default async function ListingItem() {

  const data = await getItems();

  return (
    <ProductTable
      data={data}
      totalItems={data.length}
      columns={columns}
      url="/dashboard/item/:id"
    />
  );
}
