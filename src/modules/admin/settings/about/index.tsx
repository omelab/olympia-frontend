'use client';

import React, { MouseEventHandler, useState } from 'react';
import { Settings } from '@/api/lib/definitions';
import {
  useCreateSystemSettingsMutation,
  useGetAllSystemSettingsQuery,
} from '@/api/settings';
import PageHeader from '@/modules/@common/page_header';
import { Button, Form, message, Modal, Select, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Field, Formik } from 'formik';

import SettingsAction from '../@components/action_column';
import { initialSystemSetting } from '../initial_value';
import { systemSettingSchema } from '../schema';
import { aboutListKeys } from './about-list-keys';
import CustomSunEditor from '@/components/editor/CustomEditor';

export const AboutList = () => {
  const [page, setPage] = useState(1);
  const [editVal, setEditVal] = useState();
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const handleContactModal = () => {
    setIsTagModalOpen(!isTagModalOpen);
  };

  const { data, isFetching, refetch } =
    useGetAllSystemSettingsQuery('?type=about');

  //  Pagination
  const paginationOptions: TablePaginationConfig = {
    style: { padding: '0 10px' },
    current: page,
    onChange: (page) => {
      setPage(page);
    },
    total: data?.length,
    showTotal: (total, range) => `Showing ${range[1]} of ${total} Results`,
  };

  const columns: ColumnsType<Settings> = [
    {
      title: 'key',
      dataIndex: 'key',
      key: 'key',
      width: '20%',
      render: (_, record) => {
        return (
          <>
            {record.key
              .split('-')
              .map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase())
              .join(' ')}
          </>
        );
      },
    },
    {
      title: 'value',
      dataIndex: 'value',
      key: 'value',
      render: (_, record) => {
        return (
          <>
            {record.value.length > 100
              ? record.value.slice(0, 50) + '...'
              : record.value}
          </>
        );
      },
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      width: '10%',
      render: (_, record) => (
        <SettingsAction record={record} handleEdit={editHandler} />
      ),
    },
  ];

  const [create, { isLoading }] = useCreateSystemSettingsMutation();

  const createHandler = async (
    values: Pick<Settings, 'key' | 'value' | 'type'>,
  ) => {
    const data = {
      settings: [values],
    };

    try {
      const res: any = await create(data);

      if (!res?.error) {
        message.success(`Added Successfully!`);
        setIsTagModalOpen(false);
        refetch();
      } else {
        message.error(res?.error?.data?.message);
      }
    } catch (e) {}
  };

  const editHandler = (record: any) => {
    setIsTagModalOpen(true);
    setEditVal(record);
  };

  return (
    <div className="py-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Settings > About' },
        ]}
        title="About"
        btnTitle="Add About"
        hasModal
        handleModal={handleContactModal}
      />

      <div>
        <Table
          rowKey="id"
          style={{ backgroundColor: 'white' }}
          columns={columns}
          dataSource={data}
          pagination={paginationOptions}
          loading={isFetching}
        />
      </div>

      <div>
        <Modal
          title={<h4 className="text-center text-lg">Add About Data</h4>}
          centered
          open={isTagModalOpen}
          onCancel={() => setIsTagModalOpen(!isTagModalOpen)}
          width={825}
          destroyOnClose
          footer={false}
        >
          <Formik
            initialValues={editVal ?? initialSystemSetting}
            enableReinitialize
            validationSchema={systemSettingSchema}
            onSubmit={(values) => {
              const data = {
                key: values.key,
                value: values.value,
                type: 'about',
              };
              createHandler(data);
            }}
          >
            {({ values, touched, errors, handleSubmit, setFieldValue }) => (
              <Form>
                <div className="mt-5 grid gap-5">
                  <div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                      <div className="col-span-1">
                        <label
                          htmlFor="key"
                          className="text-base font-semibold text-gray-600"
                        >
                          Select <span className="text-red-500">*</span>
                        </label>
                        <div>
                          <Select
                            options={aboutListKeys}
                            size="large"
                            placeholder="Select a key"
                            optionFilterProp="label"
                            className="w-full"
                            onChange={(value: string) => {
                              setFieldValue('key', value);
                            }}
                            value={values.key}
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <label
                          htmlFor="value"
                          className="text-base font-semibold text-gray-600"
                        >
                          Value
                        </label>
                        <div>
                          {values.key == 'homepage_message' && (
                            <>
                              <CustomSunEditor
                                name="value"
                                values={values}
                                setFieldValue={setFieldValue}
                              />

                              {errors?.value && touched?.value ? (
                                <div className="text-base text-red-500">
                                  {errors?.value}
                                </div>
                              ) : null}
                            </>
                          )}
                          {values.key != 'homepage_message' && (
                            <Field
                              type="text"
                              name="value"
                              id="value"
                              placeholder="Type here"
                              as="textarea"
                              className="w-full rounded border px-2 py-3 text-base focus:border-blue-200 focus:outline-none"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <Button type="default" onClick={handleContactModal}>
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          disabled={isLoading}
                          onClick={
                            handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>
                          }
                        >
                          {editVal ? 'Update' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  );
};

export default AboutList;
