import React, { useState, useEffect } from "react";
import NavBar from "@/components/navbar/NavBar";
import BannerHero from "@/components/ui/BannerHero";
import Footer from "@/components/footer/Footer";
import MeetingInfoCard from "@/components/ui/MeetingInfoCard";
import EstadosDeCita from "@/components/ui/EstadosDeCita";

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

const MeetingUpdates = () => {
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

  const [sellerInfo, setSellerInfo] = useState<Seller>({
    _id: "",
    user: {
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
    },
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
          console.log(data);
        });
    }
  }, []);

  useEffect(() => {
    if (profile._id) {
      fetch(`http://localhost:8080/sellers/getSellerByUserId/${profile._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSellerInfo(data.seller);
          console.log("correcto", data.seller);
        });
    }
  }, [profile._id]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/meetings/getMeetingsWhereImSeller/${sellerInfo._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMeetings(data.meetings);
        console.log(data.meetings);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });
  }, [sellerInfo._id]);

  const filteredMeetings = meetings.filter(
    (meeting) => meeting.status !== "done"
  );

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div className="container mx-auto my-auto">
        <h1 className="text-center mt-5 text-4xl">Reuniones Asignadas</h1>
        <div className="row mt-5 mb-8">
          {filteredMeetings && filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting, index) => (
              <EstadosDeCita
                key={index}
                id={meeting._id}
                img={meeting.estate.presentationImg}
                title={meeting.estate.name}
                userName={meeting.user.name}
                userPhone={meeting.user.contactNumber}
                description={meeting.estate.description}
                status={meeting.status}
              />
            ))
          ) : (
            <h1 className="text-center mt-5 text-4xl">No hay reuniones</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MeetingUpdates;
