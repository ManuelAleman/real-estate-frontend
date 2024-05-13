import React from "react";
import EstateCard from "../ui/EstateCard";

interface Props {
  estateData: {
    imagen: string;
    name: string;
    price: number;
    rooms: number;
    sqtr: number;
    location: string;
  };
  type: string;
}

const CatalogueEstates = ({ estateData, type }: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">{type}</h1>
      <div className="flex flex-row overflow-x-auto justify-center sm:justify-center mx-2 sm:mx-4 md:mx-8 lg:mx-16 pb-4 flex-wrap ">
        <EstateCard {...estateData} />
        <EstateCard {...estateData} />
        <EstateCard {...estateData} />
        <EstateCard {...estateData} />
        <EstateCard {...estateData} />
        <EstateCard {...estateData} />
        <EstateCard {...estateData} />
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8">
          Ver más
        </button>
      </div>
    </div>
  );
};

export default CatalogueEstates;
