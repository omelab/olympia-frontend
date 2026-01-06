import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from '../MobileNav';

const pageLinks = [
  { id: 1, title: 'Paints & Waterproofing', slug: '/paints' },
  { id: 3, title: 'Ideas', slug: '/visualization' },
  { id: 4, title: 'Color Shades', slug: '/color-shades' },
  { id: 5, title: 'About', slug: '/about' },
  { id: 6, title: 'Contact', slug: '/contact' },
  { id: 7, title: 'Home', slug: '/' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white py-4 lg:py-8 font-normal text-black drop-shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between desktop_header">
        <ul className="hidden h-full text-base uppercase lg:flex md:gap-6">
          {pageLinks.slice(0, 3).map((page: any) => (
            <li key={page.id}>
              <Link href={page.slug}>{page.title}</Link>
            </li>
          ))}
        </ul>

        <ul className="hidden h-full text-base uppercase lg:flex md:gap-6">
          {pageLinks.slice(3, pageLinks.length).map((page: any) => (
            <li key={page.id}>
              <Link href={page.slug}>{page.title}</Link>
            </li>
          ))}
          <li>
            <a
              href="tel:+8801824550550"
              className="inline-flex items-center gap-2"
            >
              <Phone fill="black" stroke="1px" size="20px" />
              +88 01824 550 550
            </a>
          </li>
        </ul>
      </nav>

      {/* Logo */}
      <Link href="/" className="navLogo">
        <Image
          src="/assets/logo/logo.webp"
          width="198"
          height="119"
          alt="olympia logo"
          className="absolute inset-4 mx-auto block"
        />
      </Link>

      <MobileNav pageLinks={pageLinks} />
    </header>
  );
}
