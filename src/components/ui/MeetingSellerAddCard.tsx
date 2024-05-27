import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Cita {
  id: string;
  img: string;
  title: string;
  userName: string;
  userPhone: string;
  description: string;
  price: string;
  city: string;
  address: string;
  message: string;
  userId: string;
}

interface User {
  _id: string;
  name: string;
  contactNumber: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Seller {
  _id: string;
  user: User;
  city: string;
  verified: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const MeetingSellerAddCard = ({
  id,
  img,
  title,
  description,
  userName,
  userPhone,
  price,
  city,
  address,
  message,
  userId,
}: Cita) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadedData, setIsLoadedData] = useState(false);
  const [sellers, setSellers] = useState<Seller[]>([]);

  useEffect(() => {
    if (!isLoadedData) {
      fetch("http://localhost:8080/users/getVerifiedSellers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoadedData(true);
          setSellers(data.sellers);
        });
    }
  }, [isLoadedData]);

  const handleAsignarVendedor = () => {
    setIsModalOpen(true);
  };

  const handleTryData = (idSeller: string) => {
    if (userId === idSeller) {
      alert("No puedes a este vendedor");
      return;
    }

    fetch(`http://localhost:8080/meetings/addSellerToMeeting/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        idSeller: idSeller,
      }),
    }).then((res) => res.json());

    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        key={id}
        className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white"
      >
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600">Precio: {price}</p>
        <p className="text-gray-600">Ciudad: {city}</p>
        <p className="text-gray-600">Direccion: {address}</p>
        <Image
          src={img}
          width={500}
          height={500}
          alt="Imagen"
          className="w-full h-64 object-cover mt-4"
        />
        <p className="text-gray-600 text-center mt-4">Nombre: {userName}</p>
        <p className="text-gray-600 text-center">Telefono: {userPhone}</p>
        <p className="text-gray-600 text-center">Mensaje: {message}</p>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            onClick={handleAsignarVendedor}
          >
            Asignar Vendedor
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Seleccione un vendedor
            </h2>
            <p>Seleccione uno de los siguientes vendedores</p>

            <div className="mt-4 max-h-60 overflow-y-auto">
              {sellers.map((seller) => (
                <div
                  key={seller._id}
                  className="border border-gray-300 rounded-lg p-4 mt-4"
                >
                  <p className="text-gray-800 font-semibold">
                    Nombre: {seller.user.name}
                  </p>
                  <p className="text-gray-600">Ciudad: {seller.city}</p>
                  <p className="text-gray-600">Rating: {seller.rating}</p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    onClick={() => handleTryData(seller._id)}
                  >
                    Asignar
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-4 hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingSellerAddCard;
