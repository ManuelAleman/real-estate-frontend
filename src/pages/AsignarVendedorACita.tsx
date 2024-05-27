import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import BannerHero from "@/components/ui/BannerHero";
import Footer from "@/components/footer/Footer";
import MeetingSellerAddCard from "@/components/ui/MeetingSellerAddCard";
interface MeetingData {
  _id: string;
  user: User;
  estate: EstateData;
  seller: Seller | null;
  date: Date;
  waitingSeller: boolean;
  status: string;
  message: string;
}

interface EstateData {
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

interface User {
  _id: string;
  name: string;
  contactNumber: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Seller {
  _id: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const AsignarVendedorACita = () => {
  const [meetings, setMeetings] = useState<MeetingData[]>([]);
  const [profile, setProfile] = useState<User>({
    _id: "",
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    role: "",
    profilePicture: "",
    answer: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  });

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
          setProfile(data.user);
        });
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/meetings/getMeetingWithNoSeller", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data.meetings);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl mt-4 font-bold">
          Citas sin vendedor asignado
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {meetings.map((meeting) => (
            <MeetingSellerAddCard
              key={meeting._id}
              id={meeting._id}
              img={meeting.estate.presentationImg}
              title={meeting.estate.name}
              description={meeting.estate.description}
              userName={meeting.user.name}
              userPhone={meeting.user.contactNumber}
              price={meeting.estate.price.toString()}
              city={meeting.estate.city}
              address={meeting.estate.address}
              message={meeting.message}
              userId={meeting.user._id}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AsignarVendedorACita;
