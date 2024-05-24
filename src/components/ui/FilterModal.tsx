import React, { useState, useEffect } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (price: number, city: string, type: string) => void;
}

const FilterModal = ({ isOpen, onClose, onApplyFilters }: FilterModalProps) => {
  const [logPrice, setLogPrice] = useState<number>(
    localStorage.getItem("logPrice")
      ? parseFloat(localStorage.getItem("logPrice")!)
      : Math.log10(50000000)
  );
  const [city, setCity] = useState<string>(localStorage.getItem("city") || "");
  const [type, setType] = useState<string>(localStorage.getItem("type") || "");

  const price = Math.round(Math.pow(10, logPrice));

  useEffect(() => {
    localStorage.setItem("logPrice", logPrice.toString());
  }, [logPrice]);

  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);

  useEffect(() => {
    localStorage.setItem("type", type);
  }, [type]);

  const handleApplyFilters = () => {
    onApplyFilters(price, city, type);
    onClose();
  };

  const handlePriceChange = (value: string) => {
    setLogPrice(Number(value));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Filtrar Propiedades</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio máximo:
          </label>
          <input
            type="range"
            min={4}
            max={7.69897}
            step={0.00001}
            value={logPrice}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="w-full"
          />
          <div className="text-right text-sm text-gray-600">{`$${price.toLocaleString()} MXN`}</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad:
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de publicacion:
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas</option>
            <option value="venta">Venta</option>
            <option value="renta">Renta</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleApplyFilters}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
