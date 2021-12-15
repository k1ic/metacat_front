/*
 * @Description:
 * @Autor: wq
 * @Date: 2021-12-15 17:03:47
 * @watermark: 成都沃飞长空
 * @LastEditors: wq
 */
import cn from 'classnames';
import style from './index.module.css';

export default function EventCard() {
  return (
    <div className={cn('p-5 flex', style.card)}>
      <img
        className={style.cover}
        src="https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg"
      />
      <div className={cn('flex-1 h-auto', style.content)}>
        <div className=""></div>
      </div>
    </div>
  );
}
