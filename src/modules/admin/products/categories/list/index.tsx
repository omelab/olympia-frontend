'use client';

import type { PaginationProps } from 'antd';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

import { useGetAllCategoriesQuery } from '@/api/category';
import type { Category } from '@/api/lib/definitions';
import PageHeader from '@/modules/@common/page_header';
import SearchComponent from '@/modules/@common/search';
import { generateQueryString } from '@/utils/Helpers';

import CategoryAction from '../@components/action_column';

type CategoryStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DRAFT'
  | 'PUBLISHED'
  | 'PENDING'
  | 'REJECTED'
  | 'COMPLETED'
  | 'ARCHIVED';

const CategoriesList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [moreKeyword] = useState<string[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrash] = useState(false);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const [status] = useState<CategoryStatus[]>([
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

  const queryString = generateQueryString(queryParams);

  const { data, isFetching } = useGetAllCategoriesQuery(queryString);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //  Pagination
  const paginationOptions: PaginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: limit,
    current: page,
    style: { padding: '0 10px' },
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

  const columns: ColumnsType<Category> = [
    {
      title: 'Name',
      dataIndex: 'category-name',
      key: 'category-name',
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
      dataIndex: 'category-description',
      key: 'category-description',
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
      dataIndex: 'category-slug',
      key: 'category-slug',
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
      title: 'Project Count',
      dataIndex: 'project-count',
      key: 'project-count',
      width: '10%',
      render: (_, record) => {
        return (
          <div className="flex flex-wrap">
            <p className="mb-0 text-[14px]">{record._count.project}</p>
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
      render: (_, record) => (
        <CategoryAction
          handleModal={handleCategoryModal}
          isTrash={isTrash}
          record={record}
        />
      ),
    },
  ];

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Categories' },
        ]}
        title="Category List"
        btnTitle="Add Category"
        btnLink="/admin/categories/add"
        setKeyword={setKeyword}
      />

      <div className="mb-4 grid grid-cols-2 items-center">
        <div className="col-end-2 items-center lg:col-end-4">
          <SearchComponent setKeyword={setKeyword} />
        </div>
      </div>

      <div>
        <Table
          rowKey="id"
          columns={columns}
          style={{ backgroundColor: 'white' }}
          dataSource={data?.data}
          pagination={paginationOptions}
          loading={isFetching}
        />
      </div>

      <div>
        <Modal
          title={(
            <div className="flex items-center gap-2 border-b px-6 py-4">
              <span>Search Keyword</span>
            </div>
          )}
          open={isModalOpen}
          width="100%"
          style={{ maxWidth: 625, width: '100%', padding: 0 }}
          onCancel={handleCancel}
          footer={false}
        >
          <div className="px-6 py-4">
            <div className="flex flex-wrap gap-1.5 py-5">
              {moreKeyword?.map((item: any, i: any) => {
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-4 rounded-full bg-[#E2EDF9] px-3 py-1 text-[#4E92DF]"
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" className="btn btn-grey" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoriesList;
