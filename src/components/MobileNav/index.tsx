'use client';
 
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
interface PageLink {
  slug: string;
  title: string;
}

interface MobileNavProps {
  pageLinks: PageLink[];
}
const MobileNav: React.FC<MobileNavProps> = ({ pageLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-transparent text-black">
      <div className="flex items-center justify-end  px-10 py-0">
        <button
          className="mobileAction relative z-50"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg
            className="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <nav
        className={`${isMenuOpen ? 'block' : 'hidden'} mobileNav  text-white absolute z-10 left-0 top-[65px] w-full py-4 px-10`}
      >
        <ul className="space-y-2 px-4">
          {pageLinks.map((page, index) => (
            <li key={index}>
              <Link
                href={page.slug}
                className="block font-semibold uppercase py-2 px-4 text-white  hover:text-yellow-500 transition-colors duration-200 rounded"
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default MobileNav;
