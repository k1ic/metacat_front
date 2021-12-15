import React, { MouseEventHandler } from 'react';

import cn from 'classnames';

import style from './index.module.less';

type Props = {
  label?: string;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function SecondTab({ label, active, onClick }: Props) {
  const cls = active ? style.active : style.normal;
  return (
    <div
      className={cn(
        'flex w-48 justify-center items-center p-5 box-border  text-2xl',
        style.tab,
        cls,
      )}
      onClick={onClick}
    >
      <div className={style.canHover}>{label}</div>
    </div>
  );
}
