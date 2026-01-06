'use client';

import { Card, message, Modal, Popconfirm, Select, Spin } from 'antd';
import type { FormikValues } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { revalidatePath } from 'next/cache';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import * as Yup from 'yup';

import { useGetAllFeaturesQuery } from '@/api/features/features_api';
import {
  useCreatePermissionsMutation,
  useDeletePermissionsMutation,
  useGetAllPermissionsQuery,
  useGetSingleaPermissionsQuery,
  useUpdatePermissionsMutation,
} from '@/api/permission/permission_api';
import PageHeader from '@/modules/@common/page_header';

const UserPermission = () => {
  const [perId, setPerId] = useState(null);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  const handlePermissionModal = () => {
    setIsPermissionModalOpen(!isPermissionModalOpen);
  };

  const { data: allPermissions, isLoading } = useGetAllPermissionsQuery({});
  const { data: moduleList } = useGetAllFeaturesQuery({});
  const { data: singleData, isLoading: singleLoading }
    = useGetSingleaPermissionsQuery({ id: perId }, { skip: !perId });
  const [permissionData, { isLoading: createLoading }]
    = useCreatePermissionsMutation();
  const [updateData, { isLoading: updateLoading }]
    = useUpdatePermissionsMutation();
  const [deletId] = useDeletePermissionsMutation();

  const mergedData
    = allPermissions
    && allPermissions?.reduce((result: any, obj: any) => {
      const key = obj.featureId;
      if (!result[key]) {
        result[key] = {
          feature_name: '',
          featureId: obj.featureId,
          permissions: [],
        };
      }
      result[key].permissions.push(obj);
      result[key].feature_name = obj.feature?.title;

      return result;
    }, {});

  const permissionList = mergedData && Object.values(mergedData);

  const createHandler = async (values: FormikValues, actions: any) => {
    const res: any = await permissionData({
      name: values?.name,
      featureId: values.featureId,
    });

    if (!res?.error) {
      message.success('Module create successfully.');
      actions.resetForm();
      revalidatePath('/admin/permission', 'page');
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
  const updateHandler = async (values: FormikValues) => {
    const res: any = await updateData({
      id: perId,
      name: values?.name,
      featureId: values.featureId,
    });

    if (!res?.error) {
      message.success('Permission updated successfully');
      setIsPermissionModalOpen(false);
    } else if (res?.error?.status >= 400) {
      message.error('Permission update error.');
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
  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id,
      });
      if (!res?.error) {
        message.success('Permission delete successfully.');
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
  const moduleOption = moduleList?.map((item: any) => {
    return {
      label: item?.title,
      value: item?.id,
    };
  });

  return (
    <div className="mt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Permissions' },
        ]}
        title="Permissions Management"
      />

      <div className="list_container">
        <div className="mb-8 mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_400px]">
          <div className="flex flex-col gap-4">
            <div className="">
              {!isLoading
                ? (
                    <>
                      {permissionList.length > 0
                        ? (
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5">
                              {permissionList.map((item: any) => (
                                <Card
                                  key={item.feature_name}
                                  className="h-[200px] shadow-sm"
                                >
                                  <p className="mb-[10px] text-base font-semibold">
                                    {item.feature_name}
                                  </p>

                                  <div className="flex flex-col space-y-1">
                                    {item?.permissions?.map((perm: any) => (
                                      <div
                                        key={perm.name}
                                        className="grid grid-cols-2 items-center"
                                      >
                                        <span>{perm?.name}</span>
                                        <div className="action_btn flex justify-end gap-2">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setIsPermissionModalOpen(
                                                !isPermissionModalOpen,
                                              );

                                              setPerId(perm?.id);
                                            }}
                                          >
                                            <FiEdit className="cursor-pointer hover:text-secondary" />
                                          </button>

                                          <Popconfirm
                                            placement="topLeft"
                                            title={(
                                              <span>
                                                Are you sure to delete this task?
                                              </span>
                                            )}
                                            onConfirm={() => confirm(perm?.id)}
                                            okText="Yes"
                                            cancelText="No"
                                          >
                                            <FiTrash2 className="cursor-pointer hover:text-secondary" />
                                          </Popconfirm>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Card>
                              ))}
                            </div>
                          )
                        : (
                            <p className="py-4 text-center text-2xl text-gray-500">
                              Permission not found !
                            </p>
                          )}
                    </>
                  )
                : (
                    <div className="py-4 text-center">
                      <Spin size="large" />
                    </div>
                  )}
            </div>
            <div>
              {!singleLoading
                ? (
                    <Formik
                      initialValues={singleData ?? { name: '' }}
                      enableReinitialize
                      validationSchema={Yup.object({
                        name: Yup.string().required('Name is required'),
                      })}
                      onSubmit={(values) => {
                        updateHandler(values);
                      }}
                    >
                      {({ handleSubmit }) => (
                        <Modal
                          title={<h4 className=" text-lg">Update Permission</h4>}
                          centered
                          open={isPermissionModalOpen}
                          onCancel={handlePermissionModal}
                          width={350}
                          footer={false}
                        >
                          <Form>
                            <div className="space-y-4">
                              <div>
                                <label htmlFor="name" className="">
                                  Permission Name
                                  {' '}
                                  <span className="text-danger">*</span>
                                </label>
                                <div>
                                  <Field
                                    type="name"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    className="mb-3 w-full rounded-md border px-3 py-2 text-sm text-black"
                                  />
                                </div>

                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="error mt-1 text-xs text-red-500"
                                />
                              </div>

                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setIsPermissionModalOpen(!isPermissionModalOpen)}
                                  className="w-max rounded-md bg-[#E5E7EB] px-4 py-1 text-base font-medium uppercase text-slate-900"
                                >
                                  Cancel
                                </button>
                                {!updateLoading
                                  ? (
                                      <button
                                        className="btn btn-primary rounded-md px-4 py-1 text-base font-medium uppercase"
                                        type="submit"
                                        onClick={
                                          handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>
                                        }
                                      >
                                        Update
                                      </button>
                                    )
                                  : (
                                      <div className="px-4 py-1">
                                        <Spin className="size-5" />
                                      </div>
                                    )}
                              </div>
                            </div>
                          </Form>
                        </Modal>
                      )}
                    </Formik>
                  )
                : (
                    <p>Loading...</p>
                  )}
            </div>
          </div>
          <div>
            <Formik
              initialValues={{ name: '', featureId: undefined }}
              enableReinitialize
              validationSchema={Yup.object().shape({
                name: Yup.string().required('Name is required'),
                featureId: Yup.string().required('Module is required'),
              })}
              onSubmit={(values: any, actions: any) => {
                createHandler(values, actions);
              }}
            >
              {({
                handleSubmit,
                setFieldValue,
                errors,
                values,
                touched,
              }: any) => (
                <Form>
                  <Card>
                    <h5 className="uppercase ">New Permission</h5>

                    <div className="mb-4 mt-5">
                      <label htmlFor="name" className="text-base font-semibold">
                        Permission Name
                        <span className="text-danger">*</span>
                      </label>
                      <div>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Enter Name"
                          className="mt-1 w-full border px-2 py-1"
                        />
                        {errors?.name && touched?.name
                          ? (
                              <div className="error">{errors?.name}</div>
                            )
                          : null}
                      </div>
                    </div>
                    <div className="gap-[30px]">
                      <label htmlFor="featureId" className="mr-1 block font-medium">
                        Modules
                        <span className="text-danger">*</span>
                      </label>

                      <div>
                        <Select
                          placeholder="Select"
                          className="w-full"
                          options={moduleOption}
                          value={
                            values?.featureId && values?.featureId !== ''
                              ? values?.featureId
                              : undefined
                          }
                          onChange={val => setFieldValue('featureId', val)}
                        />
                        {errors?.featureId && touched?.featureId
                          ? (
                              <div className="error">{errors?.featureId}</div>
                            )
                          : null}
                      </div>
                      <div>
                        {!createLoading
                          ? (
                              <button
                                type="submit"
                                className="btn btn-secondary mt-5 rounded-md"
                                onClick={handleSubmit}
                              >
                                Save changes
                              </button>
                            )
                          : (
                              <button
                                type="button"
                                className="btn btn-secondary disabled mt-5 w-[134px] rounded-md"
                              >
                                <Spin className="size-5" />
                              </button>
                            )}
                      </div>
                    </div>
                  </Card>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPermission;
