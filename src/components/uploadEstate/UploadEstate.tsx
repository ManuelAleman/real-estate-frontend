"use client";
import React, { useState } from "react";
import NewRoomCard from "../ui/NewRoomCard";
import FormEstate from "../ui/FormEstate";

const UploadEstate = () => {
  const [roomType, setRoomType] = useState("");
  const [roomCounts, setRoomCounts] = useState({
    Recamara: 0,
    Cocina: 0,
    Baño: 0,
    Sala: 0,
    Comedor: 0,
    Patio: 0,
    Garaje: 0,
  });
  const [rooms, setRooms] = useState<{ id: number; type: string }[]>([]);
  const [formFieldsFilled, setFormFieldsFilled] = useState(false);

  const handleRoomTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoomType(event.target.value);
  };

  const handleDeleteRoom = (id: number) => {
    console.log("Deleting room with ID:", id);

    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);

    const deletedRoom = rooms.find((room) => room.id === id);
    if (deletedRoom) {
      const deletedRoomType = deletedRoom.type;
      setRoomCounts((prevCounts) => ({
        ...prevCounts,
        [deletedRoomType]:
          prevCounts[deletedRoomType as keyof typeof prevCounts] - 1,
      }));
    }
  };

  const handleAddRoom = () => {
    if (!roomType) return;

    const newRoom = {
      id: rooms.length + 1,
      type: roomType,
    };

    setRooms((prevRooms) => [...prevRooms, newRoom]);

    setRoomCounts((prevCounts) => ({
      ...prevCounts,
      [roomType]: prevCounts[roomType as keyof typeof prevCounts] + 1,
    }));

    setRoomType("");
  };

  const checkFormFields = () => {
    const typeField = document.getElementById("type") as HTMLSelectElement;
    const nameField = document.getElementById("name") as HTMLInputElement;
    const categoryField = document.getElementById(
      "category"
    ) as HTMLSelectElement;
    const descriptionField = document.getElementById(
      "description"
    ) as HTMLTextAreaElement;
    const priceField = document.getElementById("price") as HTMLInputElement;
    const cityField = document.getElementById("city") as HTMLInputElement;
    const addressField = document.getElementById("address") as HTMLInputElement;

    const allFieldsFilled =
      typeField.value !== "" &&
      nameField.value !== "" &&
      categoryField.value !== "" &&
      descriptionField.value !== "" &&
      priceField.value !== "" &&
      cityField.value !== "" &&
      addressField.value !== "";

    setFormFieldsFilled(allFieldsFilled);
  };

  const handleSubmit = () => {
    if (rooms.length === 0) {
      alert("Debes agregar al menos una habitación antes de enviar.");
      return;
    }
  };

  return (
    <div className="flex flex-col bg-gray-200 p-4 rounded-lg">
      <h1 className="md:my-12 md:mx-12 font-bold text-xl text-center">
        Sube la informacion de tu inmueble
      </h1>
      <FormEstate checkFormFields={checkFormFields} />
      <h1 className="md:my-12 md:mx-12 font-bold text-xl text-center">
        Habitaciones
      </h1>

      <div>
        <h2 className="text-center mb-4">Contador de espacios</h2>
        <div className="flex flex-col md:flex-row md:justify-center">
          {Object.entries(roomCounts).map(([roomType, count]) => (
            <div key={roomType} className="flex flex-col items-center mx-4">
              <span className="text-center">{roomType}</span>
              <span className="text-center">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mb-4 mt-8">
        <select
          value={roomType}
          onChange={handleRoomTypeChange}
          className="px-2 py-1 h-8 w-32 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Seleccione un tipo</option>
          <option value="Recamara">Recamara</option>
          <option value="Cocina">Cocina</option>
          <option value="Baño">Baño</option>
          <option value="Sala">Sala</option>
          <option value="Comedor">Comedor</option>
          <option value="Patio">Patio</option>
          <option value="Garaje">Garaje</option>
        </select>
        <button
          onClick={handleAddRoom}
          disabled={!roomType}
          className="ml-2 px-2 py-1 h-8 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 text-xs"
        >
          Agregar
        </button>
      </div>

      {rooms.map((room) => (
        <NewRoomCard
          key={room.id}
          roomType={room.type}
          handleDeleteRoom={() => handleDeleteRoom(room.id)}
        />
      ))}

      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className={`mt-6 px-2 py-1 h-8 w-32 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 text-xs ${
            !formFieldsFilled && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!formFieldsFilled}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default UploadEstate;
