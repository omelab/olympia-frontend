import Image from 'next/image';
import Link from 'next/link';

import ConsultancyForm from '@/components/ConsultancyForm';
import { notFound } from 'next/navigation';
import Breadcumb from '@/components/breadcumb';
import { getData } from '@/api/lib/fetch';

interface PaintsPageProps {
  params: { slug: string }; // Slug from the URL
  searchParams: Record<string, string | undefined>; // Query parameters from the URL
}
export default async function ProductDetailsPage({
  params,
  searchParams,
}: PaintsPageProps) {
  const { slug } = params; // Get the slug from the route
  const status = searchParams.status || 'PUBLISHED';
  const orderKey = searchParams.orderKey || 'id';
  const orderType = searchParams.orderType || 'desc';
  const limit = searchParams.limit || '20';

  console.log('slug', slug);

  // Fetch single product
  const product = await getData(`public/products/${slug}`);
  if (!product) {
    notFound();
  }

  // Fetch related products
  const { data: relatedProducts } = await getData(
    `public/products?excludeProductIds=${product.id}&status=${status}&orderKey=${orderKey}&orderType=${orderType}&limit=${limit}`,
  );

  return (
    <>
      <Breadcumb
        title={product?.title}
        link={`/paints/${slug}`}
        background="/assets/images/banner-orange.png"
      />

      <section className="min-h-screen">
        <div className="mx-auto max-w-7xl py-[80px]">
          <div className="py-12 grid lg:grid-cols-[653px_1fr] gap-[30px] px-8 lg:px-0">
            <div className="border place-content-center">
              <div className="w-full flex items-center justify-center mx-auto">
                <Image
                  src={
                    product.featuredImage && product.featuredImage != ''
                      ? `https://olympiapaint.com/${product.featuredImage}`
                      : '/assets/images/products/placeholder.webp'
                  }
                  alt={product.title || 'product'}
                  height={700}
                  width={700}
                  className="bg-white object-contain size-full"
                />
              </div>
            </div>

            <div>
              <h2 className="text-[#2d2f92] text-2xl uppercase font-light">
                Olympia <br />
                <span className="font-bold">{product?.title}</span>
              </h2>

              <div className="mt-4">
                <div
                  className="text-sm flex flex-col gap-2"
                  dangerouslySetInnerHTML={{
                    __html: product?.description || 'No description available',
                  }}
                ></div>

                <div className="flex gap-8 mt-8">
                  <div>
                    <svg
                      version="1.2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 166 74"
                      width="166"
                      height="74"
                    >
                      <defs>
                        <image
                          width="166"
                          height="74"
                          id="img1"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAABKCAMAAAAG0N+8AAAAAXNSR0IB2cksfwAAAwBQTFRFAAAAAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGAADGZ2YHFAAAAQB0Uk5TAE9uZ2RrDwF3Lwt5IWJ9BAZygL9RkrBFVTsukFDEFCzIMGoVYXiLZTlAk2AFb0goICoXN1MZE10nAn9WtfP/6qao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"
                        />
                      </defs>
                      <style></style>
                      <use href="#img1" x="0" y="0" />
                    </svg>
                  </div>
                  <div>
                    <Image
                      src="/assets/olympia-trademark-logo/3-logos.png"
                      height={73}
                      width={285}
                      alt="3logos"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl py-[80px] px-20">
          <h3 className="uppercase font-bold text-4xl text-center lg:text-left">
            Other Proudcts <br />
            <span className="font-light">To Protect Your Home</span>
          </h3>
          <div className="py-12 grid lg:grid-cols-4 gap-x-8 gap-y-20 px-8 lg:px-0">
            {relatedProducts.map((row: any) => (
              <Link
                href={row.slug}
                className="flex flex-col min-h-[308px]"
                key={row.id}
              >
                <div className="border place-content-center py-6">
                  <div className="w-full mx-auto">
                    <Image
                      src={
                        row.featuredImage && row.featuredImage != ''
                          ? `https://olympiapaint.com/${row.featuredImage}`
                          : '/assets/images/products/placeholder.webp'
                      }
                      alt={row.title || 'product'}
                      height={700}
                      width={700}
                      className="bg-white size-full"
                    />
                  </div>
                </div>

                <h4 className="w-full py-1 flex justify-center items-center min-h-[80px] flex-col text-center font-bold uppercase text-primary bg-[#d3dde2]">
                  <span className="font-normal">Olympia</span>
                  {row.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div>
          <Image
            src="/assets/images/paints-image-section.webp"
            height={334}
            width={1920}
            alt="paints image"
            className="size-full"
          />
        </div>
      </section>

      <section className="py-20">
        <ConsultancyForm />
      </section>
    </>
  );
};
 
