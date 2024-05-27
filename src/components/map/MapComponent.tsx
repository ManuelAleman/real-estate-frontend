import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../utils/CONSTANTS";
import {
  DecoderAddressTs,
  decodeEstatesInRange,
} from "../../utils/DecoderAddress";
import Image from "next/image";
import Link from "next/link";
interface Estate {
  _id: string;
  name: string;
  presentationImg: string;
  description: string;
  price: number;
  type: string;
  category: string;
  user: string;
  status: string;
  seller: string;
  city: string;
  address: string;
  characteristics: string[];
  images: string[];
}

interface EstateLocCoor {
  estate: Estate;
  location: { lat: number; lng: number };
}

const MapComponent = () => {
  const [estates, setEstates] = useState<Estate[]>([]);
  const [estatesLocCoor, setEstatesLocCoor] = useState<EstateLocCoor[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 24.806484173704135,
    lng: -107.39502698774261,
  });
  const [selectedEstate, setSelectedEstate] = useState<EstateLocCoor | null>(
    null
  );

  const radius = 0.5;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error al obtener la ubicación:", error);
      }
    );
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/estates/getEstatesApproved")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEstates(data.estates);
        } else {
          console.error("Error fetching estates:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const getEstateLocCoor = async () => {
      const estatesLocCoorAux: EstateLocCoor[] = [];
      for (const estate of estates) {
        const location = await DecoderAddressTs(estate.address);
        if (location) {
          const isInRange = await decodeEstatesInRange(
            currentLocation.lat,
            currentLocation.lng,
            location.lat,
            location.lng,
            radius
          );

          if (isInRange) {
            estatesLocCoorAux.push({ estate, location });
          }
        }
      }
      setEstatesLocCoor(estatesLocCoorAux);
    };

    getEstateLocCoor();
  }, [estates, currentLocation]);

  const containerStyle = {
    height: "500px",
    width: "1270px",
  };

  return (
    <div className="mx-auto w-full md:w-11/12 lg:w-10/12 xl:w-8/12 mt-4 mb-8 rounded-lg overflow-hidden shadow-md">
      <div className="flex justify-center my-2">
        <h1 className="text-2xl font-bold">Mapa de inmuebles cercanos</h1>
      </div>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_MAPS_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={15}
        >
          {currentLocation && (
            <MarkerF
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
            />
          )}

          {estatesLocCoor.map((estate) => {
            return (
              <MarkerF
                key={estate.estate.name}
                position={{
                  lat: estate.location.lat,
                  lng: estate.location.lng,
                }}
                icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                onClick={() => {
                  setSelectedEstate(estate);
                }}
              />
            );
          })}

          {selectedEstate && (
            <InfoWindow
              position={{
                lat: selectedEstate.location.lat,
                lng: selectedEstate.location.lng,
              }}
              onCloseClick={() => {
                setSelectedEstate(null);
              }}
            >
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="flex justify-center">
                  <Image
                    src={selectedEstate.estate.presentationImg}
                    alt="Estate"
                    width={140}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-center">
                    {selectedEstate.estate.name}
                  </div>
                  <p className="text-gray-700 text-base mb-2 text-center">
                    {selectedEstate.estate.description}
                  </p>
                  <p className="text-gray-700 text-base mb-2 text-center">
                    <strong>Dirección:</strong> {selectedEstate.estate.address}
                  </p>
                  <p className="text-gray-700 text-base mb-2 text-center">
                    <strong>Precio:</strong> {selectedEstate.estate.price}
                  </p>
                  <Link
                    className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded"
                    href={{
                      pathname: "/EstateInfoPage",
                      query: { id: selectedEstate.estate._id },
                    }}
                  >
                    Ver Propiedad
                  </Link>
                </div>
              </div>
            </InfoWindow>
          )}

          {currentLocation && (
            <Circle
              center={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              radius={radius * 1000}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
