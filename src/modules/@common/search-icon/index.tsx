import { Modal } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { IoLogoYoutube, IoSearchOutline } from 'react-icons/io5';
import { RiFacebookBoxLine } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';

import { useGetsingleNavQuery } from '@/api/navigation/api';
import { getDecryptedCookie } from '@/utils/Helpers';

const SearchIcon = () => {
  const path = usePathname();
  const NavName = 'Header';
  const { data: Navdata } = useGetsingleNavQuery({
    name: NavName,
  });

  const NavName2 = 'Hamburger';
  const { data: hamburgerNav } = useGetsingleNavQuery({
    name: NavName2,
  });

  const [userToken, setUserToken] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = getDecryptedCookie('userToken');
    setUserToken(token);
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <RxHamburgerMenu
        className="hidden cursor-pointer p-1 text-3xl lg:block"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        open={isModalOpen}
        title={(
          <div className="border-b pb-4">
            <div className="mx-auto max-w-screen-xl ">
              <div className="flex min-w-[120px] items-center justify-start">
                <Link href="/">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 156 132"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M64.0217 -3.9191e-06L0 132H28.805L74.3577 38.0791L108.078 107.604H75.0579V113.513H114.97V113.511H119.077L64.0217 -3.9191e-06Z"
                      fill="#EC1C24"
                    />
                    <path
                      d="M153.31 37.5766H121.132V45.2249H146.119L124.588 90.1625L99.4439 37.611H83.0769L119.54 113.693L156 37.5766H153.31Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
        onOk={handleOk}
        onCancel={handleCancel}
        className="global_search"
        footer={false}
      >
        <div className="mx-auto mt-5 max-w-[1258px]">
          <div className="grid grid-cols-[1fr_auto_300px] gap-[50px]">
            <div className="flex h-full flex-col justify-start gap-[26px]">
              {Navdata?.navigationItems
              && Navdata?.navigationItems?.length > 0 && (
                <nav className="navigation hidden lg:block ">
                  <ul className="mt-5  flex border-b">
                    {Navdata?.navigationItems?.map(
                      (item: any, index: any) => {
                        let p;
                        if (item.url === decodeURI(path)) {
                          p = true;
                        }
                        return (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                          <li
                            key={item.url}
                            onClick={() => setIsModalOpen(false)}
                            className={`${
                              p
                                ? 'flex cursor-pointer items-center gap-2   text-primary'
                                : 'flex cursor-pointer items-center gap-2  hover:text-secondary'
                            }`}
                          >
                            {!item?.children === null
                              ? (
                                  <div className="flex items-center">
                                    <div className="flex cursor-pointer items-center gap-2 px-2 pb-[15px] pt-[20px] hover:text-secondary ">
                                      <span className="w-[130px] text-lg">
                                        <Link
                                          href={`${item?.url}`}
                                          className="flex items-center gap-3 text-base"
                                        >
                                          {item?.title}

                                          <IoIosArrowForward className=" text-primary" />
                                        </Link>
                                      </span>
                                    </div>

                                    <div className=" text-base">
                                      <ul className="flex">
                                        {item?.children?.map(
                                          (cldn: any, i: any) => {
                                            return (
                                              <div
                                                key={i}
                                                className="flex items-center"
                                              >
                                                <li>
                                                  <Link
                                                    href={`${cldn?.url}`}
                                                    className="flex items-center gap-2 px-2 pb-[15px] pt-[20px] !text-sm font-normal"
                                                  >
                                                    {cldn?.title}
                                                  </Link>
                                                </li>
                                                {i >= 0 && (
                                                  <div className="mt-1 h-[20px] w-px bg-black"></div>
                                                )}
                                              </div>
                                            );
                                          },
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                )
                              : (
                                  <div className="flex items-center">
                                    <Link
                                      href={`${item.url}`}
                                      className="flex cursor-pointer items-center pb-[15px] pt-[20px] hover:text-secondary"
                                    >
                                      <span
                                        className={`${
                                          p
                                            ? 'flex cursor-pointer items-center gap-2 text-[20px]  text-primary'
                                            : 'flex cursor-pointer items-center gap-2 text-[20px] hover:text-secondary'
                                        }`}
                                      >
                                        {item?.title}
                                      </span>
                                    </Link>
                                    {index
                                    < Navdata?.navigationItems?.length - 1 && (
                                      <div className="mx-3 mt-1 h-[14px] w-px bg-gray-600"></div>
                                    )}
                                  </div>
                                )}
                          </li>
                        );
                      },
                    )}
                  </ul>
                  {hamburgerNav?.navigationItems?.map(
                    (item: any, i: number) => (
                      <ul key={item.title} className="flex  border-b">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                        <li onClick={() => setIsModalOpen(false)}>
                          {item?.children
                            ? (
                                <div className="flex items-center">
                                  <div className="flex cursor-pointer items-center gap-2 px-2 pb-[15px] pt-[20px] hover:text-secondary ">
                                    <span className="w-[110px] text-base">
                                      <Link
                                        href={`${item?.url}`}
                                        className=" flex items-center justify-between gap-3 text-xl"
                                      >
                                        {item?.title}
                                        <IoIosArrowForward className=" text-primary" />
                                      </Link>
                                    </span>
                                  </div>

                                  <div className=" text-base">
                                    <ul className={`flex `}>
                                      {item?.children?.map(
                                        (cldn: any, i: any) => {
                                          const islast = item?.children.length;

                                          return (
                                            <div
                                              key={i}
                                              className="flex items-center"
                                            >
                                              <li>
                                                <Link
                                                  href={`${cldn?.url}`}
                                                  className="!text-md flex items-center gap-2 px-2 pb-[15px] pt-[20px] font-normal"
                                                >
                                                  {cldn?.title}
                                                </Link>
                                              </li>
                                              {islast - 1 > i && (
                                                <div className="mt-1 h-[14px] w-px bg-gray-600"></div>
                                              )}
                                            </div>
                                          );
                                        },
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              )
                            : (
                                <div className="flex items-center">
                                  <Link
                                    href={`${item.url}`}
                                    className="flex cursor-pointer items-center pb-[15px] pt-[20px] hover:text-secondary"
                                  >
                                    <span
                                      className={`flex items-center text-base ${
                                        i === 0 ? 'px-2' : ''
                                      }`}
                                    >
                                      {item?.title}
                                      {' '}
                                      {i === 0 && `:`}
                                      {' '}
                                    </span>
                                  </Link>
                                  {i !== 0 && (
                                    <div className="mx-3 mt-1 h-[14px] w-px bg-black"></div>
                                  )}
                                </div>
                              )}
                        </li>
                      </ul>
                    ),
                  )}
                </nav>
              )}
            </div>
            <div className="h-full w-px bg-black"></div>
            <div className=" mt-5">
              <div className=" mb-4 grid grid-cols-2 border-b-2 pb-4">
                <Link
                  href={`${userToken ? '/personal-info' : '/subscriber-login'}`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                    className=" bg-grey h-[40px] w-[140px] rounded font-semibold text-gray-600 transition-all hover:bg-primary hover:text-white"
                  >
                    {`${userToken ? 'Dashboard' : 'Login'}`}
                  </button>
                </Link>
                <Link href="/search" className=" group hover:text-inherit">
                  <div className="relative ">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                      className="bg-grey flex w-[140px] justify-between rounded px-10 py-2 text-start transition-all  hover:text-white focus:outline-none group-hover:bg-primary"
                    >
                      খুঁজুন
                      <IoSearchOutline className="text-[20px] text-primary transition-all group-hover:text-white" />
                    </button>
                  </div>
                </Link>
              </div>
              <div className=" mb-3">
                <span>অনুসন্ধান করুন</span>
              </div>

              <div className=" mb-4 border-b-2 pb-4">
                <ul className=" flex gap-8">
                  <li>
                    <a
                      href="https://www.Facebook.com/generation-bd"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <RiFacebookBoxLine className="text-[24px]" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.Twitter.com/generation-bd"
                      className="_blank"
                    >
                      <BsTwitterX className="text-[20px]" />
                    </a>
                  </li>
                  <li>
                    <Link href="https://www.whatsapp.com/generation-bd">
                      <FaWhatsapp className="text-[24px]" />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.Twitter.com/generation-bd">
                      <FaInstagram className="text-[24px]" />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.Twitter.com/generation-bd">
                      <IoLogoYoutube className="text-[24px]" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <span>মোবাইল অ্যাপ ডাউনলোড করুন</span>
                <div className=" my-4 flex gap-3 border-b-2 pb-4">
                  <Link href="https://google.com/" passHref>
                    <Image
                      alt="google play"
                      height={40}
                      width={140}
                      src="https://static.vecteezy.com/system/resources/thumbnails/024/170/871/small_2x/badge-google-play-and-app-store-button-download-free-png.png"
                    />
                  </Link>
                  <Link href="https://apple.com/" passHref>
                    <Image
                      alt="google play"
                      height={40}
                      width={140}
                      src="https://digitopoly.files.wordpress.com/2016/06/app-store-logo.png"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SearchIcon;
