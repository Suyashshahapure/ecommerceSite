"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import NikeLogo from "../public/nike-11.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Change 50 to the scroll position where you want to hide the header
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
  const [cartData, setCartdata] = useState([]);
  // console.log(cartData);

  
  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between px-4 md:px-8 shadow-md sticky top-0 z-20 transition-transform duration-300 ${
        isScrolled ? "translate-y-[-100%]" : "translate-y-0"
      }`}
    >
      <Link href="/">
        <NikeLogo className="w-[40px] md:w-[60px]" alt="Logo" />
      </Link>

      {/* page name  */}
      <div className="flex-grow flex justify-center">
        <h1 className="text-lg md:text-2xl font-semibold">Product Page</h1>
      </div>

      {/* cart section  */}
      <Link href="/cart">
        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
          <BsCart className="text-[15px] md:text-[20px]" />
          
        </div>
      </Link>
    </header>
  );
};

export default Header;
