import React from "react";
import EstateCard from "../ui/EstateCard";

interface Props {
  estateData: {
    _id: string;
    name: string;
    presentationImg: string;
    description: string;
    price: number;
    type: string;
    category: string;
    status: string;
    user: string;
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
      <div className="grid grid-cols-1 md:grid-cols-4 overflow-x-auto justify-center sm:justify-center mx-2 sm:mx-4 md:mx-8 lg:mx-16 pb-4 gap-12 ">
        {estateData.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-2xl text-gray-800">No hay propiedades</h1>
          </div>
        )}
        {estateData
          .filter((estate) => estate.status === "approved")
          .map((estate, index) => (
            <EstateCard
              key={index}
              id={estate._id}
              name={estate.name}
              presentationImg={estate.presentationImg}
              description={estate.description}
              price={estate.price}
              type={estate.type}
              category={estate.category}
              status={estate.status}
              user={estate.user}
              seller={estate.seller}
              city={estate.city}
              address={estate.address}
              characteristics={estate.characteristics}
              images={estate.images}
            />
          ))}
      </div>
    </div>
  );
};

export default CatalogueEstates;
