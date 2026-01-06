'use client';

import type { PaginationProps, TableColumnsType } from 'antd';
import { Table } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';

import { useGetAllProductsQuery } from '@/api/products';
import { generateQueryString } from '@/utils/Helpers';

type DataType = {
  key: React.Key;
  featuredImage: string;
  title: string;
  primCategory: {
    title: string;
  };
  customReporterName: string;
  reporter: {
    fullName: string;
  };
  initials: string;
};

const columns: TableColumnsType<DataType> = [
  {
    title: 'Image',
    dataIndex: 'project-featured-image',
    render: (_, record) => {
      return (
        <Image
          src={record?.featuredImage}
          width={60}
          height={40}
          alt={record?.title}
        />
      );
    },
  },
  {
    title: 'News Title',
    dataIndex: 'news-title',
    render: (_, record) => {
      return record?.title;
    },
  },
  {
    title: 'Category',
    dataIndex: 'news-category',
    render: (_, record) => {
      return record?.primCategory?.title;
    },
  },
  {
    title: 'Reporter',
    dataIndex: 'reporter-name',
    render: (_, record) => {
      return record.customReporterName || record.reporter === null
        ? record.initials
        : record.reporter.fullName || record.initials;
    },
  },
];

export function TodaysPublishedProductsTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const today = dayjs().format('YYYY-MM-DD');

  const todayPublishQueryParams = {
    page,
    limit,
    status: 'PUBLISHED',
    publishedAt: today,
  };

  const queryString = generateQueryString(todayPublishQueryParams);

  const { data: todaysNewsPost, isFetching: isTodaysNewsPostFetching } =
    useGetAllProductsQuery(queryString);

  //  Pagination
  const todaysNewsPostPaginationOptions: PaginationProps = {
    size: 'small',
    defaultPageSize: limit,
    style: { padding: '0 10px' },

    current: page,
    onChange: (page) => {
      setPage(page);
    },
    onShowSizeChange: (_, showItem) => {
      setLimit(showItem);
    },

    total: todaysNewsPost?.totalCount,
    showTotal: (total, range) => `Showing ${range[1]} of ${total} Results`,
  };
  return (
    <div>
      <h2 className="mb-[24px] font-bold tracking-tighter">
        Today&apos;s Published News
      </h2>
      <Table
        rowClassName="dasboard-projects-row"
        columns={columns}
        style={{ backgroundColor: 'white' }}
        dataSource={todaysNewsPost?.data}
        pagination={todaysNewsPostPaginationOptions}
        loading={isTodaysNewsPostFetching}
      />
    </div>
  );
}
