"use client";
import React from "react";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import BannerHero from "@/components/ui/BannerHero";
import UploadEstate from "@/components/uploadEstate/UploadEstate";
const UploadEstatePage = () => {
  return (
    <div>
      <NavBar />
      <BannerHero />
      <UploadEstate />
      <Footer />
    </div>
  );
};

export default UploadEstatePage;
