"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import NikeLogo from "../public/nike-11.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getFromLocal = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        try {
          const cartArray = JSON.parse(cart);
          setCartLength(cartArray.length);
        } catch (error) {
       
          setCartLength(0);
        }
      } else {
        setCartLength(0);
      }
    };

    getFromLocal(); // Initial call
    const intervalId = setInterval(getFromLocal, 1000); // Update every 1 second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between px-4 md:px-8 shadow-md sticky top-0 z-20 transition-transform duration-300 ${
        isScrolled ? "translate-y-[-100%]" : "translate-y-0"
      }`}
    >
      <Link href="/">
        <NikeLogo className="w-[40px] md:w-[60px]" alt="Logo" />
      </Link>

      {/* Page name */}
      <div className="flex-grow flex justify-center">
        <h1 className="text-lg md:text-2xl font-semibold">Product Page</h1>
      </div>

      {/* Cart section */}
      <Link href="/CartItems">
        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
          <BsCart className="text-[15px] md:text-[20px]" />
          {cartLength > 0 && (
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              {cartLength}
            </div>
          )}
        </div>
      </Link>
    </header>
  );
};

export default Header;
