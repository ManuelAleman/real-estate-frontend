import React from "react";
import EstateCard from "@/components/ui/EstateCard";

interface Props {
  estateData: {
    name: string;
    presentationImg: string;
    description: string;
    price: number;
    type: string;
    categoty: string;
    seller: string;
    city: string;
    address: string;
    characteristics: string[];
    images: string[];
  }[];
  type: string;
}

const DashBoardNewEstates = ({ estateData, type }: Props) => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-48 mt-12">
      <h1 className="text-3xl font-bold mb-8 text-center">{type}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 overflow-x-auto justify-start sm:justify-center mx-2 sm:mx-4 md:mx-8 lg:mx-16 pb-4 gap-24">
        {estateData.length === 0 && (
          <p className="text-center w-full">No hay propiedades disponibles</p>
        )}
        {estateData.map((estate, index) => (
          <EstateCard
            key={index}
            presentationImg={estate.presentationImg}
            name={estate.name}
            description={estate.description}
            price={estate.price}
            type={estate.type}
            categoty={estate.categoty}
            seller={estate.seller}
            city={estate.city}
            address={estate.address}
            characteristics={estate.characteristics}
            images={estate.images}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8">
          Ver más
        </button>
      </div>
    </div>
  );
};

export default DashBoardNewEstates;
