export const initialValue = {
  title: '',
  slug: '',
  subTitle: '',
  brochure: '',
  description: '',
  shortDescription: '',
  featuredImage: '',
  imageCaption: '',
  categoryId: '',
  tags: '',
  galleries: [],
  status: 'PUBLISHED',
  homepageFeatured: false,
  metaTitle: '',
  metaKeyword: '',
  metaDescription: '',
};

export type ComponentsProps = {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  setNewsFormat?: any;
  errors: any;
  touched: any;
};
