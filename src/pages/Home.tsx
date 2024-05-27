"use client";
import React, { useState, useEffect } from "react";
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
  category: string; // typo correction
  user: string;
  seller: string;
  city: string;
  address: string;
  characteristics: string[];
  images: string[];
}

interface profileData {
  id: string;
}

const Home = () => {
  const [buyEstates, setBuyEstates] = useState([]);
  const [sellEstates, setSellEstates] = useState([]);
  const [myEstates, setMyEstates] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [profile, setProfile] = React.useState<profileData>({
    id: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/users/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const { _id: id } = data.user;
          setProfile({ id });
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    fetch("http://192.168.1.14:8080/estates/getEstates")
      .then((response) => response.json())
      .then((data) => {
        data = data.estates;
        setBuyEstates(data.filter((estate: Estate) => estate.type === "venta"));
        setSellEstates(
          data.filter((estate: Estate) => estate.type === "renta")
        );
        if (isLoggedIn) {
          setMyEstates(
            data.filter((estate: Estate) => estate.user === profile.id)
          );
        } else {
          setMyEstates([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching estates:", error);
      });
  }, [isLoggedIn, profile.id]);

  return (
    <div>
      <NavBar />
      <Search />
      <DashBoardNewEstates estateData={buyEstates.slice(0, 3)} type="Venta" />
      <DashBoardNewEstates estateData={sellEstates.slice(0, 3)} type="Renta" />
      {isLoggedIn && myEstates.length > 0 ? (
        <DashBoardNewEstates
          estateData={myEstates.slice(0, 3)}
          type="Mis_propiedades"
        />
      ) : (
        <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-48 mt-12">
          <h1 className="text-3xl font-bold mb-8 text-center">Mis casas</h1>
          {isLoggedIn ? (
            <p className="text-center">
              No tienes propiedades registradas, registra una para poder verla
              aquí
            </p>
          ) : (
            <p className="text-center text-3xl font-bold">
              Inicia sesión para ver tus propiedades registradas
            </p>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
