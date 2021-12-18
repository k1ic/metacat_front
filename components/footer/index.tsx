import React from 'react';
import dynamic from 'next/dynamic';

import style from './index.module.css';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

export default function Footer() {
  return (
    <footer className="py-10 bg-black flex text-white items-center relative">
      <div className="flex sm:flex-row flex-col sm:items-center main-content">
        <div className="flex flex-col items-start">
          <div className="sm:w-16 sm:h-16 w-12 h-12 mr-4">
            <img className="mr-4" src="/images/icon.png" alt="logo" />
          </div>
          <section className="flex flex-col	h-full">
            <span className="sm:text-xl text-base font-semibold">Powered by metacat</span>
          </section>
        </div>

        <section className="flex flex-1 sm:justify-end justify-center mt-4 sm:mt-0">
          <a
            href="https://twitter.com/Metacat007"
            target="_blank"
            data-tip="twitter"
            className="w-10 h-10 mr-14"
          >
            <img src="/images/twitter.png" />
          </a>
          <a
            href="https://medium.com/@themetacat"
            target="_blank"
            data-tip="medium"
            className="w-10 h-10  rounded-full mr-14 justify-center items-center flex bg-transparent"
          >
            <img src="/images/medium.png" />
          </a>
          <div
            data-tip
            data-for="code"
            className="w-10 h-10  rounded-full justify-center items-center flex bg-transparent"
          >
            <img src="/images/wx.png" />
          </div>
          <ReactTooltip
            id="code"
            effect="solid"
            textColor="rgba(0, 0, 0, 1)"
            className={style.pop}
            backgroundColor="rgba(0, 208, 236, 0.2)"
            border={false}
          >
            <img src="/images/code.jpg" className="w-24 h-24" />
          </ReactTooltip>
        </section>
      </div>
      <ReactTooltip
        effect="solid"
        textColor="rgba(0, 0, 0, 1)"
        className={style.pop}
        backgroundColor="rgba(0, 208, 236, 0.2)"
        border={false}
      ></ReactTooltip>
    </footer>
  );
}
