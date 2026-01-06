import { Button } from 'antd';
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import ReactPlayer from 'react-player';

import { cn } from '@/utils/Helpers';

import MediaList from '../..';

const DynamicModal = React.lazy(async () => await import('antd/lib/modal'));

type Props = {
  onChange?: any;
  src?: string;
  type?: string;
  isShowDelete?: boolean;
  className?: {
    image_preview?: string;
  };
};

const BASE_URL = 'https://olympiapaint.com';

const MediaInput = ({
  onChange,
  src,
  type = 'image',
  isShowDelete = true,
  className,
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaData, setMediaData] = useState();

  const ImagePreview = () => {
    const uploadImage = src || '/assets/misc/image-upload.svg';

    return (
      <img
        src={`${BASE_URL}${uploadImage}`}
        className={cn(
          `w-full h-full object-fit`,
          className?.image_preview ? className?.image_preview : '',
        )}
        alt="upload"
        height={168}
        width={200}
      />
    );
  };
  const VideoPreview = () => {
    return (
      <div>
        {!src
          ? (
              <img
                src="/images/misc/video-placeholder-big.png"
                className="size-full object-cover"
                alt="video placeholder"
              />
            )
          : (
              <ReactPlayer
                width="auto"
                height="auto"
                controls={true}
                url={src}
              />
            )}
      </div>
    );
  };

  const handleInsert = () => {
    if (onChange) {
      onChange({ data: mediaData });
    }
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div onClick={() => setModalOpen(true)} className="cursor-pointer">
          {type === 'image' ? <ImagePreview /> : null}
          {type === 'video' ? <VideoPreview /> : null}
        </div>
        {isShowDelete
          ? (
              <>
                {mediaData && (
                  <div className="absolute right-0 top-0 z-[100]">
                    <button
                      onClick={() => {
                        setMediaData(undefined);
                        if (onChange) {
                          onChange(undefined);
                        }
                      }}
                      className="bg-black/[.5] p-1"
                      type="button"
                    >
                      <FiX className="text-white transition-all hover:text-red-500" />
                    </button>
                  </div>
                )}
              </>
            )
          : null}
      </div>

      <DynamicModal
        className="media_insert_modal"
        centered
        title={<div className="border-b p-4">Media Library</div>}
        width="90%"
        style={{
          maxWidth: '100%',
          width: '90%',
        }}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setMediaData(undefined);
          //   selectedRowKeys([]);
        }}
        footer={(
          <>
            <Button
              onClick={() => {
                setModalOpen(false);
                setMediaData(undefined);
                //   selectedRowKeys([]);
              }}
              className={`btn btn-grey text-black `}
              type="default"
            >
              Cancel
            </Button>
            ,
            <Button
              onClick={() => {
                handleInsert();
                setModalOpen(false);
              }}
              className="btn btn-secondary mx-5 my-4 mt-0"
              type="primary"
            >
              Insert
            </Button>
            ,
          </>
        )}
      >
        <div className="h-[calc(100vh-180px)] overflow-auto p-5 pb-0">
          <MediaList isMediaInput setMediaData={setMediaData} type={type} />
        </div>
      </DynamicModal>
    </>
  );
};

export default MediaInput;
