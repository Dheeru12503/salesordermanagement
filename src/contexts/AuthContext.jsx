// contexts/AuthContext.jsx
import React, { createContext, useState } from "react";
import { useSaleOrders } from "../hooks/useSaleOrders";

export const AuthContext = createContext({
  SaleOrder:[]
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [SaleOrder,setSaleOrder] = useState([]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, SaleOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
};
