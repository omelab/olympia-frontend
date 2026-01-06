import { getData } from '@/api/lib/fetch';
import Breadcumb from '@/components/breadcumb';
// import Button from '@/components/Button';

export async function generateMetadata() {
  try {
    const data = await getData('public/pages/about'); // Fetch data once

    console.log('data', data);
    return {
      title: data.title || 'About Page',
      description: data.description || 'Default Description',
    };
  } catch (error) {
    return {
      title: 'About Us',
      description: 'Learn more about Olympia Paints',
    };
  }
}

export default async function About() {
  const data = await getData('public/pages/about'); // Fetch data once

  return (
    <>
      <Breadcumb
        title={data.title || 'About Us'}
        link="/about"
        background="/assets/images/banner-blue.webp"
      />
      <section className="relative py-20 pb-10">
        <article className="mx-auto grid max-w-full grid-cols-1 md:max-w-7xl px-10 md:px-8 xl:px-0">
          <div
            className="relative w-full page_content"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
          {/* <h2 className="mt-10 text-4xl font-semibold uppercase tracking-wider">
            Why Olympia Paints
          </h2>
          <div className="mt-8 w-full">
            <p>
              We pride ourselves on setting new work strategies, pushing the
              boundaries of product development, and delving deep into market
              research. But what truly sets us apart is our unwavering spirit of
              wonderment. We don’t just follow trends; we create them.
            </p>
            <p>
              Our ability to innovate goes beyond mere product development. We
              dive deep into market insights to uncover surprising solutions
              that redefine the painting landscape. We believe in challenging
              the status quo and offering never-thought-of approaches to meet
              your painting needs.
            </p>
          </div>

          <Button classNames="mt-10 w-32" href="/about">
            Read More
          </Button> */}
        </article>
      </section>
    </>
  );
}
