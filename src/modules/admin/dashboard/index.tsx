'use client';

import { useGetUserCountQuery } from '@/api/auth';

import { AdminUserCountCard } from './components/admin-count-card';
import { CommentCountCard } from './components/comment-count-card';
import { ProjectCountCard } from './components/project-count-card';
import { SubscriberCountCard } from './components/subscriber-count.card';

 

export const Dashboard = () => {
  const { data: userCount, isFetching: isUserCountFetching }
    = useGetUserCountQuery();

  return (
    <div className="mt-[70px]">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-0">
        <ProjectCountCard />
        <CommentCountCard />
        <SubscriberCountCard
          userCount={userCount}
          isUserCountFetching={isUserCountFetching}
        />
        <AdminUserCountCard
          userCount={userCount}
          isUserCountFetching={isUserCountFetching}
        />
      </div>
    </div>
  );
};

export default Dashboard;
