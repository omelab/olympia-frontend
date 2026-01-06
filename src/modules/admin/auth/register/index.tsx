'use client';

import { message, Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import * as Yup from 'yup';

import { useSignInMutation } from '@/api/auth';

export const Register = () => {
  const [type, setType] = useState('password');
  const [signIn, { isLoading }] = useSignInMutation();

  const signInInit = {
    username: '',
    password: '',
    confirmpassword: '',
    email: '',
  };
  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('User Name or Email is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().required('email is required'),
    confirmpassword: Yup.string().required('confirm password is required'),
  });

  const signinHandler = async (values: any) => {
    try {
      const res: any = await signIn({
        username: values.username,
        password: values.password,
        email: values.email,
        confirmpassword: values.confirmpassword,
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
        <Link href="/dashboard"></Link>;
      }
    } catch {}
  };

  return (
    <div className="p-8">
      <div className=" mx-auto mb-8 grid max-w-[1170px] grid-cols-[1.2fr_1fr] gap-6">
        <div className="hidden justify-center rounded-2xl lg:flex lg:items-center  xl:items-center">
          <Image
            alt="welcome"
            height={700}
            width={600}
            src="/images/misc/register.jpg"
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
            <h4 className="mb-2">Welcome to NewsPaper</h4>
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
                <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-8">
                  <div className="form_group col-span-2">
                    <label htmlFor="username">
                      User Name
                      <span className="astrisk">*</span>
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className={
                        errors?.username && touched?.username && 'error'
                      }
                      placeholder="User Name"
                      value={values?.username ?? ''}
                    />
                    {errors?.username && touched?.username ? (
                      <div className="error">{errors?.username}</div>
                    ) : null}
                  </div>
                  <div className="form_group col-span-2">
                    <label htmlFor="email">
                      Email Address
                      <span className="astrisk">*</span>
                    </label>
                    <Field
                      type="text"
                      name="email"
                      className={errors?.email && touched?.email && 'error'}
                      placeholder="Email Address"
                      value={values?.email ?? ''}
                    />
                    {errors?.email && touched?.email ? (
                      <div className="error">{errors?.email}</div>
                    ) : null}
                  </div>
                  <div className="form_group relative col-span-2">
                    <label htmlFor="">
                      Password <span className="astrisk">*</span>
                    </label>

                    <div className="relative">
                      <Field
                        type={`${type}`}
                        name="password"
                        className={`${
                          errors?.password && touched?.password ? 'error' : ''
                        } !pr-11`}
                        placeholder="Password"
                        value={values?.password ?? ''}
                      />
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                      <div
                        className="password_view"
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
                    </div>
                    {errors?.password && touched?.password ? (
                      <div className="error">{errors?.password}</div>
                    ) : null}
                  </div>
                  <div className="form_group relative col-span-2">
                    <label htmlFor="">
                      Confirm Password <span className="astrisk1">*</span>
                    </label>

                    <div className="relative">
                      <Field
                        type={`${type}`}
                        name="confirmpassword"
                        className={`${
                          errors?.confirmpassword && touched?.confirmpassword
                            ? 'error'
                            : ''
                        } !pr-11`}
                        placeholder="Confirm Password"
                        value={values?.confirmpassword ?? ''}
                      />
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                      <div
                        className="password_view"
                        onClick={() =>
                          setType(
                            type === 'confirmpassword'
                              ? 'text'
                              : 'confirmpassword',
                          )
                        }
                      >
                        {type === 'confirmpassword' ? (
                          <AiOutlineEyeInvisible className="text-xl" />
                        ) : (
                          <AiOutlineEye className="text-xl" />
                        )}
                      </div>
                    </div>
                    {errors?.confirmpassword && touched?.confirmpassword ? (
                      <div className="error">{errors?.confirmpassword}</div>
                    ) : null}
                  </div>
                </div>
                <p className=" mb-0 ml-2">
                  Already Have a Account? <Link href="/login">Login</Link>{' '}
                </p>

                {!isLoading ? (
                  <button
                    onClick={() => handleSubmit}
                    type="submit"
                    className="btn btn-primary mb-4 mt-5 w-full rounded-lg py-3.5"
                  >
                    Sign Up
                  </button>
                ) : (
                  <button className="btn btn-primary disabled mb-4 mt-5 w-full rounded-lg py-3">
                    <Spin />
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
