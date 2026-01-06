import { Collapse } from 'antd';
import React from 'react';

import MediaInput from '@/modules/admin/media/@components/media_input';

import type { ComponentsProps } from '../initial_value';

const SocialThumb: React.FC<ComponentsProps> = ({ values, setFieldValue }) => {
  return (
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
              Social Media Thumb
            </span>
          ),
          headerClass: 'text-base bg-[#F6F7FA] shadow-sm',
          style: {
            backgroundColor: '#fff',
          },
          children: (
            <div className="pt-4">
              <MediaInput
                onChange={(event: any) => {
                  setFieldValue('socialMediaImage', event?.data?.path);
                }}
                src={values?.socialMediaImage}
                type="image"
              />
            </div>
          ),
        },
      ]}
    />
  );
};

export default SocialThumb;
