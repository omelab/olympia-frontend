import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Dashboard from '@/modules/admin/dashboard';

const DashboardPage = () => {
  const userToken = cookies().get('userToken')?.value;

  if (!userToken) {
    redirect('/auth/login');
  }

  return <Dashboard />;
};

export default DashboardPage;
