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
import { Field, Formik } from 'formik';

import SettingsAction from '../@components/action_column';
import { initialSystemSetting } from '../initial_value';
import { systemSettingSchema } from '../schema';

const VideoList = () => {
  const [page, setPage] = useState(1);
  const [editVal, setEditVal] = useState();
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const handleVideosModal = () => {
    setIsTagModalOpen(!isTagModalOpen);
  };

  const { data, isFetching, refetch } =
    useGetAllSystemSettingsQuery('?type=Videos');

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
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'URL',
      dataIndex: 'value',
      key: 'value',
      render: (_, record) => record.value,
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
          { title: 'Settings > Videos' },
        ]}
        title="Videos"
        btnTitle="Add Video"
        hasModal
        handleModal={handleVideosModal}
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
          title={<h4 className="text-center text-lg">Add Video Data</h4>}
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
              try {
                if (values.key) {
                  const data = {
                    key: values.key,
                    value: values.value.trim(),
                    type: 'Videos',
                  };
                  createHandler(data);
                } else {
                  const trimmedValue = values.value.trim();
                  const url = new URL(trimmedValue);
                  let key;

                  if (url.searchParams.has('v')) {
                    // Standard YouTube URL
                    key = url.searchParams.get('v');
                  } else if (
                    url.hostname === 'youtu.be' &&
                    url.pathname.length > 1
                  ) {
                    // Shortened YouTube URL
                    key = url.pathname.substring(1);
                  }

                  if (key) {
                    const data = { key, value: trimmedValue, type: 'Videos' };
                    createHandler(data);
                  } else {
                    throw new Error('Invalid link');
                  }
                }
              } catch (error) {
                message.error('Something wrong with the link');
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form>
                <div className="mt-5 grid gap-5">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                    <div className="col-span-1">
                      <label
                        htmlFor="value"
                        className="text-base font-semibold text-gray-600"
                      >
                        Youtube Video URL
                      </label>
                      <div className="mt-2">
                        <Field
                          type="text"
                          name="value"
                          id="value"
                          placeholder="Video Link"
                          className="w-full rounded border px-2 py-3 text-base focus:border-blue-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button type="default" onClick={handleVideosModal}>
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
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  );
};

export default VideoList;
