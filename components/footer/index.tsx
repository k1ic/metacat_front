import React from 'react';
import ReactTooltip from 'react-tooltip';

export default function Footer() {
  return (
    <footer className="py-10 bg-black flex text-white items-center relative">
      <div className="flex sm:flex-row flex-col sm:items-center main-content">
        <div className="flex flex-col items-start">
          <div className="sm:w-16 sm:h-16 w-12 h-12 mr-4">
            <img className="mr-4" src="/images/logo.png" alt="logo" />
          </div>
          <section className="flex flex-col	h-full">
            <span className="sm:text-xl text-base font-semibold">Powered by metacat</span>
          </section>
        </div>

        <section className="flex flex-1 sm:justify-end justify-center mt-4 sm:mt-0">
          <a
            href="https://twitter.com/m7e_io"
            target="_blank"
            data-tip="123124212"
            className="w-8 h-8 mr-4"
          >
            <img src="/images/twitter.png" />
          </a>
          <a
            href="https://discord.com/invite/wXtj2UuedP"
            target="_blank"
            className="w-8 h-8 bg-white rounded-full mr-4 justify-center items-center flex"
          >
            <img src="/images/discord.png" />
          </a>
          <a
            href="mailto:contact@m7e.io"
            target="_blank"
            className="w-8 h-8 bg-white rounded-full justify-center items-center flex"
          >
            <img src="/images/email.png" className="w-6 h-6" />
          </a>
        </section>
      </div>
      <ReactTooltip
        effect="solid"
        textColor="rgba(0, 0, 0, 1)"
        className="font-normal text-sm"
        backgroundColor="rgba(0, 208, 236, 0.2)"
        border={false}
      ></ReactTooltip>
    </footer>
  );
}
