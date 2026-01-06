import { Checkbox, message, Modal, Popconfirm, Select, Tooltip } from 'antd';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { FiEdit, FiExternalLink, FiTrash2 } from 'react-icons/fi';
import { TbReload } from 'react-icons/tb';
import * as Yup from 'yup';

import {
  useRestoreProductMutation,
  useSoftDeleteProductMutation,
} from '@/api/products';

const NewsAction = ({ record, isTrash }: any) => {
  const [moveModal, setMoveModal] = useState(false);
  const [, setKeyword] = useState('');

  const [restoreId] = useRestoreProductMutation();

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

  const [deleteItem] = useSoftDeleteProductMutation();

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
        {!isTrash ? (
          <Tooltip placement="top" title="Update">
            <Link href={`/admin/products/edit/${record?.id}`}>
              <FiEdit className="text-base" />
            </Link>
          </Tooltip>
        ) : null}

        {!isTrash ? (
          <Tooltip placement="top" title="View Page">
            <Link
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_APP_URL}/products/${record.slug}`}
            >
              <FiExternalLink className="text-lg" />
            </Link>
          </Tooltip>
        ) : null}
        {isTrash ? (
          <Tooltip placement="top" title="Restore">
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

      <Formik
        initialValues={{
          categoryFrom: record.id,
          categoryTo: '',
          isDestroy: false,
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          categoryTo: Yup.string().required('News to is required'),
        })}
        onSubmit={() => {}}
      >
        {({ handleSubmit, setFieldValue, errors, touched }: any) => (
          <Form>
            <Modal
              title="News move to another News"
              style={{ top: 100 }}
              open={moveModal}
              // onOk={() => <button className="bg-danger">On</button>}
              onCancel={() => setMoveModal(false)}
              footer={
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setMoveModal(false)}
                    className="rounded border px-4 py-[4px] "
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="rounded bg-[#0b3a5d] px-4 py-[4px] text-white"
                  >
                    Move News
                  </button>
                </div>
              }
            >
              <div className="flex flex-col gap-2 border-t pt-3">
                <div>
                  <p>
                    <span className="font-bold">From :</span> {record?.title}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <p className=" font-bold">To:</p>

                  <div className="w-full">
                    <Select
                      showSearch
                      placeholder="Select a News"
                      className="w-full"
                      optionFilterProp="children"
                      onChange={(val) => setFieldValue('categoryTo', val)}
                      onSearch={(searchVal) => setKeyword(searchVal)}
                      filterOption={(input: any, option: any) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      // options={categoryArray}
                    />
                    {errors?.categoryTo && touched?.categoryTo ? (
                      <div className="error">{errors?.categoryTo}</div>
                    ) : null}
                    <Checkbox
                      className="mt-1"
                      onChange={(e) =>
                        setFieldValue('isDestroy', e.target.checked)
                      }
                    >
                      <span>Move news and delete exsting News</span>
                    </Checkbox>
                  </div>
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewsAction;
