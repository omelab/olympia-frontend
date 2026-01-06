'use client';

import { Button, Card, Collapse, message, Select, Space, Spin } from 'antd';
import type { FormikValues } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useRouter } from 'next/navigation';
import type { MouseEventHandler } from 'react';
import * as Yup from 'yup';

import {
  useAddProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from '@/api/products';
import PageHeader from '@/modules/@common/page_header';
import { cn, sliceFromHtml } from '@/utils/Helpers';

import Category from './components/category';
import FeatureImage from './components/featureImage';
import MetaInformation from './components/metaInfo';
import Tags from './components/tags';
import { initialValue } from './initial_value';
import CustomSunEditor from '@/components/editor/CustomEditor';

export default function ProductAddEdit({ id }: { id?: string }) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').trim(),
    description: Yup.string().required('Title is required').trim(),
    // slug: Yup.string().required('Slug is required').trim(),
    categoryId: Yup.string().required('CategoryId is required'),
  });

  const [create, { isLoading }] = useAddProductMutation();
  const [update, { isLoading: uploading }] = useUpdateProductMutation();

  const { data: singleProduct, isLoading: singleLoading } =
    useGetSingleProductQuery({ id }, { skip: !id });

  const createHandler = async (values: FormikValues) => {
    const metaKeyString =
      values?.metaKeyword &&
      values?.metaKeyword.length > 0 &&
      values?.metaKeyword.length === 1
        ? values?.metaKeyword[0]
        : values?.metaKeyword.length === 0
          ? ''
          : values?.metaKeyword.join(',');

    // const specificationObj = values.specification.reduce(
    //   (acc: any, { key, value }: any) => ({ ...acc, [key]: value }),
    //   {},
    // );

    const payload = {
      ...values,
      metaKeyword: metaKeyString,
      shortDescription: values?.shortDescription
        ? values.shortDescription
        : sliceFromHtml(values.description, 50),
      categoryId: Number.parseInt(values.categoryId),
    };

    const res: any = id ? await update({ payload, id }) : await create(payload);

    if (!res?.error) {
      if (!id) {
        router.push(`/admin/products/edit/${res?.data?.id}`);
      }

      message.success(`Project ${id ? 'Updated' : 'Created'} Successfully!`);
    } else {
      message.error(res?.error?.data?.message);
    }
  };

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Products', link: '/admin/products' },
          { title: `${id ? 'Update' : 'Add'} Project` },
        ]}
        title={`${id ? 'Update' : 'Add'} Products`}
      />
      <Formik
        initialValues={singleProduct ?? initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          createHandler(values);
        }}
      >
        {({ setFieldValue, errors, values, touched, handleSubmit }) => {
          return (
            <Form>
              {!singleLoading ? (
                <div className="mb-8 mt-5 grid gap-5 lg:grid-cols-[1fr_400px]">
                  <div>
                    <Space
                      size="large"
                      direction="vertical"
                      style={{ width: '100%' }}
                    >
                      <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                        <Card
                          bordered={false}
                          style={{
                            borderRadius: 0,
                          }}
                          styles={{
                            header: {
                              backgroundColor: '#F6F7FA',
                              borderRadius: 0,
                            },
                            body: {
                              borderRadius: 0,
                            },
                          }}
                        >
                          <div>
                            <div className="mb-2">
                              <label htmlFor="title" className="tracking-wide">
                                Title <span className="text-red-500">*</span>
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="title"
                                  id="title"
                                  placeholder="Add title"
                                  className={cn(
                                    'w-full border px-3 py-2 text-sm',
                                  )}
                                />
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            {/* <div className="mb-2">
                              <label htmlFor="slug" className="tracking-wide">
                                Slug <span className="text-red-500">*</span>
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="slug"
                                  id="slug"
                                  placeholder="Add Slug"
                                  className={cn(
                                    'w-full border px-3 py-2 text-sm',
                                  )}
                                />
                                <ErrorMessage
                                  name="slug"
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>
                            </div> */}

                            <div className="mb-2">
                              <label
                                htmlFor="subTitle"
                                className="tracking-wide"
                              >
                                Sub Title
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="subTitle"
                                  id="subTitle"
                                  placeholder="Add Sub Title"
                                  className={cn(
                                    'w-full border px-3 py-2 text-sm',
                                  )}
                                />
                              </div>
                            </div>

                            <div className="mt-3">
                              <label
                                htmlFor="description"
                                className="tracking-wide"
                              >
                                Description
                              </label>
                              <div>
                                <CustomSunEditor
                                  name="description"
                                  values={values}
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </div>
                          </div>

                          {/* <Specifications
                            setFieldValue={setFieldValue}
                            values={values.specification}
                            errors={errors}
                            touched={touched}
                          /> */}

                          {/* <Gallery
                            setFieldValue={setFieldValue}
                            values={values}
                            errors={errors}
                            touched={touched}
                          /> */}

                          <MetaInformation
                            setFieldValue={setFieldValue}
                            values={values}
                            errors={errors}
                            touched={touched}
                          />
                        </Card>
                      </div>
                    </Space>
                  </div>

                  <Space size="middle" direction="vertical">
                    <Collapse
                      style={{
                        borderRadius: 0,
                      }}
                      bordered={false}
                      expandIconPosition="end"
                      defaultActiveKey={['1']}
                      className="drop-shadow-sm"
                      items={[
                        {
                          key: '1',
                          label: (
                            <span className="font-medium tracking-wide text-gray-900">
                              Publish
                            </span>
                          ),
                          headerClass: 'text-base bg-[#F6F7FA] shadow-sm',
                          style: {
                            backgroundColor: '#fff',
                          },
                          children: (
                            <div className="mt-4 flex flex-col gap-4">
                              <div className="grid grid-cols-[105px_1fr] items-center">
                                <label htmlFor="status" className="font-bold">
                                  Status
                                </label>

                                <Select
                                  defaultValue="PUBLISHED"
                                  style={{ width: '100%' }}
                                  onChange={(value) =>
                                    setFieldValue('status', value)
                                  }
                                  options={[
                                    {
                                      value: 'PUBLISHED',
                                      label: 'Published',
                                    },
                                    {
                                      value: 'INACTIVE',
                                      label: 'Inactive',
                                    },
                                  ]}
                                  value={values?.status || 'INACTIVE'}
                                />
                              </div>

                              <div className="grid grid-cols-[105px_1fr] items-center">
                                <label htmlFor="status" className="font-bold">
                                  Is Featured
                                </label>
                                <Select
                                  defaultValue={false}
                                  style={{ width: '100%' }}
                                  onChange={(value) =>
                                    setFieldValue('homepageFeatured', value)
                                  }
                                  options={[
                                    {
                                      value: true,
                                      label: 'True',
                                    },
                                    {
                                      value: false,
                                      label: 'False',
                                    },
                                  ]}
                                  value={values?.homepageFeatured || false}
                                />
                              </div>

                              <div
                                className={`btn btn-primary w-full rounded-md uppercase ${
                                  isLoading || uploading ? 'disabled' : ''
                                }`}
                                onClick={
                                  handleSubmit as unknown as MouseEventHandler<HTMLDivElement>
                                }
                              >
                                {isLoading || uploading ? (
                                  <Spin size="small" />
                                ) : (
                                  <Button
                                    type="primary"
                                    className="w-full"
                                    disabled={isLoading || uploading}
                                  >
                                    {`${id ? 'Update' : 'Publish'}`}
                                  </Button>
                                )}
                              </div>
                            </div>
                          ),
                        },
                      ]}
                    />
                    <Category
                      setFieldValue={setFieldValue}
                      values={values}
                      errors={errors}
                      touched={touched}
                    />

                    <Tags
                      setFieldValue={setFieldValue}
                      values={values}
                      errors={errors}
                      touched={touched}
                    />

                    <FeatureImage
                      setFieldValue={setFieldValue}
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  </Space>
                </div>
              ) : (
                <div className="flex min-h-screen items-center justify-center">
                  <Spin size="large" />
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
