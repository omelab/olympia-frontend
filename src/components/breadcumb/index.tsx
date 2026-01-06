import Link from "next/link";
interface BreadcumbProps {
  title: string;
  link: string;
  background: string; // URL for the background image
}

export default function Breadcumb({ title, link, background }: BreadcumbProps) {
  return (
    <div
      className="w-full text-white bg-teal-500 relative bg-cover bg-right-bottom h-[115px] md:h-[230px]"
      style={{
        backgroundImage: `url(${background})`, // Use the background prop for dynamic image URL
      }}
    >
      <div className="flex flex-col items-start justify-center h-full max-w-7xl mx-auto">
        <ul className="flex space-x-4 text-[11px] lg:text-lg uppercase">
          <li>
            <Link href="/" className="hover:underline">
              Olympia Paints
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={link} className="hover:underline">
              {title}
            </Link>
          </li>
        </ul>
        <h2 className="uppercase text-[14px] lg:text-[30px] line font-bold leading-loose">
          {title}
        </h2>
      </div>
    </div>
  );
}
