import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import logo from '../assets/find-rate-logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);

  // ===== Login con email y contraseña =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo_usuario: correo, password_usuario: password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Credenciales incorrectas');
      } else {
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify({ nombre: data.user.nombre_usuario, email: data.user.correo_usuario }));
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error(err);
    }
  };

  // ===== Login con Google (solo frontend) =====
  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify({ nombre: user.displayName || 'Usuario', email: user.email }));
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión con Google');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 via-pink-100 to-yellow-200 relative font-sans p-6">
      <Link to="/" className="absolute top-5 left-5 text-gray-700 text-sm hover:underline">
        ← Volver al inicio
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-96 text-center">
        <img src={logo} alt="Find & Rate Logo" className="mx-auto mb-4 w-48 object-contain" />
        <p className="text-sm text-gray-600 mb-6">¡Bienvenido de vuelta! Inicia sesión para continuar!</p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-left text-sm font-medium text-gray-700">Correo</label>
          <input
            type="email"
            placeholder="tucorreo@email.com"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <label className="text-left text-sm font-medium text-gray-700 mt-2">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
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

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <Link to="/recuperar-cuenta" className="text-pink-600 hover:underline text-sm float-right">
            ¿Olvidaste tu contraseña?
          </Link>

          <button
            type="submit"
            className="mt-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold rounded-full hover:opacity-90 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="my-4 text-gray-500 text-sm">– o continúa con –</p>

        <div className="flex justify-center gap-5 mb-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-white border border-gray-300 rounded-full w-11 h-11 text-lg font-bold"
          >
            G
          </button>
          
        </div>

        <p className="text-xs text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-pink-500 font-semibold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>

      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Tu Plataforma de Reseñas</p>
        <div className="flex justify-center gap-4 mt-1">
          <a href="#" className="hover:text-gray-700 transition-colors">Términos</a>
          <a href="#" className="hover:text-gray-700 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-gray-700 transition-colors">Contacto</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;

