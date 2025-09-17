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

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Manejar cambios en inputs con validaciones en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Solo letras y espacios para nombre y apellido
    if ((name === "nombre" || name === "apellido") && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value)) {
      return; // Ignora caracteres inválidos
    }

    // Solo números para teléfono
    if (name === "telefono" && !/^[0-9]*$/.test(value)) {
      return; // Ignora letras o caracteres especiales
    }

    setFormData({ ...formData, [name]: value });
  };

  // Cambiar tipo usuario o empresario
  const handleTipoChange = (tipo) => {
    setFormData({ ...formData, tipoUsuario: tipo });
  };

  // Validación de campos antes de enviar
  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es obligatorio.";
    if (!formData.pais.trim()) newErrors.pais = "El país es obligatorio.";

    // Validación correo electrónico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    // Teléfono: mínimo 7 y máximo 15 dígitos
    if (!/^[0-9]{7,15}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe contener entre 7 y 15 números.";
    }

    // Contraseña
    if (formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";

    // Confirmación de contraseña
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    // Edad mínima 18
    if (!formData.edad || formData.edad < 18)
      newErrors.edad = "Debes tener al menos 18 años para registrarte.";

    if (!formData.genero) newErrors.genero = "Selecciona un género.";

    return newErrors;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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

      if (res.ok) {
        setSuccessMessage("¡Registro exitoso! 🎉 Ahora puedes iniciar sesión.");
        setFormData({
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
      } else {
        setErrors({ general: data.message || "Ocurrió un error al registrar." });
      }
    } catch (error) {
      setErrors({ general: "Error de conexión con el servidor." });
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

          {/* Mensaje de error general */}
          {errors.general && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
              {errors.general}
            </div>
          )}

          {/* Mensaje de éxito */}
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
              {successMessage}
            </div>
          )}

          <form className="flex flex-col gap-3 text-left" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}
            </div>

            {/* Apellido */}
            <div>
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido}</p>}
            </div>

            {/* Correo */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <input
                type="tel"
                name="telefono"
                placeholder="Número de teléfono"
                value={formData.telefono}
                onChange={handleChange}
                maxLength="15"
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Edad */}
            <div>
              <input
                type="number"
                name="edad"
                placeholder="Edad"
                value={formData.edad}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.edad && <p className="text-red-500 text-xs">{errors.edad}</p>}
            </div>

            {/* Género */}
            <div>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Género</option>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
                <option value="otro">Otro</option>
              </select>
              {errors.genero && <p className="text-red-500 text-xs">{errors.genero}</p>}
            </div>

            {/* Aceptar términos */}
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

            {/* Botón de envío */}
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
          © {new Date().getFullYear()} Find & Rate — Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Registro;
