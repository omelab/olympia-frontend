import type { Metadata } from 'next';

import CategoriesList from '@/modules/admin/products/categories/list';

export const metadata: Metadata = {
  title: 'Categories | dti',
  description: 'List of all category',
};

export default function CategoriesListPage() {
  return <CategoriesList />;
}
