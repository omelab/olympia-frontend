'use client';

import { Collapse, message, Spin } from 'antd';
import { Field, Form, Formik } from 'formik';

import {
  useCreatefeaturesMutation,
  useGetSingleafeaturesQuery,
  useUpdatefeaturesMutation,
} from '@/api/features/features_api';
import PageHeader from '@/modules/@common/page_header';

import { initialValue } from './initial_value';
import { validationSchema } from './schema';

const { Panel } = Collapse;

const CreateFeatures = ({ id }: any) => {
  const [create, { isLoading }] = useCreatefeaturesMutation();
  const [update, { isLoading: uploading }] = useUpdatefeaturesMutation();

  const { data: SingleFeatures, isLoading: singleLoading }
    = useGetSingleafeaturesQuery({ id }, { skip: !id });

  const createHandler = async (values: any) => {
    const data = {
      id: values.id,
      title: values.title,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
    };
    let res: any;
    if (id) {
      res = await update({ data, id });
    } else {
      res = await create(data);
    }
    if (!res?.error) {
      message.success(`Category ${id ? 'Updated' : 'Created'} Successfully!`);
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
    <div className="">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'All Features', link: '/admin/features/list' },
          { title: `${id ? 'Update' : 'Create'} Features` },
        ]}
        title={`${id ? 'Update' : 'Create'} Features`}
        btnTitle="All Features"
        btnLink="/admin/features"
      />
      <Formik
        initialValues={SingleFeatures ?? initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values: any) => {
          createHandler(values);
        }}
      >
        {({ handleSubmit, errors, touched }: any) => {
          return (
            <Form>
              {!singleLoading
                ? (
                    <div className="mb-8 mt-5 grid grid-cols-[1fr_400px] gap-5">
                      <div>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                          <div className="col-span-1">
                            <div className="grid grid-cols-[180px_1fr] items-center gap-[44px]">
                              <label htmlFor="title" className="">
                                Title
                                {' '}
                                <span className="text-danger">*</span>
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="title"
                                  id="title"
                                  placeholder="title"
                                  className="w-full border px-3 py-2 text-sm"
                                />
                                {errors?.title && touched?.title
                                  ? (
                                      <div className="error">{errors?.title}</div>
                                    )
                                  : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div>
                          <Collapse
                            defaultActiveKey={['1']}
                            expandIconPosition="end"
                            className="add_post"
                          >
                            <Panel header="Publish" key="1">
                              <button
                                className={`btn btn-secondary mt-5 w-full uppercase ${
                                  isLoading || uploading ? 'disabled' : ''
                                }`}
                                onClick={handleSubmit}
                                type="submit"
                              >
                                {isLoading || uploading
                                  ? (
                                      <Spin size="small" />
                                    )
                                  : (
                                      <>
                                        {id === undefined ? 'SAVE' : 'UPDATE'}
                                        {' '}
                                        & PUBLISH
                                      </>
                                    )}
                              </button>
                            </Panel>
                          </Collapse>
                        </div>

                      </div>
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

export default CreateFeatures;
