import { message, Popconfirm } from 'antd';
// import { DownOutlined } from "@ant-design/icons";
import type { TreeProps } from 'antd/es/tree';
import ForwardDirectoryTree from 'antd/es/tree/DirectoryTree';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import {
  useDeleteFoldersMutation,
  useGetFoldersQuery,
} from '@/api/media/media_api';
import { mediaFolderParentInfo } from '@/api/media/media_slice';
import Skeleton from '@/modules/@common/skeleton';

const MediaFolders = ({ setFiltered }: any) => {
  const folderParentInfo = useSelector((state: any) => state.mediaSlice);
  const [activeKey, setActiveKey] = useState<any>(['']);
  const { data, isLoading } = useGetFoldersQuery({});
  const [deletId] = useDeleteFoldersMutation();

  const dispatch = useDispatch();
  const onSelect: TreeProps['onSelect'] = (key, info) => {
    setActiveKey(key);
    dispatch(
      mediaFolderParentInfo({
        title: info.node.title,
        parent_id: info.node.key,
      }),
    );
    setFiltered((prev: any) => ({ ...prev, directoryId: info.node.key }));
  };

  const confirm = async (node: any) => {
    try {
      const res: any = await deletId({
        id: node?.key,
      });
      if (!res?.error) {
        message.success('Item delete successfully.');
        dispatch(
          mediaFolderParentInfo({
            parent_id: null,
          }),
        );
      } else {
        if (res?.error?.status >= 500) {
          message.error('Somthing went wrong.');
        } else if (res?.error?.status === 400) {
          message.error('Folder contain media!');
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
    } catch {
      /* empty */
    }
  };

  return (
    <>
      {isLoading
        ? Array.from({ length: 8 }).fill(1).map((_, i) =>
          <Skeleton key={i} height={30} className="mb-1" />)
        : (
            <ForwardDirectoryTree
              showLine
              // switcherIcon={<DownOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
              defaultExpandAll
              onSelect={onSelect}
              selectedKeys={folderParentInfo?.parent_id ? activeKey : ['']}
              treeData={data || []}
              key="id"
              className="text-sm"
              titleRender={(node: any) => {
                const count = node?.mediaCount;
                return (
                  <>
                    {node.title}
                    <Popconfirm
                      placement="top"
                      title={(
                        <div>
                          {count > 0
                            ? (
                                <>
                                  <div>
                                    This folder includes
                                    {' '}
                                    {count}
                                    {count > 1 ? ' items' : ' item'}
                                    .
                                  </div>
                                  {' '}
                                  <div>
                                    Please remove the
                                    {' '}
                                    {count > 1 ? 'items' : 'item'}
                                    {' '}
                                    first!
                                  </div>
                                </>
                              )
                            : (
                                <div>Are you sure you want to delete this item?</div>
                              )}
                        </div>
                      )}
                      onConfirm={() => {
                        confirm(node);
                      }}
                      okButtonProps={{ className: `${count > 0 ? '!hidden' : ''}` }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <FiX className="node_delete" />
                    </Popconfirm>
                  </>
                );
              }}
            />
          )}
    </>
  );
};

export default MediaFolders;
