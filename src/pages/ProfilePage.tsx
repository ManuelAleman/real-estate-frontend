import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import BannerHero from "@/components/ui/BannerHero";
import NavBar from "@/components/navbar/NavBar";
import EstateCard from "@/components/ui/EstateCard";
import Link from "next/link";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  img: string;
  role: string;
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
    status: string;
    address: string;
    characteristics: string[];
    images: string[];
  }[];
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData>({
    id: "",
    name: "",
    email: "",
    phone: "",
    img: "",
    role: "",
  });

  const [myHouses, setMyHouses] = useState<Props["estateData"]>([]);
  const [visibleHouses, setVisibleHouses] = useState(4);

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
          const {
            _id: id,
            name,
            email,
            contactNumber: phone,
            profilePicture: img,
            role,
          } = data.user;
          setProfile({ id, name, email, phone, img, role });
          console.log(data);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/estates/getEstatesFromUser/${profile.id}`, {
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
  }, [profile.id]);

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div className="container mx-auto">
        <div className=" px-4 my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:items-start pt-20 my-4 mx-auto text-center">
              <p className="text-gray-500 mb-8 text-2xl ">{profile.role}</p>
              <Image
                src={profile.img}
                alt="profile"
                width={150}
                height={150}
                className="rounded-full pb-4"
              />
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-500">{profile.email}</p>
              <p className="text-gray-500">{profile.phone}</p>
            </div>
            <div className="flex flex-col items-center font-mono text-6xl my-4">
              <div className="mb-4 text-center">
                <h1>Mis Casas</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
                {myHouses
                  .filter((house) => house.status === "approved")
                  .slice(0, visibleHouses)
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
                      seller={house.seller}
                      user={house.user}
                      status={house.status}
                      city={house.city}
                      address={house.address}
                      characteristics={house.characteristics}
                      images={house.images}
                    />
                  ))}
              </div>
              {myHouses.filter(
                (house) =>
                  house.user === profile.id || house.seller === profile.id
              ).length > visibleHouses && (
                <Link
                  href="/MyHousesPage"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8"
                >
                  Ver mas
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
