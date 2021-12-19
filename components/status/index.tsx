import React from 'react';
import cn from 'classnames';

interface Props {
  status: 'loading' | 'error' | 'success' | 'empty';
  retry?: () => void;
}
export default function Status({ status, retry }: Props) {
  const commonCls = 'flex w-full justify-center items-center py-10';
  if (status === 'loading') {
    return (
      <div className={cn(commonCls, 'animate-spin')}>
        <img src="/images/loading.png" className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={cn(commonCls)}>
        <img src="/images/default-image.png" className="w-20 h-16" />
        <span className="mt-4 text-2xl text-white">DATA LOADING FAILURE</span>
        <span className="px-4 py-2 text-white" onClick={retry}>
          Retry
        </span>
      </div>
    );
  }

  if (status === 'success') {
    return <div>Success</div>;
  }

  if (status === 'empty') {
    return (
      <div className={cn(commonCls)}>
        <img src="/images/default-image.png" className="w-20 h-16" />
        <span className="mt-4 text-2xl text-white">NO DATA</span>
      </div>
    );
  }
}
