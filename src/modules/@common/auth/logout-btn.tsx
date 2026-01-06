'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const navigate = useRouter();

  const handleLogout = () => {
    Cookies.remove('userToken');
    Cookies.remove('refreshToken');
    navigate.push('/auth/login');
  };

  return (
    <button
      type="submit"
      className="btn btn-primary w-full rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
