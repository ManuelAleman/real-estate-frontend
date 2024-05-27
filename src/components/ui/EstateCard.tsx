import React from "react";
import Image from "next/image";
import Link from "next/link";
interface Props {
  id: string;
  name: string;
  presentationImg: string;
  description: string;
  price: number;
  type: string;
  category: string;
  user: string;
  seller: string;
  city: string;
  status: string;
  address: string;
  characteristics: string[];
  images: string[];
}

const EstateCard = (props: Props) => {
  return (
    <div className=" pb-8">
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
          <p className="text-gray-600 text-2xl">{props.city}</p>
          <p className="text-sm text-gray-600">{props.type}</p>
          <div className="flex justify-between items-center mt-4">
            {(props.characteristics ?? []).map((characteristic, index) => (
              <p key={index} className="text-xs text-gray-500">
                {characteristic}
              </p>
            ))}
          </div>
          <div className="flex justify-evenly items-center mt-4">
            <h1 className="text-lg font-bold text-gray-800">${props.price}</h1>{" "}
            <Link
              className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded"
              href={{
                pathname: "/EstateInfoPage",
                query: { id: props.id },
              }}
            >
              Ver Propiedad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateCard;
