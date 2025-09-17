import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nombre: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirige si no hay sesión
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-yellow-100 flex flex-col items-center p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">
          ¡Bienvenido, {user.nombre || "Usuario"}!
        </h1>
        <button
          onClick={handleLogout}
          className="mb-6 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
        >
          Cerrar sesión
        </button>

        <p className="text-gray-700 mb-6">
          Este es tu dashboard. Aquí podrás ver tus datos y gestionar tu cuenta.
        </p>

        <div className="text-left bg-gray-50 p-4 rounded-lg">
          <p>
            <span className="font-semibold">Nombre:</span> {user.nombre}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
