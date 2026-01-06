'use client';

import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

import { useGetAllFeaturesQuery } from '@/api/features/features_api';
import PageHeader from '@/modules/@common/page_header';
import { generateQueryString } from '@/utils/Helpers';

import FeaturesAction from '../@components/action_column';

type DataType = {
  id: string;
  title: string;
  createdAt: any;
  roles: string;
  email: string;
  userType: string;
  action: ReactNode;
  picture: string;
  name: string;
};

const FeaturesList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [, setIds] = useState([]);
  const [moreKeyword] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrash, setIsTrash] = useState<any>(false);

  const queryParams = {
    page,
    limit,
    keyword,
    status: 'ACTIVE',
    isTrash,
  };
  const queryString = generateQueryString(queryParams);
  const { data, isFetching } = useGetAllFeaturesQuery({
    queryString,
    isTrash,
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //  Pagination
  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: limit,
    current: page,
    onChange: (page: any) => {
      setPage(page);
    },
    onShowSizeChange: (_: any, showItem: any) => {
      setLimit(showItem);
    },
    pageSizeOptions: [10, 20, 30, 50],
    total: data?.meta?.total,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => {
        return (
          <div className="flex flex-wrap gap-2">
            <p className="mb-0 text-[14px]">{record?.id}</p>
          </div>
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return (
          <div className="flex flex-wrap gap-2">
            <p className="mb-0 text-[14px]">{record?.title}</p>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <FeaturesAction isTrash={isTrash} record={record} />
      ),
    },
  ];

  return (
    <div className="">
      <PageHeader
        breadcrumbsData={[
          { title: 'Admin', link: '/admin' },
          { title: 'All Features' },
        ]}
        title="Features"
        btnTitle="Add Features"
        btnLink="/admin/features/addFeatures"
        setKeyword={setKeyword}
      />

      <div className="my-4 flex items-center justify-between gap-[10px]">
        <div className="flex gap-3">
          <button
            onClick={() => {
              setIsTrash(false);
              setIds([]);
              setPage(1);
            }}
            type="button"
            className={`btn ${
              !isTrash ? 'btn-secondary' : 'btn-white-outline'
            }`}
          >
            All
          </button>
        </div>

        <div className="flex items-center gap-3" />
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={data}
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

export default FeaturesList;
