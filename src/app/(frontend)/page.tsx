import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';
// import ColorCarousel from '@/components/ColorCarousel';
import ConsultancyForm from '@/components/ConsultancyForm';
import Slider from '@/components/Slider';
import { getData } from '@/api/lib/fetch';
import ColorGuide from '@/components/ColourGuide';
import ParallaxBanner from '@/components/parallax/ParallaxBanner';
import Concern from '@/components/Concern';

export async function generateMetadata() {
  return {
    title: 'Home | Olympia Paints & Construction Chemical',
    description: 'Homepage',
  };
}

export default async function FrontendIndex() {
  const { data: products } = await getData(
    'public/products?status=PUBLISHED&orderKey=id&orderType=desc&limit=2',
  );

  const aboutData = await getData('public/settings/about/homepage_message');

  return (
    <>
      <Slider />

      <section className="relative py-8 lg:py-20 pb-10">
        <div className="relative overflow-hidden py-0 lg:py-28  px-5">
          <Image
            src="/assets/images/about-bg.webp"
            alt="banner"
            fill
            className="absolute inset-0 -z-40 block h-auto w-full about_bg"
          />

          <div className="mx-auto grid w-full lg:max-w-7xl grid-cols-1 md:max-w-7xl md:grid-cols-1 px-5 md:px-8">
            <article className="w-full">
              <h2 className="mt-10 text-4xl font-semibold uppercase tracking-wider">
                Always a step Ahead
              </h2>

              <div
                className="mt-8 flex max-w-3xl flex-col gap-4"
                dangerouslySetInnerHTML={{
                  __html: aboutData?.value || 'No description available',
                }}
              ></div>
              {/* <div className="mt-8 flex max-w-3xl flex-col gap-4">  
                <p>
                  We pride ourselves on setting new work strategies, pushing the
                  boundaries of product development, and delving deep into
                  market research. But what truly sets us apart is our
                  unwavering spirit of wonderment. We don’t just follow trends;
                  we create them.
                </p>
                <p>
                  Our ability to innovate goes beyond mere product development.
                  We dive deep into market insights to uncover surprising
                  solutions that redefine the painting landscape. We believe in
                  challenging the status quo and offering never-thought-of
                  approaches to meet your painting needs.
                </p>
              </div> */}

              <Button classNames="mt-10 w-32" href="/about">
                Read More
              </Button>
            </article>

            <div className="lionHead">
              <Image
                src="/assets/images/lion.webp"
                alt="lion image"
                height={500}
                width={410}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-16 clearfix">
        <div className="mx-auto w-full lg:max-w-7xl px-5 lg:px-0">
          <ColorGuide />
        </div>
      </section>

      {/* Parralax 01 */}
      <section className="pb-0 pt-0 clearfix">
        <ParallaxBanner />
      </section>

      {/* <section className="py-20 pt-16">
        <div className="mx-auto w-full lg:max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 py-4">
            <div></div>
            <div className="mx-auto flex flex-col uppercase">
              <h2 className="text-xl lg:text-4xl font-bold">
                Your Home's Dream Look
              </h2>
              <h3 className="text-xl lg:text-4xl font-light">
                Starts with a single click
              </h3>
            </div>
          </div>
          <ColorCarousel />
          <Button href="/paints" classNames="mx-auto mt-20 w-40">
            Explore More
          </Button>
        </div>
      </section> */}

      <section className="relative z-10 min-h-[840px] bg-[#EDF3F6]">
        <div className="absolute left-0 top-32 -z-10 h-[478px] w-[55%] bg-[#A8D3FD] hidden md:block" />
        <hr className="absolute left-1/2 top-40 z-20 w-32 border-2 border-red-500  hidden md:block" />
        <div className="absolute right-0 top-20 -z-20 h-[529px]">
          <Image
            src="/assets/images/house-protection.webp"
            alt="house protection"
            height={629}
            width={940}
            className="hidden md:block"
          />
        </div>

        <div className="mx-auto w-full py-10 lg:py-12 lg:max-w-7xl">
          <div className="flex flex-col gap-4 px-8 lg:px-0">
            <h3 className="text-xl lg:text-3xl font-bold uppercase">
              Popular products
              <br />
              <span className="font-light">to protect your home</span>
            </h3>

            <div className="flex max-w-2xl flex-col gap-8">
              <div className="flex flex-col justify-between py-12 md:flex-row">
                {products &&
                  products.map((product: any) => (
                    <Link
                      key={product.id}
                      href={`/paints/${product.slug}`}
                      className="flex flex-col gap-2"
                    >
                      <div className="relative h-[308px] w-[311px] p-4 bg-white">
                        <Image
                          src={
                            product.featuredImage && product.featuredImage != ''
                              ? `https://olympiapaint.com/${product.featuredImage}`
                              : '/assets/images/products/placeholder.webp'
                          }
                          alt={product.title || 'product'}
                          height={700}
                          width={700}
                          className="size-full bg-white object-contain"
                        />
                      </div>
                      <h3 className="mb-0 mt-4 text-left text-lg uppercase leading-3">
                        Olympia
                      </h3>
                      <h4 className="text-left text-lg font-bold uppercase">
                        <strong>{product.title || 'Product Name'} </strong>
                      </h4>
                    </Link>
                  ))}

                {/* <Link
                  href="/paints/olympia-wall-putty"
                  className="flex flex-col gap-2 mt-10 lg:mt-0"
                >
                  <div className="h-[308px] w-[311px]">
                    <Image
                      src="/assets/images/products/Distemper.webp"
                      alt="olympia-wall-putty"
                      height={258}
                      width={200}
                      className="size-full bg-white object-contain"
                    />
                  </div>

                  <h3 className="mb-0 mt-4 from-neutral-300 text-left text-lg uppercase leading-3">
                    Olympia
                  </h3>
                  <h4 className="text-left text-lg font-bold uppercase">
                    <strong>Acrylic Distemper</strong>
                  </h4>
                </Link> */}
              </div>

              <Button href="/paints" classNames="mt-10 w-32 self-center">
                View All
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <Concern />
      </section>

      <section className="py-20 bg-gray-50">
        <ConsultancyForm />
      </section>
    </>
  );
}
