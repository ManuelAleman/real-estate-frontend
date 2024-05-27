import React, { useState, useEffect, use } from "react";
import Link from "next/link";

interface profile {
  id: string;
  role: string;
}
const ProfileDropDown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState<profile>({ id: "", role: "" });

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
          if (data && data.user) {
            const { _id: id, role } = data.user;
            console.log("User data:", data.user);
            setProfile({ id, role });
          } else {
            console.error("User data is null or undefined");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = (e: any) => {
    if (!e.target.closest(".relative")) {
      setDropdownOpen(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-gray-800 text-white py-2 px-4 rounded inline-flex items-center"
      >
        <span>Perfil</span>
        <svg
          className="fill-current h-4 w-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.5 8l4.5 4 4.5-4H5.5z" />
        </svg>
      </button>
      {dropdownOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
          <li>
            <Link
              href="/ProfilePage"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Mi perfil
            </Link>
          </li>
          <li>
            <Link
              href="/MyMeetingsPage"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Mis Citas
            </Link>
          </li>
          <li>
            <Link
              href="/MyHousesPage"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Mis Casas
            </Link>
          </li>
          {profile.role === "seller" && (
            <li>
              <Link
                href="/MeetingUpdates"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Estados de citas
              </Link>
            </li>
          )}
          {profile.role === "admin" && (
            <li>
              <Link
                href="/ApproveEstates"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                role={profile.role}
              >
                Aprobar Propiedades
              </Link>

              <Link
                href="/AsignarVendedor"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Asignar Vendedor
              </Link>

              <Link
                href="/RegistrarVendedor"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Registrar vendedor
              </Link>

              <Link
                href="/AsignarVendedorACita"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Asignar Vendedor a Cita
              </Link>
            </li>
          )}
          <li>
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={handleLogOut}
            >
              Cerrar sesion
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropDown;
