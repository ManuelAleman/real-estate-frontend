"use client";
import React, { useState } from "react";

interface Props {
  onFilterChange: (key: string, value: string) => void;
}

const FilterSidebar = ({ onFilterChange }: Props) => {
  const [price, setPrice] = useState(4950000);
  const [city, setCity] = useState("");

  const handlePriceChange = (e: { target: { value: any } }) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    onFilterChange("price", newPrice);
  };

  const handleCityChange = (e: { target: { value: any } }) => {
    const newCity = e.target.value;
    setCity(newCity);
    onFilterChange("city", newCity);
  };

  const resetFilters = () => {
    setPrice(4950000);
    setCity("");
    onFilterChange("reset", "");
  };

  return (
    <aside className="max-w md:w-2/6" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3  rounded bg-slate-300">
        <h1 className="text-4xl text-gray-900 dark:text-gray-950 font-semibold">
          Filtros
        </h1>

        <ul className="space-y-4">
          <li>
            <label htmlFor="filter-city">Ciudad</label>
            <input
              type="text"
              id="filter-city"
              value={city}
              onChange={handleCityChange}
              placeholder="Ingrese una ciudad"
              className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </li>
          <li>
            <label htmlFor="filter-rooms">Habitaciones</label>
            <select
              id="filter-rooms"
              className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              onChange={(e) => onFilterChange("rooms", e.target.value)}
            >
              <option value="">seleccione una opcion</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4plus">4+</option>
            </select>
          </li>
          <li>
            <label htmlFor="filter-type">Categoria</label>
            <select
              id="filter-type"
              className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              onChange={(e) => onFilterChange("type", e.target.value)}
            >
              <option value="">seleccione una opcion</option>
              <option value="apartment">Apartamento</option>
              <option value="house">Casa</option>
              <option value="studio">Estudio</option>
            </select>
          </li>
          <li>
            <label htmlFor="filter-price text-base">
              Precio: 100000 - {price == 4950000 ? "4950000 +" : price}
            </label>
            <input
              type="range"
              id="filter-price"
              min="150000"
              max="4950000"
              step="100000"
              value={price}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </li>

          <li className="flex justify-center">
            <button
              className=" p-2 bg-stone-800 text-white rounded shadow-sm mx-4"
              onClick={() => resetFilters()}
            >
              Limpiar
            </button>

            <button
              className=" p-2 bg-stone-800 text-white rounded shadow-sm mx-4"
              onClick={() => onFilterChange("apply", "")}
            >
              Aplicar
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default FilterSidebar;
