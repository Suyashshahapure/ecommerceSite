"use client";
import React from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartListCard = ({ item, removeFromCart, updateCartItem }) => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={item.main_picture_url}
          alt={item.name}
          width={120}
          height={120}
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {item.name}
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {item.silhouette}
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : &#8377;{item.retail_price_cents}
          </div>
        </div>
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {item.silhouette}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <div>{item.size}</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="hover:text-black"
                value={item.Quantity}
                onChange={(e) =>
                  updateCartItem(item.id, parseInt(e.target.value), item.size )
                }
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => removeFromCart(item.id , item.size)}
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartListCard;
