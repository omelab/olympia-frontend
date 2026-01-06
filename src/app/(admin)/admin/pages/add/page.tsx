import { Metadata } from 'next';
import PageAddEdit from '@/modules/admin/pages/add_edit';

export const metadata: Metadata = {
  title: 'Create Page | Olympia Paints',
  description: 'Add News Category',
};

export default function AddCategories() {
  return <PageAddEdit />;
}
