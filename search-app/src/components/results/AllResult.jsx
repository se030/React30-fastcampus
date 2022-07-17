import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import SearchTermRequired from '../SearchTermRequired';
import NoSearchResults from '../NoSearchResults';
import { Oval } from 'react-loader-spinner'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react';
import { useCallback } from 'react';

function AllResult() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("q");

  const itemsPerPage = 10;
  const [ currentItems, setCurrentItems ] = useState([]);
  const [ pageCount, setPageCount ] = useState(0)
  const [ itemOffset, setItemoOffset ] = useState(0)

  const { data, isLoading } = useQuery(
    [ "allResult", search ], 
    () => axios.get(
      `https://google-search3.p.rapidapi.com/api/v1/search/q=${search}&num=100`,
      {headers : {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
      }}
    ).then(data => data?.data), {
      refetchOnWindowFocus: false,
      enabled: !!search,
      cacheTime: 0
    }
  );
  const handlePageClick = useCallback((e) => {
    setItemoOffset((e.selected * itemsPerPage) % data?.results?.length)
  }, [data?.results])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data?.results?.slice(itemOffset, endOffset))
    setPageCount(Math.ceil((data?.results?.length ?? 0) / itemsPerPage))
  }, [itemOffset, data?.results])

  if (!search) return <SearchTermRequired />
  if (isLoading) 
    return <Oval 
      color="#00cc22" secondaryColor="#00cc22" strokeWidth="3"
      wrapperClass='flex justify-center mt-52' 
    />

  return (
    <>
      <div className='flex flex-col justify-center align-middle m-auto w-[700px]'>
        {
          data?.results?.length > 0?
            currentItems?.map(( {link, title, description}, index ) => 
              <div key={index} className="mt-10">
                <a href={link} target="_blank" rel="noreferrer">
                  <p className='text-sm'>
                    {link.length > 40? link.substring(0, 40) : link}
                  </p>
                  <p className='text-lg text-blue-700 hover:underline'>
                    {title}
                  </p>
                  <p className='text-xs'>
                    {description}
                  </p>
                </a>
              </div>
            )
            : (
              <NoSearchResults />
            )
        }
      </div>
      <ReactPaginate 
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        pageRangeDisplayed={10}
        pageLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        previousLinkClassName="text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        nextLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        breakLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        containerClassName="flex ml-auto mr-auto w-fit mt-10 pb-10 select-none"
        activeLinkClassName="z-[3] text-slate-50 bg-[#22C55E] border-[#22C55E] focus:text-[#e9ecef] focus:z-[3] focus:bg-[#22C55E] focus:outline-0 hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        disabledLinkClassName="text-[#6c757d] pointer-events-none bg-slate-50 border-[#dee2e6] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
        pageCount={pageCount}
      />
    </>
  )
}

export default AllResult