'use client';

import React, { useEffect, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { useGetAllGalleryMutation } from '@/api/gallery';
import PageHeader from '@/modules/@common/page_header';
import { generateQueryString } from '@/utils/Helpers';

import GalleryAction from '../@components/action_column/index';
import GalleryImage from '../@components/gallery_Image';

const initialValue = {
  imageUrl: '/assets/misc/image-upload.svg',
  caption: '',
  photoCredit: '',
};

const GalleryList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [singleData, setSingleData] = useState(initialValue);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [getAllGallery, { data: allGalleries, isLoading }] =
    useGetAllGalleryMutation();

  const queryParams = {
    page,
    limit,
    status: 'ACTIVE',
  };

  // Pagination
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
    total: allGalleries?.totalCount,
    showTotal: (total, range) => `Showing ${range[1]} of ${total} Results`,
  };

  const queryString = generateQueryString(queryParams);

  useEffect(() => {
    getAllGallery(queryString);
  }, [getAllGallery, queryString]);

  const loadData = () => {
    setSingleData(initialValue);
    getAllGallery(queryString);
    setIsModalOpen(false);
  };

  const updateAction = (rec: any) => {
    setSingleData(rec);
    setIsModalOpen(true);
  };

  const addNew = () => {
    setSingleData(initialValue);
    setIsModalOpen(true);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => {
        return (
          <div className="w-32">
            <Image
              src={`https://olympiapaint.com/${record.imageUrl}`}
              width={200}
              height={100}
              alt="Thumb-image"
              className="size-full object-cover"
            />
          </div>
        );
      },
    },
    {
      title: 'Caption',
      dataIndex: 'caption',
      responsive: ['md'],
      key: 'caption',
    },
    {
      title: 'Photo Credit',
      dataIndex: 'photoCredit',
      responsive: ['md'],
      key: 'photoCredit',
    },
    {
      title: 'Position Order',
      dataIndex: 'positionOrder',
      responsive: ['md'],
      key: 'positionOrder',
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
      render: (_, record) => (
        <GalleryAction
          record={record}
          updateAction={updateAction}
          loadData={loadData}
        />
      ),
    },
  ];

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Galleries' },
        ]}
        title="Galleries"
        hasModal={true}
        handleModal={addNew}
        btnTitle="Add Gallery"
      />
      <div>
        <Table
          columns={columns}
          style={{ backgroundColor: 'white' }}
          dataSource={allGalleries?.data}
          pagination={paginationOptions}
          loading={isLoading}
          rowKey={(record) => record.id} // Use a unique identifier for each row
        />
      </div>
      <div>
        <Modal
          title={
            <h3 className="flex items-center gap-2 border-b px-6 py-4">
              Add Gallery
            </h3>
          }
          open={isModalOpen}
          width="100%"
          style={{ maxWidth: 625, width: '100%', padding: 0 }}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
        >
          <div className="relative">
            <GalleryImage handleClose={loadData} singleData={singleData} />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GalleryList;
