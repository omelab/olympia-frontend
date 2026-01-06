import { Card, Skeleton } from 'antd';
import { FaChartArea } from 'react-icons/fa';
import { useGetCommentsCountQuery } from '@/api/comment/comment_api';

export function CommentCountCard() {
  const { data: activeCommentCount, isFetching: isActiveCommentCountLoading } =
    useGetCommentsCountQuery();

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
      <FaChartArea className="mb-4 size-[30px] text-blue-500" />
      <Skeleton loading={isActiveCommentCountLoading} active>
        <h6 className=" mb-4 text-xl font-bold leading-snug">
          Comments ({activeCommentCount?.totalComments})
        </h6>

        <p className="mb-2">
          Today Comments - {activeCommentCount?.todayComments}
        </p>
      </Skeleton>
    </Card>
  );
}
