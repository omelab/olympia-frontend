import Image from 'next/image';
import Link from 'next/link';

export default function Concern() {
  return (
    <div className="mx-auto grid grid-cols-1 max-w-7xl gap-8 px-4 items-center">
      <h4 className="text-2xl font-bold leading-6 text-primary text-center uppercase">
        Our Concern
      </h4>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        <div className="flex w-100 border items-center justify-center">
          <Link href="https://dti-bd.com/">
            <Image
              src="/assets/logo/concern-dti.jpg"
              height={150}
              width={329}
              alt="Room styled with Marsh Green color"
              className="w-full"
            />
          </Link>
        </div>
        <div className="flex w-100 border items-center justify-center">
          <Link href="https://olympiacement.com/">
            <Image
              src="/assets/logo/concern-cement.jpg"
              height={150}
              width={329}
              alt="Room styled with Marsh Green color"
              className="w-full"
            />
          </Link>
        </div>
        <div className="flex w-100 border items-center justify-center">
          <Link href="http://completehomesolutions.xyz/">
            <Image
              src="/assets/logo/concern-home-solution.jpg"
              height={150}
              width={329}
              alt="Room styled with Marsh Green color"
              className="w-full"
            />
          </Link>
        </div>
        <div className="flex w-100 border items-center justify-center">
          <Link href="https://www.kikinben.com/">
            <Image
              src="/assets/logo/concern-kikinben.jpg"
              height={150}
              width={329}
              alt="Room styled with Marsh Green color"
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
