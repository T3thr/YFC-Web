'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';

const Product = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    setKeyword(params.get('keyword') || '');
    setMinPrice(params.get('min') || '');
    setMaxPrice(params.get('max') || '');
    setCategories(params.getAll('category') || []);
    setRatings(params.getAll('ratings') || []);
    setSortOrder(params.get('sort') || '');
  }, [searchParams]);

  useEffect(() => {
    if (parseFloat(minPrice) > parseFloat(maxPrice)) {
      setError('ช่วงราคาต่ำสุดต้องไม่มากกว่าช่วงราคาสูงสุด'); 
      return;
    } else {(setError(''))}
  })

  const updateURLParams = () => {
    const params = new URLSearchParams();

    if (keyword) params.set('keyword', keyword);
    if (minPrice) params.set('min', minPrice);
    if (maxPrice) params.set('max', maxPrice);
    categories.forEach(category => params.append('category', category));
    ratings.forEach(rating => params.append('ratings', rating));
    if (sortOrder) params.set('sort', sortOrder);

    router.push(`/?${params.toString()}`);
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();
    updateURLParams();
  };

  const updateFilters = (e) => {
    e.preventDefault();
    updateURLParams();
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'min') setMinPrice(value);
    if (name === 'max') setMaxPrice(value);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategories(prevCategories =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter(category => category !== value)
    );
  };

  const handleRatingChange = (e) => {
    const { value, checked } = e.target;
    setRatings(prevRatings =>
      checked
        ? [...prevRatings, value]
        : prevRatings.filter(rating => rating !== value)
    );
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const clearFilters = () => {
    setKeyword('');
    setMinPrice('');
    setMaxPrice('');
    setCategories([]);
    setRatings([]);
    setSortOrder('');
    setError('');
    router.push('/');
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (


    <div className='container mx-auto px-4'>
    { error && (
      <div className='border mb-4 p-2 text-center border-red-500 text-red-200 rounded-md '>
        {error}
      </div>
    )}

      {/* Search Bar */}
      <form
        className='hidden'
        onSubmit={submitSearchHandler}
      >
        <input
          className='flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400'
          type='text'
          placeholder='Search products...'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type='submit'
          className='absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white border border-transparent bg-blue-600 rounded-md hover:bg-blue-700 text-center text-sm'
        >
          <FaSearch />
        </button>
      </form>

      {/* Filters */}
      <aside className='w-full h-full px-6'>
        <a
          className='md:hidden mb-5 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600 cursor-pointer'
          onClick={toggleFilters}
        >
          Filter by
        </a>
        <div
          className={`${
            isFilterVisible ? 'block' : 'hidden'
          } md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm`}
        >
          <h3 className='font-semibold mb-2'>ราคา (฿)</h3>
          <div className='grid md:grid-cols-3 gap-x-2'>
            <div className='mb-4'>
              <input
                name='min'
                className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                type='number'
                placeholder='Min'
                value={minPrice}
                onChange={handlePriceChange}
              />
            </div>
            <div className='mb-4'>
              <input
                name='max'
                className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                type='number'
                placeholder='Max'
                value={maxPrice}
                onChange={handlePriceChange}
              />
            </div>
            <div className='mb-1'>
              <button
                className='px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'
                onClick={updateFilters}
              >
                ค้นหา
              </button>
            </div>
          </div>
          <hr className='my-4' />
          <h3 className='font-semibold mb-2'>Sort By</h3>
          <select
            className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full'
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value=''>Sort by</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
          </select>
          <hr className='my-4' />
          <h3 className='font-semibold mb-2'>Category</h3>
          <ul className='space-y-1'>
            {[
              'เมนูแนะนำ',
              'โปรโมชัน',
              'ไก่ๆๆ',
              'ของทานเล่น',
              'เครื่องดื่ม',
              'ของสด',
            ].map((category) => (
              <li key={category}>
                <label className='flex items-center'>
                  <input
                    name='category'
                    type='checkbox'
                    value={category}
                    className='h-4 w-4'
                    checked={categories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                  <span className='ml-2 text-gray-500'> {category} </span>
                </label>
              </li>
            ))}
          </ul>

          <hr className='my-4' />

          <h3 className='font-semibold mb-2'>Ratings</h3>
          <ul className='space-y-1'>
            {[5, 4, 3, 2, 1].map((rating) => (
              <li key={rating}>
                <label className='flex items-center'>
                  <input
                    name='ratings'
                    type='checkbox'
                    value={rating}
                    className='h-4 w-4'
                    checked={ratings.includes(`${rating}`)}
                    onChange={handleRatingChange}
                  />
                  <span className='ml-2 text-gray-500'>
                    <StarRatings
                      rating={rating}
                      starRatedColor='#ffb829'
                      numberOfStars={5}
                      starDimension='20px'
                      starSpacing='2px'
                      name='rating'
                      style={{ position: 'relative', zIndex: 0 }}
                    />
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <hr className='my-4' />
          <button
            className='w-full px-4 py-2 text-center inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100'
            onClick={clearFilters}
          >
            Clear all filters
          </button>
        </div>
      </aside>

      {/* Product Display */}
      <div>
        {/* Product grid goes here */}
      </div>
    </div>
  );
};

export default Product;
