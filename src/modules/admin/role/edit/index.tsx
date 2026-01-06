import { Card, Checkbox, message, Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import { Fragment } from 'react';
import * as Yup from 'yup';

import { useGetAllPermissionsQuery } from '@/api/permission/permission_api';
import {
  useGetSinglearolesQuery,
  useUpdaterolesMutation,
} from '@/api/role/role_api';

const RoleEdit = ({ rolId, setEditMode }: any) => {
  const { data: allPermissions } = useGetAllPermissionsQuery({});
  const [update, { isLoading: createLoading }] = useUpdaterolesMutation();
  const { data: singlerole, isLoading: singleLoading }
    = useGetSinglearolesQuery({ id: rolId }, { skip: !rolId });

  const arr: any = [];
  singlerole?.permissions?.map((item: any) =>
    arr.push(item?.id),
  );

  const updateHandler = async (values: any) => {
    const data = {
      name: values?.name,
      description: values?.description,
      permissionIds: values?.permissions,
    };
    const res: any = await update({ data, rolId });

    if (!res?.error) {
      message.success(`Roles Updated Successfully!`);
    } else {
      message.error(res?.error?.data?.message);
    }
  };

  const mergedData
    = allPermissions
    && allPermissions?.reduce((result: any, obj: any) => {
      const key = obj.featureId;
      if (!result[key]) {
        result[key] = {
          module_name: '',
          module_id: obj.featureId,
          permissions: [],
        };
      }
      result[key].permissions.push(obj);
      result[key].feature_name = obj.feature?.title;
      return result;
    }, {});

  const permissionList = mergedData && Object.values(mergedData);

  const permissionHandler = (
    perId: any,
    isPermission: any,
    setFieldValue: any,
    values: any,
  ) => {
    if (isPermission) {
      const newArray = [...values.permissions, perId];
      setFieldValue('permissions', newArray);
    } else {
      if (values.permissions.length > 1) {
        const newArray = values.permissions.filter(
          (item: string) => item !== perId,
        );

        setFieldValue('permissions', newArray);
      } else {
        setFieldValue('permissions', []);
      }
    }
  };

  return (
    <Card className="border-s px-2 py-4">
      <div className="mb-2 border-b">
        <h4>Update Role</h4>
      </div>

      <Formik
        initialValues={{
          name: singlerole?.name ?? '',
          description: singlerole?.description ?? '',
          permissions: arr ?? [],
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Role name is required'),
          permissions: Yup.array().min(1, 'At least select one permission'),
        })}
        onSubmit={(values: any) => {
          updateHandler(values);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, values, touched }: any) => (
          <Form>
            {!singleLoading
              ? (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="w-full">
                      <label htmlFor="name">
                        Role Name
                        {' '}
                        <span className="text-danger"> *</span>
                      </label>
                      <div>
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          placeholder="name"
                          className="mt-1 w-full border px-2 py-1"
                        />
                        {errors?.name && touched?.name
                          ? (
                              <div className="error">{errors?.name}</div>
                            )
                          : null}
                        {errors?.permissions && touched?.permissions
                          ? (
                              <div className="error">{errors?.permissions}</div>
                            )
                          : null}
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="description">Role Description</label>
                      <div>
                        <Field
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Add Description"
                          className="mt-1 w-full border px-2 py-1"
                        />
                        {errors?.description && touched?.description
                          ? (
                              <div className="error">{errors?.description}</div>
                            )
                          : null}
                        {errors?.permissions && touched?.permissions
                          ? (
                              <div className="error">{errors?.permissions}</div>
                            )
                          : null}
                      </div>
                    </div>
                    {permissionList?.length > 0
                      ? (
                          <div className="col-span-1 py-3">
                            <h5>Role Permissions</h5>
                            {permissionList?.map((item: any) => {
                              return (
                                <Fragment key={item?.feature_name}>
                                  <p className=" mb-0 text-[13px] font-bold text-[#153751]">
                                    {item?.feature_name}
                                  </p>
                                  {item?.permissions?.length > 0
                                    ? (
                                        <ul className="flex flex-wrap gap-2 py-1">
                                          {item?.permissions?.map(
                                            (permission: any) => {
                                              return (
                                                <li
                                                  key={permission?.id}
                                                  className="mb-3 whitespace-normal border px-1"
                                                >
                                                  <Checkbox
                                                    value={permission?.id}
                                                    onChange={(e) => {
                                                      permissionHandler(
                                                        e.target.value,
                                                        e.target.checked,
                                                        setFieldValue,
                                                        values,
                                                      );
                                                    }}
                                                    checked={
                                                      !!values.permissions.includes(
                                                        permission?.id,
                                                      )
                                                    }
                                                  >
                                                    <span className="">
                                                      {permission?.name}
                                                    </span>
                                                  </Checkbox>
                                                </li>
                                              );
                                            },
                                          )}
                                        </ul>
                                      )
                                    : (
                                        <>No Permission yet</>
                                      )}
                                </Fragment>
                              );
                            })}
                            {!createLoading
                              ? (
                                  <>
                                    <button
                                      type="button"
                                      className="mr-2 w-max rounded-md bg-[#E5E7EB] px-4 py-2 text-base font-medium text-slate-900"
                                      onClick={() => setEditMode(false)}
                                    >
                                      Cancel
                                    </button>

                                    <button
                                      type="submit"
                                      className="btn btn-primary mt-5"
                                      onClick={(e) => {
                                        handleSubmit();
                                        e.preventDefault();
                                      }}
                                    >
                                      Update
                                    </button>
                                  </>
                                )
                              : (
                                  <button
                                    type="button"
                                    className="btn btn-secondary disabled mt-5 w-[134px]"
                                  >
                                    <Spin className="size-5" />
                                  </button>
                                )}
                          </div>
                        )
                      : (
                          <>No permission yet</>
                        )}
                  </div>
                )
              : (
                  <div className="flex min-h-[300px] items-center justify-center">
                    <Spin size="large" />
                  </div>
                )}
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default RoleEdit;
