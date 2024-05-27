"use client";
import React, { useState, useEffect } from "react";
import NewRoomCard from "../ui/NewRoomCard";
import FormEstate from "../ui/FormEstate";
import { useRouter } from "next/router";

interface Estate {
  presentationImg: File;
  name: string;
  description: string;
  price: number;
  type: string;
  category: string;
  user: string;
  city: string;
  address: string;
  status: string;
  wantSeller: string;
  characteristics: string[];
  images: File[];
}
interface Image {
  id: string;
  file: File;
  roomId: string;
}

const UploadEstate = () => {
  const [roomType, setRoomType] = useState("");
  const [rooms, setRooms] = useState<{ id: number; type: string }[]>([]);
  const [formFieldsFilled, setFormFieldsFilled] = useState(false);
  const [roomImages, setRoomImages] = useState<Image[]>([]);
  const [userId, setUserId] = useState("");
  const handleRoomTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoomType(event.target.value);
  };

  const router = useRouter();

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
          if (data) {
            setUserId(data.user._id);
          } else {
            console.error("User data is null or undefined");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [router]);

  const handleDeleteRoom = (id: number, roomType: string) => {
    console.log("id", id);
    console.log("roomType", roomType);

    console.log("rooms", rooms);

    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);

    console.log("updatedRooms", updatedRooms);

    const type = `image1-${roomType}-${id}`;
    const type2 = `image2-${roomType}-${id}`;

    const updatedImages = roomImages.filter(
      (image) => image.roomId !== type && image.roomId !== type2
    );
    setRoomImages(updatedImages);
  };

  const handleAddRoom = () => {
    if (!roomType) return;

    const newRoom = {
      id: rooms.length > 0 ? Math.max(...rooms.map((room) => room.id)) + 1 : 1,
      type: roomType,
    };
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setRoomType("");
  };

  const handleUploadImage = (
    roomId: string,
    imageId: string,
    imageFile: File
  ) => {
    setRoomImages((prevImages) => {
      const filteredImages = prevImages.filter(
        (image) => image.roomId !== roomId
      );
      const updatedImages = [
        ...filteredImages,
        { id: imageId, file: imageFile, roomId: roomId },
      ];

      return updatedImages;
    });
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
    const colonyField = document.getElementById("colony") as HTMLInputElement;
    const zipCode = document.getElementById("zipCode") as HTMLInputElement;
    const numberField = document.getElementById(
      "nExterior"
    ) as HTMLInputElement;

    const allFieldsFilled =
      typeField.value !== "" &&
      nameField.value !== "" &&
      categoryField.value !== "" &&
      descriptionField.value !== "" &&
      priceField.value !== "" &&
      cityField.value !== "" &&
      addressField.value !== "" &&
      colonyField.value !== "" &&
      zipCode.value !== "" &&
      numberField.value !== "";

    setFormFieldsFilled(allFieldsFilled);
  };

  const handleSubmit = () => {
    if (rooms.length === 0) {
      alert("Debes agregar al menos una habitación antes de enviar.");
      return;
    }

    const imagesWithoutPresentationImg = roomImages.slice(1);

    console.log(
      "IMAGES INFORMACION",
      imagesWithoutPresentationImg.map((image) => image.file)
    );

    if (imagesWithoutPresentationImg.length < rooms.length * 2) {
      alert("Debes agregar dos imagenes por area.");
      return;
    }

    console.log("roomImages", roomImages[0].file);

    const addres = document.getElementById("address") as HTMLInputElement;
    const colony = document.getElementById("colony") as HTMLInputElement;
    const zipCode = document.getElementById("zipCode") as HTMLInputElement;
    const number = document.getElementById("nExterior") as HTMLInputElement;
    const city = document.getElementById("city") as HTMLInputElement;

    const totalAddress = `${addres.value} ${number.value} ${colony.value} ${zipCode.value} ${city.value}`;

    const estate: Estate = {
      presentationImg: roomImages[0].file,
      name: (document.getElementById("name") as HTMLInputElement).value,
      description: (
        document.getElementById("description") as HTMLTextAreaElement
      ).value,
      price: parseInt(
        (document.getElementById("price") as HTMLInputElement).value
      ),
      type: (document.getElementById("type") as HTMLSelectElement).value,
      category: (document.getElementById("category") as HTMLSelectElement)
        .value,
      user: userId,
      city: (document.getElementById("city") as HTMLInputElement).value,
      address: totalAddress,
      wantSeller: (document.getElementById("wantSeller") as HTMLSelectElement)
        .value,
      characteristics: rooms.map((room) => room.type),
      images: imagesWithoutPresentationImg.map((image) => image.file),
      status: "waiting",
    };

    const formData = new FormData();
    formData.append("presentationImg", estate.presentationImg);
    formData.append("name", estate.name);
    formData.append("description", estate.description);
    formData.append("price", estate.price.toString());
    formData.append("type", estate.type);
    formData.append("category", estate.category);
    formData.append("user", estate.user);
    formData.append("city", estate.city);
    formData.append("address", estate.address);
    formData.append("wantSeller", estate.wantSeller);
    estate.characteristics.forEach((characteristic) => {
      formData.append("characteristics", characteristic);
    });
    formData.append("status", estate.status);
    estate.images.forEach((image) => {
      formData.append("images", image);
    });

    console.log("formData", formData);

    fetch("http://localhost:8080/estates/createEstate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Propiedad subida exitosamente");
          router.push("/");
        } else {
          console.error("Error uploading estate:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("estate", estate);
  };

  return (
    <div className="flex flex-col bg-gray-200 p-4 rounded-lg">
      <h1 className="md:my-12 md:mx-12 font-bold text-xl text-center">
        Sube la informacion de tu inmueble
      </h1>
      <FormEstate
        checkFormFields={checkFormFields}
        handleUploadImage={handleUploadImage}
      />
      <h1 className="md:my-12 md:mx-12 font-bold text-xl text-center">
        Habitaciones
      </h1>

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
          roomId={room.id.toString()}
          handleDeleteRoom={() => handleDeleteRoom(room.id, room.type)}
          handleUploadImage={handleUploadImage}
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
