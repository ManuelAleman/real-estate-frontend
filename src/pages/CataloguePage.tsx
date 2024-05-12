"use client";
import React from "react";
import NavBar from "@/components/navbar/NavBar";
import Catalogue from "@/components/catalogue/Catalogue";
import Footer from "@/components/footer/Footer";

const CataloguePage = () => {
  return (
    <div>
      <NavBar />
      <Catalogue />
      <Footer />
    </div>
  );
};

export default CataloguePage;
