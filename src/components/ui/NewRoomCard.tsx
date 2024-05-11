import React from "react";
import UploadImage from "./UploadImage";

interface Props {
  roomType: string;
  handleDeleteRoom: () => void;
}

const NewRoomCard = ({ roomType, handleDeleteRoom }: Props) => {
  return (
    <div className="max-w-md min-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 md:px-40 my-4  md:min-w-0">
      <h1 className="text-2xl font-bold mb-4 text-center">{roomType}</h1>
      <div className="flex flex-col md:flex-row">
        <UploadImage id={`image1-${roomType}`} label="Image 1" />
        <UploadImage id={`image2-${roomType}`} label="Image 2" />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleDeleteRoom}
          className="text-red-500 font-bold cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default NewRoomCard;
