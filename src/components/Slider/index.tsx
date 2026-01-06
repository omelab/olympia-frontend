'use client';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import './styles.css';

import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getData } from '@/api/lib/fetch';
import { useEffect, useState } from 'react';

export default function Slider() {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData('public/settings?type=slider');

        setSliders(data || []); // Ensure data has sliders
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Swiper
      spaceBetween={0}
      loop
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={500}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="size-full overflow-hidden bg-none"
    >
      {sliders.length == 0 && (
        <SwiperSlide className="size-full">
          <div className="h-full">
            <Image
              src={'/assets/images/slider-1-min.jpg'}
              alt={'Slider Image'}
              height={707}
              width={1920}
              className="block size-full object-cover"
            />
          </div>
        </SwiperSlide>
      )}

      {sliders &&
        sliders.map((item: any, index: number) => (
          <SwiperSlide className="size-full" key={index}>
            <div className="h-full">
              <Image
                src={
                  `https://olympiapaint.com/${item.value}` ||
                  '/assets/images/slider-1-min.jpg'
                }
                alt={'Slider Image'}
                height={707}
                width={1920}
                className="block size-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
