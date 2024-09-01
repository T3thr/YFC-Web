'use client';

import React from 'react';
import Link from 'next/link';

export default function Confirmation() {
    const handleRefresh = (e) => {
        e.preventDefault(); // Prevent the default behavior of the link
        window.location.href = '/'; // Set the location to the home page, which will reload it
        };
    return (
        <section className="py-16 bg-gradient-to-b from-green-100 to-green-300">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
            <h3 className="text-4xl font-semibold mb-6 text-green-800">
            ขอบคุณที่ใช้บริการ!
            </h3>
            <p className="text-lg mb-4 text-gray-700">
            ขอให้สนุกกับไก่ทอดแซ่บๆๆ.
            </p>
            <Link href="/">
            <button 
                onClick={handleRefresh}
                className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
                Continue Shopping
            </button>
            </Link>
        </div>
        </section>
    );
}
