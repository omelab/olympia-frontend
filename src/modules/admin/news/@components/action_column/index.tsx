import { message, Popconfirm, Tooltip } from 'antd';
import Link from 'next/link';
import { FiEdit, FiExternalLink, FiTrash2 } from 'react-icons/fi';
import { TbReload } from 'react-icons/tb';

import { useDeleteNewsMutation, useRestoreNewsMutation } from '@/api/news';

const NewsAction = ({ record, isTrash }: any) => {
  const [restoreId] = useRestoreNewsMutation();

  const retoreHandler = async (id: any) => {
    try {
      const res: any = await restoreId({
        id,
      });
      if (!res?.error) {
        message.success('News restore successfully.');
      } else {
        if (res?.error?.status >= 500) {
          message.error('Somthing went wrong.');
        } else {
          message.error(
            `${
              res?.error?.data?.message
                ? res?.error?.data?.message
                : 'Somthing went wrong'
            }`,
          );
        }
      }
    } catch {}
  };

  const [deleteItem] = useDeleteNewsMutation();

  const deleteConfirm = async (id: any) => {
    try {
      const res: any = await deleteItem({
        id,
        isTrash,
      });
      if (!res?.error) {
        message.success(
          !isTrash
            ? 'Item moved to trash successfully!'
            : 'Item permanently deleted successfully!',
        );
      } else {
        if (res?.error?.status >= 500) {
          message.error('Somthing went wrong.');
        } else {
          message.error(
            `${
              res?.error?.data?.message
                ? res?.error?.data?.message
                : 'Somthing went wrong'
            }`,
          );
        }
      }
    } catch {}
  };

  return (
    <div className="">
      <div className="flex items-center justify-end gap-3">
        {!isTrash
          ? (
              <Tooltip placement="top" title="Update">
                <Link href={`/admin/news/edit/${record?.id}`}>
                  <FiEdit className="text-base" />
                </Link>
              </Tooltip>
            )
          : null}

        {!isTrash
          ? (
              <Tooltip placement="top" title="View Page">
                <Link
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/news/${record.slug}`}
                >
                  <FiExternalLink className="text-lg" />
                </Link>
              </Tooltip>
            )
          : null}
        {isTrash
          ? (
              <Tooltip placement="top" title="Restore">
                <button type="button" onClick={() => retoreHandler(record?.id)}>
                  <TbReload className="text-lg" />
                </button>
              </Tooltip>
            )
          : null}

        {/* delete button */}
        <Tooltip
          placement="bottom"
          title={!isTrash ? 'Move to Trash' : 'Permanent Delete'}
        >
          <Popconfirm
            placement="topRight"
            title={
              !isTrash
                ? (
                    <div className="font-semibold">
                      Are you sure you want to move this item to Trash?
                      {' '}
                      <br />
                      <div className="font-normal">
                        Item can be recovered from Trash.
                      </div>
                    </div>
                  )
                : (
                    <div className="font-semibold">
                      Are you sure you want to delete this item Permanently?
                      {' '}
                      <br />
                      <div className="font-normal">
                        Deleted item can&apos;t be recovered!
                      </div>
                    </div>
                  )
            }
            onConfirm={() => deleteConfirm(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <button type="button" className="hover:text-secondary">
              <FiTrash2 className="text-base" />
            </button>
          </Popconfirm>
        </Tooltip>
      </div>
    </div>
  );
};

export default NewsAction;
