import type { Metadata } from 'next';

import CategoriesAddEdit from '@/modules/admin/products/categories/add_edit';

export const metadata: Metadata = {
  title: 'Update Category | dti',
  description: 'Update Category',
};

type PageProps = {
  params: {
    id: string;
  };
};

export default function EditCategory({ params: { id } }: PageProps) {
  return (
    <div>
      <CategoriesAddEdit id={id} />
    </div>
  );
}
