import React from 'react';

export default function Footer() {
  return (
    <footer className="py-10 bg-black flex text-white items-center relative">
      <div className="flex flex-1 sm:flex-row flex-col sm:items-center main-content">
        <div className="flex items-center">
          <div className="sm:w-16 sm:h-16 w-12 h-12 mr-4">
            <img className="mr-4" src="/images/logo.png" alt="logo" />
          </div>

          <section className="flex flex-col	h-full">
            <span className="sm:text-xl text-sm font-roboto">
              Metaverse can't be built without NFTs.
            </span>
            <span className="text-gray-200 sm:text-sm text-xs mt-2 font-roboto font-light">
              Copyright © {`${new Date().getFullYear()} `}{' '}
              <a href="https://m7e.io" target="_blank" className="underline">
                M7e
              </a>
              . All rights reserved.
            </span>
          </section>
        </div>

        <section className="flex flex-1 sm:justify-end justify-center mt-4 sm:mt-0">
          <a href="https://twitter.com/m7e_io" target="_blank" className="w-8 h-8 mr-4">
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
    </footer>
  );
}
