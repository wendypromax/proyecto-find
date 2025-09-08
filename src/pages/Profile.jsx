import React from "react";
import { Link } from "react-router-dom";  // Importamos Link

const Profile = () => {
  const nombreUsuario = "María"; // Puedes reemplazarlo dinámicamente si quieres

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_#ffeecc_0%,_#e0c6ff_50%,_#d8bbff_100%)] font-[Poppins] text-gray-800 p-6 flex flex-col">
      {/* Bienvenida */}
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-2 text-center">
        ¡Bienvenida de vuelta, {nombreUsuario}! <span className="inline-block">👋</span>
      </h2>
      <p className="text-gray-600 text-center mb-10">
        ¿Lista para descubrir nuevos lugares increíbles hoy?
      </p>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition text-center">
          <span className="text-3xl block mb-2">📝</span>
          <h4 className="font-semibold text-gray-800">Escribir Reseña</h4>
          <p className="text-sm text-gray-500">Comparte tu experiencia</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition text-center">
          <span className="text-3xl block mb-2">🔍</span>
          <h4 className="font-semibold text-gray-800">Explorar Lugares</h4>
          <p className="text-sm text-gray-500">Descubre nuevos sitios</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition text-center">
          <span className="text-3xl block mb-2">💜</span>
          <h4 className="font-semibold text-gray-800">Mis Favoritos</h4>
          <p className="text-sm text-gray-500">Lugares que te encantan</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition text-center">
          <span className="text-3xl block mb-2">📋</span>
          <h4 className="font-semibold text-gray-800">Lista de Deseos</h4>
          <p className="text-sm text-gray-500">Para visitar</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-md px-8 py-6 text-purple-500 min-w-[120px] text-center">
          <strong className="block text-2xl mb-1">23</strong>
          <p className="text-gray-600">Reseñas</p>
        </div>
        <div className="bg-white rounded-xl shadow-md px-8 py-6 text-purple-500 min-w-[120px] text-center">
          <strong className="block text-2xl mb-1">156</strong>
          <p className="text-gray-600">Me Gusta</p>
        </div>
        <div className="bg-white rounded-xl shadow-md px-8 py-6 text-purple-500 min-w-[120px] text-center">
          <strong className="block text-2xl mb-1">12</strong>
          <p className="text-gray-600">Lugares</p>
        </div>
        <div className="bg-white rounded-xl shadow-md px-8 py-6 text-purple-500 min-w-[120px] text-center">
          <strong className="block text-2xl mb-1">4.8</strong>
          <p className="text-gray-600">Promedio</p>
        </div>
      </div>

      {/* Reseñas recientes */}
      <div className="bg-white/80 rounded-2xl shadow-lg p-6 max-w-2xl mx-auto flex-grow">
        <h2 className="text-xl font-bold text-gray-600 text-center mb-6">
          Tus Reseñas Recientes
        </h2>

        <div className="bg-white rounded-xl shadow-md p-4 mb-4 text-left">
          <div className="flex justify-between text-sm font-semibold text-gray-800">
            <span>Café Central</span>
            <span className="text-gray-500">Hace 2 días</span>
          </div>
          <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
          <p className="text-sm text-gray-700">
            Un lugar acogedor con el mejor café de la ciudad. El personal es súper amable y el ambiente perfecto para trabajar...
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-4 text-left">
          <div className="flex justify-between text-sm font-semibold text-gray-800">
            <span>Restaurante La Terraza</span>
            <span className="text-gray-500">Hace 1 semana</span>
          </div>
          <div className="text-yellow-400 mb-2">⭐⭐⭐⭐</div>
          <p className="text-sm text-gray-700">
            Excelente comida mediterránea con una vista espectacular. Los precios son justos y la atención es de primera...
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-4 text-left">
          <div className="flex justify-between text-sm font-semibold text-gray-800">
            <span>Parque de los Rosales</span>
            <span className="text-gray-500">Hace 2 semanas</span>
          </div>
          <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
          <p className="text-sm text-gray-700">
            Perfecto para una tarde de relax. Los jardines están muy bien cuidados y es ideal para ir en familia...
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 py-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Tu Plataforma de Reseñas</p>
        <div className="flex justify-center gap-4 mt-1">
          <Link to="/terminos" className="hover:text-pink-600 hover:underline transition-colors">
            Términos
          </Link>
          <Link to="/privacidad" className="hover:text-pink-600 hover:underline transition-colors">
            Privacidad
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Profile;

