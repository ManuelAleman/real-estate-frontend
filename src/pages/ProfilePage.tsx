import React, { useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import BannerHero from "@/components/ui/BannerHero";
import NavBar from "@/components/navbar/NavBar";
import MyHouses from "@/components/catalogue/MyHouses";
interface profileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  img: string;
  role: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = React.useState<profileData>({
    id: "",
    name: "",
    email: "",
    phone: "",
    img: "",
    role: "",
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
          const {
            _id: id,
            name,
            email,
            contactNumber: phone,
            profilePicture: img,
            role,
          } = data.user;
          setProfile({ id, name, email, phone, img, role });
          console.log(data);
        });
    }
  }, []);

  return (
    <div>
      <NavBar />
      <BannerHero />
      <div className="container">
        <div className="mx-auto px-4 my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center md:items-start pt-20 my-4 mx-auto">
              <Image
                src="https://i.pinimg.com/236x/2f/97/f0/2f97f05b32547f54ef1bdf99cd207c90.jpg"
                alt="profile"
                width={150}
                height={150}
                className="rounded-full pb-4"
              />
              <h1 className="text-2xl font-bold text-center">{profile.name}</h1>
              <p className="text-gray-500">{profile.email}</p>
              <p className="text-gray-500">{profile.phone}</p>
            </div>
            <div className="flex flex-col items-center font-mono text-6xl  my-4">
              <div className="mb-4 text-center">
                {profile.role}
                <h1>Mis Casas</h1>
              </div>

              <div className="mt-20">
                <MyHouses id={profile.id}></MyHouses>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
