'use client';

import {
  Button,
  Card,
  Collapse,
  DatePicker,
  message,
  Select,
  Space,
  Spin,
} from 'antd';
import dayjs from 'dayjs';
import type { FormikValues } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

import {
  useAddNewsMutation,
  useGetSingleNewsQuery,
  useUpdateNewsMutation,
} from '@/api/news';
import PageHeader from '@/modules/@common/page_header';
import { cn, sliceFromHtml } from '@/utils/Helpers';

import FeatureImage from './components/featureImage';
import MetaInformation from './components/metaInfo';
import { initialValue } from './initial_value';

const TrumbowygEditor = dynamic(
  () => import('@/modules/@common/editor/editor-trumbowyg'),
  { ssr: false },
);

export default function NewsAddEdit({ id }: { id?: string }) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').trim(),
    description: Yup.string().required('Description is required'),
  });

  const [create, { isLoading }] = useAddNewsMutation();
  const [update, { isLoading: uploading }] = useUpdateNewsMutation();

  const { data: singleNews, isLoading: singleLoading } = useGetSingleNewsQuery(
    { id },
    { skip: !id },
  );

  const createHandler = async (values: FormikValues) => {
    const metaKeyString
      = values?.metaKeyword
      && values?.metaKeyword.length > 0
      && values?.metaKeyword.length === 1
        ? values?.metaKeyword[0]
        : values?.metaKeyword.length === 0
          ? ''
          : values?.metaKeyword.join(',');

    const payload = {
      ...values,
      metaKeyword: metaKeyString,
      publishedAt: values.publishedAt
        ? values.publishedAt
        : dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      excerpt: values?.excerpt
        ? values.excerpt
        : sliceFromHtml(values.description, 50),
    };
    const res: any = id
      ? await update({ ...payload, id })
      : await create(payload);

    if (!res?.error) {
      if (!id) {
        router.push(`/admin/news/edit/${res?.data?.id}`);
      }
      message.success(`News ${id ? 'Updated' : 'Created'} Successfully!`);
    } else {
      message.error(res?.error?.data?.message);
    }
  };

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'News', link: '/admin/news' },
          { title: `${id ? 'Update' : 'Add'} News` },
        ]}
        title={`${id ? 'Update' : 'Add'} News`}
      />
      <Formik
        initialValues={singleNews ?? initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          createHandler(values);
        }}
      >
        {({ setFieldValue, errors, values, touched }) => {
          return (
            <Form>
              {!singleLoading
                ? (
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
                                    Title
                                    {' '}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <div>
                                    <Field
                                      type="text"
                                      name="title"
                                      id="title"
                                      placeholder="Add title"
                                      className={cn(
                                        'w-full border px-3 py-2 text-sm',
                                        errors.title
                                        && 'border-2 border-solid border-red-500 focus:border-red-600 focus:outline-none',
                                      )}
                                    />
                                    <ErrorMessage
                                      name="title"
                                      component="div"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <label htmlFor="slug" className="tracking-wide">
                                    Slug
                                    {' '}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <div>
                                    <Field
                                      type="text"
                                      name="slug"
                                      id="slug"
                                      placeholder="Add Slug"
                                      className="w-full border px-3 py-2 text-sm"
                                    />
                                    <ErrorMessage
                                      name="slug"
                                      component="div"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label
                                    htmlFor="description"
                                    className="tracking-wide"
                                  >
                                    Description
                                    {' '}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <div>
                                    <TrumbowygEditor
                                      name="description"
                                      initialValue={values?.description}
                                    />
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <label
                                    htmlFor="excerpt"
                                    className="tracking-wide"
                                  >
                                    Short Description
                                    {' '}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <Field
                                    as="textarea"
                                    type="text"
                                    name="excerpt"
                                    id="excerpt"
                                    rows={3}
                                    placeholder="Type here"
                                    onChange={(e: any) => {
                                      setFieldValue('excerpt', e.target.value);
                                    }}
                                    className="w-full border px-3 py-2 text-sm"
                                    value={
                                      values?.excerpt
                                        ? values.excerpt
                                        : values?.description
                                          ? sliceFromHtml(values.description, 50)
                                          : ''
                                    }
                                  />
                                  <ErrorMessage
                                    name="excerpt"
                                    component="div"
                                    className="text-red-500"
                                  />
                                </div>
                              </div>

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
                                      onChange={value =>
                                        setFieldValue('status', value)}
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
                                    <label
                                      htmlFor="time"
                                      className="mr-1 font-medium"
                                    >
                                      Published At
                                    </label>
                                    <div className="flex items-center">
                                      <DatePicker
                                        format="YYYY-MM-DD HH:mm"
                                        placeholder="Date"
                                        style={{ width: '100%' }}
                                        showTime
                                        onChange={(dateString) => {
                                          setFieldValue(
                                            'publishedAt',
                                            dayjs(dateString).format(
                                              'YYYY-MM-DDTHH:mm:ss.SSSZ',
                                            ),
                                          );
                                        }}
                                        value={
                                          dayjs(values?.publishedAt).isValid()
                                            ? dayjs(values?.publishedAt)
                                            : undefined
                                        }
                                      />
                                    </div>
                                  </div>

                                  <button
                                    className={`btn btn-primary mt-5 w-full rounded-md uppercase ${
                                      isLoading || uploading ? 'disabled' : ''
                                    }`}
                                    type="submit"
                                  >
                                    {isLoading || uploading
                                      ? (
                                          <Spin size="small" />
                                        )
                                      : (
                                          <Button
                                            type="primary"
                                            className="w-full"
                                          >
                                            {`${id ? 'Update' : 'Publish'}`}
                                          </Button>
                                        )}
                                  </button>
                                </div>
                              ),
                            },
                          ]}
                        />

                        <FeatureImage
                          setFieldValue={setFieldValue}
                          values={values}
                          errors={errors}
                          touched={touched}
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
}
