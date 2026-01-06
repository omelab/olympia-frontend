'use client';

import { message, Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa6';
import * as Yup from 'yup';

import { useSignInMutation } from '@/api/auth';

export const ForgotPassword = () => {
  const [signIn, { isLoading }] = useSignInMutation();

  const signInInit = {
    username: '',
    password: '',
  };
  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('User Name or Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const signinHandler = async (values: any) => {
    try {
      const res: any = await signIn({
        username: values.username,
        password: values.password,
      });

      if (res.error) {
        if (res.error.status === 401) {
          message.error(res.error.data.message);
        } else if (res.error.status === 404) {
          message.error('User not found');
        } else {
          message.error('Something went wront. Please try again!');
        }
      } else {
        ;<Link href="/admin/dashboard"></Link>;
      }
    } catch {}
  };

  return (
    <div className="p-8">
      <div className=" mx-auto grid max-w-[1170px] grid-cols-[1.2fr_1fr] gap-6 lg:mb-[150px]">
        <div className="hidden justify-center rounded-2xl pt-10 lg:flex  lg:items-center xl:items-center">
          <Image
            alt="welcome"
            height={300}
            width={500}
            src="/images/misc/reset.png"
          />
        </div>

        <div className="flex h-full flex-col items-center justify-center ">
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <Image
                alt="logo"
                height={100}
                width={200}
                src="/images/misc/logo.png"
              />
            </div>
            <h4 className="mb-2">Welcome to Generation</h4>
          </div>

          <Formik
            initialValues={signInInit}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              signinHandler(values);
            }}
          >
            {({ handleSubmit, errors, values, touched }) => (
              <Form className="w-full">
                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                  <div className="form_group col-span-2">
                    <label htmlFor="username">
                      Email Address
                      <span className="astrisk">*</span>
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className={
                        errors?.username && touched?.username && 'error'
                      }
                      placeholder="User Name or Email Address"
                      value={values?.username ?? ''}
                    />
                    {errors?.username && touched?.username
                      ? (
                          <div className="error">{errors?.username}</div>
                        )
                      : null}
                  </div>
                </div>

                {!isLoading
                  ? (
                      <>
                        <button
                          onClick={() => handleSubmit}
                          type="submit"
                          className="btn btn-primary mb-4 mt-5 w-full rounded-lg py-3.5"
                        >
                          Send Reset Link
                        </button>
                        <div className="text-center">
                          <Link
                            href="/login"
                            className=" flex items-center justify-center gap-3 font-semibold transition-all "
                          >
                            <FaChevronLeft className="text-sm" />
                            Back to Login
                          </Link>
                        </div>
                      </>
                    )
                  : (
                      <>
                        <button className="btn btn-primary disabled mb-4 mt-5 w-full rounded-lg py-3">
                          <Spin />
                        </button>
                      </>
                    )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
