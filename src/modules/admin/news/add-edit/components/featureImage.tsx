'use client';
import { Collapse } from 'antd';
import { Field } from 'formik';
import React from 'react';

import MediaInput from '@/modules/admin/media/@components/media_input';

import type { ComponentsProps } from '../initial_value';

const FeatureImage: React.FC<ComponentsProps> = ({ values, setFieldValue }) => {
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
              Featured Image
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
                  setFieldValue('featuredImage', event?.data?.path);
                }}
                src={values?.featuredImage}
                type="image"
              />

              <div className="mt-3">
                <label htmlFor="imageCaption" className="">
                  Image Caption
                </label>
                <Field
                  type="text"
                  name="imageCaption"
                  id="imageCaption"
                  placeholder="Add image caption"
                  className="w-full border px-3 py-2 text-sm"
                />
              </div>
            </div>
          ),
        },
      ]}
    />
  );
};

export default FeatureImage;
