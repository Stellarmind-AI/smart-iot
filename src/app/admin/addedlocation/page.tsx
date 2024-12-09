import dynamic from 'next/dynamic';

const AddLocationForm = dynamic(() => import('../../admin/newlocation/page'), {
  ssr: false,
});

export default function Page() {
  return <AddLocationForm />;
}
