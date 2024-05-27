import React, { useState, useEffect } from "react";
import NavBar from "@/components/navbar/NavBar";
import BannerHero from "@/components/ui/BannerHero";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import MeetingInfoCard from "@/components/ui/MeetingInfoCard";
interface MeetingData {
  _id: string;
  user: User;
  seller: Seller | null;
  estate: EstateData;
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

const MyMeetingsPage = () => {
  const [meetings, setMeetings] = useState<MeetingData[]>([]);
  const [loading, setLoading] = useState(true);
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
          console.log(data);
        });
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/meetings/getMyMeetingInfo/${profile._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMeetings(data.meetings);
        console.log(data.meetings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
        setLoading(false);
      });
  }, [profile]);

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div className="container mx-auto my-auto">
        <h1 className="text-center mt-5 text-4xl">Mis reuniones</h1>
        <div className="row mt-5 mb-8">
          {meetings && meetings.length > 0 ? (
            meetings.map((meeting) => (
              <MeetingInfoCard
                key={meeting._id}
                id={meeting._id}
                img={meeting.estate.presentationImg}
                user={meeting.user.name}
                seller={meeting.seller?.user.name}
                sellerNumber={meeting.seller?.user.contactNumber}
                sellerEmail={meeting.seller?.user.email}
                estate={meeting.estate.name}
                description={meeting.estate.description}
                date={meeting.date}
                status={meeting.status}
                message={meeting.message}
              />
            ))
          ) : (
            <div className="text-center my-40 text-3xl">
              <p>No tienes reuniones programadas</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyMeetingsPage;
