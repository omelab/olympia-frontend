import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="relative flex h-screen overflow-hidden">
      <div className="h-screen w-full overflow-auto">
        <section className="pt-8 lg:pt-[80px]">
          <div className="container">
            <div className="text-center">
              <h1 className="text-[80px] lg:text-[180px] lg:leading-[198px]">
                <span>404</span>
              </h1>
              <h2 className="mb-4 lg:mb-16">Page Not Founds</h2>
              {/* <div className="mb-[40px]"> */}
              {/* <Image
                src="/images/misc/404-image.png"
                alt="Not Found"
                width={1680}
                height={945}
                className={`mb-2 `}
              /> */}
              {/* </div> */}
              <Link href="/admin" className="btn btn-primary rounded">
                Go Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
