import React from "react";
import Link from "next/link";
import "./../../app/globals.css";
const NavBar = () => {
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <nav className="bg-white text-gray-800 flex flex-col sm:flex-row justify-between items-center px-4 py-2">
      <Link href="/" className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
        INMOBILIARIAS URIBE
      </Link>

      <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <Link href="/CataloguePage" className="text-gray-800">
            Catalogo
          </Link>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <Link href="/#">Mis Casas</Link>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <Link href="/SellersPage">Vendedores Autorizados</Link>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <Link href="/UploadEstatePage">Publicar Propiedad</Link>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <Link href="/#">Mapa</Link>
        </li>

        {isLogged ? (
          <li className="hover:bg-gray-200 py-2 px-3 rounded">
            <Link href="/ProfilePage">Perfil</Link>
          </li>
        ) : (
          <>
            <li className="hover:bg-gray-200 py-2 px-3 rounded">
              <Link href="/LoginPage">Log In</Link>
            </li>
            <li className="hover:bg-gray-200 py-2 px-3 rounded">
              <Link href="/SignUpPage">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
