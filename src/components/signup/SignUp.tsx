import React from "react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center hero-image bg-hero-image">
      <form className="flex flex-col items-center bg-white rounded-lg p-8 bg-opacity-75 px-24 py-12">
        <h1 className="text-3xl font-bold mb-8">Registrate</h1>
        <input
          type="text"
          placeholder="Nombre"
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <input
          type="text"
          placeholder="Email"
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <input
          type="text"
          placeholder="Telefono"
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <input
          type="password"
          placeholder="Palabra Secreta"
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <a href="#" className="mt-2">
          Ya tienes cuenta?
          <strong>Inicia sesion</strong>
        </a>
        <button
          type="submit"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 display-block w-full"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default SignUp;
