"use client";
import React, { useState } from "react";
import UploadImage from "./UploadImage";

interface FormEstateProps {
  checkFormFields: () => void;
  handleUploadImage: (roomId: string, imageId: string, imageFile: File) => void;
}
const FormEstate = ({
  checkFormFields,
  handleUploadImage,
}: FormEstateProps) => {
  const [type, setType] = useState("venta");
  const [wantSeller, setWantSeller] = useState(false);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleWantSellerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWantSeller(event.target.value === "false" ? false : true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 md:px-40 my-4 md:min-w-0">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Datos de la propiedad
      </h1>
      <form className="flex flex-col items-center">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-2 mb-8 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Introduce el nombre de la propiedad"
          required
          onChange={checkFormFields}
        />

        <UploadImage
          id="imagenPresentacion"
          label="Imagen"
          handleUploadImage={handleUploadImage}
        />

        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Categoria
        </label>
        <select
          id="category"
          name="category"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          onChange={handleTypeChange}
        >
          <option value="Casa">Casa</option>
          <option value="Residencial">Residencial</option>
          <option value="Departamento">Departamento</option>
        </select>

        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Descripción de la propiedad"
          required
          onChange={checkFormFields}
        />

        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Tipo publicacion
        </label>
        <select
          id="type"
          name="type"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          onChange={handleTypeChange}
        >
          <option value="venta">Venta</option>
          <option value="renta">Renta</option>
        </select>
        <label
          htmlFor="wantSeller"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          ¿Quieres solicitar un vendedor?
        </label>
        <select
          id="wantSeller"
          name="wantSeller"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          onChange={handleWantSellerChange}
        >
          <option value="false">No</option>
          <option value="true">Si</option>
        </select>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Precio
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Precio"
          required
          onChange={checkFormFields}
          style={{
            WebkitAppearance: "none",
            MozAppearance: "textfield",
            appearance: "textfield",
            width: "100%",
          }}
        />

        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Ciudad
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Ciudad de la propiedad"
          required
          onChange={checkFormFields}
        />

        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Calle
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Dirección completa"
          required
          onChange={checkFormFields}
        />

        <label
          htmlFor="colony"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Colonia
        </label>
        <input
          type="text"
          id="colony"
          name="colony"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Colonia"
          required
          onChange={checkFormFields}
        />

        <label
          htmlFor="zipCode"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Código postal
        </label>
        <input
          type="number"
          id="zipCode"
          name="zipCode"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Código postal"
          required
          onChange={checkFormFields}
        />

        <label
          htmlFor="nExterior"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Número exterior
        </label>
        <input
          type="number"
          id="nExterior"
          name="nExterior"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Número exterior"
          required
          onChange={checkFormFields}
        />
      </form>
    </div>
  );
};

export default FormEstate;
