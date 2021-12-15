/*
 * @Description:
 * @Autor: wq
 * @Date: 2021-12-15 17:03:47
 * @watermark: 成都沃飞长空
 * @LastEditors: wq
 */
import cn from 'classnames';
import style from './index.module.css';

type Props = {
  title?: string | 'SuperDelicious';
};

export default function EventCard({ title }: Props) {
  return (
    <div className={cn('p-5 flex', style.card)}>
      <img
        className={style.cover}
        src="https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg"
      />
      <div className={cn('flex-1 ', style.content)}>
        <div className={cn('flex h-auto justify-between items-center text-white')}>
          <div>
            <div className={cn('text-xl font-semibold truncate', style.header)}>{title}</div>
            <div className={cn('text-base', style.time)}>
              Activity time：2021/12/11/13:20 -- 2021/12/12/14:00
            </div>
          </div>
          <div className={cn('text-sm flex justify-center items-center', style.btn)}>Entry</div>
        </div>
        <div className={cn('text-sm', style.description)}>
          Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in
          the middle of nowhere.Gallery of Kerb and DaisyCoco
        </div>
      </div>
    </div>
  );
}
