import cn from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './styles.module.css';

import EventCard from '../EventCard';

type event = {
  name?: string;
  description?: string;
  coverImg?: string;
  activityTime?: string;
  eventDetailUrl?: string;
  eventParcelUrl?: string;
};

type Props = {
  events: event[];
  className?: string;
  loadMore?: () => void;
  hasMore?: boolean;
};

export default function PostGrid({ events = [], loadMore, hasMore, className }: Props) {
  const cls = cn('', className);

  return (
    <InfiniteScroll
      dataLength={events.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
        <div className="w-full flex justify-center py-4">
          <img src="/images/loading.png" className="animate-spin w-8 h-8" />
        </div>
      }
      className={cls}
      style={{ overflow: 'initial' }}
    >
      {events.map((ev, idx) => (
        <EventCard className="mb-7" {...ev} key={idx} />
      ))}
    </InfiniteScroll>
  );
}
