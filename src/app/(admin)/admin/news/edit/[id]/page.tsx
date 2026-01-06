import NewsAddEdit from '@/modules/admin/news/add-edit';

type EditNewsProps = {
  params: {
    id: string;
  };
};

export default function NewsEditPage({ params: { id } }: EditNewsProps) {
  return (
    <div>
      <NewsAddEdit id={id} />
    </div>
  );
}
