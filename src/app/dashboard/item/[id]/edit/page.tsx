import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import EditItemForm from './edit-item-form';
import { notFound } from 'next/navigation';
import { getItemByIdWithParsedData } from '@/db/items';

export const metadata = {
  title: 'Dashboard: Edit Item'
};

type EditItemPageProps = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function EditItemPage({ params }: EditItemPageProps) {
  const { id } = await params;
  const idInt = parseInt(id, 10);
  if (isNaN(idInt)) {
    notFound();
  }

  const item = await getItemByIdWithParsedData(idInt);
  if (!item) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Edit Item'
            description={`Edit details for "${item.data.name}"`}
          />
        </div>
        <Separator />
        <Suspense fallback={<div>Loading form...</div>}>
          <EditItemForm item={item} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
