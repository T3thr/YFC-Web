"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const signupUser = async ({ name, email, password }) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", { name, email, password });
      setLoading(false);

      if (data.user) {
        setUser(data.user);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
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
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
