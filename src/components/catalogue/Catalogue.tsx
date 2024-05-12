"use client";
import React, { useState } from "react";
import FilterSidebar from "../ui/FIlterSideBar";
import BannerHero from "@/components/ui/BannerHero";

const Catalogue = () => {
  const handleFilterChange = (key: string, value: string) => {
    console.log(key, value);
  };

  return (
    <div>
      <BannerHero />
      <div className="flex h-screen ">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <main className="flex-1"></main>
      </div>
    </div>
  );
};

export default Catalogue;
