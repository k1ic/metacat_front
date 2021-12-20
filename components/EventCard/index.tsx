import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import style from './index.module.css';

type Props = {
  name?: string;
  description?: string;
  coverImg?: string;
  activityTime?: string;
  eventDetailUrl?: string;
  eventParcelUrl?: string;
  className?: string;
};

dayjs.extend(utc);

export default function EventCard({
  name,
  description,
  coverImg,
  activityTime,
  eventDetailUrl,
  eventParcelUrl,
  className,
}: Props) {
  const jumpToParcel = React.useCallback(
    (event) => {
      event.stopPropagation();
      window.open(eventParcelUrl);
    },
    [eventParcelUrl],
  );

  const jumpToDetail = React.useCallback(() => {
    window.open(eventDetailUrl);
  }, [eventDetailUrl]);

  const inTimeLine = React.useCallback(() => {
    if (!activityTime) {
      return false;
    }
    const times = activityTime.split('--');
    const start = times[0].trim();
    const end = times[1].trim();
    if (!start || !end) {
      return false;
    }
    const time1 = dayjs.utc(start);
    const time2 = dayjs.utc(end);
    const n = Date.now();
    if (time1.valueOf() <= n && time2.valueOf() >= n) {
      return true;
    }
    return false;
  }, [activityTime]);
  const hasEntry = inTimeLine();
  return (
    <div className={cn('p-5 flex', className, style.card)} onClick={jumpToDetail}>
      <img className={style.cover} src={coverImg || '/images/default.png'} />
      <div className={cn('flex-1 ', style.content)}>
        <div className={cn('flex h-auto justify-between items-center text-white')}>
          <div className={hasEntry ? 'w-11/12' : 'w-full'}>
            <div className={cn('text-xl font-semibold truncate', style.header)}>{name}</div>
            <div className={cn('text-base', style.time)}>Activity time：{activityTime}</div>
          </div>
          {hasEntry ? (
            <div
              className={cn('text-sm flex justify-center items-center', style.btn)}
              onClick={jumpToParcel}
            >
              Entry
            </div>
          ) : null}
        </div>
        <div className={cn('text-sm', style.description)}>{description}</div>
      </div>
    </div>
  );
}
