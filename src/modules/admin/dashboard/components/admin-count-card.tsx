import { Card, Skeleton } from 'antd';
import { FiUser } from 'react-icons/fi';

type AdminUserCountCardProps = {
  userCount:
    | {
      totalUsers: number;
      totalAdmin: number;
      totalSubscriber: number;
    }
    | undefined;

  isUserCountFetching: boolean;
};

export function AdminUserCountCard({
  userCount,
  isUserCountFetching,
}: AdminUserCountCardProps) {
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
      <FiUser className="mb-4 size-[30px] text-primary" />
      <Skeleton loading={isUserCountFetching} active>
        <h6 className=" mb-4 text-xl font-bold leading-snug">
          Users (
          {userCount?.totalUsers}
          )
        </h6>

        <p className="mb-2">
          Administration -
          {userCount?.totalAdmin}
        </p>
      </Skeleton>
    </Card>
  );
}
