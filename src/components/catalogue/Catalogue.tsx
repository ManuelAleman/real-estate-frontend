import React, { useState, useEffect } from "react";
import FilterModal from "../ui/FilterModal";
import CatalogueEstates from "./CatalogueEstates";

interface Estate {
  _id: string;
  name: string;
  presentationImg: string;
  description: string;
  price: number;
  type: string;
  category: string;
  user: string;
  status: string;
  seller: string;
  city: string;
  address: string;
  characteristics: string[];
  images: string[];
}

const Catalogue = () => {
  const [priceFilter, setPriceFilter] = useState(0);
  const [cityFilter, setCityFilter] = useState("");
  const [typeEstate, setTypeEstate] = useState("");

  const [estateData, setEstateData] = useState<Estate[]>([]);
  const [filteredData, setFilteredData] = useState<Estate[]>([]);

  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setCityFilter(storedCity);
    }

    const typeEstate = localStorage.getItem("type");
    if (typeEstate) {
      setTypeEstate(typeEstate);
    }

    fetch("http://localhost:8080/estates/getEstates")
      .then((response) => response.json())
      .then((data) => {
        setEstateData(data.estates);
      });
  }, []);

  useEffect(() => {
    const filtered = estateData.filter((estate) => {
      return (
        (priceFilter === 0 || estate.price <= priceFilter) &&
        (cityFilter === "" ||
          estate.city.toLowerCase() === cityFilter.toLowerCase()) &&
        (typeEstate === "" ||
          (typeEstate === "venta" && estate.type.toLowerCase() === "venta") ||
          (typeEstate === "renta" && estate.type.toLowerCase() === "renta"))
      );
    });
    let updatedFilteredData = [...filtered];
    if (priceFilter === 50000000) {
      const estateWithPrice = estateData.filter(
        (estate) =>
          estate.price >= 50000000 &&
          (cityFilter === "" ||
            estate.city.toLowerCase() === cityFilter.toLowerCase()) &&
          (typeEstate === "" ||
            (typeEstate === "venta" && estate.type.toLowerCase() === "venta") ||
            (typeEstate === "renta" && estate.type.toLowerCase() === "renta"))
      );
      updatedFilteredData = [...updatedFilteredData, ...estateWithPrice];
    }

    setFilteredData(updatedFilteredData);
  }, [priceFilter, cityFilter, typeEstate, estateData]);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-center mb-12">
        <button
          onClick={handleOpenFilterModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow"
        >
          Filtrar Propiedades
        </button>
      </div>

      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          onApplyFilters={(price, city, type) => {
            setPriceFilter(price);
            setCityFilter(city);
            setTypeEstate(type);
          }}
        />
      )}

      <CatalogueEstates estateData={filteredData} type={typeEstate} />
    </div>
  );
};

export default Catalogue;
