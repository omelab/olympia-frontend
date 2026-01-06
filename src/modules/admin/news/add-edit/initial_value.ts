export const initialValue = {
  title: '',
  slug: '',
  description: '',
  excerpt: '',
  featuredImage: '',
  imageCaption: '',
  status: 'PUBLISHED',
  metaTitle: '',
  metaKeyword: '',
  metaDescription: '',
  publishedAt: undefined,
};

export type ComponentsProps = {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  setNewsFormat?: any;
  errors: any;
  touched: any;
};
