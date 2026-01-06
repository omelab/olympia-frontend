import { Button, message, Modal, Spin } from 'antd';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdCloudUpload } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { useAddFilesMutation } from '@/api/media/media_api';
import { formatBytes } from '@/utils/Helpers';

import { allowed_size, allowFormate } from '../../helper';
// import CreateFolder from "../create_folder";

type propTypes = {
  children?: ReactNode;
};

const MediaAddNew = ({ children }: propTypes) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const parentFolderInfo = useSelector((state: any) => state.mediaSlice);
  const [submit, { isLoading }] = useAddFilesMutation();
  const [fileState, setFileState] = useState<any>([]);

  const [title, setTitle] = useState<any>([]);
  const [altName, setAltName] = useState<any>([]);
  const [type, setType] = useState<any>([]);

  // file state handler
  const onFileChange = (event: any) => {
    const titleArr = [...title];
    const typeArr: any = [...type];
    const fileArr: any = [...fileState];

    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (
          allowFormate.includes(event.target.files[i].type)
          && event.target.files[i].size / 1000 <= allowed_size
        ) {
          const fname = event.target.files[i].name;
          const title = fname.split('.').slice(0, -1).join('.');
          titleArr.push(title);

          const typeName = event.target.files[i].type.split('/')[0];
          typeArr.push(typeName);

          fileArr.push(event.target.files[i]);
        } else {
          //  error message
        }
      }
      setFileState(fileArr);
      setTitle(titleArr);
      setAltName(titleArr);
      setType(typeArr);
    }
  };

  const handleRemove = (index: any) => {
    const fileArr = [...fileState];
    const titleArr = [...title];
    const typeArr = [...type];
    const altNameArr = [...altName];
    if (index !== -1) {
      fileArr.splice(index, 1);
      titleArr.splice(index, 1);
      typeArr.splice(index, 1);
      altNameArr.splice(index, 1);
      setFileState(fileArr);
      setTitle(titleArr);
      setAltName(altNameArr);
      setType(typeArr);
    }
  };

  const changeName = (e: any) => {
    const index = e.target.name.replace('file_name_', '');
    const titleArr = [...title];
    titleArr[index] = e.target.value;
    setTitle(titleArr);
  };

  const changeAlt = (e: any) => {
    const index = e.target.name.replace('alt_name_', '');
    const altNameArr = [...altName];
    altNameArr[index] = e.target.value;
    setAltName(altNameArr);
  };

  const createTable = () => {
    const table = [];
    if (fileState && fileState.length > 0) {
      for (let i = 0; i < fileState.length; i++) {
        if (allowFormate.includes(fileState[i].type)) {
          const reader = new FileReader();

          // Read the image file as a data URL
          reader.readAsDataURL(fileState[i]);

          table.push(
            <tr key={i}>
              <td className="border px-2 py-1">
                <span>{i + 1}</span>
              </td>
              <td className="border px-2 py-0">
                <input
                  title={title[i]}
                  name={`file_name_${i}`}
                  className="w-full border px-2 py-1"
                  key={i}
                  onChange={changeName}
                  value={title[i]}
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  title={altName[i]}
                  name={`alt_name_${i}`}
                  className="w-full border px-2 py-1"
                  key={i}
                  onChange={changeAlt}
                  value={altName[i]}
                />
              </td>
              <td className="border px-2 py-1">
                <span className="shorter">{fileState[i].name}</span>
              </td>
              <td className="border px-2 py-0">
                <span className="shorter">
                  {fileState[i].type.split('/')[0]}
                </span>
              </td>
              <td className="border px-2 py-0">
                <span>
                  {' '}
                  {formatBytes(fileState[i].size)}
                </span>
              </td>
              <td className="border px-2 py-0">
                <button
                  value={i}
                  onClick={() => handleRemove(i)}
                  type="button"
                  className="hover:text-danger text-lg"
                >
                  <HiOutlineTrash />
                </button>
              </td>
            </tr>,
          );
        } else {
          // remove state
          // show alert
          //  error message
        }
      }
    }
    return table;
  };

  const saveFile = async () => {
    const formData = new FormData();
    if (fileState.length > 0) {
      // eslint-disable-next-line array-callback-return
      fileState.map((file: any, index: any) => {
        formData.append(`files[${index}]`, file);
      });
    }
    if (title.length > 0) {
      // eslint-disable-next-line array-callback-return
      title.map((item: any, index: any) => {
        formData.append(`info[${index}][title]`, item);
        formData.append(`info[${index}][name]`, item);
        formData.append(
          `info[${index}][directoryId]`,
          parentFolderInfo?.parent_id,
        );
      });
    }
    if (altName.length > 0) {
      // eslint-disable-next-line array-callback-return
      altName.map((alt: any, index: any) => {
        formData.append(`info[${index}][alt]`, alt);
      });
    }
    if (type.length > 0) {
      // eslint-disable-next-line array-callback-return
      type.map((item: any, index: any) => {
        formData.append(`info[${index}][type]`, item);
      });
    }

    const res: any = await submit(formData);
    if (!res?.error) {
      message.success(`Media created successfully!`);
      setIsModalOpen(false);
      setFileState([]);
      setTitle([]);
      setAltName([]);
      setType([]);
      const fileInput: HTMLInputElement | null
        = document.querySelector('#upload_field');
      if (fileInput) {
        fileInput.value = '';
      }
    } else {
      message.error(
        res?.error?.data?.message ?? 'Something went wrong. Try reload the page',
      );
    }
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions  */}
      <div onClick={() => setIsModalOpen(true)}>
        {children || (
          <Button type="primary" className="btn btn-secondary">Add New</Button>
        )}
      </div>

      <Modal
        destroyOnClose
        title={<div className="border-b p-4">Add Media</div>}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setFileState([]);
          setIsModalOpen(false);
        }}
        footer={null}
        width="100%"
        style={{ maxWidth: '1200px', padding: '20px' }}
      >
        <>
          <div className="mb-[-10px] pl-5 pt-2">
            <div>
              Directory:
              {' '}
              {parentFolderInfo.parent_id ? parentFolderInfo?.title : 'Root'}
            </div>
          </div>

          <div className="p-5 text-sm">
            <div className="mb-7">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor="upload_field"
                className="relative w-full cursor-pointer border-s-black"
              >
                <input
                  type="file"
                  multiple
                  id="upload_field"
                  className="absolute size-full cursor-pointer opacity-0"
                  onChange={onFileChange}
                  accept="image/*,.pdf,.txt,.mp4,.mp3"
                />
                <div className="border-greylight grid place-items-center border-2 border-dashed px-[40px] py-[20px]">
                  <div className="mb-0 text-[50px] text-primary">
                    <MdCloudUpload />
                  </div>
                  <div className="mb-1 text-center font-normal">
                    <div>Maximum file size is 2MB</div>
                    <div>
                      Supported file types: jpg, jpeg, png, webp
                    </div>
                  </div>
                  <div className="text-[20px] font-medium text-black">
                    Drop files to upload
                  </div>
                  <div className="mb-1 text-[20px] font-medium text-black">
                    or
                  </div>
                  <div>
                    <Button type="primary" className="btn btn-grey uppercase">
                      Browse files
                    </Button>
                  </div>
                </div>
              </label>
            </div>

            {fileState && fileState?.length > 0 && (
              <>
                <div className="mb-7 overflow-auto">
                  <table className="w-full text-center">
                    <thead className="bg-grey">
                      <tr>
                        <td className="border px-3 py-2">SL</td>
                        <td className="border px-3 py-2">New Name</td>
                        <td className="border px-3 py-2">Alt Tag</td>
                        <td className="border px-3 py-2">File Name</td>
                        <td className="border px-3 py-2">Type</td>
                        <td className="border px-3 py-2">Size</td>
                        <td className="border px-3 py-2">Action</td>
                      </tr>
                    </thead>
                    <tbody>{createTable()}</tbody>
                  </table>
                </div>

                <div className="flex items-center justify-end gap-3 ">
                  <Button
                    onClick={() => {
                      setFileState([]);
                      setIsModalOpen(false);
                    }}
                    type="default"
                    className="btn btn-grey uppercase"
                  >
                    Cancel
                  </Button>
                  {isLoading
                    ? (
                        <button
                          type="button"
                          className="disabled btn btn-secondary h-[38px] min-w-[90px] uppercase"
                        >
                          <Spin className="pt-1" size="default" />
                        </button>
                      )
                    : (
                        <Button
                          onClick={saveFile}
                          type="primary"
                          className="btn btn-secondary uppercase"
                        >
                          Upload
                        </Button>
                      )}
                </div>
              </>
            )}
          </div>
        </>
      </Modal>
    </>
  );
};

export default MediaAddNew;
