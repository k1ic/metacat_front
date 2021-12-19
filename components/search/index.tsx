import React, { useState } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import cn from 'classnames';
import style from './index.module.css';

type Props = {
  text?: string;
  onSearch?: (value) => void;
};

export default function Search({ text, onSearch }: Props) {
  const [value, setValue] = useState(text);
  const [show, setShow] = useState(false);

  const clear = React.useCallback(() => {
    setValue('');
  }, [null]);

  const search = React.useCallback(() => {
    if (!show) {
      setShow(true);
    } else if (onSearch) {
      onSearch(value);
    }
  }, [show, value]);
  return (
    <div className="flex w-auto items-center">
      <div className={cn('relative', show ? style.searchContainer : style.toggle)}>
        <SearchInput
          placeholder=" "
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
          className={cn('relative search-input w-full h-full font-normal text-lg', style.search)}
        ></SearchInput>
        {value ? (
          <img
            className={cn('absolute', style.close)}
            src="/images/close.png"
            onClick={clear}
          ></img>
        ) : null}
      </div>
      <div
        className={cn(
          'flex justify-center items-center font-medium text-lg',
          style.searchbtn,
          show ? style.active : '',
        )}
        onClick={search}
      >
        <img className={style.searchIcon} src="/images/search.png"></img>
        Search
      </div>
    </div>
  );
}
