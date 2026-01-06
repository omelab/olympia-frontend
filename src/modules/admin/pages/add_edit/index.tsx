'use client';

import { Button, Card, Collapse, message, Select, Space, Spin } from 'antd';
import clsx from 'clsx';
import type { FormikValues } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import 'suneditor/dist/css/suneditor.min.css';
import {
  useCreatePageMutation,
  useSinglePageQuery,
  useUpdatePageMutation,
} from '@/api/pages';
import PageHeader from '@/modules/@common/page_header';
import MediaInput from '@/modules/admin/media/@components/media_input';
import { initialValue } from './initial_value';
import { validationSchema } from './schema';
import CustomSunEditor from '@/components/editor/CustomEditor';

const PagesAddEdit = ({ id }: { id?: string }) => {
  const router = useRouter();
  const [create, { isLoading }] = useCreatePageMutation();
  const [update, { isLoading: uploading }] = useUpdatePageMutation();

  const { data: singlePage, isLoading: singleLoading } = useSinglePageQuery(
    { id },
    { skip: !id },
  );

  const createHandler = async (values: FormikValues) => {
    const metaKeyArray = values.metaKeyword
      ? values?.metaKeyword.join(',')
      : '';

    const data: any = {
      title: values?.title,
      description: values?.description,
      status: values?.status,
      featuredImage: values?.featuredImage,
      metaTitle: values?.metaTitle,
      metaKeyword: metaKeyArray,
      metaDescription: values?.metaDescription,
    };

    let res: any;
    if (id) {
      res = await update({ data, id });
    } else {
      res = await create(data);
    }

    if (!res?.error) {
      message.success(`Page ${id ? 'Updated' : 'Created'} Successfully!`);

      router.push('/admin/pages');
    } else {
      if (res?.error?.status >= 500) {
        message.error('Somthing went wrong!');
      } else {
        message.error(
          `${
            res?.error?.data?.message
              ? res?.error?.data?.message
              : 'Somthing went wrong!'
          }`,
        );
      }
    }
  };

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Pages', link: '/admin/pages' },
          { title: 'Create Page' },
        ]}
        title={`${id ? 'Update' : 'Create'} Page`}
      />
      <Formik
        initialValues={singlePage ?? initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          createHandler(values);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, values, touched }: any) => {
          return (
            <Form>
              {!singleLoading ? (
                <div className="mb-8 mt-5 grid gap-5 lg:grid-cols-[1fr_400px]">
                  <Card>
                    <Space
                      size="large"
                      direction="vertical"
                      style={{ width: '100%' }}
                    >
                      <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                        <div>
                          <label htmlFor="title" className="text-base">
                            Name
                            <span className="text-red-500">*</span>
                          </label>
                          <div>
                            <Field
                              type="text"
                              name="title"
                              id="title"
                              placeholder="Add name"
                              className="w-full border px-3 py-2 text-base"
                            />
                            {errors?.title && touched?.title ? (
                              <div className="text-base text-red-500">
                                {errors?.title}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="description" className="text-base">
                            Description <span className="text-red-500">*</span>
                          </label>

                          <CustomSunEditor
                            name="description"
                            values={values}
                            setFieldValue={setFieldValue}
                          />

                          {errors?.description && touched?.description ? (
                            <div className="text-base text-red-500">
                              {errors?.description}
                            </div>
                          ) : null}
                        </div>

                        <Card
                          title={<h4 className="!mb-0">Meta Information</h4>}
                          styles={{
                            header: {
                              backgroundColor: '#F6F7FA',
                            },
                          }}
                          className="rounded-none"
                        >
                          <div>
                            <label htmlFor="metaKeyword" className="text-base">
                              Meta Keywords
                            </label>
                            <Select
                              size="large"
                              popupClassName="!hidden"
                              mode="tags"
                              style={{ width: '100%' }}
                              placeholder="Add keywords"
                              onChange={(val: string | string[]) => {
                                setFieldValue(
                                  'metaKeyword',
                                  typeof val === 'string' ? [val] : val,
                                );
                              }}
                              tokenSeparators={[',']}
                              value={values?.metaKeyword || []}
                            />
                            <ErrorMessage
                              name="metaKeyword"
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="mt-3">
                            <label htmlFor="metaTitle" className="text-base">
                              Meta Title
                            </label>
                            <Field
                              type="text"
                              name="metaTitle"
                              id="metaTitle"
                              placeholder="Add Meta Title"
                              className="w-full border px-3 py-2 text-sm"
                            />
                          </div>

                          <div className="mt-3">
                            <label
                              htmlFor="metaDescription"
                              className="text-base"
                            >
                              Meta Description
                            </label>
                            <Field
                              component="textarea"
                              name="metaDescription"
                              id="metaDescription"
                              placeholder="Type here"
                              className="w-full border px-3 py-2 text-sm"
                            />
                          </div>
                        </Card>
                      </div>
                    </Space>
                  </Card>

                  <Space direction="vertical">
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
                            <div className="flex flex-col gap-4">
                              {id && (
                                <div className="grid grid-cols-[105px_1fr] items-center">
                                  <label
                                    htmlFor="status"
                                    className="mr-1 font-medium"
                                  >
                                    Status
                                  </label>

                                  <Select
                                    defaultValue="Active"
                                    style={{ width: '100%' }}
                                    id="status"
                                    onChange={(value) =>
                                      setFieldValue('status', value)
                                    }
                                    options={[
                                      { value: 'ACTIVE', label: 'ACTIVE' },
                                      {
                                        value: 'INACTIVE',
                                        label: 'INACTIVE',
                                      },
                                    ]}
                                    value={values.status || 'Active'}
                                  />
                                </div>
                              )}

                              <button
                                className={clsx(
                                  `btn btn-secondary w-full rounded-md uppercase`,
                                  isLoading || uploading ? 'disabled' : '',
                                  id ? 'mt-5' : '',
                                )}
                                onClick={handleSubmit}
                                type="submit"
                              >
                                {isLoading || uploading ? (
                                  <Spin size="small" />
                                ) : (
                                  <Button type="primary" className="w-full">
                                    {!id ? 'Create' : 'Update'}
                                  </Button>
                                )}
                              </button>
                            </div>
                          ),
                        },
                      ]}
                    />

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
                              Page Image
                            </span>
                          ),
                          headerClass: 'text-base bg-[#F6F7FA] shadow-sm',
                          style: {
                            backgroundColor: '#fff',
                          },
                          children: (
                            <div className="mt-4">
                              <MediaInput
                                onChange={(event: any) => {
                                  setFieldValue(
                                    'featuredImage',
                                    event?.data?.path,
                                  );
                                }}
                                src={values?.featuredImage}
                                type="image"
                              />
                            </div>
                          ),
                        },
                      ]}
                    />
                  </Space>
                </div>
              ) : (
                <div className="flex min-h-screen items-center justify-center">
                  <Spin className="large" />
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PagesAddEdit;
