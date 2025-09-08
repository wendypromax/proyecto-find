// src/pages/RecuperarCuenta.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/find-rate-logo.png";

const RecuperarCuenta = () => {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple de correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      setError("Por favor, ingresa un correo válido.");
      setExito("");
      return;
    }

    setError("");
    setExito("¡Enlace de recuperación enviado correctamente!");
    
    // Aquí iría la lógica para enviar el enlace (ej: fetch/post)
    console.log("Correo enviado:", correo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 font-[Poppins] px-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-md text-center border border-purple-200">
        <img src={logo} alt="Find & Rate" className="mx-auto mb-4 w-32" />

        <h2 className="text-xl font-bold text-gray-700 mb-2">
          Recuperación de Contraseña
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <label className="block text-sm font-medium text-gray-700">
            Correo
          </label>
          <input
            type="email"
            placeholder="tu@ejemplo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-gray-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {exito && <p className="text-green-600 text-sm">{exito}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-fuchsia-500 text-white font-semibold py-2 rounded-full shadow-md hover:brightness-110 transition-all"
          >
            Enviar Enlace De Recuperación
          </button>
        </form>

        <Link
          to="/login"
          className="mt-4 inline-block text-sm text-black hover:underline"
        >
          ← Volver al inicio Sesión
        </Link>
      </div>
    </div>
  );
};

export default RecuperarCuenta;
