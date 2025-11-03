import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import NewItemForm from './new-item-form';

export const metadata = {
  title: 'Dashboard: Add New Item',
};

export default async function NewItemPage() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Add New Item'
            description='Create a new item with all the necessary details.'
          />
        </div>
        <Separator />
        <Suspense fallback={<div>Loading form...</div>}>
          <NewItemForm />
        </Suspense>
      </div>
    </PageContainer>
  );
}
