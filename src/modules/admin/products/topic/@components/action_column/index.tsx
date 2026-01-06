'use client';

import { Checkbox, message, Modal, Popconfirm, Select, Tooltip } from 'antd';
import clsx from 'clsx';
import type { FormikValues } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { TbReload } from 'react-icons/tb';
import * as Yup from 'yup';

import {
  useGetCategoryDropdownsQuery,
  useMoveNewsMutation,
} from '@/api/category';
import type { Topic } from '@/api/lib/definitions';
import {
  useDeleteTagMutation,
  useGetSingleTagQuery,
  useRestoreTagsMutation,
  useUpdateTagMutation,
} from '@/api/tag/tag_api';

const tagSchema = Yup.object({
  name: Yup.string().required('Required'),
  slug: Yup.string(),
  content: Yup.string(),
});

type TagActionProps = {
  record: Topic;
  isTrash?: boolean;
};

const TagsAction = ({ record, isTrash }: TagActionProps) => {
  const [moveModal, setMoveModal] = useState(false);
  const [, setKeyword] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [moveData] = useMoveNewsMutation();
  const [restoreId] = useRestoreTagsMutation();
  const { data: categoryDropdowns } = useGetCategoryDropdownsQuery('');

  const categoryArray = categoryDropdowns?.map((item: any) => {
    return {
      label: item?.title,
      value: item?.id,
    };
  });

  const { data: singleTag, isLoading: singleLoading } = useGetSingleTagQuery(
    { id: record.id },
    { skip: !record.id },
  );

  const [update, { isLoading: uploading }] = useUpdateTagMutation();

  const moveHandler = async (values: any) => {
    const res: any = await moveData({
      categoryFrom: values.categoryFrom,
      categoryTo: values.categoryTo,
      isDestroy: values.isDestroy,
    });
    if (!res?.error) {
      message.success(`News move successfull`);
      setMoveModal(false);
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
  };

  const retoreHandler = async (id: any) => {
    try {
      const payload = await restoreId({
        id,
      }).unwrap();

      if (payload.id) {
        message.success('Category restore successfully.');
      }
    } catch (error) {
      if (typeof error === 'object' && 'message' in error!) {
        message.error('Somthing went wrong.');
      }
    }
  };

  const [deleteItem] = useDeleteTagMutation();

  const deleteConfirm = async (id: any) => {
    try {
      const payload = await deleteItem({
        id,
        isTrash,
      }).unwrap();

      if (payload.id) {
        message.success(
          !isTrash
            ? 'Item moved to trash successfully!'
            : 'Item permanently deleted successfully!',
        );
      }
    } catch (error) {
      if (typeof error === 'object' && 'message' in error!) {
        message.error('Somthing went wrong');
      }
    }
  };

  const createHandler = async (values: FormikValues) => {
    const data = {
      title: values?.name,
      slug: values?.slug,
      content: values?.content,
      featuredImage: values?.featuredImage,
      status: values?.status,
      searchKeyword: values?.searchKeywords,
      metaTitle: values?.metaTitle,
      metaKeyword: values?.metaKeyword,
      metaDescription: values?.metaDescription,
    };

    try {
      const res: any = await update({ data, id: record.id });

      if (!res?.error) {
        message.success('Topic updated successfully');
        setIsModalOpen(false);
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
              <Tooltip placement="top" title="Edit">
                <button type="button" onClick={showModal}>
                  <FiEdit className="text-lg" />
                </button>
              </Tooltip>
            )
          : null}

        {!isTrash
          ? (
              <Tooltip placement="top" title="View Page">
                <Link target="_blank" href={`/topic/${record.slug}`}>
                  <AiOutlineEye className="text-lg" />
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

      <div>
        <Modal
          title={<h4 className="text-lg uppercase">Update Tag</h4>}
          centered
          open={isModalOpen}
          onCancel={showModal}
          width={825}
          styles={{
            body: {
              fontSize: '1.5rem',
            },
          }}
          footer={false}
        >
          <Formik
            initialValues={
              singleTag ?? {
                name: '',
                slug: '',
                content: '',
              }
            }
            enableReinitialize
            validationSchema={tagSchema}
            onSubmit={(values) => {
              createHandler(values);
            }}
          >
            {({ handleSubmit, values }) => (
              <Form>
                <div className="mt-5 grid gap-5">
                  <div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                      <div className="col-span-1">
                        <label
                          htmlFor="name"
                          className="text-base font-semibold text-gray-600"
                        >
                          Name
                          {' '}
                          <span className="text-danger">*</span>
                        </label>
                        <div>
                          <Field
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Add name"
                            className="w-full rounded border px-3 py-2 text-base focus:border-blue-200 focus:outline-none"
                            value={values?.name || ''}
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error mt-1 text-xs text-red-500"
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <label
                          htmlFor="slug"
                          className="text-base font-semibold text-gray-600"
                        >
                          Slug
                        </label>
                        <div>
                          <Field
                            type="text"
                            name="slug"
                            id="slug"
                            placeholder="Enter slug"
                            className="w-full rounded border px-3 py-2 text-base focus:border-blue-200 focus:outline-none"
                            value={values?.slug}
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <label
                          htmlFor="content"
                          className="text-base font-semibold text-gray-600"
                        >
                          Description
                        </label>
                        <div>
                          <Field
                            type="text"
                            name="content"
                            id="content"
                            placeholder="Type here"
                            as="textarea"
                            className="w-full rounded border px-2 py-3 text-base focus:border-blue-200 focus:outline-none"
                            value={values?.content || ''}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={showModal}
                          className="w-max rounded-md bg-[#E5E7EB] px-4 py-2 text-base font-medium uppercase text-slate-900"
                        >
                          Cancel
                        </button>
                        <button
                          className={clsx(
                            'w-max rounded-md bg-[#F0614A] px-4 py-2 text-base font-medium uppercase text-white hover:hover:bg-[#F0614A]/90 hover:text-white/90',
                            uploading || singleLoading ? 'disabled' : '',
                          )}
                          type="submit"
                          onClick={
                            handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>
                          }
                        >
                          Update Topic
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>

      <Formik
        initialValues={{
          categoryFrom: record.id,
          categoryTo: '',
          isDestroy: false,
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          categoryTo: Yup.string().required('Category to is required'),
        })}
        onSubmit={(values: any) => {
          moveHandler(values);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, touched }: any) => (
          <Form>
            <Modal
              title="News move to another category"
              style={{ top: 100 }}
              open={moveModal}
              // onOk={() => <button className="bg-danger">On</button>}
              onCancel={() => setMoveModal(false)}
              footer={(
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
              )}
            >
              <div className="flex flex-col gap-2 border-t pt-3">
                <div>
                  <p>
                    <span className="font-bold">From :</span>
                    {' '}
                    {record?.title}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <p className=" font-bold">To:</p>

                  <div className="w-full">
                    <Select
                      showSearch
                      placeholder="Select a category"
                      className="w-full"
                      optionFilterProp="children"
                      onChange={val => setFieldValue('categoryTo', val)}
                      onSearch={searchVal => setKeyword(searchVal)}
                      filterOption={(input: any, option: any) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())}
                      options={categoryArray}
                    />
                    {errors?.categoryTo && touched?.categoryTo
                      ? (
                          <div className="error">{errors?.categoryTo}</div>
                        )
                      : null}
                    <Checkbox
                      className="mt-1"
                      onChange={e =>
                        setFieldValue('isDestroy', e.target.checked)}
                    >
                      <span>Move news and delete exsting category</span>
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

export default TagsAction;
