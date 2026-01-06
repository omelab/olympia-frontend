import * as Yup from 'yup';

export const createAdminSchema = Yup.object().shape({
  firstName: Yup.string().required('FirstName is required'),
  email: Yup.string().email().required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6).required('publishedAt is required'),
});
