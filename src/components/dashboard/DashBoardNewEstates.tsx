import React from "react";
import EstateCard from "@/components/ui/EstateCard";
interface Props {
  estateData: {
    _id: string;
    name: string;
    presentationImg: string;
    description: string;
    price: number;
    type: string;
    categoty: string;
    user: string;
    seller: string;
    status: string;
    city: string;
    address: string;
    characteristics: string[];
    images: string[];
  }[];
  type: string;
}

const DashBoardNewEstates = ({ estateData, type }: Props) => {
  const handleViewMoreStorage = () => {
    if (type == "Mis_propiedades") {
      window.location.href = "/MyHousesPage";
    } else {
      localStorage.setItem("city", "");
      localStorage.setItem("price", "7.69897");
      localStorage.setItem("type", type.toLowerCase());
      window.location.href = "/CataloguePage";
    }
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-48 mt-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {type.replace("_", " ")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 overflow-x-auto justify-start sm:justify-center mx-2 sm:mx-4 md:mx-8 lg:mx-16 pb-4 gap-24">
        {estateData.length === 0 && (
          <p className="text-center w-full">No hay propiedades disponibles</p>
        )}
        {estateData
          .filter((estate) => estate.status === "approved")
          .map((estate, index) => (
            <EstateCard
              key={index}
              id={estate._id}
              presentationImg={estate.presentationImg}
              name={estate.name}
              description={estate.description}
              price={estate.price}
              type={estate.type}
              status={estate.status}
              user={estate.user}
              category={estate.categoty}
              seller={estate.seller}
              city={estate.city}
              address={estate.address}
              characteristics={estate.characteristics}
              images={estate.images}
            />
          ))}
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8"
          onClick={handleViewMoreStorage}
        >
          Ver mas
        </button>
      </div>
    </div>
  );
};

export default DashBoardNewEstates;
