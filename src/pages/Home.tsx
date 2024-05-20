"use client";
import React, { use, useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import Search from "@/components/search/Search";
import DashBoardNewEstates from "@/components/dashboard/DashBoardNewEstates";
import Footer from "@/components/footer/Footer";

interface Estate {
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
}

const Home = () => {
  const [buyEstates, setBuyEstates] = useState([]);
  const [sellEstates, setSellEstates] = useState([]);
  const [myEstates, setMyEstates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/estates/getEstates")
      .then((response) => response.json())
      .then((data) => {
        data = data.estates;
        setBuyEstates(data.filter((estate: Estate) => estate.type === "venta"));
        setSellEstates(
          data.filter((estate: Estate) => estate.type === "renta")
        );
        setMyEstates(
          data.filter((estate: Estate) => estate.type === "mis casas")
        );
        console.log(data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Search />
      <DashBoardNewEstates estateData={buyEstates.slice(0, 3)} type="Comprar" />
      <DashBoardNewEstates estateData={sellEstates.slice(0, 3)} type="Vender" />
      <DashBoardNewEstates
        estateData={myEstates.slice(0, 3)}
        type="Mis Propiedades"
      />
      <Footer />
    </div>
  );
};

export default Home;
