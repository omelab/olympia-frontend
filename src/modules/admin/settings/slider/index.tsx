'use client';

import React, { MouseEventHandler, useState } from 'react';
import { Settings } from '@/api/lib/definitions';
import {
  useCreateSystemSettingsMutation,
  useGetAllSystemSettingsQuery,
} from '@/api/settings';
import PageHeader from '@/modules/@common/page_header';
import { Button, Form, message, Modal, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Formik } from 'formik';
import SettingsAction from '../@components/action_column';
import { initialSystemSetting } from '../initial_value';
import { systemSettingSchema } from '../schema';
import MediaInput from '../../media/@components/media_input';

const getRandomNumber = () => {
  return Math.floor(Math.random() * (99 - 10 + 1)) + 10;
};
export const HomeSlider = () => {
  const [page, setPage] = useState(1);
  const [editVal, setEditVal] = useState(initialSystemSetting);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const handleModal = () => {
    setEditVal(initialSystemSetting);
    setIsTagModalOpen(!isTagModalOpen);
  };

  const { data, isFetching, refetch } =
    useGetAllSystemSettingsQuery('?type=slider');

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
            <img
              src={`https://olympiapaint.com/${record.value}`}
              width="150"
              height="100"
            />
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
          { title: 'Settings > Slider' },
        ]}
        title="Slider Settings"
        btnTitle="Add"
        hasModal
        handleModal={handleModal}
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
          title={<h4 className="text-center text-lg">Upload Images</h4>}
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
                key: values.key || `slider-${getRandomNumber()}`,
                value: values.value,
                type: 'slider',
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
                        <div className="flex justify-center">
                          <div className=" max-w-[200px]">
                            <MediaInput
                              onChange={(event: any) => {
                                setFieldValue('value', event?.data?.path);
                              }}
                              src={values?.value}
                              type="image"
                            />
                            {errors?.value && touched?.value ? (
                              <div className="text-base text-red-500">
                                {errors?.value}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <Button type="default" onClick={handleModal}>
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

export default HomeSlider;
