'use client';

import { message, Popconfirm, Tooltip } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';

import { useDeleteContactMutation } from '@/api/contacts';
import type { Contact } from '@/api/lib/definitions';

type ContactActionProps = {
  record: Contact;
};

const ContactAction = ({ record }: ContactActionProps) => {
  const [deleteItem] = useDeleteContactMutation();

  const deleteConfirm = async (id: any) => {
    try {
      const res: any = await deleteItem({
        id,
      });

      if (res.error) {
        if (res.error.status === 401) {
          message.error(res.error.data.message);
        } else if (res.error.status === 404) {
          message.error('Message not found');
        } else if (res.error.status === 422) {
          message.error('Cannot process request this time');
        } else if (res.error.status === 400) {
          message.error('Bad Request');
        } else {
          message.error('Something went wront. Please try again!');
        }
      } else {
        message.success('Item permanently deleted successfully!');
      }
    } catch {}
  };

  return (
    <div className="">
      <div className="flex items-center justify-end gap-3">
        <Tooltip placement="top" title="View Message">
          <AiOutlineEye className="text-lg" />
        </Tooltip>

        {/* delete button */}
        <Tooltip placement="bottom" title="Permanent Delete">
          <Popconfirm
            placement="topRight"
            title={(
              <div className="font-semibold">
                Are you sure you want to delete this item Permanently?
                {' '}
                <br />
                <div className="font-normal">
                  Deleted item can&apos;t be recovered!
                </div>
              </div>
            )}
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

export default ContactAction;
