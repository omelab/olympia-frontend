import { useGetCountServiceQueryQuery } from '@/api/public';
import { generateQueryString } from '@/utils/Helpers';

// type ServiceState = "ALL" | "PUBLISHED" | "DRAFT" | "TRASH";
type ServiceName =
  | 'news'
  | 'admin'
  | 'subscriber'
  | 'comment'
  | 'reporter'
  | 'category'
  | 'tag'
  | 'poll'
  | 'page'
  | 'division'
  | 'district'
  | 'upazila';

export function useCountService(serviceName: ServiceName) {
  const queryParams = { service: serviceName };
  const queryString = generateQueryString(queryParams);
  const { data: newsCount, isLoading: isNewsCountLoading }
    = useGetCountServiceQueryQuery(queryString);

  const counts = { all: 0, published: 0, draft: 0, trash: 0 };

  const getCount = () => {
    newsCount?.forEach((news) => {
      counts.all += news._count;
      if (news.status === 'PUBLISHED') {
        counts.published += news._count;
      } else if (news.status === 'DRAFT') {
        counts.draft += news._count;
      } else if (news.status === 'TRASHED') {
        counts.trash += news._count;
      }
    });
    return counts;
  };

  return isNewsCountLoading ? counts : getCount();
}
