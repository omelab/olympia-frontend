'use client';

import {
  Button,
  Card,
  Collapse,
  message,
  Select,
  Space,
  Spin,
  TreeSelect,
} from 'antd';
import clsx from 'clsx';
import type { FormikValues } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import {
  useCreateCategoryMutation,
  useGetCategoryDropdownsQuery,
  useSingleCategoryQuery,
  useUpdatecategoryMutation,
} from '@/api/category';
import PageHeader from '@/modules/@common/page_header';
import MediaInput from '@/modules/admin/media/@components/media_input';

import { treeData } from '../../add-edit/utils';
import { initialValue } from './initial_value';
import { validationSchema } from './schema';

const CategoriesAddEdit = ({ id }: any) => {
  const [readOnly, setReadOnly] = useState(true);
  const [create, { isLoading }] = useCreateCategoryMutation();
  const [update, { isLoading: uploading }] = useUpdatecategoryMutation();

  const { data: categories } = useGetCategoryDropdownsQuery('');

  const { data: singleCategory, isLoading: singleLoading }
    = useSingleCategoryQuery({ id }, { skip: !id });

  const router = useRouter();

  const createHandler = async (values: FormikValues) => {
    const keywordStr = values.searchKeyword
      ? values.searchKeyword.join(',')
      : '';
    const metaKeyArray = values.metaKeyword ? values?.metaKeyword.join(',') : '';

    const data: any = {
      title: values?.title,
      slug: values?.slug,
      content: values?.content,
      status: values?.status,
      featuredImage: values?.featuredImage,
      searchKeyword: keywordStr,
      positionOrder: values?.positionOrder,
      metaTitle: values?.metaTitle,
      metaKeyword: metaKeyArray,
      metaDescription: values?.metaDescription,
    };

    if (values.parentId) {
      data.parentId = values.parentId;
    }

    let res: any;
    if (id) {
      res = await update({ data, id });
    } else {
      res = await create(data);
    }
    if (!res?.error) {
      message.success(`Category ${id ? 'Updated' : 'Created'} Successfully!`);

      router.push('/admin/categories');
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
          { title: 'Categories', link: '/admin/categories' },
          { title: 'Create Category' },
        ]}
        title={`${id ? 'Update' : 'Create'} Category`}
      />
      <Formik
        initialValues={singleCategory ?? initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          createHandler(values);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, values, touched }: any) => {
          return (
            <Form>
              {!singleLoading
                ? (
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
                                {' '}
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
                                {errors?.title && touched?.title
                                  ? (
                                      <div className="text-base text-red-500">
                                        {errors?.title}
                                      </div>
                                    )
                                  : null}
                              </div>
                            </div>
                            {id && (
                              <div>
                                <label htmlFor="slug" className="">
                                  Slug
                                </label>
                                <div className="flex items-center gap-1">
                                  <Field
                                    type="text"
                                    name="slug"
                                    readOnly={readOnly}
                                    className={`px-3 py-2 text-sm outline-none ${
                                      readOnly ? '' : 'border'
                                    }`}
                                  />
                                  {readOnly
                                    ? (
                                        <BiEdit
                                          onClick={() => setReadOnly(false)}
                                          className="cursor-pointer"
                                        />
                                      )
                                    : (
                                        <AiOutlineCloseCircle
                                          onClick={() => {
                                            setReadOnly(true);
                                            setFieldValue('slug', singleCategory?.slug);
                                          }}
                                          className="cursor-pointer"
                                        />
                                      )}
                                </div>
                              </div>
                            )}

                            <div>
                              <label htmlFor="parentId" className="font-bold">
                                Parent Category
                              </label>

                              <TreeSelect
                                loading={isLoading}
                                style={{ width: '100%' }}
                                size="large"
                                treeData={treeData(categories)}
                                placeholder="Select"
                                treeNodeFilterProp="title"
                                treeDefaultExpandAll
                                showSearch
                                onChange={(value) => {
                                  setFieldValue('parentId', value);
                                }}
                                value={
                                  values?.parentId ? values?.parentId : undefined
                                }
                              />
                            </div>

                            <div>
                              <label htmlFor="content" className="text-base">
                                Description
                              </label>

                              <Field
                                type="text"
                                name="content"
                                id="content"
                                placeholder="Type here"
                                className="w-full border px-3 pb-20 pt-2 text-sm"
                              />
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
                                  as="textarea"
                                  type="text"
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
                                        onChange={value =>
                                          setFieldValue('status', value)}
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
                                    {isLoading || uploading
                                      ? (
                                          <Spin size="small" />
                                        )
                                      : (
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
                                  Category Image
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
                  )
                : (
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
};

export default CategoriesAddEdit;
