"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Wrapper from "./Wrapper";
import Header from "./Header";
import Footer from "./Footer";
import CartListCard from "./CartListCard";

const CartItems = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartData(cart);
    console.log("Initial cartData:", cart); // Debugging
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartData.filter((item) => item.id !== id);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateCartItem = (id, quantity) => {
    const updatedCart = cartData.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subTotal = useMemo(
    () =>
      cartData.reduce(
        (total, item) => total + item.retail_price_cents * item.quantity,
        0
      ),
    [cartData]
  );

  const totalDiscount = useMemo(
    () =>
      cartData.reduce(
        (total, item) => total + item.quantity * 1000, // ₹100 discount per item
        0
      ),
    [cartData]
  );

  const totalAfterDiscount = useMemo(
    () => Math.max(0, subTotal - totalDiscount),
    [subTotal, totalDiscount]
  );

  const HandleONclick = () => {
    // Your checkout logic here
  };

  // Debugging: log cartData, subtotal, discount, and total
  console.log("Cart Data:", cartData);
  console.log("Subtotal:", subTotal);
  console.log("Total Discount:", totalDiscount);
  console.log("Total After Discount:", totalAfterDiscount);

  return (
    <div>
      <Header />
      <Wrapper>
        <div className="w-full md:py-20">
          {cartData.length > 0 ? (
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
                  {cartData.map((item) => (
                    <CartListCard
                      key={item.id}
                      item={item}
                      removeFromCart={removeFromCart}
                      updateCartItem={updateCartItem}
                    />
                  ))}
                </div>
                {/* SUMMARY START */}
                <div className="flex-[1]">
                  <div className="text-lg font-bold">Summary</div>

                  <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                    <div className="flex justify-between">
                      <div className="uppercase text-md md:text-lg font-medium text-black">
                        Subtotal
                      </div>
                      <div className="text-md md:text-lg font-medium text-black">
                        &#8377;{subTotal}
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="uppercase text-md md:text-lg font-medium text-black">
                        Discount
                      </div>
                      <div className="text-md md:text-lg font-medium text-red-500">
                        - &#8377;{totalDiscount}
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 font-bold">
                      <div className="uppercase text-md md:text-lg text-black">
                        Total
                      </div>
                      <div className="text-md md:text-lg text-black">
                        &#8377;{totalAfterDiscount}
                      </div>
                    </div>
                    <div className="text-sm md:text-md py-5 border-t mt-5">
                      The subtotal reflects the total price of your order,
                      including duties and taxes, before any applicable
                      discounts. It does not include delivery costs and
                      international transaction fees.
                    </div>
                  </div>
                  <button
                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                    onClick={HandleONclick}
                  >
                    Checkout
                  </button>
                </div>
                {/* SUMMARY END */}
              </div>
            </>
          ) : (
            <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
              <span className="text-xl font-bold">Your cart is empty</span>
              <span className="text-center mt-4">
                Looks like you have not added anything in your cart.
                <br />
                Go ahead and explore top categories.
              </span>
              <Link
                href="/"
                className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default CartItems;
