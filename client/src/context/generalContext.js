import React, { createContext } from "react";
import { useCookies } from "react-cookie";

export const globalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [cookie, setCookie] = useCookies(["access_token"]);

  let id;

  if (cookie.access_token) {
    id = localStorage.getItem("userId");
  }

  const isUserLoggedIn = () => cookie.access_token !== "";

  const values = { cookie, setCookie, isUserLoggedIn, id };
  return (
    <globalContext.Provider value={values}>{children}</globalContext.Provider>
  );
};

export default GlobalProvider;
