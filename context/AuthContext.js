// context/AuthContext.js

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { signIn as nextAuthSignIn } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Could be fetched from session
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Optionally, you can fetch the current session here and set the user

  const signupUser = async ({ name, email, password }) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", { name, email, password });
      setLoading(false);

      if (data.user) {
        toast.success("Signup successful! Please sign in to continue.", {
          autoClose: 5000,
          onClose: () => router.push("/signin"),
        });
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await nextAuthSignIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setLoading(false);

      if (res.error) {
        toast.error(res.error);
      }

      if (res.ok) {
        toast.success("Signin successful!");
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || "Signin failed";
      toast.error(errorMessage);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        signupUser,
        loginUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
