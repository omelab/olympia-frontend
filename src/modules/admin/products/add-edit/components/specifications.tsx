import { Button } from 'antd';
import { Field, FieldArray } from 'formik';
import React from 'react';

import type { ComponentsProps } from '../initial_value';

const Specifications: React.FC<ComponentsProps> = ({ values }) => {
  return (
    <div className="py-12">
      <div className="rounded-sm bg-[#F6F7FA]">
        <span className="block w-full p-4 font-semibold tracking-wide">
          Specification
        </span>
      </div>
      <div className="px-4 py-2">
        <FieldArray name="specification">
          {({ push, remove }) => (
            <div>
              {values.map((_: any, index: number) => (
                <div key={index} className="mt-3 flex w-full items-center gap-4">
                  <div className="w-1/3">
                    <Field
                      type="text"
                      name={`specification[${index}].key`}
                      id={`specification[${index}].key`}
                      placeholder="Add specification name"
                      className="w-full border px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      type="text"
                      name={`specification[${index}].value`}
                      id={`specification[${index}].value`}
                      placeholder="Add specification name's value"
                      className="w-full border px-3 py-2 text-sm"
                    />
                  </div>

                  <Button
                    type="primary"
                    danger
                    onClick={() => remove(index)}
                    disabled={values.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                type="dashed"
                onClick={() => push({ key: '', value: '' })}
                className="my-2"
              >
                Add More
              </Button>
            </div>
          )}
        </FieldArray>
      </div>
    </div>
  );
};

export default Specifications;
