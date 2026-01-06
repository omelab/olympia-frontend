import type { Metadata } from 'next';

import CategoriesAddEdit from '@/modules/admin/products/categories/add_edit';

export const metadata: Metadata = {
  title: 'Create Category | dti',
  description: 'Add Category',
};

export default function AddCategories() {
  return <CategoriesAddEdit />;
}
