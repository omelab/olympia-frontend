import * as Yup from 'yup';

export const tagSchema = Yup.object({
  name: Yup.string().required('Required'),
  slug: Yup.string(),
  description: Yup.string(),
});
