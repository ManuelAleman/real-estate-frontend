import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";

interface Props {
  id: string;
  img: string;
  user: string;
  seller: string | undefined;
  sellerNumber: string | undefined;
  sellerEmail: string | undefined;
  estate: string;
  description: string;
  date: Date;
  status: string;
  message: string;
}

const MeetingInfoCard = ({
  id,
  img,
  user,
  seller,
  sellerNumber,
  sellerEmail,
  estate,
  description,
  date,
  status,
  message,
}: Props) => {
  const newDate = format(new Date(date), "Pp").split(",");
  const fecha = newDate[0];
  const hora = newDate[1];

  const renderStatus = () => {
    switch (status) {
      case "pending":
        return <span className="text-yellow-500">Pendiente</span>;
      case "accepted":
        return <span className="text-green-500">Aceptada</span>;
      case "rejected":
        return <span className="text-red-500">Rechazado</span>;
      case "done":
        return <span className="text-green-500">Finalizado</span>;
      default:
        return <span className="text-gray-500">Desconocido</span>;
    }
  };
  const handleGenerarContrato = () => {
    console.log("Generar contrato");
  };

  return (
    <div>
      <div className="grid grid-cols-1 mt-8 rounded-xl bg-slate-100">
        <div className="my-4">
          <h1 className="text-3xl font-bold text-center">{estate}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20 ">
          <div>
            <Image
              src={img}
              alt={estate}
              width={500}
              height={500}
              className="w-full h-72 object-cover object-center rounded-lg shadow-md"
            />
            <h1>
              <p className="text-lg text-center">{description}</p>
            </h1>
          </div>
          <div className="mx-8">
            <div>
              <h1 className="text-2xl font-bold text-center">
                Información de la reunión
              </h1>
            </div>
            <div className="my-4">
              <h1 className="text-xl font-bold">Fecha: {fecha}</h1>
            </div>
            <div className="my-4">
              <h1 className="text-xl font-bold">Hora: {hora}</h1>
            </div>
            <div className="my-4">
              <h1 className="text-xl font-bold">Estado: {renderStatus()}</h1>
            </div>
            <div className="my-4">
              <h1 className="text-xl font-bold">Mensaje: {message}</h1>
            </div>
            {!seller ? (
              <div>
                <h1 className="text-lg font-bold mt-20 text-center">
                  Esperando a Asignacion de un vendedor
                </h1>
              </div>
            ) : (
              <div className="my-">
                <h1 className="text-xl font-bold text-center">Vendedor</h1>
                <h1 className="text-lg text-center">Nombre: {seller}</h1>
                <h1 className="text-lg text-center">Email: {sellerEmail}</h1>
                <h1 className="text-lg text-center">
                  Teléfono: {sellerNumber}
                </h1>
              </div>
            )}
          </div>
        </div>

        {status === "done" && (
          <div className="flex justify-center mb-12">
            <a
              href="https://www.gob.mx/cms/uploads/attachment/file/117806/FORMATO_ARRENDAMIENTO_Actualizaci_n_Just_Persona_Fisica.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Imprimir contrato
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingInfoCard;
