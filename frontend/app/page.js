"use client"
import React,{useState} from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ProductPage from "../Components/ProductPage";




export default function MyApp({  }) {
  return (
    <>
      <Header />
   
      <ProductPage/>
      <Footer />
    </>
  );
}
