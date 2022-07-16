import React, { useState } from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'

function SearchInput() {
  const [ searchText, setSearchText ] = useState("");
  const [ searchParams, setSearchParams ] = useSearchParams();
  const onChangeInput = useCallback((e) => 
    setSearchText(e.target.value)
  , []);
  const onKeyUp = useCallback((e) => {
    if (e.key === "Enter" && e.target.value.trim().length > 0) {
        setSearchParams({q: e.target.value})
    }
  }, [setSearchParams]);

  useEffect(() => {
    setSearchText(searchParams.get("q") ?? "");
  }, [searchParams])

  return (
    <input 
        type="text"
        className='w-96 h-11 bg-slate-50 border outline-none p-6 text-black mt-10 shadow-md hover:shadow-lg'
        placeholder='검색어를 입력해주세요.'
        value={searchText}
        onChange={onChangeInput}
        onKeyUp={onKeyUp}
    />
  )
}

export default SearchInput