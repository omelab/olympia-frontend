// import Image from 'next/image'
import ConsultancyForm from '@/components/ConsultancyForm';

import Breadcumb from '@/components/breadcumb';
// import Button from '@/components/Button';
import ColorGuide from '@/components/ColourGuide';

export async function generateMetadata() {
  return {
    title: 'Color Visualiser | Olympia Paints & Construction Chemical',
    description: 'Visualiser of colors',
  };
}

export default function FrontendIndex() {
  return (
    <>
      <Breadcumb
        title="Color Visualiser"
        link="/visualization"
        background="/assets/images/banner-blue.webp"
      />

      <section className="pb-20 pt-16 clearfix">
        <div className="mx-auto w-full lg:max-w-7xl px-5 lg:px-0">
          <ColorGuide />
        </div>
      </section>

      {/* <section className="relative py-5 lg:y-20 pb-10">
        <div className="mx-auto grid max-w-96 grid-cols-1 md:max-w-7xl md:px-8 xl:px-0">
          <article className="w-full">
            <h2 className="mt-10 text-center text-xl lg:text-3xl uppercase tracking-wider">
              <strong className="font-bold">Your Home's Dream Look</strong>{' '}
              Starts With A Single Click
            </h2>
          </article>
        </div>
      </section> */}

      {/* <section className="max-w-4xl mx-auto px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="mx-auto">
            <Button classNames="rounded-full py-2 px-8 font-light bg-[#ff006d] text-[#fff] border border-[#ff006d]">
              Bedroom
            </Button>
          </div>
          <div className="mx-auto">
            <Button classNames="rounded-full py-2 px-8 font-light bg-white text-[#ff9100] border border-[#ff9100]">
              Living Room
            </Button>
          </div>
          <div className="mx-auto">
            <Button classNames="rounded-full py-2 px-8 font-light bg-white text-[#5aa200] border border-[#5aa200]">
              Kids Room
            </Button>
          </div>
        </div>
      </section> */}

      {/* <section className="py-20 pt-16  px-20">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:max-w-7xl">
          <div>
            <Image
              src="/assets/images/bed-visual-color.png"
              width={648}
              height={435}
              alt="bed with a visual colored wall"
            />
          </div>
          <div>
            <Image
              src="/assets/images/visual-colors.png"
              width={654}
              height={420}
              alt="list of visual color"
            />
          </div>
        </div>
      </section> */}

      <section className="py-20">
        <ConsultancyForm />
      </section>
    </>
  );
}
