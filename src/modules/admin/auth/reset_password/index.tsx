import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiChevronLeft } from 'react-icons/fi';

export const ResetPassword = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');

  const forgotPassInit = {
    password: '',
    confirmPassword: '',
  };
  // Validation schema
  // const validationSchema = Yup.object().shape({
  //   password: Yup.string()
  //     .min(6, "Must be more than or equal 6 characters")
  //     .required("Password is required")
  //     .matches(
  //       /^(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{6,}$/,
  //       "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  //     ),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref("password"), null], "Passwords must match")
  //     .required("Confirm Password is required"),
  // });

  // const vendorForgotPass = async (values: any) => {
  //   if (!parsedLinkQuery?.token) return;
  //   await forgotPassChange({
  //     token: parsedLinkQuery?.token,
  //     password: values?.password,
  //     confirmPassword: values?.confirmPassword,
  //   }).then((res: any) => {
  //     if (!res?.error) {
  //       message.success("Successful. Your password has been changed");
  //       navigate("/login");
  //     } else {
  //       message.error(
  //         res?.error?.data?.message ??
  //           "Something went wrong. Try reload the page"
  //       );
  //     }
  //   });
  // };

  return (
    <div className="min-h-screen overflow-auto p-8">
      <div className="auth_h_screen grid lg:grid-cols-[1fr_550px] lg:gap-6 xl:grid-cols-[1fr_650px] xl:gap-12">
        <div className="hidden justify-center rounded-2xl bg-[#F8F7FA] pt-10 lg:flex lg:items-center xl:items-end">
          <img src="/images/auth/reset-password.webp" alt="reset-password" />
        </div>

        <div className="flex h-full flex-col items-center justify-center p-5 md:p-12 md:px-[70px] lg:p-12">
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <img src="/images/logo/archviz-logo.svg" alt="logo" />
            </div>
            <h4 className="mb-2">Reset Password</h4>
            <div>for example@gmail.com</div>
            {/* <div>for {parsedLinkQuery?.email}</div> */}
          </div>

          <Formik
            initialValues={forgotPassInit}
            enableReinitialize={true}
            // validationSchema={validationSchema}
            onSubmit={() => {
              // vendorForgotPass(values);
            }}
          >
            {({ handleSubmit, errors, values, touched }) => (
              <Form className="w-full">
                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                  <div className="form_group col-span-2">
                    <label htmlFor="">
                      Password
                      {' '}
                      <span className="astrisk">*</span>
                    </label>
                    <div className="relative">
                      <Field
                        type={`${passwordType}`}
                        name="password"
                        className={`${
                          errors?.password && touched?.password && 'error'
                        } !pr-11`}
                        placeholder="New Password"
                        value={values?.password ?? ''}
                      />
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                      <div
                        className="password_view"
                        onClick={() =>
                          setPasswordType(
                            passwordType === 'password' ? 'text' : 'password',
                          )}
                      >
                        {passwordType === 'password' && (
                          <AiOutlineEye className="text-lg" />
                        )}
                        {passwordType === 'text' && (
                          <AiOutlineEyeInvisible className="text-lg" />
                        )}
                      </div>
                    </div>
                    {errors?.password && touched?.password
                      ? (
                          <div className="error">{errors?.password}</div>
                        )
                      : null}
                  </div>
                  <div className="form_group col-span-2">
                    <label htmlFor="">
                      Confirm Password
                      {' '}
                      <span className="astrisk">*</span>
                    </label>
                    <div className="relative">
                      <Field
                        type={`${confirmPasswordType}`}
                        name="confirmPassword"
                        className={`${
                          errors?.confirmPassword
                          && touched?.confirmPassword
                          && 'error'
                        } !pr-11`}
                        placeholder="Confirm Password"
                        value={values?.confirmPassword ?? ''}
                      />
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                      <div
                        className="password_view"
                        onClick={() =>
                          setConfirmPasswordType(
                            confirmPasswordType === 'password'
                              ? 'text'
                              : 'password',
                          )}
                      >
                        {confirmPasswordType === 'password' && (
                          <AiOutlineEye className="text-lg" />
                        )}
                        {confirmPasswordType === 'text' && (
                          <AiOutlineEyeInvisible className="text-lg" />
                        )}
                      </div>
                    </div>
                    {errors?.confirmPassword && touched?.confirmPassword
                      ? (
                          <div className="error">{errors?.confirmPassword}</div>
                        )
                      : null}
                  </div>
                </div>

                <button
                  onClick={() => handleSubmit}
                  type="submit"
                  className="btn btn-primary mb-4 mt-5 w-full"
                >
                  Set new password
                </button>

                <div className="flex items-center justify-center text-center text-sm">
                  <Link
                    href="/login"
                    className="flex items-center gap-1 text-[#7367f0] hover:underline"
                  >
                    <FiChevronLeft />
                    {' '}
                    Back to login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
