'use client';

import type { SelectProps } from 'antd';
import { Card, Collapse, DatePicker, message, Select, Spin, Upload } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import type { FormikValues } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

import {
  useCreateAdminMutation,
  useGetSingleaAdminsQuery,
  useUpdateAdminMutation,
} from '@/api/admin/admin_api';
import { useGetAllrolesQuery } from '@/api/role/role_api';
import PageHeader from '@/modules/@common/page_header';
import { getUploadedFileExtenstion } from '@/utils/Helpers';

import MediaInput from '../../media/@components/media_input';
import Password from '../@components/password';
import { initialValue } from './initial_value';

const CreateAdmin = ({ id }: any) => {
  const router = useRouter();
  const [create, { isLoading }] = useCreateAdminMutation();
  const [update, { isLoading: uploading }] = useUpdateAdminMutation();
  const { data: SingleAdmin, isLoading: singleLoading }
    = useGetSingleaAdminsQuery({ id }, { skip: !id });

  const { data: roleData } = useGetAllrolesQuery(
    {},
  );

  const filteredAdmin = roleData?.filter(
    (item: any) => ![2, 3, 4].includes(item.id),
  );

  const options: SelectProps['options'] = filteredAdmin?.map(
    ({ id, name }: { id: string; name: string }) => ({
      label: name,
      value: id,
    }),
  );

  const createHandler = async (values: FormikValues) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const files: File[] = key === 'files' ? values.files || [] : [];
      if (key === 'files' && files.length > 0) {
        files.forEach((file: any) =>
          formData.append(`files`, file?.originFileObj),
        );
      } else if (values[key] !== undefined && values[key] !== '') {
        formData.append(key, values[key]);
      }
    });

    const res: any = id
      ? await update({
        data: formData,
        id,
      })
      : await create(formData);

    if (!res?.error) {
      message.success(`Admin ${id ? 'Updated' : 'Created'} Successfully!`);
      if (!id) {
        router.push(`/admin/editAdmin/${res?.data?.id}`);
      }
    } else {
      message.error(res?.error?.data?.message);
    }
  };
  const fileSchema = Yup.mixed()
    .nullable()
    .test(
      'fileType',
      'Invalid file type. Please upload a file of type: jpeg, png, webp, or pdf',
      (value): boolean => {
        if (!value) {
          return true;
        }

        const file: File = value as File;
        const allowedFileTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'application/pdf',
        ];
        return allowedFileTypes.includes(file.type);
      },
    )
    .test(
      'fileSize',
      'File size must be less than 2MB',
      (value): boolean => {
        if (!value) {
          return true;
        }

        const file: File = value as File;
        const maxSize = 2 * 1024 * 1024;
        return file.size <= maxSize;
      },
    );
  const validationSchema = Yup.object().shape({
    username: id
      ? Yup.string().nullable()
      : Yup.string().required('Username is required'),
    password: id
      ? Yup.string().nullable()
      : Yup.string()
        .min(6, 'Must be more than or equal 6 characters')
        .required('Password is required')
        .matches(
          // eslint-disable-next-line regexp/no-obscure-range
          /^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[\w!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]{6,}$/,
          'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    files: Yup.array().of(fileSchema),
    dateOfBirth: Yup.date()
      .nullable()
      .max(
        dayjs().subtract(16, 'years').toDate(),
        'Must be at least 16 years old.',
      ),
  });

  return (
    <div className="pt-4">
      <PageHeader
        breadcrumbsData={[
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'All Admin', link: '/admin/list' },
          { title: `${id ? 'Update' : 'Create'} Admin` },
        ]}
        title={`${id ? 'Update' : 'Add New'} Admin`}
      />
      <Formik
        initialValues={SingleAdmin ?? initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values: FormikValues) => {
          createHandler(values);
        }}
      >
        {({ setFieldValue, values, errors, touched }) => {
          return (
            <Form>
              {!singleLoading
                ? (
                    <div className="mb-8 mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_400px]">
                      <Card
                        bordered={false}
                        style={{
                          borderRadius: 0,
                        }}
                        styles={{
                          header: {
                            backgroundColor: '#F6F7FA',
                            borderRadius: 0,
                          },
                          body: {
                            borderRadius: 0,
                          },
                        }}
                      >
                        <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <div className="col-span-2">
                              <label htmlFor="fullName" className="text-base">
                                Full Name
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="fullName"
                                  id="fullName"
                                  placeholder="Enter full name"
                                  className="w-full rounded border px-3 py-2 text-sm focus:border-blue-200 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="col-span-1">
                              <label htmlFor="displayName" className="text-base">
                                Display Name
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="displayName"
                                  id="displayName"
                                  placeholder="Enter display name"
                                  className="w-full rounded border px-3 py-2 text-sm focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="username" className="text-base">
                                User Name
                                {' '}
                                <span className="text-danger">*</span>
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="username"
                                  id="username"
                                  disabled={!!id}
                                  value={values?.username || ''}
                                  placeholder="Enter username"
                                  className="w-full rounded border px-3 py-2 text-sm focus:outline-none disabled:bg-black"
                                />
                                {!id && (
                                  <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="error mt-1 text-xs text-red-500"
                                  />
                                )}
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="mobile" className="text-base">
                                Mobile Number
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="mobile"
                                  id="mobile"
                                  placeholder="Enter number"
                                  className="w-full rounded border px-3 py-2 text-sm focus:border-blue-200 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="col-span-1">
                              <label htmlFor="email" className="text-base">
                                Email Address
                                {' '}
                                <span className="text-danger">*</span>
                              </label>
                              <div>
                                <Field
                                  type="email"
                                  name="email"
                                  id="email"
                                  placeholder="Enter email address"
                                  className="w-full rounded border px-3 py-2 text-sm focus:border-blue-200 focus:outline-none"
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="error mt-1 text-xs text-red-500"
                                />
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="gender" className="text-base">
                                Gender
                              </label>
                              <div>
                                <Select
                                  style={{ width: '100%' }}
                                  optionFilterProp="label"
                                  size="large"
                                  id="gender"
                                  placeholder="Select One"
                                  onChange={val => setFieldValue('gender', val)}
                                  options={[
                                    { label: 'MALE', value: 'MALE' },
                                    { label: 'FEMALE', value: 'FEMALE' },
                                    { label: 'OTHERS', value: 'OTHERS' },
                                  ]}
                                  value={values?.gender ? values.gender : undefined}
                                />
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="bloodGroup" className="text-base">
                                Blood Group
                              </label>
                              <div>
                                <Select
                                  style={{ width: '100%' }}
                                  optionFilterProp="label"
                                  size="large"
                                  id="bloodGroup"
                                  placeholder="Select One"
                                  onChange={val =>
                                    setFieldValue('bloodGroup', val)}
                                  options={[
                                    { label: 'A+', value: 'A+' },
                                    { label: 'A-', value: 'A-' },
                                    { label: 'B+', value: 'B+' },
                                    { label: 'B-', value: 'B-' },
                                    { label: 'O+', value: 'O+' },
                                    { label: 'O-', value: 'O-' },
                                    { label: 'AB+', value: 'AB+' },
                                    { label: 'AB-', value: 'AB-' },
                                  ]}
                                  value={
                                    values?.bloodGroup
                                      ? values.bloodGroup
                                      : undefined
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="dateOfBirth" className="text-base">
                                Date of Birth
                              </label>
                              <div className="flex items-center">
                                <DatePicker
                                  format="YYYY-MM-DD"
                                  placeholder="Date"
                                  size="large"
                                  style={{ width: '100%' }}
                                  onChange={(dateString) => {
                                    setFieldValue(
                                      'dateOfBirth',
                                      dayjs(dateString).format('YYYY-MM-DD'),
                                    );
                                  }}
                                  value={
                                    dayjs(values?.dateOfBirth).isValid()
                                      ? dayjs(values?.dateOfBirth)
                                      : ''
                                  }
                                />
                              </div>
                              {errors?.dateOfBirth
                                ? (
                                    <div className="error mt-1 text-xs text-red-500">
                                      {errors.dateOfBirth.toString()}
                                    </div>
                                  )
                                : null}
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="profession" className="text-base">
                                Current Profession
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="profession"
                                  id="profession"
                                  placeholder="Enter profession"
                                  className="w-full rounded border px-3 py-2 text-sm focus:border-blue-200 focus:outline-none"
                                />
                                <ErrorMessage
                                  name="profession"
                                  component="div"
                                  className="error mt-1 text-xs text-red-500"
                                />
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="fatherName" className="text-base">
                                Father&apos;s Name
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="fatherName"
                                  id="fatherName"
                                  placeholder="Enter name"
                                  className="w-full rounded border px-3 py-2 text-sm focus:border-blue-200 focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="motherName" className="text-base">
                                Mother&apos;s Name
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="motherName"
                                  id="motherName"
                                  placeholder="Enter name"
                                  className="w-full rounded border px-3 py-2 text-sm focus:border-blue-200 focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="identityType" className="text-base">
                                Goverment Issued Photo ID
                              </label>
                              <div>
                                <Select
                                  style={{ width: '100%' }}
                                  optionFilterProp="label"
                                  size="large"
                                  id="identityType"
                                  placeholder="Select One"
                                  onChange={val =>
                                    setFieldValue('identityType', val)}
                                  options={[
                                    { label: 'National ID', value: 'NID' },
                                    { label: 'Passport', value: 'PASSPORT' },
                                    { label: 'Driver\'s License', value: 'DRIVERS' },
                                  ]}
                                  value={
                                    values?.identityType
                                      ? values.identityType
                                      : undefined
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label htmlFor="file" className="text-base">
                                Upload Document
                              </label>
                              <div className="flex gap-8">
                                <Upload
                                  beforeUpload={() => false}
                                  multiple
                                  maxCount={2}
                                  onChange={(info) => {
                                    setFieldValue('files', info.fileList);
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="rounded-md border bg-gradient-to-b from-white to-neutral-100 px-6 py-2 text-base font-medium text-gray-600"
                                  >
                                    Choose File
                                  </button>
                                  <ErrorMessage
                                    name="files"
                                    component="div"
                                    className="error mt-1 text-xs text-red-500"
                                  />
                                </Upload>

                                {id && (
                                  <>
                                    {SingleAdmin?.identityFiles.map(
                                      (file: string) => (
                                        <a
                                          key={file}
                                          href={file}
                                          target="_blank"
                                          download="docs"
                                          className="uploaded-documents hidden"
                                        >
                                          {getUploadedFileExtenstion(file)
                                          && 'View Docs'}
                                        </a>
                                      ),
                                    )}

                                    <button
                                      type="button"
                                      onClick={() => {
                                        const allFiles
                                      = document.querySelectorAll<HTMLElement>(
                                        '.uploaded-documents',
                                      );

                                        if (allFiles) {
                                          for (let i = 0; i < allFiles.length; i++) {
                                            // eslint-disable-next-line ts/no-unused-expressions
                                            [allFiles[i]?.click()];
                                          }
                                        }
                                      }}
                                    >
                                      View Docs
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>

                            {!id && (
                              <div className="col-span-2">
                                <Password
                                  setFieldValue={setFieldValue}
                                  values={values}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>

                      <div>
                        <Collapse
                          style={{
                            borderRadius: 0,
                          }}
                          bordered={false}
                          expandIconPosition="end"
                          defaultActiveKey={['1']}
                          className="drop-shadow-sm"
                          items={[
                            {
                              key: '1',
                              label: (
                                <span className="font-medium tracking-wide text-gray-900">
                                  Action
                                </span>
                              ),
                              headerClass: 'text-base bg-[#F6F7FA] shadow-sm',
                              style: {
                                backgroundColor: '#fff',
                              },
                              children: (
                                <>
                                  <div>
                                    <label htmlFor="roleIds">
                                      Role
                                      {' '}
                                      <span className="text-danger"> *</span>
                                    </label>
                                    <div>
                                      <Select
                                        allowClear
                                        size="large"
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        defaultValue={
                                          SingleAdmin?.roleIds
                                            ? SingleAdmin?.roleIds
                                            : undefined
                                        }
                                        onChange={(val) => {
                                          const roleIds: number[] = [];

                                          roleIds.push(val);
                                          setFieldValue('roleIds', roleIds);
                                        }}
                                        value={
                                          values?.roleIds
                                            ? values?.roleIds
                                            : undefined
                                        }
                                        options={options}
                                      />
                                    </div>
                                  </div>
                                  <button
                                    className={clsx(
                                      'btn btn-secondary mt-5 w-full uppercase',
                                      isLoading || uploading ? 'disabled' : '',
                                    )}
                                    type="submit"
                                    disabled={isLoading || uploading}
                                  >
                                    {isLoading || uploading
                                      ? (
                                          <Spin size="default" />
                                        )
                                      : id
                                        ? (
                                            'Update'
                                          )
                                        : (
                                            'Add'
                                          )}
                                  </button>
                                </>
                              ),
                            },
                          ]}
                        />

                        <div className="mt-5">
                          <Collapse
                            style={{
                              borderRadius: 0,
                            }}
                            bordered={false}
                            expandIconPosition="end"
                            defaultActiveKey={['1']}
                            className="drop-shadow-sm"
                            items={[
                              {
                                key: '1',
                                label: (
                                  <span className="font-medium tracking-wide text-gray-900">
                                    Profile Photo
                                  </span>
                                ),
                                headerClass: 'text-base bg-[#F6F7FA] shadow-sm',
                                style: {
                                  backgroundColor: '#fff',
                                },
                                children: (
                                  <div className="mt-4">
                                    <MediaInput
                                      onChange={(event: any) => {
                                        setFieldValue('picture', event?.data?.path);
                                      }}
                                      src={
                                        values?.picture !== 'null'
                                          ? values?.picture
                                          : '/assets/misc/image-upload.svg'
                                      }
                                      type="image"
                                    />
                                  </div>
                                ),
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  )
                : (
                    <div className="flex min-h-screen items-center justify-center">
                      <Spin className="large" />
                    </div>
                  )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateAdmin;
