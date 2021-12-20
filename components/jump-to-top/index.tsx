import React from 'react';
import cn from 'classnames';
import style from './index.module.css';

export default function TopJumper() {
  const [show, switchShow] = React.useState(false);

  React.useEffect(() => {
    const listener = () => {
      switchShow(window.scrollY > 300);
    };
    document.addEventListener('scroll', listener);
    return () => document.removeEventListener('scroll', listener);
  }, [show]);

  return show ? (
    <div
      className={cn('flex flex-col justify-center items-center', style.topJumper)}
      onClick={() => window.scrollTo(0, 0)}
    >
      <img src="/images/jump-top.png" className={style.img}></img>
      <div className=" text-xs font-medium">TOP</div>
    </div>
  ) : null;
}
