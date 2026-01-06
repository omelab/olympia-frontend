'use client';

import { useState } from 'react';

import Header from '@/modules/admin/layout/@components/header';
import SidebarComponent from '@/modules/admin/layout/@components/sidebar';
import { AntDProviders } from '@/providers/antd-providers';

export default function AdminLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <AntDProviders>
      <div className="font-sans">
        <div className="relative flex h-screen overflow-hidden">
          <SidebarComponent
            toggled={toggled}
            setToggled={setToggled}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <div className="h-screen w-full overflow-auto bg-[#f2f5f8]">
            <Header toggled={toggled} setToggled={setToggled} />
            <main className="mx-4 lg:mx-[30px]">{children}</main>
          </div>
        </div>
      </div>
    </AntDProviders>
  );
}
