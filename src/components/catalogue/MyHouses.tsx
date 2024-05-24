import React, { useState, useEffect } from "react";
import Image from "next/image";
import EstateCard from "../ui/EstateCard";
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
    category: string;
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
        {myHouses
          .filter((house) => house.user === id || house.seller === id)
          .map((house, index) => (
            <EstateCard
              key={index}
              name={house.name}
              presentationImg={house.presentationImg}
              description={house.description}
              price={house.price}
              type={house.type}
              categoty={house.category}
              seller={house.seller}
              city={house.city}
              address={house.address}
              characteristics={house.characteristics}
              images={house.images}
            />
          ))}
      </div>
    </div>
  );
};

export default MyHouses;
