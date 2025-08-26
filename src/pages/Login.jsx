import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-200 via-pink-100 to-yellow-200 relative font-sans p-6">
      {/* Volver al inicio */}
      <Link to="/" className="absolute top-5 left-5 text-gray-700 text-sm hover:underline">
        ← Volver al inicio
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-80 text-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Find <span className="text-orange-500">&</span> Rate <span className="text-purple-500">★</span>
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          ¡Bienvenido de vuelta! Inicia sesión para continuar!
        </p>

        {/* Formulario */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-left text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="tucorreo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <label className="text-left text-sm font-medium text-gray-700 mt-2">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {/* Olvidaste tu contraseña */}
          <div className="text-right text-xs mt-1">
            <Link to="/recuperar" className="text-pink-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold rounded-full hover:opacity-90 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Divider */}
        <p className="my-4 text-gray-500 text-sm">– o continúa con –</p>

        {/* Botones sociales */}
        <div className="flex justify-center gap-5 mb-4">
          <button className="bg-white border border-gray-300 rounded-full w-11 h-11 text-lg font-bold">G</button>
          <button className="bg-white border border-gray-300 rounded-full w-11 h-11 text-lg font-bold">f</button>
        </div>

        {/* Registro */}
        <p className="text-xs text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-pink-500 font-semibold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;