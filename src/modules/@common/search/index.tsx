'use client';

import { Input } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import { useState, useTransition } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoSearchOutline } from 'react-icons/io5';

import { cn } from '@/utils/Helpers';

type SearchType =
  | 'Posts'
  | 'Reporters'
  | 'Categories'
  | 'Topics'
  | 'News'
  | 'Admins'
  | 'Subscribers'
  | 'Comments'
  | 'Contributors';

type PropTypes = {
  setKeyword: Dispatch<SetStateAction<string>>;
  className?: string;
  searchType?: SearchType;
};

const SearchComponent = ({ setKeyword, className, searchType }: PropTypes) => {
  const [isPending, startTransition] = useTransition();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const isSearching = timeoutId || isPending;

  return (
    <div className={cn('relative w-[365px]', className || '')}>
      <Input
        size="large"
        type="text"
        id="search"
        placeholder={searchType ? `Search ${searchType}` : 'Search'}
        prefix={<IoSearchOutline />}
        onChange={(e) => {
          clearTimeout(timeoutId);

          const id = setTimeout(() => {
            startTransition(() => {
              if (e.target.value) {
                setKeyword(e.target.value);
              } else {
                setKeyword('');
              }

              setTimeoutId(undefined);
            });
          }, 500);

          setTimeoutId(id);
        }}
      />

      {isSearching && (
        <div className="pointer-events-none absolute inset-y-0 right-2 z-50 flex items-center">
          <AiOutlineLoading3Quarters className="size-5 animate-spin text-black" />
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
