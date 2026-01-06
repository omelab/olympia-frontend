import { Dropdown, message, Popconfirm } from 'antd';
import { FiDownload, FiLink2, FiTrash2 } from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';

import { useDeleteMediaMutation } from '@/api/media/media_api';
import { copyHandler } from '@/utils/Helpers';

const MediaActionsDropdown = ({ record }: any) => {
  const [deletId] = useDeleteMediaMutation();

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id,
      });
      if (!res?.error) {
        message.success('Media delete successfully.');
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
    <Dropdown
      dropdownRender={() => (
        <div className="rounded-md bg-white py-2 drop-shadow-xl">
          <a
            target="_blank"
            href={record.path}
            download
            // onClick={() => handleDownload(record?.path)}
            className="hover:bg-greylight flex items-center gap-2 px-7 py-1.5 text-sm hover:text-inherit"
          >
            <FiDownload />
            <span>Download</span>
          </a>
          <button
            type="button"
            className="hover:bg-greylight flex w-full items-center gap-2 px-7 py-1.5 text-sm hover:text-inherit"
            onClick={() => copyHandler(record?.path, 'Link has been copied!')}
          >
            <FiLink2 />
            <span>Copy</span>
          </button>
          <Popconfirm
            placement="top"
            title={<span>Are you sure to delete this file?</span>}
            description=" "
            onConfirm={() => confirm(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <button
              type="button"
              className="hover:bg-greylight flex w-full items-center gap-2 px-7 py-1.5 text-sm hover:text-inherit"
            >
              <FiTrash2 />
              <span>Delete</span>
            </button>
          </Popconfirm>
        </div>
      )}
      trigger={['click']}
    >
      <button type="button">
        <HiDotsVertical />
      </button>
    </Dropdown>
  );
};

export default MediaActionsDropdown;
