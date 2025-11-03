import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Suspense } from 'react';
import MembershipDetails from './details';
import { getMembershipById } from '@/db/membership';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Dashboard: Membership Details',
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MembershipPage(props: PageProps) {
  const params = await props.params;
  
  // Validate and fetch membership data
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const membership = await getMembershipById(id);
  if (!membership) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Membership Details'
            description='View and manage membership information.'
          />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <MembershipDetails membership={membership} />
        </Suspense>
      </div>
    </PageContainer>
  );
}