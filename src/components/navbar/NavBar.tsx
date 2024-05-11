import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white text-gray-800 flex flex-col sm:flex-row justify-between items-center px-4 py-2">
      <a href="/" className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
        INMOBILIARIAS URIBE
      </a>
      <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <a href="/#" className="text-gray-800">
            Catálogo
          </a>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <a href="/#" className="text-gray-800">
            Mis casas
          </a>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <a href="/#" className="text-gray-800">
            Vendedores Autorizados
          </a>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <a href="/#" className="text-gray-800">
            Publicar propiedad
          </a>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <a href="/#" className="text-gray-800">
            Mapa
          </a>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <a href="/#" className="text-gray-800">
            Sign Up / Log In
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
