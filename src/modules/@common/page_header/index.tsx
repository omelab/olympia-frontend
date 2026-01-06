import clsx from 'clsx';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

import Line from '../line';

type Props = {
  breadcrumbsData?: {
    title: string;
    link?: string;
  }[];
  title: string;
  btnTitle?: string;
  btnLink?: string;
  setKeyword?: any;
  extraLeftSide?: any;
  extraRightSide?: any;
  hasModal?: boolean;
  handleModal?: () => void;
};

const PageHeader = ({
  breadcrumbsData,
  title,
  btnTitle,
  btnLink,
  setKeyword,
  extraLeftSide,
  extraRightSide,
  hasModal,
  handleModal,
}: Props) => {
  return (
    <div>
      {breadcrumbsData && breadcrumbsData?.length > 0
        ? (
            <div className="mb-4 flex items-center gap-2">
              {breadcrumbsData?.map((item: any, i: number) => {
                if (item?.link) {
                  return (
                    <Link
                      key={i}
                      href={item?.link || '#'}
                      className="flex items-center gap-1 transition-all"
                    >
                      <span>{item?.title}</span>
                      <FiChevronRight />
                    </Link>
                  );
                } else {
                  return (
                    <p key={i} className="mb-0">
                      {item?.title}
                    </p>
                  );
                }
              })}
            </div>
          )
        : null}

      <div className="grid w-full grid-cols-[1fr_1fr] items-center gap-5">
        <div className="flex items-center gap-3">
          <h3 className="mb-0 font-bold text-[#093A5D]">{title}</h3>
          {extraLeftSide || null}
        </div>

        <div className="ml-auto flex w-full items-center justify-end gap-3">
          <div
            className={clsx(
              setKeyword && btnTitle
                ? 'grid grid-cols-1 items-center gap-3'
                : 'flex items-center justify-end',
            )}
          >
            {hasModal && btnTitle
              ? (
                  <button
                    onClick={handleModal}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm uppercase text-white"
                  >
                    {btnTitle}
                  </button>
                )
              : (
                  btnLink && (
                    <Link
                      href={btnLink || '#'}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm uppercase text-white"
                    >
                      {btnTitle}
                    </Link>
                  )
                )}
          </div>
          {extraRightSide || null}
        </div>
      </div>
      <Line />
    </div>
  );
};

export default PageHeader;
