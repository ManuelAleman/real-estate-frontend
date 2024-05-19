import React from "react";
import EstateCard from "../ui/EstateCard";

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

const CatalogueEstates = ({ estateData, type }: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">{type}</h1>
      <div className="flex flex-row overflow-x-auto justify-center sm:justify-center mx-2 sm:mx-4 md:mx-8 lg:mx-16 pb-4 flex-wrap ">
        {estateData.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-2xl text-gray-800">No hay propiedades</h1>
          </div>
        )}

        {estateData.map((estate, index) => (
          <EstateCard
            key={index}
            name={estate.name}
            presentationImg={estate.presentationImg}
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

export default CatalogueEstates;
