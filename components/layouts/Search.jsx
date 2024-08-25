import React from 'react';
import { FaSearch } from "react-icons/fa";


const Search = () => {
  return (
    <div className='relative flex items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4'>
      <input
        className='flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 pr-16 hover:border-gray-400 focus:outline-none focus:border-gray-400'
        type='text'
        placeholder='Enter your keyword'
        required
      />
      <button
        type='button'
        className='absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white border border-transparent bg-blue-600 rounded-md hover:bg-blue-700 text-center text-sm'
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
