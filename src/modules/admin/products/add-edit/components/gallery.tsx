'use client';

import { Card } from 'antd';
import { ErrorMessage, Field, FieldArray } from 'formik';
import dynamic from 'next/dynamic';
import React from 'react';

import type { ComponentsProps } from '../initial_value';

const MediaInput = dynamic(() => import('@/modules/admin/media/@components/media_input'), { ssr: false });

const Gallery: React.FC<ComponentsProps> = ({ values, setFieldValue }) => {
  return (
    <Card
      title="Galleries"
      bordered={false}
      style={{
        borderRadius: 0,
      }}
      styles={{
        header: {
          backgroundColor: '#F6F7FA',
          borderRadius: 0,
        },
        body: {
          borderRadius: 0,
        },
      }}
    >
      <FieldArray name="galleries">
        {({ push, remove }) => (
          <div>
            {values?.galleries?.map((_entry: any, index: number) => (
              <div key={index}>
                <div className="mt-6">
                  <div className="col-span-2 grid grid-cols-1 items-center gap-x-[30px] gap-y-4 rounded-md border p-4 md:grid-cols-[250px_1fr]">
                    <MediaInput
                      onChange={(event: any) => {
                        setFieldValue(
                          `galleries.${index}.imageUrl`,
                          event?.data?.path,
                        );
                      }}
                      type="image"
                      src={values?.galleries[index].imageUrl}
                    />
                    <ErrorMessage
                      name={`galleries.${index}.imageUrl`}
                      component="div"
                      className="text-red-500"
                    />

                    <div>
                      <div className="w-full">
                        <label
                          htmlFor={`galleries.${index}.videoUrl`}
                          className="mb-1"
                        >
                          Youtube Video URL
                        </label>
                        <div>
                          <Field
                            type="text"
                            name={`galleries.${index}.videoUrl`}
                            id={`galleries.${index}.videoUrl`}
                            placeholder="Add Youtube Video URL"
                            className="w-full rounded-md border px-3 py-2 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="mt-3 w-full">
                        <label
                          htmlFor={`galleries.${index}.caption`}
                          className="mb-1"
                        >
                          Caption
                          {' '}
                          <span className="text-red-500">*</span>
                        </label>
                        <div>
                          <Field
                            type="text"
                            name={`galleries.${index}.caption`}
                            id={`galleries.${index}.caption`}
                            placeholder="Add Caption"
                            className="w-full rounded-md border px-3 py-2 focus:outline-none"
                          />
                          <ErrorMessage
                            name={`galleries.${index}.caption`}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>

                      <div className="mt-3 w-full">
                        <label
                          htmlFor={`galleries.${index}.photoCredit`}
                          className="mb-1"
                        >
                          Photo Credit
                          {' '}
                          <span className="text-red-500">*</span>
                        </label>
                        <div>
                          <Field
                            type="text"
                            name={`galleries.${index}.photoCredit`}
                            id={`galleries.${index}.photoCredit`}
                            placeholder="Photo Credit"
                            className="w-full rounded-md border px-3 py-2 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-3 rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600 focus:outline-none"
                >
                  Remove Entry
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                push({
                  imageUrl: '',
                  videoUrl: '',
                  caption: '',
                  photoCredit: '',
                })}
              className="mt-3 rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-600 focus:outline-none"
            >
              Add Media
            </button>
          </div>
        )}
      </FieldArray>
    </Card>
  );
};

export default Gallery;
