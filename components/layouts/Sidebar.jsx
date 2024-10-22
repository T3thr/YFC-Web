"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const { data: session } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        {session?.user?.role === "admin" && (
          <>
            <li>
              <Link
                href="/products/add"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                Add Product <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                All Products <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              <Link
                href="/profile/adminorders"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                Manage Orders <span className="text-red-500">(Admin)</span>
              </Link>
            </li>
{/* 
            <li>
              <Link
                href="/admin/users"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                All Users <span className="text-red-500">(Admin)</span>
              </Link>
            </li>
*/}
            <hr />
          </>
        )}

        <li>
          <Link
            href="/profile"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Your Profile
          </Link>
        </li>
        <li>
          <Link
            href="/profile/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Orders
          </Link>
        </li>
{/* 
        <li>
          <Link
            href="/profile/update"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Profile
          </Link>
        </li>
        <li>
          <Link
            href="/profile/update_password"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Password
          </Link>
        </li>
*/}
        <li>
          <Link 
            href={'api/auth/signout?callbackUrl=/profile'}
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
          >
            Sign Out
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
