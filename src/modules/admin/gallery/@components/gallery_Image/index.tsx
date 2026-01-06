'use client';

import dynamic from 'next/dynamic';
import React, { Fragment } from 'react';
import { message } from 'antd';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';

import * as Yup from 'yup';
import { useAddGalleryMutation, useUpdateGalleryMutation } from '@/api/gallery';

const MediaInput = dynamic(
  () => import('@/modules/admin/media/@components/media_input'),
  { ssr: false },
);

const initialValue = {
  imageUrl: '/assets/misc/image-upload.svg',
  caption: '',
  photoCredit: '',
  positionOrder: 999,
};

const GalleryImage: React.FC<any> = ({ singleData, handleClose }) => {
  const validationSchema = Yup.object().shape({
    imageUrl: Yup.string().required('Image is required').trim(),
    caption: Yup.string().trim(), // Optional field
    photoCredit: Yup.string().trim(), // Optional field
    positionOrder: Yup.number().nullable(),
  });

  const [create] = useAddGalleryMutation();
  const [update] = useUpdateGalleryMutation();

  const createHandler = async (values: FormikValues) => {
    const payload = {
      imageUrl: values.imageUrl,
      caption: values.caption,
      photoCredit: values.photoCredit,
      positionOrder: values.positionOrder ?? 999,
    };

    const { data }: any = singleData?.id
      ? await update({ payload, id: singleData.id })
      : await create(payload);

    if (data?.id) {
      message.success(`Gallery Image Created  Successfully!`);

      handleClose();
    } else {
      message.error(`Sorry! unable to create gallery`);
    }
  };

  return (
    <Fragment>
      <Formik
        initialValues={singleData ?? initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          createHandler(values);
        }}
      >
        {({ setFieldValue, values, handleSubmit }) => {
          return (
            <Form>
              <div className="mt-6">
                <div className="col-span-2 grid grid-cols-1 items-top gap-x-[30px] gap-y-4 rounded-md border p-4 md:grid-cols-[250px_1fr]">
                  <div>
                    <MediaInput
                      onChange={(event: any) => {
                        setFieldValue(`imageUrl`, event?.data?.path);
                      }}
                      type="image"
                      src={values?.imageUrl}
                    />
                    <ErrorMessage
                      name={`imageUrl`}
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <div className="mt-3 w-full">
                      <label htmlFor={`caption`} className="mb-1">
                        Caption
                      </label>
                      <div>
                        <Field
                          type="text"
                          name={`caption`}
                          id={`caption`}
                          placeholder="Add Caption"
                          className="w-full rounded-md border px-3 py-2 focus:outline-none"
                        />
                        <ErrorMessage
                          name={`caption`}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <div className="mt-3 w-full">
                      <label htmlFor={`photoCredit`} className="mb-1">
                        Photo Credit
                      </label>
                      <div>
                        <Field
                          type="text"
                          name={`photoCredit`}
                          id={`photoCredit`}
                          placeholder="Photo Credit"
                          className="w-full rounded-md border px-3 py-2 focus:outline-none"
                        />
                        <ErrorMessage
                          name={`photoCredit`}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <div className="mt-3 w-full">
                      <label htmlFor={`positionOrder`} className="mb-1">
                        Position Order
                      </label>
                      <div>
                        <Field
                          type="text"
                          name={`positionOrder`}
                          id={`positionOrder`}
                          placeholder="Position Order"
                          className="w-full rounded-md border px-3 py-2 focus:outline-none"
                        />
                        <ErrorMessage
                          name={`positionOrder`}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="mt-3 rounded-md bg-blue-600 px-2 py-1 text-white hover:bg-blue-900 focus:outline-none"
                >
                  Submit Now
                </button>
                <button
                  type="button"
                  className="mt-3 rounded-md bg-gray-500 px-2 py-1 text-white hover:bg-black focus:outline-none"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default GalleryImage;
