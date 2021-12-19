import React, { MouseEventHandler } from 'react';

import cn from 'classnames';

import style from './index.module.less';

type Props = {
  active?: boolean;
  icon?: string;
  label?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function Tab({ icon, label, active, onClick }: Props) {
  const st = active ? style.active : style.normal;
  return (
    <div
      className={cn('flex justify-center items-center text-white', st, style.base)}
      onClick={onClick}
    >
      <div className={cn('flex justify-center items-center', style.canHover)}>
        <div
          className={cn('bg-contain mr-2', style.tabIcon)}
          style={{ backgroundImage: `url('${icon}')` }}
        ></div>
        <div>{label}</div>
      </div>
    </div>
  );
}
