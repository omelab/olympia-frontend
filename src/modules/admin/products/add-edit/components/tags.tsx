import { Collapse, Select } from 'antd';
import React from 'react';

import { useGetPublicTagsDropdownQuery } from '@/api/public';

import type { ComponentsProps } from '../initial_value';

const Tags: React.FC<ComponentsProps> = ({ values, setFieldValue }) => {
  const { data: tags, isLoading } = useGetPublicTagsDropdownQuery();

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
              Tags
            </span>
          ),
          headerClass: 'text-base bg-[#F6F7FA] shadow-sm',
          style: {
            backgroundColor: '#fff',
          },
          children: (
            <div className="pt-4">
              <Select
                loading={isLoading}
                mode="tags"
                notFoundContent="Type to add tags"
                style={{ width: '100%' }}
                placeholder="Add Tags"
                onChange={(val: string | string[]) => {
                  setFieldValue('tags', typeof val === 'string' ? [val] : val);
                }}
                options={
                  tags?.map(tag => ({
                    label: tag.title,
                    value: tag.title,
                  })) || []
                }
                tokenSeparators={[',']}
                value={values?.tags || []}
              />
            </div>
          ),
        },
      ]}
    />
  );
};

export default Tags;
