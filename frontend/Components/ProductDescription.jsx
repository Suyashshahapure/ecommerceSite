"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Wrapper from "./Wrapper";
import ReactMarkdown from "react-markdown";
import { getDiscountedPricePercentage } from "../utils/helper";
import Footer from "./Footer";
import rehypeRaw from "rehype-raw";
import Header from "./Header";
import Link from "next/link";

const ProductDescription = ({ price, product }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const[quantity, setQuatity]=useState(1);

  // uselocalStorage = cart : [{produ}]

  // addcart funtion(){
  //   if(!cart){
  //     set({cart, product})
  //   }
  //   else {
  //     cart = get()
  //     cart = [...cart, production]
  //   }
  // }

  // if(!cart){
  //   set({})
  // }

  function updateCart(item) {
    const productWithSize = { ...item, size: selectedSize , Quantity:quantity };

    let cart = localStorage.getItem("cart");

    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    // check if the cart have product with same id if same check if the size is same or not 
    const existingIndex = cart.findIndex((cartItem)=>cartItem.id===productWithSize.id && cartItem.size === productWithSize.size);
    if(existingIndex !==-1){
          cart[existingIndex].Quantity += 1;
    }else{
      cart = [...cart, productWithSize];
    }

   

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function notify() {
    toast("✓ successfully added to cart !!! ", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

      style: {
        width: "300px",
        height: "70px",
      },
    });
  }

  return (
    <div className="h-0">
      <Header />
      <div className="w-full md:py-20">
        <ToastContainer />
        <Wrapper>
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
            {/* Left column */}
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <img src={product.main_picture_url} alt={product.name} />
            </div>
            {/* Right column */}
            <div className="flex-[1] py-3">
              {/* Product title */}
              <div className="text-[34px] font-semibold mb-2 leading-tight">
                {product.name}
              </div>
              {/* Product subtitle */}
              <div className="text-lg font-semibold mb-5">
                {product.subtitle}
              </div>
              {/* Product price */}
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold">
                  MRP : &#8377;{price}
                </p>
                {product.original_price && (
                  <>
                    <p className="text-base font-medium line-through">
                      &#8377;{product.original_price}
                    </p>
                    <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscountedPricePercentage(
                        product.original_price,
                        price
                      )}
                      % off
                    </p>
                  </>
                )}
              </div>
              <div className="text-md font-medium text-black/[0.5]">
                incl. of taxes
              </div>
              <div className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also includes all applicable duties)`}
              </div>
              {/* Product size range */}
              <div className="mb-10">
                {/* Heading */}
                <div className="flex justify-between mb-2">
                  <div className="text-md font-semibold">Select Size</div>
                  <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                    Size Guide
                  </div>
                </div>
                {/* Size selection */}
                <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                  {product.size_range.map((item, i) => (
                    <div
                      key={i}
                      className={`border rounded-md text-center py-3 font-medium ${
                        item
                          ? "hover:border-black cursor-pointer"
                          : "cursor-not-allowed bg-black/[0.1] opacity-50"
                      } ${selectedSize === item ? "border-black" : ""}`}
                      onClick={() => {
                        setSelectedSize(item);
                        setShowError(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                {/* Show error */}
                {showError && (
                  <div className="text-red-600 mt-1">
                    Size selection is required
                  </div>
                )}
                {/* PRODUCT SIZE RANGE END */}
                {/* ADD TO CART BUTTON START */}
              </div>
              <Link href="/CartItems">
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                onClick={() => {
                  if (!selectedSize) {
                    setShowError(true);
                    document.getElementById("sizesGrid").scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    });
                  } else {
                    updateCart(product);

                    notify();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                Add to Cart
              </button>
              </Link>
              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="markdown text-md mb-5">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {product.story_html}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDescription;
