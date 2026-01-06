'use client';

import { Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useState } from 'react';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { Menu, Sidebar } from 'react-pro-sidebar';
import { useProfileData } from '@/hooks/useProfileData';

import SidebarSegmentDashboard from './segments/dashboard';
import SidebarSegmentMedia from './segments/media';
import SidebarSegmentMessages from './segments/messages';
import SidebarSegmentNews from './segments/news';
import SidebarSegmentPages from './segments/pages';
import SidebarSegmentProducts from './segments/products';
import SidebarSegmentSettings from './segments/settings';
import SidebarSegmentGallery from './segments/gallery';

type SidebarComponentProps = {
  collapsed: boolean;
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

export const SidebarComponent = ({
  collapsed,
  setCollapsed,
  toggled,
  setToggled,
}: SidebarComponentProps) => {
  const pathname = usePathname();
  const { profile, isProfileLoading } = useProfileData();
  const [sidebar, setSidebar] = useState<Array<string>>([]);
  useEffect(() => {
    setSidebar(profile?.roles[0]?.permissions);
  }, [profile?.roles]);

  return (
    <div className="relative h-screen">
      <button
        type="button"
        className="absolute right-[-12px] top-[45px] z-[100] hidden lg:block"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <FiArrowRightCircle className="text-2xl text-gray-500" />
        ) : (
          <FiArrowLeftCircle className="text-2xl text-gray-500" />
        )}
      </button>
      <Sidebar
        collapsed={collapsed}
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="lg"
        className="h-screen shrink-0 overflow-auto bg-white shadow-sm"
        backgroundColor="#fff"
        style={{ border: 0 }}
      >
        <div className="sticky top-0 z-50 bg-white p-2">
          <div className="relative px-2 py-0 flex justify-start">
            <Link href="/">
              <Image
                src="/assets/logo/logo.webp"
                width="198"
                height="119"
                alt="dti logo"
                className="block"
              />
            </Link>
          </div>
        </div>
        <Menu className="custom_side_nav">
          <Skeleton
            style={{
              marginTop: '80px',
              padding: '0 8px',
            }}
            loading={isProfileLoading}
            active
          >
            <SidebarSegmentDashboard pathname={pathname} />
            <SidebarSegmentProducts menuItems={sidebar} pathname={pathname} />
            <SidebarSegmentNews pathname={pathname} />
            <SidebarSegmentPages pathname={pathname} />
            <SidebarSegmentMedia pathname={pathname} />
            <SidebarSegmentMessages pathname={pathname} />
            <SidebarSegmentGallery pathname={pathname} />
            <SidebarSegmentSettings pathname={pathname} />
          </Skeleton>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
