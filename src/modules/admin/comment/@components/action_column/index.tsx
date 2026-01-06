import { message, Popconfirm, Spin, Tooltip } from 'antd';
import { FiTrash2 } from 'react-icons/fi';
import { TbReload } from 'react-icons/tb';

import {
  useDeleteCommentMutation,
  useRestoreCommentMutation,
} from '@/api/comment/comment_api';

const CommentAction = ({ record, isTrash }: any) => {
  const [restoreId, { isLoading }] = useRestoreCommentMutation();

  const retoreHandler = async (id: any) => {
    try {
      const res: any = await restoreId({
        id,
      });
      if (!res?.error) {
        message.success('Comment restore successfully.');
      } else {
        message.error(res?.error?.data?.message);
      }
    } catch {}
  };

  const [deleteItem] = useDeleteCommentMutation();

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
        message.error(res?.error?.data?.message);
      }
    } catch {}
  };

  return (
    <div className="">
      <div className="flex items-center justify-end gap-3">
        {!isTrash
          ? (
              <Tooltip
                placement="top"
                title="Move news another category"
              >
              </Tooltip>
            )
          : null}

        {isTrash
          ? (
              <Tooltip placement="top" title="Restore">
                <button type="button" onClick={() => retoreHandler(record?.id)}>
                  {!isLoading ? <TbReload className="text-lg" /> : <Spin />}
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

export default CommentAction;
