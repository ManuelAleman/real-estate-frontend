import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import BannerHero from "@/components/ui/BannerHero";
import { useRouter } from "next/router";
import Image from "next/image";

interface User {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  profilePicture: string;
  role: string;
}

const RegistrarVendedor: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");

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
    fetch("http://localhost:8080/users/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.users) {
          setUsers(data.users);
        } else {
          console.error("Users data is null or undefined");
        }
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });
  }, []);

  const handleUserSelect = (userId: string) => {
    setSelectedUser(selectedUser === userId ? null : userId);
  };

  const handleAccept = () => {
    if (!selectedUser) {
      setShowModal(false);
      return;
    }

    if (!city) {
      alert("Por favor ingrese una ciudad");
      return;
    }

    fetch("http://localhost:8080/sellers/addSeller", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        _id: selectedUser,
        city,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Seller created:", data.message);
          setUsers(users.filter((user) => user._id !== selectedUser));
          setShowModal(false);
        } else {
          console.error("Error creating seller:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (users.length === 0) {
    return (
      <div className="flex flex-col h-screen">
        <NavBar />
        <BannerHero />
        <h1 className="text-center text-4xl font-bold mt-12 mb-20">
          No hay usuarios para crear vendedor
        </h1>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <BannerHero />
      <h1 className="text-center text-4xl font-bold mt-12">
        Seleccione a un usuario para crear Vendedor
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 p-4">
        {users.map((user, index) => (
          <div
            key={index}
            onClick={() => handleUserSelect(user._id)}
            className={`border border-gray-300 rounded-md p-4 cursor-pointer ${
              selectedUser === user._id ? "bg-gray-200" : ""
            }`}
          >
            <div className="flex flex-col items-center">
              <Image
                src={user.profilePicture}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.contactNumber}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-8">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Aceptar
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white w-1/2 p-8 rounded-lg z-50">
            <h2 className="text-2xl font-bold mb-4">Confirmación</h2>

            <input
              type="text"
              placeholder="Ingrese una ciudad"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <p>¿Estás seguro de crear un vendedor con este usuario?</p>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleAccept}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RegistrarVendedor;
