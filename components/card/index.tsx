import React from 'react';
import cn from 'classnames';

import style from './index.module.css';

type Props = {
  imgUrl?: string;
  title?: string;
  detailUrl?: string;
  description?: string;
};

export default function Card({ imgUrl, title, detailUrl, description }: Props) {
  return (
    <div className={cn('text-white flex flex-col justify-center items-center p-5', style.card)}>
      <div className={style.imgContanier}>
        <div className={cn('flex items-center justify-center text-xs', style.tag)}>Gallery</div>
        <img className={style.img} src={imgUrl} />
      </div>
      <div className={cn('p-5', style.content)}>
        <div className={cn('flex justify-between items-center', style.contnetHeader)}>
          <div className="text-xl font-semibold truncate flex-1 mr-3" title={title}>
            {title}
          </div>
          <div
            className={cn('', style.icon)}
            style={{ backgroundImage: 'url("./images/openC.png")' }}
          ></div>
        </div>
        <div className={cn('text-xs my-3', style.description)}>{description}</div>
      </div>
    </div>
  );
}
