"use client";

import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";

const Signup = () => {
  const { error, signupUser, clearErrors } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Check for uppercase letters
    if (/[A-Z]/.test(value)) {
      toast.warn("Please use lowercase letters for your email.");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    signupUser({ name, email, password });
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Create Account</h2>

        <div className="mb-4">
          <label className="block mb-1"> Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={handleEmailChange} // Use the new handler here
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Password </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            placeholder="Type your password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Sign up
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
