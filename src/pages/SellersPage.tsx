import React, { useEffect, useState } from "react";
import SellerCard from "@/components/ui/SellerCard";
import NavBar from "@/components/navbar/NavBar";
import BannerHero from "@/components/ui/BannerHero";
import Footer from "@/components/footer/Footer";

interface User {
  name: string;
  contactNumber: string;
  email: string;
  profilePicture: string;
}

interface Seller {
  user: User;
  city: string;
  rating: number;
  verified: boolean;
}

const SellersPage = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users/getVerifiedSellers")
      .then((response) => response.json())
      .then((data) => {
        data = data.sellers;
        setSellers(data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div>
        <h1 className="text-3xl font-semibold text-center my-8">
          Nuestros Vendedores
        </h1>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 md:gap-4 items-start">
        {sellers.map((seller: Seller, index: number) => (
          <SellerCard
            name={seller.user.name}
            email={seller.user.email}
            phone={seller.user.contactNumber}
            photo={seller.user.profilePicture}
            rating={seller.rating}
            key={index}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SellersPage;
