import type { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

import { cn } from '@/utils/Helpers';

export default function Button({
  href,
  classNames,
  type = 'button',
  children,
}: {
  href?: Url;
  classNames?: string;
  children: React.ReactNode;
  type?: HTMLButtonElement['type'];
}) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={cn(
            'group relative block overflow-hidden border-2 border-primary p-2 text-center text-sm font-bold uppercase text-primary',
            classNames,
          )}
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            {children}
          </span>
          <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-700 ease-in-out group-hover:scale-x-100" />
        </Link>
      ) : (
        <button
          type={type}
          className={cn(
            'block bg-[#000263] px-4 py-2.5 text-center font-bold uppercase text-white',
            classNames,
          )}
        >
          {children}
        </button>
      )}
    </>
  );
}
