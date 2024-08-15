import React from "react";
// import { useRouter } from "next/router";
import ProductDescription from "../../../Components/ProductDescription";
import api from "../../../Data/api.json";

const Id = ({ params }) => {
  // const router = useRouter();

  const id = params.productId;
  console.log(id)

  
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
  console.log("Router Query ID:", id);
console.log("Product ID (Parsed):", productId);
console.log("Product Data:", product);


  
  return (
    // <>
    // <div>hi</div>
    // </>
    <ProductDescription
      price={product.retail_price_cents}
      originalPrice={product.original_price}
      product={product}
    />
  );
};

export default Id;
