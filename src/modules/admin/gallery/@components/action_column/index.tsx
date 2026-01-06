import { useHardDeleteGalleryMutation } from '@/api/gallery';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const GalleryAction = ({ record, updateAction, loadData }: any) => {
  const [deleteItem] = useHardDeleteGalleryMutation();

  const deleteConfirm = async (id: any) => {
    try {
      const res: any = await deleteItem({
        id,
      });
      if (!res?.error) {
        message.success('Item permanently deleted successfully!');
        loadData();
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
        <Tooltip placement="top" title="Update">
          <Button onClick={() => updateAction(record)}>
            <FiEdit className="text-base" />
          </Button>
        </Tooltip>

        {/* delete button */}
        <Tooltip placement="bottom" title={'Permanent Delete'}>
          <Popconfirm
            placement="topRight"
            title={
              <div className="font-semibold">
                Are you sure you want to delete this item Permanently? <br />
                <div className="font-normal">
                  Deleted item can&apos;t be recovered!
                </div>
              </div>
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

export default GalleryAction;
