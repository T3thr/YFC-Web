// pages/admin-signin.jsx
'use client'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AdminSignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      // Add a parameter to indicate admin login
      callbackUrl: `${window.location.origin}/admin-dashboard`,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push(result.url || '/admin-dashboard');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Sign-In</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="border border-gray-300 rounded p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Sign in
        </button>
        <p className="mt-4">
          Back to{" "}
          <Link href="/signin" className="text-blue-500">
            User Sign-In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminSignIn;
