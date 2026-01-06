import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoDotFill } from 'react-icons/go';
import { GrGallery } from 'react-icons/gr';
import { IoPlay } from 'react-icons/io5';

import { banglaDateFormat, excerpt } from '@/utils/Helpers';

type BlogCardProps = {
  data?: any;
  classes?: {
    root?: any;
    imageWrapper?: string;
    imageStyle?: string;
    iconWrapper?: string;
    title?: string;
    icon?: string;
    data?: string;
    galleryWrapper?: string;
    icongallery?: string;
    body?: string;
    badge?: string;
    highlight?: string;
    desc?: string;
    date?: string;
    hero?: string;
    overlay?: string;
    imgiconWrapper?: string;
    imgicon?: string;
  };
  type?: string;
};
const BlogCard = ({ data, classes, type }: BlogCardProps) => {
  return (
    <>
      {type === 'VIDEO'
        ? (
            <Link
              href={`/video-gallery/${data?.slug}`}
              className={`group relative grid hover:text-inherit  ${
                classes?.root ? classes.root : ''
              }`}
            >
              <div
                className={` ${classes?.imageWrapper ? classes.imageWrapper : ''}`}
              >
                <Image
                  src={
                    data?.featuredImage || '/images/misc/image_placeholder_big.webp'
                  }
                  alt="Top Stories"
                  width={960}
                  height={540}
                  className={`object-cover ${
                    classes?.imageStyle ? classes.imageStyle : ''
                  }`}
                />
                <div
                  className={`hidden items-center justify-center rounded-full  ${
                    classes?.iconWrapper ? classes.iconWrapper : ``
                  }`}
                >
                  <IoPlay
                    className={`text-white ${classes?.icon ? classes.icon : ``}`}
                  />
                </div>

                <div
                  className={`hidden items-center justify-center rounded-full  ${
                    classes?.galleryWrapper ? classes.galleryWrapper : ``
                  }`}
                >
                  <GrGallery
                    className={`text-black ${
                      classes?.icongallery ? classes.icongallery : ``
                    }`}
                  />
                </div>
              </div>
              <div className={` ${classes?.body ? classes.body : ''}`}>
                <h3
                  className={`mb-[10px] line-clamp-2 transition-all group-hover:text-primary ${
                    classes?.title ? classes.title : ''
                  }`}
                >
                  {data?.highlight && (
                    <span
                      className={`inline-flex items-center gap-1 pr-1 ${
                        classes?.highlight ? classes.highlight : ``
                      }`}
                    >
                      <span className=" mb-0 font-medium leading-[25px] text-primary">
                        {excerpt(data?.highlight, 12)}
                      </span>
                      <GoDotFill className="text-sm text-primary" />
                    </span>
                  )}

                  {data?.title}
                </h3>

                {data?.excerpt && (
                  <p
                    className={`line-clamp-4  ${
                      classes?.desc ? classes?.desc : ''
                    }`}
                  >
                    {data?.excerpt}
                  </p>
                )}

                <span
                  className={`mb-0 text-[13px] ${
                    classes?.date ? classes?.date : ''
                  }`}
                >
                  {banglaDateFormat(data?.publishedAt)}
                </span>
              </div>
              {data?.excerpt && (
                <p className={` hidden  ${classes?.hero ? classes?.hero : ''}`}>
                  {data?.excerpt}
                </p>
              )}
              <div
                className={`blog_card_overlay absolute left-0 top-0 hidden size-full ${
                  classes?.overlay ? classes.overlay : ''
                }`}
              />
            </Link>
          )
        : type === 'PICTURE'
          ? (
              <Link
                href={`/image-gallery/${data?.slug}`}
                className={`group relative grid hover:text-inherit  ${
                  classes?.root ? classes.root : ''
                }`}
              >
                <div
                  className={` ${classes?.imageWrapper ? classes.imageWrapper : ''}`}
                >
                  <Image
                    src={
                      data?.featuredImage || '/images/misc/image_placeholder_big.webp'
                    }
                    alt="Top Stories"
                    width={960}
                    height={540}
                    className={`object-cover ${
                      classes?.imageStyle ? classes.imageStyle : ''
                    }`}
                  />
                  <div
                    className={`hidden items-center justify-center rounded-full  ${
                      classes?.iconWrapper ? classes.iconWrapper : ``
                    }`}
                  >
                    <IoPlay
                      className={`text-white ${classes?.icon ? classes.icon : ``}`}
                    />
                  </div>

                  <div
                    className={`hidden items-center justify-center rounded-full  ${
                      classes?.galleryWrapper ? classes.galleryWrapper : ``
                    }`}
                  >
                    <GrGallery
                      className={`text-black ${
                        classes?.icongallery ? classes.icongallery : ``
                      }`}
                    />
                  </div>
                </div>
                <div className={` ${classes?.body ? classes.body : ''}`}>
                  <h3
                    className={`mb-[10px] line-clamp-2 transition-all group-hover:text-primary ${
                      classes?.title ? classes.title : ''
                    }`}
                  >
                    {data?.highlight && (
                      <span
                        className={`inline-flex items-center gap-1 pr-1 ${
                          classes?.highlight ? classes.highlight : ``
                        }`}
                      >
                        <span className=" mb-0 font-medium leading-[25px] text-primary">
                          {excerpt(data?.highlight, 12)}
                        </span>
                        <GoDotFill className="text-sm text-primary" />
                      </span>
                    )}

                    {data?.title}
                  </h3>

                  {data?.excerpt && (
                    <p
                      className={`line-clamp-4 ${classes?.desc ? classes?.desc : ''}`}
                    >
                      {data?.excerpt}
                    </p>
                  )}

                  <span
                    className={`mb-0 text-[13px] ${
                      classes?.date ? classes?.date : ''
                    }`}
                  >
                    {banglaDateFormat(data?.publishedAt)}
                  </span>
                </div>
                {data?.excerpt && (
                  <p className={` hidden  ${classes?.hero ? classes?.hero : ''}`}>
                    {data?.excerpt}
                  </p>
                )}
                <div
                  className={`blog_card_overlay absolute left-0 top-0 hidden size-full ${
                    classes?.overlay ? classes.overlay : ''
                  }`}
                />
              </Link>
            )
          : (
              <Link
                href={`/${data.primCategory.slug}/${data?.slug}`}
                className={`group relative grid hover:text-inherit  ${
                  classes?.root ? classes.root : ''
                }`}
              >
                <div
                  className={` ${classes?.imageWrapper ? classes.imageWrapper : ''}`}
                >
                  <Image
                    src={
                      data?.featuredImage || '/images/misc/image_placeholder_big.webp'
                    }
                    alt="Top Stories"
                    width={960}
                    height={540}
                    className={`object-cover ${
                      classes?.imageStyle ? classes.imageStyle : ''
                    }`}
                  />
                  <div
                    className={`hidden items-center justify-center rounded-full  ${
                      classes?.iconWrapper ? classes.iconWrapper : ``
                    }`}
                  >
                    <IoPlay
                      className={`text-white ${classes?.icon ? classes.icon : ``}`}
                    />
                  </div>

                  <div
                    className={`hidden items-center justify-center rounded-full  ${
                      classes?.galleryWrapper ? classes.galleryWrapper : ``
                    }`}
                  >
                    <GrGallery
                      className={`text-black ${
                        classes?.icongallery ? classes.icongallery : ``
                      }`}
                    />
                  </div>
                </div>
                <div className={` ${classes?.body ? classes.body : ''}`}>
                  <h3
                    className={`mb-[10px] line-clamp-2 transition-all group-hover:text-primary ${
                      classes?.title ? classes.title : ''
                    }`}
                  >
                    {data?.highlight && (
                      <span
                        className={`inline-flex items-center gap-1 pr-1 ${
                          classes?.highlight ? classes.highlight : ``
                        }`}
                      >
                        <span className=" mb-0 font-medium leading-[25px] text-primary">
                          {excerpt(data?.highlight, 12)}
                        </span>
                        <GoDotFill className="text-sm text-primary" />
                      </span>
                    )}

                    {data?.title}
                  </h3>

                  {data?.excerpt && (
                    <p
                      className={`line-clamp-4  ${
                        classes?.desc ? classes?.desc : ''
                      }`}
                    >
                      {data?.excerpt}
                    </p>
                  )}

                  <span
                    className={`mb-0 text-[13px] ${
                      classes?.date ? classes?.date : ''
                    }`}
                  >
                    {banglaDateFormat(data?.publishedAt)}
                  </span>
                </div>
                {data?.excerpt && (
                  <p className={` hidden ${classes?.hero ? classes?.hero : ''}`}>
                    {data?.excerpt}
                  </p>
                )}
                <div
                  className={`blog_card_overlay absolute left-0 top-0 hidden size-full ${
                    classes?.overlay ? classes.overlay : ''
                  }`}
                />
              </Link>
            )}
    </>
  );
};

export default BlogCard;
