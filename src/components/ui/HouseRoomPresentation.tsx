import React from "react";
import Image from "next/image";

interface HouseRoomPresentationProps {
  roomName: string;
  roomImg1: string;
  roomImg2: string;
}

const HouseRoomPresentation = ({
  roomName,
  roomImg1,
  roomImg2,
}: HouseRoomPresentationProps) => {
  return (
    <div className="flex flex-col items-center mb-8 bg-slate-300 shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-center mb-4 text-3xl mt-8">{roomName}</h1>
      <div className="grid grid-cols-1 mx-4 md:flex md:justify-between gap-12 my-8">
        <div className="mb-4">
          <Image
            src={roomImg1}
            alt={roomName}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="mb-4">
          <Image
            src={roomImg2}
            alt={roomName}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HouseRoomPresentation;
