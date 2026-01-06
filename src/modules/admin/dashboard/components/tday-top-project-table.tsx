'use client';

import type { PaginationProps, TableColumnsType } from 'antd';
import { Table } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
 
import { generateQueryString } from '@/utils/Helpers';
import { useGetAllProductsQuery } from '@/api/products';

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
  viewCount: number;
};

const columns: TableColumnsType<DataType> = [
  {
    key: 'today-top-news-feature-image',
    title: 'Image',
    dataIndex: 'news-featured-image',
    render: (_, record) => {
      return (
        <Image
          src={record?.featuredImage || '/assets/misc/image-upload.svg'}
          width={60}
          height={40}
          alt={record?.title}
          priority
          className="aspect-video object-cover"
        />
      );
    },
  },
  {
    key: 'today-top-news-title',
    title: 'News Title',
    dataIndex: 'news-title',
    render: (_, record) => {
      return <p>{record?.title}</p>;
    },
  },
  {
    key: 'today-top-news-category',
    title: 'Category',
    dataIndex: 'news-category',
    render: (_, record) => {
      return record?.primCategory?.title;
    },
  },
  {
    key: 'today-top-news-reporter-name',
    title: 'Reporter',
    dataIndex: 'reporter-name',
    render: (_, record) => {
      return record.customReporterName || record.reporter === null
        ? record.initials
        : record.reporter.fullName || record.initials;
    },
  },
  {
    key: 'today-top-news-view-count',
    title: 'Views',
    dataIndex: 'news-category',
    render: (_, record) => {
      return record?.viewCount;
    },
  },
];

export function TodaysTopProjectTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const today = dayjs().format('YYYY-MM-DD');

  const todayTopNewsQueryParams = {
    page,
    limit,
    publishedAt: today,
    status: 'PUBLISHED',
    orderKey: 'viewCount',
    orderType: 'desc',
  };

  const todayTopNewsQueryString = generateQueryString(todayTopNewsQueryParams);

  const { data: todaysTopNewsPost, isFetching: isTodaysTopNewsFetching } =
    useGetAllProductsQuery(todayTopNewsQueryString);

  //  Pagination
  const todaysTopNewsPostPaginationOptions: PaginationProps = {
    size: 'small',
    style: { padding: '0 10px' },
    defaultPageSize: limit,
    current: page,
    onChange: (page) => {
      setPage(page);
    },
    onShowSizeChange: (_, showItem) => {
      setLimit(showItem);
    },

    total: todaysTopNewsPost?.totalCount,
    showTotal: (total, range) => `Showing ${range[1]} of ${total} Results`,
  };

  return (
    <div>
      <h2 className="mb-[24px] font-bold tracking-tighter">
        Today&apos;s Top News
      </h2>
      <Table
        key="todays-top-news-dashboard-table"
        rowClassName="dasboard-news-row"
        columns={columns}
        style={{ backgroundColor: 'white' }}
        dataSource={todaysTopNewsPost?.data}
        pagination={todaysTopNewsPostPaginationOptions}
        loading={isTodaysTopNewsFetching}
      />
    </div>
  );
}
