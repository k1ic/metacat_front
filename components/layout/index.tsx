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
import Carousel from '../carousel';

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

const test = [
  {
    imgUrl:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg',
    title: 'New eyes for the Sphinx...',
    detailUrl: 'https://www.cryptovoxels.com/play?coords=N@9W,296N,6F',
  },
  {
    imgUrl:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0xa214384fd96d0883a4e4c75036c2863f0f5995f5/womps/1639464976791-9cf16de0-3ac3-4088-a5c9-2292fad8d0e0.jpg',
    title: 'happy holidays!',
    detailUrl: 'https://www.cryptovoxels.com/play?coords=@719E,660S',
  },
  {
    imgUrl: 'https://www.k1ic.com/imgs/cv_month_sold_sum.png',
    title: 'CV parcel monthly trade sum(ETH)',
    detailUrl: 'https://www.k1ic.com/cvb-zh.html',
  },
];

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

  const jumpToData = React.useCallback(() => {
    window.open('https://www.k1ic.com/cvb-zh.html');
  }, []);

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
                <Link href="/">METACAT</Link>
              </div>
              <div className="flex flex-grow justify-end">
                <div className="text-2xl font-medium text-white mx-28 cursor-pointer">Home</div>
                <div
                  className="text-2xl font-medium text-gray-400 hover:text-white active:text-white cursor-pointer"
                  onClick={jumpToData}
                >
                  Data
                </div>
              </div>
            </header>
          )}
          <div className="flex main-content justify-between h-88 py-10">
            <div className="flex items-center" style={{ minHeight: '220px' }}>
              <img className={cn('mr-4 bg-white', style.logo)} src="/images/logo.png"></img>
              <div className="sign-mark-word text-6xl text-white font-bold">
                <div>CATCH DATA</div>
                <div className="mt-12">CATCH VALUE</div>
              </div>
            </div>
            <div className={cn('image-round', style.roundImage)}>
              <Carousel imgs={test}></Carousel>
            </div>
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
