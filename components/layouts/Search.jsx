'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();

    // Get the current URL path
    const currentPath = window.location.pathname;

    if (keyword) {
      // Construct the new URL with the keyword query
      const newUrl = `${currentPath}?keyword=${encodeURIComponent(keyword)}`;
      router.push(newUrl);
    } else {
      // If there's no keyword, redirect to the current path without the keyword
      router.push(currentPath);
    }
  };

  return (
    <form
      className="relative flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/5 lg:w-2/4"
      onSubmit={submitHandler}
    >
      <input
        className="flex-grow appearance-none border w-auto border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className='absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white border border-transparent bg-blue-600 rounded-md hover:bg-blue-700 text-center text-sm'
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
