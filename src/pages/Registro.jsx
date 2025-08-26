import React, { useState } from "react";
import { Link } from "react-router-dom";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    pais: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    edad: "",
    genero: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validación rápida
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // petición al backend
    const res = await fetch("http://localhost:3001/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-pink-200 via-pink-100 to-yellow-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-3">
          Find <span className="text-pink-600">&</span> Rate{" "}
          <span className="text-yellow-500">★</span>
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Crea tu cuenta como usuario y descubre los mejores servicios
        </p>

        <form className="flex flex-col gap-3 text-left" onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" required value={formData.nombre} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          <input type="text" name="apellido" placeholder="Apellido" required value={formData.apellido} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          <input type="text" name="pais" placeholder="País" required value={formData.pais} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          <input type="email" name="email" placeholder="Correo electrónico" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          <input type="tel" name="telefono" placeholder="Número de teléfono" required value={formData.telefono} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          <input type="password" name="password" placeholder="Contraseña" required value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" required value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          <input type="number" name="edad" placeholder="Edad" required value={formData.edad} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"/>

          <select name="genero" required value={formData.genero} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
            <option value="">Género</option>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
            <option value="otro">Otro</option>
          </select>

          <div className="flex items-center text-xs gap-2">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms" className="text-gray-600">
              Acepto los términos y condiciones y la política de privacidad.
            </label>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <button type="submit" className="w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-400 via-pink-300 to-yellow-300 hover:scale-105 transition-transform">
              Registrarme
            </button>

            <p className="text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link to="/Login" className="text-pink-600 underline hover:text-pink-800">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
