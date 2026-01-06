import Breadcumb from '@/components/breadcumb';
import ColorShades from '@/components/ColorShades';

export async function generateMetadata() {
  return {
    title: 'Color Shades',
    description: 'Color Shades',
  };
}

export default function About() {
  return (
    <>
      <Breadcumb
        title="Color Shades"
        link="/color-shades"
        background="/assets/images/banner-blue.webp"
      />

      <section className="bg-[url('/assets/images/landowner.svg')] px-2 py-10 md:px-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <ColorShades />
        </div>
      </section>
    </>
  );
}
