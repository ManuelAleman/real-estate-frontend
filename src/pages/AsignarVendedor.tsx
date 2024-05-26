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

interface Seller {
  _id: string;
  name: string;
}

interface User {
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

const AsignarVendedor = () => {
  const [estates, setEstates] = useState<Estate[]>([]);
  const router = useRouter();
  const [seller, setSeller] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState("");
  const [estateSelected, setEstateSelected] = useState("");

  const handleAssignSeller = (estateId: string) => {
    setEstateSelected(estateId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAssign = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/estates/assignSeller", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sellerId: selectedSeller,
          estateId: estateSelected,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Seller assigned:", data.message);
            setEstates(
              estates.filter((estate) => estate._id !== estateSelected)
            );
            handleCloseModal();
          } else {
            console.error("Error assigning seller:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("No token found");
    }
  };

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
            console.log("Estates:", data.estates);
            setEstates(data.estates);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/users/getVerifiedSellers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Sellers:", data.sellers);
            setSeller(data.sellers);
          } else {
            console.error("Error fetching sellers:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("No token found");
    }
  }, []);

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div className="container mx-auto my-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          Asignar vendedores
        </h1>
        {estates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {estates
              .filter((estates) => estates.wantSeller === true)
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
                      onClick={() => handleAssignSeller(estate._id)}
                    >
                      Asignar un vendedor
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl text-gray-800">
              No hay propiedades esperando por un vendedor
            </h1>
          </div>
        )}
      </div>
      <Footer />

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Vendedores Disponibles
                    </h3>

                    <div className="mt-2">
                      <select
                        name="select"
                        id="s-selelr"
                        value={selectedSeller}
                        onChange={(e) => setSelectedSeller(e.target.value)}
                      >
                        <option key="" value="">
                          Seleccione un vendedor
                        </option>
                        {seller.map((seller: Seller, index) => (
                          <option key={index} value={seller._id}>
                            {seller.user.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAssign}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Asignar
                </button>

                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsignarVendedor;
