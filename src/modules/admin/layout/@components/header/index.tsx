import type { MenuProps } from 'antd';
import { Badge, Card, Dropdown, Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { ImProfile } from 'react-icons/im';
import { IoSettings } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';

import { useProfileData } from '@/hooks/useProfileData';
import { LogoutButton } from '@/modules/@common/auth/logout-btn';

import { MobileMenu } from './mobile-menu';

type HeaderProps = {
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ toggled, setToggled }: HeaderProps) => {
  const { profile, isProfileLoading } = useProfileData();

  const items: MenuProps['items'] = [
    {
      label: (
        <Card className="w-[250px]">
          <Skeleton loading={isProfileLoading} active>
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="col-span-1">
                {profile?.profile?.picture
                  ? (
                      <Image
                        height={40}
                        width={60}
                        alt="profile"
                        className="rounded-full object-contain"
                        src={profile?.profile?.picture}
                      />
                    )
                  : (
                      <RxAvatar size="24" />
                    )}
              </div>

              <div className="col-span-2">
                <p className="!mb-0 font-bold">{profile?.username}</p>
                <p className="!mb-0">{profile?.email}</p>
                <p className="!mb-0 flex items-center gap-1">
                  Role:
                  {' '}
                  <Badge count={profile?.userType} />
                </p>
              </div>
            </div>
          </Skeleton>
        </Card>
      ),
      key: 'user-profile-info-card',
    },
    {
      label: (
        <p className="!mb-0 flex items-center gap-2 p-2 text-base">
          <IoSettings />
          {' '}
          Setting
        </p>
      ),
      key: 'user-settings-button',
    },
    {
      label: (
        <Link href="/admin/profile">
          <p className="!mb-0 flex items-center gap-2 p-2 text-base">
            <ImProfile />
            {' '}
            Profile
          </p>
        </Link>
      ),
      key: 'user-profile-page-button',
    },
    {
      type: 'divider',
    },
    {
      label: <LogoutButton />,
      key: '1',
    },
  ];
  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white px-[30px] py-[10px] shadow-sm">
        <div className="flex items-center gap-4">
          <MobileMenu toggled={toggled} setToggled={setToggled} />
          <Link href="/admin/dashboard" className="font-bold">
            Admin Panel
          </Link>
        </div>
        <div>
          {profile
            ? (
                <Dropdown menu={{ items }}>
                  <CgProfile className="text-[30px] hover:text-primary" />
                </Dropdown>
              )
            : null}
        </div>
      </div>
    </>
  );
};

export default Header;
