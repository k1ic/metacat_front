import React from 'react';

import cn from 'classnames';
// Import Swiper React components
import { Pagination, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './index.module.css';

type img = {
  title?: string;
  imgUrl?: string;
  detailUrl?: string;
};

type Props = {
  imgs: Array<img>;
};

export default function Carousel({ imgs }: Props) {
  const jumpToDetail = React.useCallback(
    (url) => {
      window.open(url);
    },
    [imgs],
  );

  return (
    <div className={cn('w-full h-full', styles.swiper)}>
      <div className={cn('perbtn flex justify-center items-center', styles.btn, styles.perbtn)}>
        <img className={styles.icon} src="/images/carousel-left.png"></img>
      </div>
      <Swiper
        className="h-full"
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={true}
        navigation={{
          nextEl: '.nextbtn',
          prevEl: '.perbtn',
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class='${className}'></span>`;
          },
        }}
      >
        {imgs.map((slide, idx) => {
          return (
            <SwiperSlide
              className={cn('w-full h-full', styles.slide)}
              key={idx}
              onClick={() => {
                jumpToDetail(slide.detailUrl);
              }}
            >
              <img
                className={cn('w-full', styles.img)}
                src={slide.imgUrl || '/images/default-cover.png'}
              />
              <div
                className={cn(
                  'text-white w-full text-lg px-4 flex justify-start pt-3 font-medium truncate',
                  styles.title,
                )}
              >
                {slide.title}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className={cn('nextbtn flex justify-center items-center', styles.btn, styles.nextbtn)}>
        <img className={styles.icon} src="/images/carousel-right.png"></img>
      </div>
    </div>
  );
}
