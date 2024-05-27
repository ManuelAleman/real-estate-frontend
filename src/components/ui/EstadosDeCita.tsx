import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Cita {
  id: string;
  img: string;
  title: string;
  userName: string;
  userPhone: string;
  description: string;
  status: string;
}

const EstadosDeCita = ({
  img,
  title,
  description,
  userName,
  userPhone,
  status,
  id,
}: Cita) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estado, setEstado] = useState(status);

  const handleGuardarClick = () => {
    setIsModalOpen(true);
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstado(e.target.value);
  };

  const handleSumbit = () => {
    fetch(`http://localhost:8080/meetings/updateMeetigStatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: estado,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-300 rounded-lg p-6 m-6 shadow-lg bg-white gap-6">
      <div className="md:col-span-1 flex justify-center items-center">
        <Image
          src={img}
          alt="Imagen"
          width={300}
          height={300}
          className="rounded-lg shadow-md"
        />
      </div>

      <div className="md:col-span-2 flex flex-col">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-3">{description}</p>
        <p className="text-gray-600 mb-3">
          <span className="font-medium">Cliente:</span> {userName}
        </p>
        <p className="text-gray-600 mb-3">
          <span className="font-medium">Número de teléfono:</span> {userPhone}
        </p>
        <label htmlFor="estado" className="text-gray-700 mb-2 font-medium">
          Estado:
        </label>
        <select
          id="estado"
          name="estado"
          className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={estado}
          onChange={handleEstadoChange}
        >
          <option value="pending" selected={status === "pending"}>
            Pendiente
          </option>
          <option value="accepted" selected={status === "accepted"}>
            Aceptar
          </option>
          <option value="rejected" selected={status === "rejected"}>
            Rechazar
          </option>
          <option value="done" selected={status === "done"}>
            Finalizar
          </option>
        </select>
        <button
          className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={handleGuardarClick}
        >
          Guardar
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Modal de Confirmación
            </h2>
            <p>¿Estás seguro de querer guardar los cambios?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-4 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSumbit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstadosDeCita;
