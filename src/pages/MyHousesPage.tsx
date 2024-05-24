import React, { use, useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import BannerHero from "@/components/ui/BannerHero";
import MyHouses from "@/components/catalogue/MyHouses";

interface PropID {
  id: string;
}

const MyHousesPage = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [profile, setProfile] = useState<PropID>({ id: "" });

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
          setIsLogged(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLogged(false);
        });
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div className="container mx-auto my-12">
        <h1 className="text-3xl font-bold text-center mb-8">Mis Propiedades</h1>
        {!isLogged ? (
          <div className="text-center my-40 text-3xl">
            <p>Debes iniciar sesión para ver tus propiedades</p>
          </div>
        ) : (
          <MyHouses id={profile.id} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyHousesPage;
