import React, { useState } from "react";
import Link from "next/link";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  contactNumber?: string;
}

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setContactNumber("");
    setAnswer("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!name) newErrors.name = "El nombre es obligatorio.";
    if (!email) newErrors.email = "El email es obligatorio.";
    if (!password) newErrors.password = "La contraseña es obligatoria.";
    if (!confirmPassword) newErrors.confirmPassword = "La confirmación de la contraseña es obligatoria.";
    if (!contactNumber) newErrors.contactNumber = "El número de contacto es obligatorio.";

    if (name && /\d/.test(name)) {
      newErrors.name = "El nombre no debe contener números.";
    }

    if (email && !email.includes('@')) {
      newErrors.email = "Dirección de email incorrecta.";
    }

    if (password && password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (contactNumber && !/^\d{10}$/.test(contactNumber)) {
      newErrors.contactNumber = "El número de contacto debe tener 10 dígitos.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Si no hay errores, proceder con el envío del formulario
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
          clearForm();
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center hero-image bg-hero-image">
      <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white rounded-lg p-8 bg-opacity-75 md:px-24 py-12">
        <h1 className="text-3xl font-bold mb-8">Registrate</h1>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-full border border-black px-4 py-2 mb-4 text-black"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full border border-black px-4 py-2 mb-4 text-black"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full border border-black px-4 py-2 mb-4 text-black"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-full border border-black px-4 py-2 mb-4 text-black"
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Telefono"
            value={contactNumber}
            maxLength={10}
            onChange={(e) => setContactNumber(e.target.value)}
            className="rounded-full border border-black px-4 py-2 mb-4 text-black"
          />
          {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
        </div>

        <input
          type="password"
          placeholder="Palabra Secreta"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="rounded-full border border-black px-4 py-2 mb-4 text-black"
        />

        <Link href="/LoginPage" className="mt-2">
          Ya tienes cuenta? <strong>Inicia sesion</strong>
        </Link>

        <button
          type="submit"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 display-block w-full"
        >
          Registrarse
        </button>
      </form>

      <style jsx>{`
        .input-wrapper {
          display: flex;
          flex-direction: column-reverse; // Cambia el orden de los elementos
          align-items: center; // Centra los elementos horizontalmente
        }

        .error-message {
          margin-top: 8px; // Espacio arriba del mensaje de error
          color: #ff0000; // Color rojo para los mensajes de error
          text-align: center; // Centra el texto
        }
      `}</style>
    </div>
  );
};

export default SignUp;
