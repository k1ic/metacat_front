import React, {MouseEventHandler} from 'react';

import cn from 'classnames';

import style from './index.module.less'

type Props = {
  label?:string,
  isChoose?: boolean,
  choose?: MouseEventHandler<HTMLDivElement>
}

export default function SecondTab({label, isChoose, choose}: Props){
  const cls = isChoose?style.active:style.normal;

  return (
  <div className={cn('flex w-40 justify-center items-center p-5 text-2xl' , style.canHover, cls)} onClick={choose}>
    {label}
  </div>
  )
}