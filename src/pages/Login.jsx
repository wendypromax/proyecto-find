import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Importa useNavigate
import logo from '../assets/find-rate-logo.png'; // Ajusta la ruta según tu estructura

const Login = () => {
  const navigate = useNavigate(); // <-- Hook para redirección
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de validación (aquí iría tu llamada a la API real)
    if (email === 'usuario@demo.com' && password === '123456') {
      console.log('Login exitoso');
      navigate('/home'); // <-- Redirige a la página Home.jsx
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 via-pink-100 to-yellow-200 relative font-sans p-6">
      {/* Volver al inicio */}
      <Link
        to="/"
        className="absolute top-5 left-5 text-gray-700 text-sm hover:underline"
      >
        ← Volver al inicio
      </Link>

      {/* Card login */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96 text-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Find & Rate Logo"
          className="mx-auto mb-4 w-48 object-contain"
        />

        <p className="text-sm text-gray-600 mb-6">
          ¡Bienvenido de vuelta! Inicia sesión para continuar!
        </p>

        {/* Formulario */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-left text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="tucorreo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <label className="text-left text-sm font-medium text-gray-700 mt-2">
            Contraseña
          </label>
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer select-none"
              onClick={togglePassword}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {/* Olvidaste tu contraseña */}
          <Link
            to="/recuperar-cuenta"
            className="text-pink-600 hover:underline text-sm float-right"
          >
            ¿Olvidaste tu contraseña?
          </Link>

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
          <button className="bg-white border border-gray-300 rounded-full w-11 h-11 text-lg font-bold">
            G
          </button>
          <button className="bg-white border border-gray-300 rounded-full w-11 h-11 text-lg font-bold">
            f
          </button>
        </div>

        {/* Registro */}
        <p className="text-xs text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link
            to="/registro"
            className="text-pink-500 font-semibold hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Tu Plataforma de Reseñas</p>
        <div className="flex justify-center gap-4 mt-1">
          <a href="#" className="hover:text-gray-700 transition-colors">
            Términos
          </a>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Privacidad
          </a>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Contacto
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
