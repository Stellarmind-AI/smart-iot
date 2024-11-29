'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const MultiGaugeDashboard = dynamic(
  () => import('../../../components/MultiGaugeDashboard'),
  { ssr: false } // Disable SSR
);

const Page: React.FC = () => {
  return <MultiGaugeDashboard />;
};

export default Page;

