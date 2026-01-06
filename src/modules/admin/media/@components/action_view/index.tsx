import { Modal } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { FiDownload, FiEye } from 'react-icons/fi';
import ReactPlayer from 'react-player';

import { formatBytes } from '@/utils/Helpers';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

type propTypes = {
  data?: any;
};

const MediaActionView = ({ data }: propTypes) => {
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

  return (
    <>
      <button onClick={showModal} type="button">
        <FiEye />
      </button>

      <Modal
        centered
        title={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="70%"
        style={{ maxWidth: 'unset' }}
      >
        <div className="p-4">
          <div className="flex items-center justify-center">
            {data.type === 'image'
              ? (
                  <img
                    src={`${BASE_URL}${data.path}`}
                    alt={data.title}
                    className="max-h-[90vh]"
                  />
                )
              : null}

            {data.type === 'video'
              ? (
                  <ReactPlayer url={`${BASE_URL}${data.path}`} playing={true} controls={true} />
                )
              : null}

            {/* {data.type === "application" && (
              <Document file={data.path} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            )} */}
          </div>

          <div className="mt-3 flex items-center justify-center text-xs">
            <ul className="flex items-center gap-[50px]">
              <li>
                <div className="text-[#767676]">Name</div>
                <div>{data.title}</div>
              </li>
              <li>
                <div className="text-[#767676]">Alt</div>
                <div>{data.alt}</div>
              </li>
              <li>
                <div className="text-[#767676]">Size</div>
                <div>{formatBytes(data?.fileSize)}</div>
              </li>
              <li>
                <div className="text-[#767676]">Type</div>
                <div>{data?.type}</div>
              </li>
              <li>
                <div className="text-[#767676]">Last Updated</div>
                <div>{moment(data?.updated_at).format('LL')}</div>
              </li>
              <li>
                <a
                  href={data.path}
                  download
                  className="flex items-center gap-2 p-1"
                >
                  <FiDownload />
                  <span>Download</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MediaActionView;
