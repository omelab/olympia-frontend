import { Collapse, TreeSelect } from 'antd';
import { ErrorMessage } from 'formik';
import React from 'react';

import { useGetCategoryDropdownsQuery } from '@/api/category';

import type { ComponentsProps } from '../initial_value';
import { treeData } from '../utils';

const Category: React.FC<ComponentsProps> = ({
  values,
  setFieldValue,
  errors,
}) => {
  const { data: categories, isLoading } = useGetCategoryDropdownsQuery('');

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
              Category
            </span>
          ),
          headerClass: 'text-base bg-[#F6F7FA] shadow-sm',
          style: {
            backgroundColor: '#fff',
          },
          children: (
            <div className="pt-4">
              <div>
                <label htmlFor="categoryId">
                  Select Category
                  {' '}
                  <span className="text-red-500">*</span>
                </label>
                <TreeSelect
                  loading={isLoading}
                  style={{ width: '100%' }}
                  status={errors.categoryId && 'error'}
                  treeData={treeData(categories)}
                  placeholder="Select Category"
                  treeNodeFilterProp="title"
                  treeDefaultExpandAll
                  showSearch
                  onChange={(value: any) => {
                    setFieldValue('categoryId', value);
                  }}
                  value={values?.categoryId ? values?.categoryId : undefined}
                />
                <ErrorMessage
                  name="categoryId"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
          ),
        },
      ]}
    />
  );
};

export default Category;
