import React from "react";
import Image from "next/image";

interface Props {
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
}

const EstateCard = (props: Props) => {
  return (
    <div className="w-80 mx-6 pb-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden  ">
        <Image
          className="w-full h-56 object-cover object-center"
          src={props.presentationImg}
          width={500}
          height={300}
          alt="estate"
        />
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">{props.name}</h1>{" "}
          <p className="text-sm text-gray-600">{props.address}</p>
          <div className="flex justify-between items-center mt-4">
            {(props.characteristics ?? []).map((characteristic, index) => (
              <p key={index} className="text-xs text-gray-500">
                {characteristic}
              </p>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-lg font-bold text-gray-800">${props.price}</h1>{" "}
            <button className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded">
              Ver Propiedad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateCard;
