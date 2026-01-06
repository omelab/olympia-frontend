import Image from 'next/image';
import Link from 'next/link';
import { getData } from '@/api/lib/fetch'; // Ensure your fetch function is server-side compatible
import ConsultancyForm from '@/components/ConsultancyForm';
import Breadcumb from '@/components/breadcumb';

export default async function PaintsPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const status = searchParams.status || 'PUBLISHED';
  const orderKey = searchParams.orderKey || 'id';
  const orderType = searchParams.orderType || 'desc';
  const limit = searchParams.limit || '20';

  // Fetch products based on query parameters
  const { data: products } = await getData(
    `public/products?status=${status}&orderKey=${orderKey}&orderType=${orderType}&limit=${limit}`,
  );

  return (
    <>
      <Breadcumb
        title="Paints & Waterproofing"
        link="/paints"
        background="/assets/images/banner-green.png"
      />
      <section className="min-h-screen">
        <div className="mx-auto max-w-7xl py-[80px]">
          <div className="py-12 grid lg:grid-cols-4 gap-x-8 gap-y-8 px-8 lg:px-0">
            {products.map((product: any) => (
              <Link
                href={`/paints/${product?.slug}`}
                className="flex flex-col"
                key={product.id}
              >
                <div className="border min-h-[308px] py-6">
                  <div className="w-full p-2">
                    <Image
                      src={
                        product.featuredImage && product.featuredImage != ''
                          ? `https://olympiapaint.com/${product.featuredImage}`
                          : '/assets/images/products/placeholder.webp'
                      }
                      alt={product.title || 'product'}
                      height={700}
                      width={700}
                      className="bg-white size-full"
                    />
                  </div>
                </div>

                <h4 className="w-full py-1 flex flex-col text-center align-items-center justify-center min-h-[80px] font-bold uppercase text-primary bg-[#d3dde2]">
                  <span className="font-normal">Olympia</span>
                  {product.title || 'Product Name'}
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
 