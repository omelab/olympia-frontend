'use client';

import type { PaginationProps } from 'antd';
import { Button, DatePicker, Modal, Table, TreeSelect } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { useGetCategoryDropdownsQuery } from '@/api/category';
import type { Product } from '@/api/lib/definitions';
import { useGetAllProductsQuery } from '@/api/products';
import PageHeader from '@/modules/@common/page_header';
import SearchComponent from '@/modules/@common/search';
import { generateQueryString } from '@/utils/Helpers';

import NewsAction from '../@components/action_column';
import { treeData } from '../add-edit/utils';

type ProductStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DRAFT'
  | 'PUBLISHED'
  | 'PENDING'
  | 'REJECTED'
  | 'COMPLETED'
  | 'ARCHIVED';

const ProductList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dateRange, setDateRange] = useState<any>([]);
  const [filtered, setFiltered] = useState<any>({ startDate: '', endDate: '' });
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [publishedAt, setPublishedAt] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrash] = useState(false);
  const [moreData, setMoreData] = useState<any>();

  const [status] = useState<ProductStatus[]>([
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
  const { data: categories, isLoading } = useGetCategoryDropdownsQuery('');

  const { data: allProducts, isFetching } = useGetAllProductsQuery(queryString);
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
    total: allProducts?.totalCount,
    showTotal: (total, range) => `Showing ${range[1]} of ${total} Results`,
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Title',
      dataIndex: 'title',
      responsive: ['md'],
      key: 'product-title',
    },
    {
      title: 'Category',
      dataIndex: 'category-title',
      key: 'category-title',
      render: (_, record) => {
        return <div>{record?.category?.title}</div>;
      },
    },

    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_, record) => {
        return (
          <div className="flex items-center gap-1">
            {record?.tags?.length > 0 &&
              record?.tags?.slice(0, 2).map((item: any, index: number) => (
                <div className="inline-flex items-center gap-1.5" key={index}>
                  <div
                    className="inline-flex items-center gap-4 rounded-full bg-[#E2EDF9] px-3 py-1 text-[#4E92DF] "
                    key={index}
                  >
                    {item?.title}
                  </div>
                  <span></span>
                </div>
              ))}
            {record?.tags?.length > 2 && (
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setMoreData(record?.tags);
                }}
              >
                More...
              </button>
            )}
          </div>
        );
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
      title: 'status',
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
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Products' },
        ]}
        title="Products"
        btnTitle="Add Product"
        btnLink="/admin/products/add"
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
          <div>
            <TreeSelect
              loading={isLoading}
              size="large"
              style={{ width: '200px' }}
              treeData={treeData(categories)}
              placeholder="Select Category"
              treeNodeFilterProp="title"
              treeDefaultExpandAll
              showSearch
              onChange={(value: any) => {
                setCategoryId(value);
              }}
              value={categoryId}
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
          dataSource={allProducts?.data}
          pagination={paginationOptions}
          loading={isFetching}
        />
      </div>

      <div>
        <Modal
          title={
            <div className="flex items-center gap-2 border-b px-6 py-4">
              <span>Category</span>
            </div>
          }
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
                type="button"
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

export default ProductList;
