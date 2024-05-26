import React from "react";
import MapComponent from "@/components/map/MapComponent";
import NavBar from "@/components/navbar/NavBar";
import BannerHero from "@/components/ui/BannerHero";
import Footer from "@/components/footer/Footer";
const MapPage = () => {
  return (
    <div>
      <NavBar />
      <BannerHero />
      <MapComponent />
      <Footer />
    </div>
  );
};

export default MapPage;
