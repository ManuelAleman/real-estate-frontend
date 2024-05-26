import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import BannerHero from "@/components/ui/BannerHero";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/router";

interface idEstate {
  id: string;
}
interface Estate {
  name: string;
  presentationImg: string;
  description: string;
  price: number;
  type: string;
  category: string;
  user: string;
  status: string;
  seller: string;
  city: string;
  address: string;
  characteristics: string[];
  images: string[];
}

const EstateInfoPage = () => {
  const [estate, setEstate] = useState<Estate | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch(`http://localhost:8080/estates/getEstateInfo/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEstate(data.estate);
        } else {
          console.error("Error fetching estate:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching estate:", error);
      });
  }, [id]);

  console.log(estate);

  return (
    <div>
      <NavBar />
      <BannerHero />

      <Footer />
    </div>
  );
};

export default EstateInfoPage;
