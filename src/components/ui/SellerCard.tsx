import React from "react";
import Image from "next/image";

interface SellerCardProps {
  name: string;
  email: string;
  phone: string;
  photo: string;
  rating: number;
}

const SellerCard = ({ name, email, phone, photo, rating }: SellerCardProps) => {
  const generateStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 fill-current ${
            i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 .288l2.833 8.718h9.167l-7.416 5.387 2.833 8.717-7.417-5.386-7.417 5.386 2.833-8.717-7.416-5.387h9.167z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="w-full max-w-sm mx-auto my-4 p-4 flex flex-col rounded-lg border shadow-md">
      <div className="flex justify-center mx-4 my-4 rounded-lg border shadow-md">
        <Image
          src={photo}
          alt={name}
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="px-4 py-2">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
            {email}
          </a>
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <a href={`tel:${phone}`} className="text-blue-500 hover:underline">
            {phone}
          </a>
        </p>
        <div className="flex items-center">{generateStars(rating)}</div>
      </div>
    </div>
  );
};

export default SellerCard;
