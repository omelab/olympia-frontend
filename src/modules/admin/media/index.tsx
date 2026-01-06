'use client';

import './media.css';

import { Button, Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FiFile } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

import { useGetMediasQuery } from '@/api/media/media_api';
import { mediaFolderParentInfo } from '@/api/media/media_slice';
import PageHeader from '@/modules/@common/page_header';
import { cn, formatBytes, generateQueryString } from '@/utils/Helpers';

import MediaActionView from './@components/action_view';
import MediaActionsDropdown from './@components/actions_dropdown';
import MediaAdd from './@components/add_new';
import CreateFolder from './@components/create_folder';
import MediaFilter from './@components/filter';
import MediaFolders from './@components/folders';

const BASE_URL = 'https://olympiapaint.com';

const MediaList = ({ isMediaInput, setMediaData, type }: any) => {
  const selectedFolder = useSelector((state: any) => state.mediaSlice);
  const dispatch = useDispatch();

  const [alignment, setAlignment] = useState(isMediaInput ? 'grid' : 'list'); // grid, list
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(alignment === 'grid' ? 40 : 12);
  const [open, setOpen] = useState(false);

  const [filtered, setFiltered] = useState<any>({
    page,
    limit,
    directoryId: selectedFolder?.parent_id,
    title: '',
    startDate: '',
    endDate: '',
    category: '',
    type: type || null,
  });

  const queryString = generateQueryString(filtered);
  const { data, isFetching } = useGetMediasQuery(queryString);
  const dataMedia = data?.data;

  useEffect(() => {
    setFiltered((prevFiltered: any) => ({
      ...prevFiltered,
      page,
      limit,
      directoryId: selectedFolder?.parent_id,
    }));
  }, [page, limit, selectedFolder?.parent_id]);

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
    total: data?.totalCount,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    ...(isMediaInput && { type: 'radio' }),
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<any> = [
    {
      title: 'File',
      dataIndex: 'name',
      render: (_, record) => {
        let content;
        if (record?.type === 'image') {
          content = (
            <img
              src={`${BASE_URL}${record.path}`}
              className="size-full object-contain"
              height={60}
              width={60}
              alt={record.title}
              loading="eager"
            />
          );
        } else if (record?.type === 'application') {
          content = (
            <img
              src="/images/misc/pdf-icon.png"
              className="size-full object-contain"
              height={60}
              width={60}
              alt={record.title}
              loading="eager"
            />
          );
        } else if (record?.type === 'video') {
          content = <ReactPlayer url={`${BASE_URL}${record?.path}`} />;
        }
        return (
          <div className="flex size-[60px] items-center justify-center">
            {content}
          </div>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: 'Alt',
      dataIndex: 'alt',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Size',
      dataIndex: 'fileSize',
      render: (_, record) => {
        return <span>{formatBytes(record?.fileSize)}</span>;
      },
    },
    {
      title: 'Last Updated',
      render: (record) => {
        return (
          <span className="">{moment(record.updatedAt).format('LL')}</span>
        );
      },
    },
    {
      title: 'Actions',
      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-3 text-lg">
            <MediaActionView data={record} />
            <MediaActionsDropdown record={record} />
          </div>
        );
      },
    },
  ];

  const columnsGrid: ColumnsType<any> = [
    {
      title: 'Image',
      dataIndex: 'name',
      render: (_, record) => {
        let content;
        if (record?.type === 'image') {
          content = (
            <img
              src={`${BASE_URL}${record.path}`}
              className="size-full object-contain"
              alt={record.title}
              height={60}
              width={60}
              loading="eager"
            />
          );
        } else if (record?.type === 'application') {
          content = (
            <img
              src="/images/misc/pdf-icon.png"
              className="size-full object-contain"
              alt={record.title}
              height={60}
              width={60}
              loading="eager"
            />
          );
        } else if (record?.type === 'video') {
          content = (
            <div>
              <ReactPlayer width="auto" height="auto" url={record?.path} />
            </div>
          );
        } else {
          content = <></>;
        }
        return (
          <div className="bg-greylight group relative flex h-[100px] w-full cursor-pointer flex-col items-center justify-center rounded-lg">
            <div className="absolute left-[50%] top-[50%] z-[1000] hidden -translate-x-[50%] -translate-y-[50%] cursor-default items-center justify-center gap-3 rounded-md bg-white py-2 pl-4 pr-3 text-lg drop-shadow-lg group-hover:flex">
              <MediaActionView data={record} />
              <MediaActionsDropdown record={record} />
            </div>
            {content}
          </div>
        );
      },
    },
  ];

  // for media insert only
  const handleRowClick = (record: any) => {
    if (setMediaData) {
      setMediaData(record);
    }
    setSelectedRowKeys([record?.id]);
  };
  const rowEventHandlers = (record: any) => {
    return {
      onClick: () => handleRowClick(record), // Call your custom row click handler
    };
  };

  return (
    <div className="pt-4">
      <PageHeader
        title="Media Library"
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Media Library' },
        ]}
      />
      <div
        className={cn(
          `grid grid-cols-[330px_1fr] gap-5`,
          isMediaInput ? '' : 'mt-5',
        )}
      >
        {/* left side */}
        <div className="">
          <Dropdown
            // placement="top"
            open={open}
            trigger={['click']}
            onOpenChange={() => setOpen(!open)}
            dropdownRender={() => (
              <div className="rounded-md bg-white py-2 drop-shadow-xl">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div onClick={() => setOpen(false)}>
                  <CreateFolder setFiltered={setFiltered} />
                </div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div onClick={() => setOpen(false)}>
                  <MediaAdd>
                    <button
                      type="button"
                      className="hover:bg-greylight flex w-full items-center gap-2 px-7 py-1.5 text-sm hover:text-inherit"
                    >
                      <FiFile />
                      <span>File Upload</span>
                    </button>
                  </MediaAdd>
                </div>
              </div>
            )}
          >
            <Button type="primary" className="btn btn-secondary w-full">
              Add Files
            </Button>
          </Dropdown>

          {/* tree */}
          <div className="pb-4">
            <div className="mt-1">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                onClick={() => {
                  dispatch(
                    mediaFolderParentInfo({
                      parent_id: '',
                    }),
                  );
                  setFiltered((prev: any) => ({ ...prev, directoryId: '' }));
                }}
                className={`cursor-pointer py-1 pl-3 text-sm ${
                  selectedFolder?.parent_id ? '' : 'bg-[#0b3a5d] text-white'
                }`}
              >
                All
              </div>
            </div>
            <MediaFolders setFiltered={setFiltered} />
          </div>
        </div>

        {/* right side */}
        <div className="">
          <MediaFilter
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            filtered={filtered}
            setFiltered={setFiltered}
            alignment={alignment}
            setAlignment={setAlignment}
            isMediaInput={isMediaInput}
            type={type}
          />
          <div>
            <div className="mb-3 font-medium">
              {selectedFolder.parent_id ? selectedFolder?.title : 'All'}
            </div>
            <Table
              rowKey="id"
              rowSelection={isMediaInput ? rowSelection : null}
              dataSource={dataMedia}
              columns={alignment === 'grid' ? columnsGrid : columns}
              className={`table_media ${
                alignment === 'grid' ? 'table_media_grid' : ''
              }`}
              loading={isFetching}
              pagination={paginationOptions}
              onRow={rowEventHandlers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaList;
