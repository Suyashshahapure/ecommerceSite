"use client";
import React from "react";

import ProductDescription from "../../../Components/ProductDescription";
import api from "../../../Data/api.json";

const Id = ({ params }) => {
  // const router = useRouter();

  const id = params.productId;
  

  
  if (!id) {
    return <div>Loading...</div>;
  }

  
  const productId = parseInt(id, 10);

  
  if (isNaN(productId)) {
    return <div>Invalid product ID</div>;
  }

  
  const product = api.find((item) => item.id === productId);

  
  if (!product) {
    return <div>Product not found</div>;
  }



  
  return (
    <ProductDescription
      price={product.retail_price_cents}
      originalPrice={product.original_price}
      product={product}
     
    />
  );
};

export default Id;
