import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import BannerHero from "@/components/ui/BannerHero";
import Image from "next/image";
import { useRouter } from "next/router";

interface Estate {
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
  wantSeller: boolean;
  characteristics: string[];
  images: string[];
}

const ApproveEstates = () => {
  const [estates, setEstates] = useState<Estate[]>([]);
  const [selectedEstate, setSelectedEstate] = useState<Estate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/estates/getNoApprovedEstates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            data = data.estates;
            setEstates(data.filter((estate: Estate) => !estate.wantSeller));
            console.log("Estates:", estates);
          } else {
            console.error("Error fetching estates:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("No token found");
    }
  }, []);

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
          if (data && data.user) {
            const { role } = data.user;
            if (role !== "admin") {
              router.push("/");
            }
          } else {
            console.error("User data is null or undefined");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [router]);

  const handleApprove = (id: string) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/estates/approveEstate/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Estate approved:", data.message);
          setEstates(estates.filter((estate) => estate._id !== id));
          setIsModalOpen(false);
        } else {
          console.error("Error approving estate:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const openModal = (estate: Estate) => {
    setSelectedEstate(estate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEstate(null);
  };

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div className="container mx-auto my-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          Aprobar Propiedades
        </h1>
        {estates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {estates
              .filter((estate) => !estate.wantSeller)
              .map((estate, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <Image
                    src={estate.presentationImg}
                    alt={estate.name}
                    width={300}
                    height={200}
                    className="rounded-lg mb-4"
                  />
                  <h1 className="text-xl text-gray-800 font-bold mb-2">
                    {estate.name}
                  </h1>
                  <p className="text-gray-500 mb-4">{estate.city}</p>

                  <div className="flex flex-row md:flex-cols items-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openModal(estate)}
                    >
                      Aprobar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl text-gray-800">
              No hay propiedades por aprobar
            </h1>
          </div>
        )}
      </div>
      {isModalOpen && selectedEstate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Confirmar Aprobación</h2>
            <p>
              ¿Está seguro que desea aprobar la propiedad {selectedEstate.name}?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleApprove(selectedEstate._id)}
              >
                Aprobar
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ApproveEstates;
