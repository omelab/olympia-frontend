'use client';

import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd/es/table';
import React, { useState } from 'react';

import type {
  ContactDashboardListProps,
} from '@/api/contacts';
import {
  useGetAllContactsQuery,
} from '@/api/contacts';
import PageHeader from '@/modules/@common/page_header';
import SearchComponent from '@/modules/@common/search';
import { generateQueryString } from '@/utils/Helpers';

import ContactAction from '../@components/action_column';

const TagsList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const queryParams = {
    page,
    limit,
    title: keyword,
  };

  // Generating q params as ?page=1&limit=10...
  const queryString = generateQueryString(queryParams);

  const { data, isFetching } = useGetAllContactsQuery({
    queryString,
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

  const columns: TableProps<ContactDashboardListProps['data'][0]>['columns'] = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: '20%',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: '30%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      width: '10%',
      render: (_, record) => <ContactAction record={record} />,
    },
  ];

  return (
    <div className="py-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Messages' },
        ]}
        title="Contact Messages"
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

export default TagsList;
