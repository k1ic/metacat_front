import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';

import MobileMenu from '../mobile-menu';
import SwitchLocale from '../switch-locale';
import { NAVIGATION } from '../../common/const';

// import Logo from './icons/icon-logo';
import Footer from '../footer';

import style from './index.module.less';

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
  fixed?: boolean;
  headerBgCls?: string;
  extra?: React.ReactNode;
};

export default function Layout({
  children,
  className,
  hideNav,
  layoutStyles,
  fixed = false,
  headerBgCls,
  extra,
}: Props) {
  const router = useRouter();
  const activeRoute = router.asPath;
  const t = useTranslations('navigation');

  return (
    <>
      <div className={cn('min-h-screen', 'w-full')}>
        <div
          className={cn(headerBgCls, 'h-22 bg-black', {
            'fixed-center': fixed,
          })}
          style={{ zIndex: 1 }}
        >
          {!hideNav && (
            <header className={cn('main-content h-full flex justify-center items-center p-5')}>
              <div className="flex flex-grow items-center text-white font-bold text-3xl">
                <Link href="/">METCAT</Link>
              </div>
              <div className="flex flex-grow justify-end">
                <div className="text-lg text-white mx-28">Home</div>
                <div className="text-lg text-gray-400">Data</div>
              </div>
            </header>
          )}
          <div className="flex main-content h-88 py-10">
            <div className="flex items-center" style={{ minHeight: '220px' }}>
              <div className={cn('logo mr-4 bg-white', style.logo)}></div>
              <div className="sign-mark-word text-6xl text-white font-bold">
                <div>CATCH DATA</div>
                <div className="mt-12">CATCH VALUE</div>
              </div>
            </div>
            <div className={cn('image-round bg-white mx-36', style.roundImage)}></div>
          </div>
        </div>

        <div>
          <main style={layoutStyles}>
            <SkipNavContent />
            <div className={className}>{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
