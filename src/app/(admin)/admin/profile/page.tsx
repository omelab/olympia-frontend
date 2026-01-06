'use client';

import React from 'react';

import { useGetProfileQuery } from '@/api/auth';

const ProfilePage = () => {
  const { data: profileData } = useGetProfileQuery({});

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 flex flex-col gap-5 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <h2 className=" mb-4 text-2xl font-bold">Profile View</h2>
        <div className="flex gap-4 ">
          <label htmlFor="firstName" className="  mb-0 text-sm font-bold text-gray-700">
            First Name:
          </label>
          <p className=" mb-0 text-gray-900">
            {' '}
            {profileData?.firstName}
          </p>
        </div>
        <div className="flex gap-4">
          <label htmlFor="lastName" className="  mb-0  text-sm font-bold text-gray-700">
            Last Name:
          </label>
          <p className=" mb-0 text-gray-900">{profileData?.lastName}</p>
        </div>
        <div className="flex gap-4">
          <label htmlFor="username" className="  mb-0  text-sm font-bold text-gray-700">
            Username:
          </label>
          <p className=" mb-0 text-gray-900">{profileData?.username}</p>
        </div>
        <div className="flex gap-4">
          <label htmlFor="email" className="  mb-0  text-sm font-bold text-gray-700">
            Email:
          </label>
          <p className=" mb-0 text-gray-900">{profileData?.email}</p>
        </div>
        <div className="flex gap-4">
          <label htmlFor="userType" className="  mb-0  text-sm font-bold text-gray-700">
            UserType:
          </label>
          <p className=" mb-0 text-gray-900">{profileData?.userType}</p>
        </div>
        <div className="flex gap-4">
          <label htmlFor="bio" className="  mb-0  text-sm font-bold text-gray-700">
            Bio:
          </label>
          <p className=" mb-0 text-gray-900">{profileData?.profile?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
