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
    status: string;
    characteristics: string[];
    images: string[];
  }[];
}
const MyHouses = ({ id }: MyHouseInfo) => {
  const [myHouses, setMyHouses] = useState<Props["estateData"]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/estates/getEstatesFromUser/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Estates:", data.estates);
          setMyHouses(data.estates);
        } else {
          console.error("Error fetching estates:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
        {myHouses
          .filter((house) => house.status === "approved")
          .map((house, index) => (
            <EstateCard
              key={index}
              id={house._id}
              name={house.name}
              presentationImg={house.presentationImg}
              description={house.description}
              price={house.price}
              type={house.type}
              category={house.category}
              user={house.user}
              seller={house.seller}
              city={house.city}
              address={house.address}
              status={house.status}
              characteristics={house.characteristics}
              images={house.images}
            />
          ))}
      </div>
    </div>
  );
};

export default MyHouses;
