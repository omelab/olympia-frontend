import Link from 'next/link';

import { Facebook, Twitter, Youtube } from '../CustomIcons';
import { getData } from '@/api/lib/fetch';

export default async function Footer() {
  const data = await getData('public/settings?type=footer');

  // Extract values using `find()`
  const corporate_office = data.find(
    (item: any) => item.key === 'corporate_office',
  )?.value;
  const factory = data.find((item: any) => item.key === 'factory')?.value;
  const email = data.find((item: any) => item.key === 'email')?.value;
  const mobile = data.find((item: any) => item.key === 'mobile')?.value;
  const twitter = data.find((item: any) => item.key === 'twittter')?.value;
  const facebook = data.find((item: any) => item.key === 'facebook')?.value;
  const youtube = data.find((item: any) => item.key === 'youtube')?.value;

  return (
    <footer className="border-t-2 border-primary text-center  lg:text-left">
      <section className="bg-[#DEF8FF] py-12 text-sm font-normal">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-4 md:gap-0 md:px-0">
          <div className="flex flex-col justify-between gap-6 md:col-span-1">
            <header className="space-y-1">
              <h6 className="font-bold uppercase">
                Olympia Paints & Chemicals BD Ltd.
              </h6>
              <p>Corporate Office: {corporate_office}</p>
            </header>
            <p>Factory: {factory}</p>
          </div>

          <div className="flex flex-col justify-between gap-6 md:col-span-2 md:mx-auto">
            <header className="space-y-1">
              <h6 className="font-bold uppercase">Connect with Us</h6>
              <a href={`tel:{mobile}`} className="block">
                Mobile:{mobile}
              </a>
              <a href="mailto:infoolympiapaint@gmail.com" className="block">
                Email:{email}
              </a>
            </header>
            <Link
              href="/career"
              className="uppercase underline"
              prefetch={false}
            >
              Career
            </Link>
          </div>

          <div className="flex gap-6 md:col-span-1 justify-center ">
            {facebook && (
              <a
                href={`${facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Facebook />
              </a>
            )}

            {twitter && (
              <a
                href={`${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Twitter />
              </a>
            )}
            {youtube && (
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Youtube />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#2E2F90] py-4 text-sm font-normal text-white  px-10">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3  max-w-7xl items-center justify-between gap-4 px-4 md:gap-0 md:px-0">
          <div className="col-span-1 md:col-span-2 md:text-left">
            Copyright Olympia Paints &amp; Chemical BD
            Ltd.&nbsp;&shy;-&nbsp;2024, All rights reserved
          </div>
          <div className="text-center md:text-right">
            Developed by
            <a
              href="https://imeshltd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500"
            >
              i-Mesh Limited
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
