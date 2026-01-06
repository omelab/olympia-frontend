'use client';

import type { PaginationProps } from 'antd';
import { Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

import { useGetAllAdminQuery } from '@/api/admin/admin_api';
import { useCountService } from '@/hooks/useCountService';
import PageHeader from '@/modules/@common/page_header';
import SearchComponent from '@/modules/@common/search';
import { generateQueryString } from '@/utils/Helpers';

import AdminAction from '../@components/action_column';

type DataType = {
  key: React.Key;
  id: string;
  username: string;
  fullName: any;
  roles: any;
  profile: any;
  email: string;
  action: ReactNode;
  picture: string;
  status: string;
};

const AdminList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [, setIds] = useState<number[]>([]);
  const [isTrash, setIsTrash] = useState(false);

  const queryParams = {
    page,
    limit,
    keyword,
    isTrash,
  };
  const queryString = generateQueryString(queryParams);
  const { data, isFetching } = useGetAllAdminQuery(queryString);

  //  Pagination
  const paginationOptions: PaginationProps = {
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'admin-id',
      key: 'admin-id',
      render: (_, record) => {
        return <div>{record.id}</div>;
      },
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <div className="shrink-0">
              <Image
                src={
                  record?.profile?.picture
                  && record?.profile?.picture !== 'null'
                    ? record?.profile?.picture
                    : '/images/misc/avatar-lg.png'
                }
                alt="Featured"
                width={50}
                height={50}
                className="size-12 rounded-sm object-cover"
              />
            </div>
            <div className="ml-2">
              <p className="line-clamp-1">{record.username}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact Number',
      dataIndex: 'mobile-number',
      key: 'mobile-number',
      render: (_, record) => {
        return <div>{record.profile?.mobile}</div>;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (_, record) => (
        <span>
          {record.roles && record.roles.length > 0
            ? (
                record.roles.map(
                  (role: {
                    id: React.Key | null | undefined;
                    name: string | undefined;
                  }) => (
                    <p className="uppercase" key={role.name}>
                      {role.name}
                    </p>
                  ),
                )
              )
            : (
                <p className="uppercase">Role Not Specified</p>
              )}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'admin-status',
      key: 'admin-status',
      render: (_, record) => {
        return (
          <div className="space-x-2">
            {/* This is now static */}
            <label htmlFor="subscriber-status">
              {record.status === 'ACTIVE' ? 'Active' : 'Inactive'}
            </label>
            <Switch
              size="small"
              checked={record.status === 'ACTIVE'}
              className="bg-[#d2d6e2]"
            />
          </div>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: (_, record) => <AdminAction isTrash={isTrash} record={record} />,
    },
  ];

  const { all, trash } = useCountService('admin');

  return (
    <div className="mt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Admin' },
        ]}
        title="Admin List"
        btnTitle="Add New"
        btnLink="/admin/create-admin"
        setKeyword={setKeyword}
      />

      <div className="mb-4 grid grid-cols-2 items-center">
        <div className=" font-medium text-indigo-500">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <span
            className="cursor-pointer"
            onClick={() => {
              setIsTrash(false);
              setIds([]);
              setPage(1);
            }}
          >
            All (
            {all}
            )
          </span>

          {' | '}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <span
            className="cursor-pointer"
            onClick={() => {
              setIsTrash(true);
              setIds([]);
              setPage(1);
            }}
          >
            Trash (
            {trash}
            )
          </span>
        </div>

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
    </div>
  );
};

export default AdminList;
