'use client';

import { Button, Form, message, Modal, Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FormikValues } from 'formik';
import { ErrorMessage, Field, Formik } from 'formik';
import type { MouseEventHandler } from 'react';
import React, { useState } from 'react';

import type {
  TopicDashboardListProps,
} from '@/api/tag/tag_api';
import {
  useCreateTagMutation,
  useGetAllTagQuery,
} from '@/api/tag/tag_api';
import PageHeader from '@/modules/@common/page_header';
import SearchComponent from '@/modules/@common/search';
import { generateQueryString } from '@/utils/Helpers';

import TagsAction from '../@components/action_column';
import { initialTagDes } from './initial_value';
import { tagSchema } from './schema';

type TagStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DRAFT'
  | 'PUBLISHED'
  | 'PENDING'
  | 'REJECTED'
  | 'COMPLETED'
  | 'ARCHIVED';

const TagsList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isTrash] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const handleTagModal = () => {
    setIsTagModalOpen(!isTagModalOpen);
  };

  const [status] = useState<TagStatus[]>([
    'ACTIVE',
    'INACTIVE',
    'DRAFT',
    'PUBLISHED',
    'PENDING',
    'REJECTED',
    'COMPLETED',
    'ARCHIVED',
  ]);

  const queryParams = {
    page,
    limit,
    title: keyword,
    status,
    isTrash,
  };

  // Generating q params as ?page=1&limit=10...
  const queryString = generateQueryString(queryParams);

  const { data, isFetching, refetch } = useGetAllTagQuery({
    queryString,
    isTrash,
  });

  //  Pagination
  const paginationOptions: TablePaginationConfig = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: limit,
    style: { padding: '0 10px' },
    current: page,
    onChange: (page) => {
      setPage(page);
    },
    onShowSizeChange: (_, showItem) => {
      setLimit(showItem);
    },
    pageSizeOptions: [10, 20, 30, 50],
    total: data?.totalCount,
    showTotal: (total, range) => `Showing ${range[1]} of ${total} Results`,
  };

  const columns: TableProps<TopicDashboardListProps['data'][0]>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'tag-name',
      key: 'tag-name',
      width: '20%',
      render: (_, record) => {
        return (
          <div className="flex flex-wrap">
            <p className="mb-0 text-[14px]">{record.title}</p>
          </div>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'tag-description',
      key: 'tag-description',
      width: '40%',
      render: (_, record) => {
        return (
          <div className="flex flex-wrap">
            <p className="mb-0 text-[14px]">{record.content}</p>
          </div>
        );
      },
    },
    {
      title: 'Slug',
      dataIndex: 'tag-slug',
      key: 'tag-slug',
      width: '20%',
      render: (_, record) => {
        return (
          <div className="inline-flex cursor-pointer items-center gap-8">
            {record?.slug}
          </div>
        );
      },
    },
    {
      title: 'News Count',
      dataIndex: 'news-count',
      key: 'news-count',
      width: '10%',
      render: (_, record) => {
        return (
          <div className="flex flex-wrap">
            <p className="mb-0 text-[14px]">{record._count.news}</p>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      width: '10%',
      render: (_, record) => <TagsAction isTrash={isTrash} record={record} />,
    },
  ];

  const [create, { isLoading }] = useCreateTagMutation();

  const createHandler = async (values: FormikValues) => {
    const data = {
      title: values?.name,
      slug: values?.slug,
      content: values?.content,
      featuredImage: values?.featuredImage,
      status: 'ACTIVE',
      searchKeyword: values?.searchKeywords,
      metaTitle: values?.metaTitle,
      metaKeyword: values?.metaKeyword,
      metaDescription: values?.metaDescription,
    };

    try {
      const res: any = await create(data);

      if (!res?.error) {
        message.success(`Tag Created Successfully!`);
        setIsTagModalOpen(false);
        refetch();
      } else {
        message.error(res?.error?.data?.message);
      }
    } catch {}
  };

  return (
    <div className="py-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Tags' },
        ]}
        title="Tags"
        btnTitle="Add Tags"
        setKeyword={setKeyword}
        hasModal
        handleModal={handleTagModal}
      />

      <div className="mb-4 grid grid-cols-2 items-center">
        <div className="col-end-2 items-center lg:col-end-4">
          <SearchComponent setKeyword={setKeyword} />
        </div>
      </div>

      <div>
        <Table
          rowKey="id"
          style={{ backgroundColor: 'white' }}
          columns={columns}
          dataSource={data?.data}
          pagination={paginationOptions}
          loading={isFetching}
        />
      </div>

      <div>
        <Modal
          title={<h4 className="text-lg uppercase">Add New Tag</h4>}
          centered
          open={isTagModalOpen}
          onCancel={() => setIsTagModalOpen(!isTagModalOpen)}
          width={825}
          styles={{
            body: {
              fontSize: '1.5rem',
            },
          }}
          destroyOnClose
          footer={false}
        >
          <Formik
            initialValues={initialTagDes}
            enableReinitialize
            validationSchema={tagSchema}
            onSubmit={(values) => {
              createHandler(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form>
                <div className="mt-5 grid gap-5">
                  <div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                      <div className="col-span-1">
                        <label
                          htmlFor="name"
                          className="text-base font-semibold text-gray-600"
                        >
                          Name
                          {' '}
                          <span className="text-danger">*</span>
                        </label>
                        <div>
                          <Field
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Add name"
                            className="w-full rounded border px-3 py-2 text-base focus:border-blue-200 focus:outline-none"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error mt-1 text-xs text-red-500"
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <label
                          htmlFor="slug"
                          className="text-base font-semibold text-gray-600"
                        >
                          Slug
                        </label>
                        <div>
                          <Field
                            type="text"
                            name="slug"
                            id="slug"
                            placeholder="Enter slug"
                            className="w-full rounded border px-3 py-2 text-base focus:border-blue-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <label
                          htmlFor="content"
                          className="text-base font-semibold text-gray-600"
                        >
                          Description
                        </label>
                        <div>
                          <Field
                            type="text"
                            name="content"
                            id="content"
                            placeholder="Type here"
                            as="textarea"
                            className="w-full rounded border px-2 py-3 text-base focus:border-blue-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={handleTagModal}
                          className="w-max rounded-md bg-[#E5E7EB] px-4 py-2 text-base font-medium uppercase text-slate-900"
                        >
                          Cancel
                        </button>
                        <Button
                          className="btn btn-primary rounded-md px-4 py-2 text-base font-medium uppercase"
                          type="primary"
                          disabled={isLoading}
                          onClick={
                            handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>
                          }
                        >
                          Add Tag
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

export default TagsList;
