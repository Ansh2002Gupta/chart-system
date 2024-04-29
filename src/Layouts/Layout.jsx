import React, { useState, createContext } from "react";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import { Outlet } from "react-router-dom";
import MsgBox from "../Components/MsgBox";

export const cartStatus = createContext();
const Layout = () => {
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [itemIDSelected, setItemIDSelected] = useState([]);
  const [msg, setMsg] = useState("Grand Total: 0");
  return (
    <div className="flex flex-col">
      <div>
        <cartStatus.Provider
          value={{
            cartData,
            setCartData,
            msg,
            setMsg,
            grandTotal,
            setGrandTotal,
            itemIDSelected,
            setItemIDSelected,
          }}
        >
          <Header />
          <MsgBox />
          <Outlet />
          <Footer />
        </cartStatus.Provider>
      </div>
    </div>
  );
};

export default Layout;
