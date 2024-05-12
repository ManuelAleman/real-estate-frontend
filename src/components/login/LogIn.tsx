import React from "react";
import Link from "next/link";
const LogIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center hero-image bg-hero-image">
      <form className="flex flex-col items-center bg-white rounded-lg p-8 bg-opacity-75 md:px-24 py-12">
        <h1 className="text-3xl font-bold mb-8">Iniciar Sesion</h1>
        <input
          type="text"
          placeholder="Email"
          className="rounded-full border border-black px-4 py-2 mb-4 text-black "
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded-full border border-black px-4 py-2 mb-4 text-black "
        />
        <a href="#" className="mt-2">
          Contraseña olvidada?
          <strong>Click aqui</strong>
        </a>
        <button
          type="submit"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 display-block w-full"
        >
          Iniciar Sesion
        </button>
        <Link href="/SignUpPage" className="mt-2">
          ¿No tienes cuenta? <strong>Registrate</strong>
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
