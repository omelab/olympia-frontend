import Breadcumb from '@/components/breadcumb';
import ContactForm from '@/components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export async function generateMetadata() {
  return {
    title: 'Contact Page',
    description: 'AboutContact',
  };
}

export default function About() {
  return (
    <>
      <Breadcumb
        title="Contact Us"
        link="/contact"
        background="/assets/images/banner-blue.webp"
      />
      <section className="grid grid-cols-1 bg-[#F8F8F8] md:grid-cols-2">
        <div className="mx-auto w-full md:max-w-2xl">
          <div className="flex flex-col gap-8 px-12 text-sm text-black py-10 lg:py-40 xl:px-44">
            <p className="inline-flex items-center gap-2">
              <MapPin size="25px" />
              Corporate Office: 26/A Shah Saheb Lane Narinda, Wari, Dhaka - 1204
            </p>

            <p className="inline-flex items-center gap-2">
              <Phone fill="black" stroke="1px" size="20px" />
              <a href="tel:+88 01824 550 550">+88 01824 550 550</a>
            </p>

            <p className="inline-flex items-center gap-2">
              <Mail size="20px" />
              <a href="mailto:infoolympiapaint@gmail.com">
                infoolympiapaint@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div>
          <iframe
            title="address"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d488.27404533211626!2d90.42004399020068!3d23.713221346539246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9acfb6a7c31%3A0x15b10594e219ab05!2sShah%20Saheb%20Ln%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1729257271210!5m2!1sen!2sbd"
            width="100%"
            height="500"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-presentation allow-scripts allow-same-origin"
          />
        </div>
      </section>

      <section className="bg-[url('/assets/images/landowner.svg')] px-2 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="w-full overflow-hidden">
              <Image
                src="/assets/images/house-protection.webp"
                className="block h-auto w-full object-cover duration-700 hover:scale-110 md:h-[470px]"
                alt="bepari-tower"
                width={945}
                height={630}
              />
            </div>
            <div className="bg-white p-8 shadow drop-shadow-sm">
              <h2 className="text-3xl font-semibold uppercase">Contact Us</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
