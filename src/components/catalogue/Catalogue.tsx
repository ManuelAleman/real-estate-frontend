"use client";
import React, { useState, useEffect } from "react";
import FilterSidebar from "../ui/FIlterSideBar";
import BannerHero from "@/components/ui/BannerHero";
import CatalogueEstates from "./CatalogueEstates";

interface Estate {
  name: string;
  presentationImg: string;
  description: string;
  price: number;
  type: string;
  categoty: string;
  user: string;
  seller: string;
  city: string;
  address: string;
  characteristics: string[];
  images: string[];
}

const Catalogue = () => {
  const handleFilterChange = (key: string, value: string) => {
    console.log(key, value);
  };

  const [priceFilter, setPriceFilter] = useState(0);
  const [cityFilter, setCityFilter] = useState("");
  const [typeEstate, setTypeEstate] = useState("venta");

  const [estateData, setEstateData] = useState<Estate[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/estates/getEstates")
      .then((response) => response.json())
      .then((data) => {
        data = data.estates;
        setEstateData(data);
      });
  }, []);

  return (
    <div>
      <BannerHero />
      <div className="flex flex-col container mx-auto mt-12">
        <div className="flex flex-col md:flex-row">
          <FilterSidebar onFilterChange={handleFilterChange} />
          <div>
            <h1 className="text-4xl text-gray-900 dark:text-gray-950 font-semibol text-center">
              Propiedades
            </h1>
            <div className="flex items-center justify-center gap-12 mb-12">
              <button
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 display-block w-32"
                onClick={() => setTypeEstate("venta")}
              >
                Compra
              </button>
              <button
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 display-block w-32"
                onClick={() => setTypeEstate("renta")}
              >
                Renta
              </button>
            </div>
            <CatalogueEstates
              estateData={estateData.filter(
                (estate) => estate.type === typeEstate
              )}
              type={typeEstate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
