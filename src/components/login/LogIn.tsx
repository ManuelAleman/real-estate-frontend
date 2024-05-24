import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const LogIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          localStorage.setItem("token", json.token);
          console.log("LogIn Successful");
          router.push("/Home");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center hero-image bg-hero-image">
      <form className="flex flex-col items-center bg-white rounded-lg p-8 bg-opacity-75 md:px-24 py-12">
        <h1 className="text-3xl font-bold mb-8">Iniciar Sesion</h1>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-full border border-black px-4 py-2 mb-4 text-black requ"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-full border border-black px-4 py-2 mb-4 text-black "
        />
        <a href="#" className="mt-2">
          Contraseña olvidada?
          <strong>Click aqui</strong>
        </a>
        <button
          type="submit"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 display-block w-full"
          onClick={handleSubmit}
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
