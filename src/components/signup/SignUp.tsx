import React, { useState } from "react";
import Link from "next/link";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        contactNumber,
        answer,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          console.log("SignUp Successful");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center hero-image bg-hero-image">
      <form className="flex flex-col items-center bg-white rounded-lg p-8 bg-opacity-75 md:px-24 py-12">
        <h1 className="text-3xl font-bold mb-8">Registrate</h1>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          pattern="[0-9a-zA-Z]{8,}"
          className="rounded-full border border-black px-4 py-2 mb-4 text-black required password>8"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <span className="mt-1 hidden text-sm text-red-400">
          Password must be at least 8 characters.{" "}
        </span>
        <input
          type="text"
          placeholder="Telefono"
          onChange={(e) => setContactNumber(e.target.value)}
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <input
          type="password"
          placeholder="Palabra Secreta"
          onChange={(e) => setAnswer(e.target.value)}
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />
        <Link href="/LoginPage" className="mt-2">
          Ya tienes cuenta?
          <strong>Inicia sesion</strong>
        </Link>
        <button
          type="submit"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 display-block w-full"
          onClick={handleSubmit}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default SignUp;
