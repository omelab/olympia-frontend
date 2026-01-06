import { Select } from 'antd';
import { ErrorMessage, Field } from 'formik';
import React from 'react';

import { sliceFromHtml } from '@/utils/Helpers';

import type { ComponentsProps } from '../initial_value';

const MetaInformation: React.FC<ComponentsProps> = ({
  values,
  setFieldValue,
}) => {
  const metaDescription = values?.metaDescription
    ? values.metaDescription
    : values?.description
      ? sliceFromHtml(values.description, 50)
      : '';
  const metaTitle = values?.metaTitle
    ? values.metaTitle
    : values?.title
      ? values.title
      : '';

  return (
    <div className="mt-4">
      <div className="rounded-sm bg-[#F6F7FA]">
        <span className="block w-full p-4 font-semibold tracking-wide">
          SEO
        </span>
      </div>
      <div className="p-4">
        <div className="mt-3">
          <label htmlFor="metaTitle" className="tracking-wide">
            Meta Title
          </label>
          <Field
            type="text"
            name="metaTitle"
            id="metaTitle"
            placeholder="Add meta title"
            onChange={(e: any) => {
              setFieldValue('metaTitle', e.target.value);
            }}
            className="w-full border px-3 py-2 text-sm"
            value={metaTitle}
          />
        </div>
        <div>
          <label htmlFor="metaKeyword" className="tracking-wide">
            Keywords
          </label>
          <Select
            size="large"
            popupClassName="!hidden"
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Add keywords"
            onChange={(val: string | string[]) => {
              setFieldValue(
                'metaKeyword',
                typeof val === 'string' ? [val] : val,
              );
            }}
            tokenSeparators={[',']}
            value={values?.metaKeyword || []}
          />
          <ErrorMessage
            name="metaKeyword"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="mt-3">
          <label htmlFor="metaDescription" className="tracking-wide">
            Meta Description
          </label>
          <Field
            as="textarea"
            type="text"
            rows={3}
            onChange={(e: any) => {
              setFieldValue('metaDescription', e.target.value);
            }}
            name="metaDescription"
            id="metaDescription"
            placeholder="Type here"
            className="w-full border px-3 py-2 text-sm"
            value={metaDescription}
          />
        </div>
      </div>
    </div>
  );
};

export default MetaInformation;
