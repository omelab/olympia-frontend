import { Card } from 'antd';
import { ErrorMessage, Field } from 'formik';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type ComponentsProps = {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  setNewsFormat?: any;
  errors: any;
  touched: any;
};

const Password: React.FC<ComponentsProps> = ({ values }) => {
  const [type, setType] = useState('password');

  return (
    <Card
      title="Password"
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
      <div className="grid grid-cols-[120px_1fr] items-center">
        <label htmlFor="password">New Password</label>
        <div>
          <div className="relative">
            <Field
              type={type}
              name="password"
              id="password"
              className="w-full rounded border px-3 py-2 text-sm focus:border-blue-200 focus:outline-none"
              placeholder="Password"
              value={values?.password ?? ''}
            />
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              className="password_view"
              onClick={() => setType(type === 'password' ? 'text' : 'password')}
            >
              {type === 'password'
                ? (
                    <AiOutlineEyeInvisible className="text-xl" />
                  )
                : (
                    <AiOutlineEye className="text-xl" />
                  )}
            </div>
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="error mt-1 text-xs text-red-500"
          />
        </div>
      </div>
    </Card>
  );
};

export default Password;
