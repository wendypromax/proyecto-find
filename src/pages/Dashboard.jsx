import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-200">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          Bienvenido 🎉
        </h1>

        {user ? (
          <>
            <p className="text-lg text-gray-700 mb-2">
              Hola <span className="font-semibold">{user.nombre}</span> 👋
            </p>
            <p className="text-sm text-gray-500 mb-6">{user.email}</p>
          </>
        ) : (
          <p className="text-gray-600">No hay usuario logueado.</p>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="px-6 py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold rounded-full hover:opacity-90 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

