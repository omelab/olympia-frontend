'use client';

import { message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import {
  useDeleterolesMutation,
  useGetAllrolesQuery,
} from '@/api/role/role_api';
import PageHeader from '@/modules/@common/page_header';

import RoleCreate from './create';
import RoleEdit from './edit';

type DataType = {
  key: React.Key;
  id: number;
  name: string;
  description: string;
};

const UserRole = () => {
  const [editMode, setEditMode] = useState(false);
  const [rolId, setRoleId] = useState<number | null>(null);
  const { data, isFetching } = useGetAllrolesQuery({});

  const [deletId] = useDeleterolesMutation();
  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id,
      });
      if (!res?.error) {
        message.success('Role delete successfully.');
      } else {
        message.error(res?.error?.data?.message);
      }
    } catch {}
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 20,
      render: (_, record) => <span>{record?.id}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <span>{record?.name}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'role-description',
      key: 'role-description',
      render: (_, record) => <span>{record?.description}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'right' as const,
      render: (_, record) => {
        return (
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => {
                setEditMode(true);
                setRoleId(record.id);
              }}
            >
              <FiEdit className="text-base" />
            </button>

            <Popconfirm
              placement="top"
              title={<span>Are you sure to delete this task?</span>}
              description=" "
              onConfirm={() => confirm(record?.id)}
              okText="Yes"
              cancelText="No"
            >
              <button>
                <FiTrash2 className="text-base" />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Roles' },
        ]}
        title="Roles Management"
      />

      <div className="list_container ">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[600px_1fr]">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={isFetching}
          />

          <div className="">
            {!editMode
              ? (
                  <RoleCreate />
                )
              : (
                  <RoleEdit setEditMode={setEditMode} rolId={rolId} />
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRole;
