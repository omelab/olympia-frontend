import { Card, Skeleton } from 'antd';
import { HiOutlineNewspaper } from 'react-icons/hi2';

import { useGetProjectCountForAdminDashboardQuery } from '@/api/public';

export function ProjectCountCard() {
  const { data: projectCountForDashboard, isLoading: isNewsCountForDashboard }
    = useGetProjectCountForAdminDashboardQuery();

  // this needs redesign.
  const extractedData: Record<string, number> = {};

  projectCountForDashboard?.forEach((item) => {
    extractedData[item.status] = item._count;
  });

  return (
    <Card
      className="shadow-sm xl:w-[378px]"
      styles={{
        body: {
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '16px',
        },
      }}
    >
      <HiOutlineNewspaper className="mb-4 size-[30px] text-green-700" />
      <Skeleton loading={isNewsCountForDashboard} active>
        <h6 className="mb-4 text-xl font-bold leading-snug">
          Project (
          {extractedData?.TOTAL_PROJECT || 0}
          )
        </h6>

        <p className="mb-2 font-semibold">
          Today Publish -
          {' '}
          {extractedData?.TODAY_PUBLISHED || 0}
        </p>
        <p className="mb-2">
          Trashed -
          {extractedData?.TRASHED || 0}
        </p>
      </Skeleton>
    </Card>
  );
}
