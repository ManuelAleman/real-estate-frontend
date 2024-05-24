"use client";
import React from "react";
import NavBar from "@/components/navbar/NavBar";
import Catalogue from "@/components/catalogue/Catalogue";
import Footer from "@/components/footer/Footer";
import BannerHero from "@/components/ui/BannerHero";

const CataloguePage = () => {
  return (
    <div>
      <NavBar />
      <BannerHero />
      <Catalogue />
      <Footer />
    </div>
  );
};

export default CataloguePage;
