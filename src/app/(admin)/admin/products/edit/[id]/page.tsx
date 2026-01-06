import ProductAddEdit from '@/modules/admin/products/add-edit';

type EditProductProps = {
  params: {
    id: string;
  };
};

export default function ProductEditPage({ params: { id } }: EditProductProps) {
  return (
    <div>
      <ProductAddEdit id={id} />
    </div>
  );
}
