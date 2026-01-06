'use client';

import type { PaginationProps } from 'antd';
import { Table } from 'antd';
import type { TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import type {
  CommentsDashboardProps,
} from '@/api/comment/comment_api';
import {
  useGetAllCommentQuery,
} from '@/api/comment/comment_api';
import PageHeader from '@/modules/@common/page_header';
import SearchComponent from '@/modules/@common/search';
import { generateQueryString } from '@/utils/Helpers';

import CommentAction from '../@components/action_column';

type CommentStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DRAFT'
  | 'PUBLISHED'
  | 'PENDING'
  | 'REJECTED'
  | 'COMPLETED'
  | 'ARCHIVED';

const CommentList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status] = useState<CommentStatus[]>([
    'ACTIVE',
    'INACTIVE',
    'DRAFT',
    'PUBLISHED',
    'PENDING',
    'REJECTED',
    'COMPLETED',
    'ARCHIVED',
  ]);
  const [isTrash] = useState(false);

  const queryParams = {
    page,
    limit,
    keyword,
    isTrash,
    status,
  };

  const queryString = generateQueryString(queryParams);
  const { data, isFetching } = useGetAllCommentQuery(queryString);

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

  const columns: TableProps<CommentsDashboardProps['data'][0]>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'news-featured-image',
      key: 'news-featured-image',
      render: (_, record) => {
        return (
          <div className="shrink-0">
            <Image
              src={
                !record.news?.featuredImage
                || record.news?.featuredImage === 'string'
                  ? '/images/misc/placeholder-image.webp'
                  : `${record.news?.featuredImage}`
              }
              alt="profile imgae"
              height={50}
              width={50}
              className=" object-cover duration-300 hover:scale-110"
            />
          </div>
        );
      },
    },
    {
      title: 'News Title',
      dataIndex: 'news-title',
      key: 'news-title',
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <div>
              <Link target="_blank" href={`/${record.news?.slug}`}>
                {record.news?.title}
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      render: (_, record) => {
        return (
          <div className="flex items-center">
            {record?.guestName || record?.createdBy?.fullName}
          </div>
        );
      },
    },
    {
      title: 'Comments',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => <span>ACTIVE</span>,
    },
    {
      title: 'Published',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => dayjs(createdAt).format('DD MMM, YYYY'),
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <CommentAction isTrash={isTrash} record={record} />
      ),
    },
  ];

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Comments' },
        ]}
        title="All Comments"
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
    </div>
  );
};

export default CommentList;
