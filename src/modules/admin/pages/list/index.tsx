'use client';

import React, { useState } from 'react';
import { Page } from '@/api/lib/definitions';
import { useGetAllPagesQuery } from '@/api/pages';
import PageHeader from '@/modules/@common/page_header';
import SearchComponent from '@/modules/@common/search';
import { PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import PageAction from '../@components/action_column';
import { generateQueryString } from '@/utils/Helpers';

const PagesList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isPageModalOpen, setIsPageModalOpen] = useState(false);

  const handlePageModal = () => {
    setIsPageModalOpen(!isPageModalOpen);
  };

  const queryParams = {
    page,
    limit,
    title: keyword,
    status: ['ACTIVE'],
  };

  const queryString = generateQueryString(queryParams);

  const { data, isFetching } = useGetAllPagesQuery(queryString);

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

  const columns: ColumnsType<Page> = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    },
    {
      title: 'Slug',
      dataIndex: 'page-slug',
      key: 'page-slug',
      width: '20%',
      render: (_, record) => {
        return (
          <div className="inline-flex cursor-pointer items-center gap-8">
            {`/${record?.slug}`}
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
        <PageAction
          handleModal={handlePageModal}
          isTrash={false}
          record={record}
        />
      ),
    },
  ];

  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: Page[]) => {
  //     const getId: any = selectedRows?.map((item) => item.id);
  //     setIds(getId);
  //   },
  // };

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Pages' },
        ]}
        title="Pages List"
        btnTitle="Add Page"
        btnLink={'/admin/pages/add'}
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

export default PagesList;
