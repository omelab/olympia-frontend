'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

import { themeConfig } from '@/styles/theme';

export function AntDProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={themeConfig}>
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  );
}
