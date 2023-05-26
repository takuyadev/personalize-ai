"use client";
import { verify } from "@/services/auth";
import { useState, useEffect, createContext } from "react";
import { logout as logoutFetch } from "@/services/auth";
import { useRouter } from "next/navigation";

// Create Auth Context
const AuthContext = createContext();

// Handles the state for logged in
const AuthContextProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const { push } = useRouter();

  // Logout user from site
  const logout = async () => {
    const data = await logoutFetch();
    if (data) {
      setIsLoggedIn(false);
      setIsVerified(false);
      push("/onboarding");
    }
  };

  // Check if user is verified
  useEffect(() => {
    if (!isVerified) {
      const fetchApi = async () => {
        const data = await verify();
        if (!data) {
          return setIsLoggedIn(false);
        }
        setIsLoggedIn(data)
        setIsVerified(true);
      };
      fetchApi();
    }
  }, [isVerified]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
