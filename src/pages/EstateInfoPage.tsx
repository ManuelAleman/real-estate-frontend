import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import BannerHero from "@/components/ui/BannerHero";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/router";
import Image from "next/image";
import HouseRoomPresentation from "@/components/ui/HouseRoomPresentation";
import Modal from "@/components/ui/MeetingModal";

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

interface User {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  profilePicture: string;
}

interface Seller {
  id: string;
  user: User;
  city: string;
  rating: number;
  verified: boolean;
}

interface ProfileData {
  id: string;
  name: string;
}

const EstateInfoPage = () => {
  const [estate, setEstate] = useState<Estate | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState<string>("");
  const [seller, setSeller] = useState<Seller>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const [profile, setProfile] = useState<ProfileData>({
    id: "",
    name: "",
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
          const { _id: id, name } = data.user;
          setProfile({ id, name });
        });
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/estates/getEstateInfo/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEstate(data.estate);
          console.log(data.estate);
        } else {
          console.error("Error fetching estate:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching estate:", error);
      });
  }, [id]);

  useEffect(() => {
    if (estate) {
      fetch(
        `http://localhost:8080/categories/getCategoryById/${estate.category}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCategory(data.category.name);
          } else {
            console.error("Error fetching category:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
        });
    }
  }, [estate]);

  useEffect(() => {
    if (estate === null) return;
    if (estate.seller !== null) {
      fetch(`http://localhost:8080/sellers/getSellerById/${estate.seller}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSeller(data.seller);
          } else {
            console.error("Error fetching seller:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching seller:", error);
        });
    } else {
      console.warn("Seller ID is null. Skipping fetch.");
    }
  }, [estate]);

  const handleMeeting = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleModalSubmit = async (data: { date: string; message: string }) => {
    const seller = estate && estate.seller ? estate.seller : null;
    const meetingData = {
      user: profile.id,
      date: data.date,
      message: data.message,
      estate_id: id,
      seller: seller,
    };

    console.log(profile.id);
    console.log(estate?.user);

    if (profile.id === estate?.user) {
      setError("No puedes agendar una cita contigo mismo");
      return;
    }

    const response = await fetch(
      `http://localhost:8080/meetings/createMeeting`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(meetingData),
      }
    );

    const responseData = await response.json();
    if (responseData.success) {
      setError("");
      alert("Cita agendada exitosamente");
      closeModal();
    } else {
      setError(responseData.message);
    }
  };

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 mt-12 ">
        {estate ? (
          <div className="grid grid-cols-1 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20 ">
              <div>
                <Image
                  src={estate.presentationImg}
                  alt={estate.name}
                  width={500}
                  height={500}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-center">
                  {estate.name}
                </h1>
                <p className="text-lg mt-4">{estate.description}</p>
                <p className="text-lg mt-4">Precio: ${estate.price}</p>
                <p className="text-lg mt-4">Tipo: {estate.type}</p>
                <p className="text-lg mt-4">Categoría: {category}</p>
                {seller && (
                  <p className="text-lg mt-4">Vendedor: {seller.user.name}</p>
                )}
                <p className="text-lg mt-4">Ciudad: {estate.city}</p>
                <p className="text-lg mt-4">Dirección: {estate.address}</p>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8"
                    onClick={handleMeeting}
                  >
                    Agendar Cita{" "}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 ">
              <h1 className="text-3xl font-bold text-center">
                Apartados de la casa
              </h1>
              <div className="grid grid-cols-1 gap-8 my-20  ">
                {estate.characteristics.map((char, index) => (
                  <HouseRoomPresentation
                    key={index}
                    roomName={char}
                    roomImg1={estate.images[index * 2]}
                    roomImg2={estate.images[index * 2 + 1]}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <Footer />

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          error={error}
        />
      )}
    </div>
  );
};

export default EstateInfoPage;
