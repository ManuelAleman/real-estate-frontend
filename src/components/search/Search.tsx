import React, { useState, useEffect } from "react";
import Image from "next/image";
import Input from "@/components/ui/Input";

const Search = () => {
  const [city, setCity] = useState("");

  const handleCityChange = (e: any) => {
    setCity(e.target.value);
  };

  const handleSearchClick = () => {
    if (city.trim() !== "") {
      localStorage.setItem("city", city);
      localStorage.setItem("type", "");
      localStorage.setItem("logPrice", "7.69897");
    }
    window.location.href = "/CataloguePage";
  };

  return (
    <div className="hero-image bg-hero-image bg-cover bg-right flex flex-col items-center justify-center h-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-20 sm:mt-32 mb-6 sm:mb-8 text-center">
        Plataforma Inmobiliaria
      </h1>
      <div className="relative w-full max-w-md mb-16 sm:mb-24">
        <Input
          type="text"
          placeholder="ciudad"
          onChange={handleCityChange}
          className="rounded-full px-4 py-3 pr-10 w-full"
          required
        />
        <button
          onClick={handleSearchClick}
          className="absolute inset-y-0 right-0 bg-white rounded-full p-3 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <Image
            src="https://e7.pngegg.com/pngimages/876/598/png-clipart-magnifying-glass-computer-icons-magnifier-search-for-glass-magnifier.png"
            alt="Buscar"
            width={24}
            height={24}
            className="rounded-full"
          />
        </button>
      </div>
    </div>
  );
};

export default Search;
