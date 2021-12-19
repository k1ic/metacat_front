import React from 'react';

import cn from 'classnames';
// Import Swiper React components
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './index.module.css';

type tag = {
  name?: string;
  value?: number;
};

type Props = {
  tags: Array<tag>;
  label?: string;
  className?: string;
  onActive?: (label) => void;
};

export default function SwiperTag({ tags = [], label, className, onActive }: Props) {
  const [percent, setPercent] = React.useState(0);
  const [activeLabel, setActiveLabel] = React.useState(label);

  React.useEffect(() => {
    setActiveLabel(label);
  }, [label]);

  const activeTag = React.useCallback(
    (item) => {
      setActiveLabel(item.name);
      if (onActive) {
        onActive(item.name);
      }
    },
    [null],
  );

  return (
    <div className={cn('flex justify-between items-center relative w-full', className)}>
      <div
        className={cn(
          'per absolute z-50 flex justify-start items-center',
          {
            hidden: percent <= 0,
          },
          styles.per,
        )}
      >
        <img className={styles.icon} src="/images/tab-left.png"></img>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={1}
        slidesPerView="auto"
        className={cn('w-full', styles.swiper)}
        navigation={{
          prevEl: '.per',
          nextEl: '.next',
        }}
        onProgress={(swiper, progress) => {
          setPercent(progress);
        }}
      >
        {tags.map((item, index) => {
          return (
            <SwiperSlide
              className={cn(
                'box-border w-12 py-2 px-4 font-semibold text-white',
                item.name === activeLabel ? styles.active : null,
                styles.slide,
              )}
              key={index}
              onClick={() => {
                activeTag(item);
              }}
            >
              <span className="mr-1">{item.name}</span>
              <span>{item.value}</span>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className={cn(
          'next absolute z-50  flex justify-end items-center',
          {
            hidden: percent >= 1,
          },
          styles.next,
        )}
      >
        <img className={styles.icon} src="/images/tab-right.png"></img>
      </div>
    </div>
  );
}
