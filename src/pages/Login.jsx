// src/pages/login/Login.jsx
import React, { useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setError('');
    alert(`Correo: ${email}\nContraseña: ${password}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-yellow-100">
      <div className="bg-white p-12 rounded-xl shadow-lg w-96 max-w-lg h-[770px] flex flex-col justify-center">
        {/* Título con gradiente multicolor */}
        <h2 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500">
          Find and Rate
        </h2>

        {/* Mensaje de bienvenida */}
        <p className="text-center text-gray-600 mb-8">
          ¡Bienvenido de vuelta! Inicia sesión para continuar
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-center">
          {/* Label + Input Email */}
          <label className="mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          {/* Label + Input Contraseña */}
          <label className="mb-1 text-gray-700 font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {/* Botón principal multicolor */}
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 hover:from-pink-600 hover:via-yellow-500 hover:to-purple-600 text-white py-3 rounded-full font-bold text-lg transition-all mb-4"
          >
            Iniciar Sesión
          </button>

          {/* Línea separadora */}
          <p className="text-center text-gray-500 mb-6">- o continúa con -</p>
        </form>

        {/* Botones sociales */}
        <div className="flex justify-center gap-6 mb-6">
          <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-105">
            <FaGoogle size={22} />
          </button>
          <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-105">
            <FaFacebookF size={22} />
          </button>
        </div>

        {/* Mensaje de registro */}
        <p className="text-center text-gray-600 mt-2">
          ¿No tienes cuenta?{' '}
          <a href="#" className="text-pink-500 font-semibold hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
