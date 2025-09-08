import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/find-rate-logo.png";

const Registro = () => {
  const [formData, setFormData] = useState({
    tipoUsuario: "usuario",
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

  const [loading, setLoading] = useState(false);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cambiar tipo usuario o empresario
  const handleTipoChange = (tipo) => {
    setFormData({ ...formData, tipoUsuario: tipo });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Error al registrar, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-pink-200 via-pink-100 to-yellow-100">
      {/* Contenido principal */}
      <div className="flex justify-center items-center flex-grow p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <img src={logo} alt="Find & Rate" className="mx-auto mb-3 w-40" />

          <p className="text-sm text-gray-600 mb-6">
            Crea tu cuenta como usuario y descubre los mejores servicios
          </p>

          <p className="text-left font-semibold mb-2">
            ¿Cómo te quieres registrar?
          </p>
          <div className="flex justify-between mb-6 gap-4">
            <button
              type="button"
              onClick={() => handleTipoChange("usuario")}
              className={`flex flex-col items-center justify-center flex-1 p-4 border rounded-xl cursor-pointer transition ${
                formData.tipoUsuario === "usuario"
                  ? "border-pink-500 shadow-md text-pink-600"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              <div className="mb-1 text-2xl">👤</div>
              <span className="text-sm font-semibold">Usuario</span>
            </button>

            <button
              type="button"
              onClick={() => handleTipoChange("empresario")}
              className={`flex flex-col items-center justify-center flex-1 p-4 border rounded-xl cursor-pointer transition ${
                formData.tipoUsuario === "empresario"
                  ? "border-pink-500 shadow-md text-pink-600"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              <div className="mb-1 text-2xl">🏢</div>
              <span className="text-sm font-semibold">Empresario</span>
            </button>
          </div>

          <form
            className="flex flex-col gap-3 text-left"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              required
              value={formData.apellido}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              name="pais"
              placeholder="País"
              required
              value={formData.pais}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Número de teléfono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              required
              value={formData.edad}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <select
              name="genero"
              required
              value={formData.genero}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Género</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
              <option value="otro">Otro</option>
            </select>

            <div className="flex items-center text-xs gap-2">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" className="text-gray-600">
                Acepto los{" "}
                <Link
                  to="/terminos"
                  className="text-pink-600 underline hover:text-pink-800"
                >
                  términos y condiciones
                </Link>{" "}
                y la{" "}
                <Link
                  to="/privacidad"
                  className="text-pink-600 underline hover:text-pink-800"
                >
                  política de privacidad
                </Link>
                .
              </label>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-full font-bold text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-400 via-pink-300 to-yellow-300 hover:scale-105 transition-transform"
                }`}
              >
                {loading ? "Registrando..." : "Registrarme"}
              </button>

              <p className="text-center text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/Login"
                  className="text-pink-600 underline hover:text-pink-800"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-pink-100 text-center py-4 text-sm text-gray-600 mt-8">
        <p>
          © {new Date().getFullYear()} Find & Rate — Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default Registro;
