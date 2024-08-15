"use client";
import React, { useState } from "react";
import Wrapper from "./Wrapper";
import api from '../Data/api.json';
import ProductCard from "./ProductCard";

export default function ProductPage() {
  const [data, setData] = useState(api);

  return (
    <div>
      <main>
        <Wrapper>
          {/* heading and paragraph start */}
          <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Cushioning for Your Miles
            </div>
            <div className="text-md md:text-xl">
              A lightweight Nike ZoomX midsole is combined with
              increased stack heights to help provide cushioning
              during extended stretches of running.
            </div>
          </div>
          {/* heading and paragraph end */}

          {/* products grid start */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {data.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.main_picture_url}
                name={product.name}
                price={product.retail_price_cents}
                originalPrice={product.original_price}
              />
            ))}
          </div>
        </Wrapper>
      </main>
    </div>
  );
}
