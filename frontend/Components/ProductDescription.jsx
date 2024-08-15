"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Wrapper from "./Wrapper";
import { getDiscountedPricePercentage } from "../utils/helper";

const ProductDescription = ({ price, original_price, product }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  console.log(`${product} ${"hii"}`);

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
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
            <div className="text-lg font-semibold mb-5">{product.subtitle}</div>
            {/* Product price */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">MRP : &#8377;{price}</p>
              {original_price && (
                <>
                  <p className="text-base font-medium line-through">
                    &#8377;{original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(original_price, price)}% off
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
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDescription;
