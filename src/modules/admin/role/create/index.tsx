import { Card, Checkbox, message, Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import { Fragment } from 'react';
import * as Yup from 'yup';

import { useGetAllPermissionsQuery } from '@/api/permission/permission_api';
import { useCreaterolesMutation } from '@/api/role/role_api';

const RoleCreate = () => {
  const { data: allPermissions } = useGetAllPermissionsQuery({});
  const [roleData, { isLoading: createLoading }] = useCreaterolesMutation();

  const createHandler = async (values: any, actions: any) => {
    try {
      const res: any = await roleData({
        name: values.name,
        description: values.description,
        permissionIds: values.permissions,
      });
      if (!res?.error) {
        message.success('Role create successfully.');
        actions.resetForm();
      } else {
        message.error(res?.error?.data?.message);
      }
    } catch {}
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
    index: any,
  ) => {
    if (isPermission) {
      const newArray = [...values.permissions, perId];
      setFieldValue('permissions', newArray);
    } else {
      if (values.permissions.length > 1) {
        const newArray = values.permissions.filter(
          (_: any, i: any) => i !== index,
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
        <h4>Create Role</h4>
      </div>

      <Formik
        initialValues={{ name: '', permissions: [] }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Role name is required'),
          permissions: Yup.array().min(1, 'At least select one permission'),
        })}
        onSubmit={(values: any, actions: any) => {
          createHandler(values, actions);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, values, touched }: any) => (
          <Form>
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
                    id="description"
                    name="description"
                    placeholder="Description"
                    className="mt-1 w-full border px-2 py-1"
                  />
                  {errors?.description && touched?.description
                    ? (
                        <div className="error">{errors?.description}</div>
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
                            <p className="mb-0 text-[13px] font-bold text-[#153751]">
                              {item?.feature_name}
                            </p>
                            {item?.permissions?.length > 0
                              ? (
                                  <ul className="mb-5 flex flex-wrap gap-2 py-1">
                                    {item?.permissions?.map(
                                      (permission: any, index: any) => (
                                        <li
                                          key={permission.id}
                                          className="whitespace-normal rounded-sm border px-1"
                                        >
                                          <Checkbox
                                            value={permission?.id}
                                            onChange={(e) => {
                                              permissionHandler(
                                                e.target.value,
                                                e.target.checked,
                                                setFieldValue,
                                                values,
                                                index,
                                              );
                                            }}
                                            checked={
                                              !!values.permissions.includes(
                                                permission?.id,
                                              )
                                            }
                                          >
                                            <span className="">{permission?.name}</span>
                                          </Checkbox>
                                        </li>
                                      ),
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
                            <button
                              type="submit"
                              className="btn btn-primary mt-5 font-bold"
                              onClick={(e) => {
                                handleSubmit();
                                e.preventDefault();
                              }}
                            >
                              Save changes
                            </button>
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
                    'No Permission Created'
                  )}
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default RoleCreate;
