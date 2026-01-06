'use client';

import type { PaginationProps } from 'antd';
import { Button, DatePicker, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import type { News } from '@/api/lib/definitions';
import { useGetAllNewsQuery } from '@/api/news';
import PageHeader from '@/modules/@common/page_header';
import SearchComponent from '@/modules/@common/search';
import { generateQueryString, sliceFromHtml } from '@/utils/Helpers';

import NewsAction from '../@components/action_column';

type NewsStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DRAFT'
  | 'PUBLISHED'
  | 'PENDING'
  | 'REJECTED'
  | 'COMPLETED'
  | 'ARCHIVED';

const NewsList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dateRange, setDateRange] = useState<any>([]);
  const [filtered, setFiltered] = useState<any>({ startDate: '', endDate: '' });
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [publishedAt, setPublishedAt] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrash] = useState(false);
  const [moreData] = useState<any>();

  const [status] = useState<NewsStatus[]>([
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
    keyword,
    status,
    isTrash,
    startDate: filtered.startDate,
    endDate: filtered.endDate,
    publishedAt,
    categoryId,
  };

  const resetAll = () => {
    setKeyword('');
    setPage(1);
    setLimit(10);
    setCategoryId(undefined);
    setPublishedAt(undefined);
  };
  const queryString = generateQueryString(queryParams);

  const { data: allNews, isFetching } = useGetAllNewsQuery(queryString);
  const { RangePicker } = DatePicker;

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
    total: allNews?.totalCount,
    showTotal: (total, range) => `Showing ${range[1]} of ${total} Results`,
  };

  const columns: ColumnsType<News> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '50%',
      render(_, record) {
        const description = sliceFromHtml(record.description, 20);
        return <div dangerouslySetInnerHTML={{ __html: description }} />;
      },
    },
    {
      title: 'Published Date',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
      render: (_, record) => {
        const date = dayjs(record.publishedAt).format('DD/MM/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: (_, record) => <NewsAction record={record} isTrash={isTrash} />,
    },
  ];

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/news' },
          { title: 'News' },
        ]}
        title="News"
        btnTitle="Add News"
        btnLink="/admin/news/add"
      />

      <div className="mb-4 grid grid-cols-3 items-center">
        <div className="col-span-2 mr-4 flex gap-4">
          <div>
            <Button
              onClick={resetAll}
              type="default"
              size="large"
              className="btn-grey rounded-md"
            >
              Reset
            </Button>
          </div>

          <div>
            <RangePicker
              value={dateRange}
              size="large"
              onChange={(data: any, dateString) => {
                setDateRange(data);
                setFiltered((prevState: any) => ({
                  ...prevState,
                  startDate: dateString[0],
                  endDate: dateString[1],
                }));
              }}
            />
          </div>
        </div>

        <div className="col-span-1 ml-auto">
          <SearchComponent setKeyword={setKeyword} />
        </div>
      </div>

      <div>
        <Table
          columns={columns}
          style={{ backgroundColor: 'white' }}
          dataSource={allNews?.data}
          pagination={paginationOptions}
          loading={isFetching}
        />
      </div>

      <div>
        <Modal
          title={(
            <div className="flex items-center gap-2 border-b px-6 py-4">
              <span>Category</span>
            </div>
          )}
          open={isModalOpen}
          width="100%"
          style={{ maxWidth: 625, width: '100%', padding: 0 }}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
        >
          <div className="px-6 py-4">
            <div className="flex flex-wrap gap-1.5 py-5">
              {moreData?.map((item: any, i: any) => {
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-4 rounded-full bg-[#E2EDF9] px-3 py-1 text-[#4E92DF]"
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-grey"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NewsList;
