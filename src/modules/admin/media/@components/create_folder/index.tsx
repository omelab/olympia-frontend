import { message, Modal } from 'antd';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { FiFolder } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useAddFoldersMutation } from '@/api/media/media_api';
import { mediaFolderParentInfo } from '@/api/media/media_slice';

type propTypes = {
  children?: any;
  setFiltered?: any;
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});
const init = {
  title: '',
};

const CreateFolder = ({ children, setFiltered }: propTypes) => {
  const dispatch = useDispatch();
  const folderParentInfo = useSelector((state: any) => state.mediaSlice);
  const [addFolter] = useAddFoldersMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addFolderHandler = async (values: any, resetForm: any) => {
    try {
      const res: any = await addFolter({
        title: values.title,
        ...(folderParentInfo?.parent_id && {
          parent_id: folderParentInfo?.parent_id,
        }),
      });
      if (!res?.error) {
        resetForm();
        message.success(`Folder created successfully!`);
        handleCancel();
      } else {
        message.error(
          res?.error?.data?.message
          ?? 'Something went wrong. Try reload the page',
        );
      }
    } catch {}
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={showModal} className="cursor-pointer">
        {children || (
          <div className="hover:bg-greylight flex w-full items-center gap-2 px-7 py-1.5 text-sm hover:text-inherit">
            <FiFolder />
            <span>Create Folder</span>
          </div>
        )}
      </div>

      <Modal
        title={<div className="border-b px-4 py-3.5">Create Folder</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="100%"
        style={{ maxWidth: '500px', padding: '20px' }}
      >
        <div className="p-5">
          <Formik
            validationSchema={validationSchema}
            initialValues={init}
            enableReinitialize={false}
            onSubmit={(values: any, { resetForm }) => {
              addFolderHandler(values, resetForm);
            }}
          >
            {({ handleSubmit, errors, touched }: any) => (
              <Form>
                <div className="mb-8">
                  <div className="mb-2 text-base font-medium">
                    Directory:
                    {' '}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        dispatch(
                          mediaFolderParentInfo({
                            directoryId: '',
                          }),
                        );
                        setFiltered((prev: any) => ({
                          ...prev,
                          directoryId: '',
                        }));
                      }}
                    >
                      Root
                    </span>
                    {folderParentInfo.parent_id
                      ? (
                          <span>
                            <span style={{ fontSize: '13px' }}>{` / `}</span>
                            {folderParentInfo?.title}
                          </span>
                        )
                      : null}
                  </div>

                  <div>
                    <label htmlFor="title" className="text-sm">
                      Folder Name
                      {' '}
                      <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Folder Name"
                      className="w-full rounded border px-3 py-2 placeholder:text-sm"
                    />
                    {errors?.title && touched?.title
                      ? (
                          <div className="error">{errors?.title}</div>
                        )
                      : null}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 ">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="btn btn-grey uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-secondary uppercase"
                  >
                    Create
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default CreateFolder;
