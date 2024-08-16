"use client"
import React,{useState} from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ProductPage from "../Components/ProductPage";
import CartItems from '../Components/CartItems'



export default function MyApp({  }) {
  return (
    <>
      {/* <Header />
   
      <ProductPage/>
      <Footer /> */}
      <CartItems/>
    </>
  );
}
