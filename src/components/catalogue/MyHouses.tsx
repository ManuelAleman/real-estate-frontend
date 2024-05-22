import React, { useState, useEffect } from "react";
import Image from "next/image";
interface MyHouseInfo {
  id: string;
}
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
    city: string;
    address: string;
    characteristics: string[];
    images: string[];
  }[];
}
const MyHouses = ({ id }: MyHouseInfo) => {
  const [myHouses, setMyHouses] = useState<Props["estateData"]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/estates/getEstates")
      .then((response) => response.json())
      .then((data) => {
        data = data.estates;
        setMyHouses(data);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg border shadow-md px-4 py-4">
        {myHouses
          .filter((house) => house.user === id)
          .map((house) => (
            <div key={house._id} className="bg-white shadow-md rounded-lg p-4">
              <Image
                src={house.presentationImg}
                width={300}
                height={200}
                alt=""
                className="w-full h-48 object-cover object-center"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{house.name}</h2>
                <p className=" text-xl mt-2 text-gray-600">${house.price}</p>
                <button className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                  Ver Propiedad
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyHouses;
