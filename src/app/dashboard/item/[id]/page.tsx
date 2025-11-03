import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus, Edit } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import Details from './details';
import { getItemByIdWithParsedData } from '@/db/items';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Dashboard: Item Management',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
  params: {
    id: string;
  };
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  
  // Validate and fetch item data
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const item = await getItemByIdWithParsedData(id);
  if (!item) {
    notFound();
  }

  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Item Management'
            description='Manage all your items here.'
          />
        </div>
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <Details item={item} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
