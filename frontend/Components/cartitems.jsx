"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "./Wrapper";
import Header from "./Header";
import Footer from "./Footer";

const CartItems = () => {
  const [cartData, setCartdata] = useState([]);
  // console.log(cartData);

  // useEffect(() => {
  //   function TakeFromStorage() {
  //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //     setCartdata(cart);
  //   }

  //   TakeFromStorage();
  // }, []);

  return (
    <div>
      <Header />
      <Wrapper>
        <div className="w-full md:py-20">
          {cartData.length > 0 && (
            <>
              {/* HEADING AND PARAGRAPH START */}
              <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                  Shopping Cart
                </div>
              </div>
              {/* HEADING AND PARAGRAPH END */}
              <div className="flex flex-col lg:flex-row gap-12 py-10">
                <div className="flex-[2]">
                  <div className="text-lg font-bold">Cart Items</div>
                  {cartData.map((item)=>{

                  })}
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </Wrapper>
    </div>
  );
};

export default CartItems;
