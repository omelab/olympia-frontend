import { Card, Skeleton } from 'antd';
import { FiUserPlus } from 'react-icons/fi';

type SubscriberCountCardProps = {
  userCount:
    | {
      totalSubscriber: number;
      totalUsers: number;
      totalAdmin: number;
    }
    | undefined;

  isUserCountFetching: boolean;
};

export function SubscriberCountCard({
  userCount,
  isUserCountFetching,
}: SubscriberCountCardProps) {
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
      <FiUserPlus className="mb-4 size-[30px] text-purple-700" />
      <Skeleton loading={isUserCountFetching} active>
        <h6 className=" mb-4 text-xl font-bold leading-snug">
          Subscriber (
          {userCount?.totalSubscriber}
          )
        </h6>
      </Skeleton>
    </Card>
  );
}
