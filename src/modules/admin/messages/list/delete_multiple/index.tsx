'use client';

import { message } from 'antd';

import { useCategoryBulkDeleteMutation } from '@/api/category';

type PropTypes = {
  ids: any;
  setIds: any;
};

const CategoryDeleteMultiple = ({ ids, setIds }: PropTypes) => {
  const [deleteMultiple] = useCategoryBulkDeleteMutation();

  const deleteMultipleHandler = async () => {
    try {
      const res: any = await deleteMultiple({
        ids,
      });
      if (!res?.error) {
        message.success('Items move to trash successfully!');
        setIds([]);
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
    <button
      onClick={deleteMultipleHandler}
      type="button"
      className="btn btn-secondary"
    >
      {`${'Move to Trash '} (${ids?.length})`}
    </button>
  );
};

export default CategoryDeleteMultiple;
