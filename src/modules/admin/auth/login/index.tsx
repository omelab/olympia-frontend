'use client';

import { message, Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import * as Yup from 'yup';

import { useSignInMutation } from '@/api/auth';

export const Login = () => {
  const [type, setType] = useState('password');
  const [signIn, { isLoading: isAdminLoading }] = useSignInMutation();

  const signInInit = {
    adminType: 'ADMIN',
    username: '',
    password: '',
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('username or email is required.')
      .test('is-email', 'Invalid email', (value) => {
        return (
          Yup.string().email().isValidSync(value) ||
          Yup.string()
            .matches(
              /^[\w.-]+$/,
              'Username can only contain letters, numbers, underscores, dots, or hyphens',
            )
            .isValidSync(value)
        );
      }),
    password: Yup.string().required('Password is required').min(6),
  });

  const signinHandler = async (values: any) => {
    const adminType = values?.adminType;

    try {
      let res: any;

      if (adminType === 'ADMIN') {
        res = await signIn({
          username: values?.username,
          password: values?.password,
        });
      }

      if (res.error) {
        if (res.error.status === 401) {
          message.error(res.error.data.message);
        } else if (res.error.status === 404) {
          message.error('User not found');
        } else if (res.error.status === 422) {
          message.error('Password Incorrect');
        } else if (res.error.status === 400) {
          message.error('Invalid username or password');
        } else {
          message.error('Something went wront. Please try again!');
        }
      } else {
        message.success('Login Successfully!');
        <Link href="/dashboard"></Link>;
      }
    } catch {}
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/assets/logo/logo.webp"
          height={150}
          width={150}
          alt="dti logo"
          className="mx-auto block"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <Formik
        initialValues={signInInit}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          signinHandler(values);
        }}
      >
        {({ handleSubmit, errors, values, touched }) => (
          <Form className="w-full">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    User Name or Email Address
                  </label>
                  <div className="mt-2">
                    <Field
                      type="text"
                      name="username"
                      placeholder="User Name or Email Address"
                      value={values?.username ?? ''}
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                    {errors?.username && touched?.username ? (
                      <div className="text-red-500">{errors?.username}</div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Field
                      type={`${type}`}
                      name="password"
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                      placeholder="Password"
                      value={values?.password ?? ''}
                    />

                    <div
                      className="absolute right-1 top-2 cursor-pointer"
                      onClick={() =>
                        setType(type === 'password' ? 'text' : 'password')
                      }
                    >
                      {type === 'password' ? (
                        <AiOutlineEyeInvisible className="text-xl" />
                      ) : (
                        <AiOutlineEye className="text-xl" />
                      )}
                    </div>

                    {errors?.password && touched?.password ? (
                      <div className="text-red-500">{errors?.password}</div>
                    ) : null}
                  </div>
                </div>
              </div>

              {!isAdminLoading ? (
                <div className="mt-4">
                  <button
                    type="submit"
                    onClick={() => handleSubmit}
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Sign in
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary disabled my-4 w-full rounded-lg py-3"
                >
                  <Spin />
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
