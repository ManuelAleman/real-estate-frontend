"use client";
import React, { useState } from "react";
import Image from "next/image";
interface Props {
  id: string;
  label: string;
  handleUploadImage: (roomId: string, imageId: string, imageFile: File) => void;
}

const UploadImage = ({ id, label, handleUploadImage }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];
      setSelectedImage(image);
      setPreviewImage(URL.createObjectURL(image));
      handleUploadImage(id, image.name, image);
    }
  };

  return (
    <div className="md:pr-4 mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 text-center"
      >
        {label}
      </label>
      <div className="mt-1 flex flex-col items-center">
        <input
          type="file"
          id={id}
          className="sr-only"
          onChange={handleImageChange}
        />
        <label
          htmlFor={id}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Seleccionar imagen
        </label>
        {previewImage && (
          <Image
            src={previewImage}
            alt="Img Not Found"
            width={160}
            height={100}
          />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
