import Link from 'next/link';
import { Page } from '@/api/lib/definitions';
import { useDeletePageMutation, useRestorePageMutation } from '@/api/pages';
import { message, Popconfirm, Tooltip } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { TbReload } from 'react-icons/tb';

interface PagesActionProps {
  record: Page;
  isTrash?: boolean;
  handleModal: () => void;
}

const PageAction = ({ record, isTrash }: PagesActionProps) => {
  const [restoreId] = useRestorePageMutation();

  const retoreHandler = async (id: any) => {
    try {
      const res: any = await restoreId({
        id: id,
      });
      if (!res?.error) {
        message.success('Category restore successfully.');
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
    } catch (err) {}
  };

  const [deleteItem] = useDeletePageMutation();

  const deleteConfirm = async (id: any) => {
    try {
      const res: any = await deleteItem({
        id: id,
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
    } catch (err) {}
  };

  return (
    <div className="">
      <div className="flex items-center justify-end gap-3">
        {!isTrash ? (
          <Tooltip placement="top" title={'Edit'}>
            <Link href={`/admin/pages/edit/${record?.id}`}>
              <FiEdit className="text-base" />
            </Link>
          </Tooltip>
        ) : null}

        {!isTrash ? (
          <Tooltip placement="top" title="Preview">
            <Link
              target="_blank"
              href={`https://olympiapaint.com/${record.slug}`}
            >
              <AiOutlineEye className="text-lg" />
            </Link>
          </Tooltip>
        ) : null}
        {isTrash ? (
          <Tooltip placement="top" title={'Restore'}>
            <button type="button" onClick={() => retoreHandler(record?.id)}>
              <TbReload className="text-lg" />
            </button>
          </Tooltip>
        ) : null}

        {/* delete button */}
        <Tooltip
          placement="bottom"
          title={!isTrash ? 'Move to Trash' : 'Permanent Delete'}
        >
          <Popconfirm
            placement="topRight"
            title={
              !isTrash ? (
                <div className="font-semibold">
                  Are you sure you want to move this item to Trash? <br />
                  <div className="font-normal">
                    Item can be recovered from Trash.
                  </div>
                </div>
              ) : (
                <div className="font-semibold">
                  Are you sure you want to delete this item Permanently? <br />
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

export default PageAction;
