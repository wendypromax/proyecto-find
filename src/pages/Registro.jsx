import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/find-rate-logo.png";

const Registro = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "nombre" || name === "apellido") && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value)) return;
    if (name === "telefono" && !/^[0-9]*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleTipoChange = (tipo) => setFormData({ ...formData, tipoUsuario: tipo });

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es obligatorio.";
    if (!formData.pais.trim()) newErrors.pais = "El país es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Ingresa un correo válido.";
    if (!/^[0-9]{7,15}$/.test(formData.telefono)) newErrors.telefono = "Teléfono debe tener 7-15 dígitos.";
    if (formData.password.length < 6) newErrors.password = "Contraseña mínimo 6 caracteres.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden.";
    if (!formData.edad || formData.edad < 18) newErrors.edad = "Debes tener al menos 18 años.";
    if (!formData.genero) newErrors.genero = "Selecciona un género.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return setErrors(validationErrors);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Usuario registrado correctamente 🎉");
        localStorage.setItem("user", JSON.stringify({ nombre: formData.nombre, email: formData.email }));
        setTimeout(() => navigate("/login"), 1500);
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
      <div className="flex justify-center items-center flex-grow p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <img src={logo} alt="Find & Rate" className="mx-auto mb-3 w-40" />
          <p className="text-sm text-gray-600 mb-6">Crea tu cuenta y descubre los mejores servicios</p>

          <div className="flex justify-between mb-6 gap-4">
            <button type="button" onClick={() => handleTipoChange("usuario")} className={`flex flex-col items-center justify-center flex-1 p-4 border rounded-xl cursor-pointer transition ${formData.tipoUsuario === "usuario" ? "border-pink-500 shadow-md text-pink-600" : "border-gray-300 text-gray-600"}`}>
              <div className="mb-1 text-2xl">👤</div>
              <span className="text-sm font-semibold">Usuario</span>
            </button>

            <button type="button" onClick={() => handleTipoChange("empresario")} className={`flex flex-col items-center justify-center flex-1 p-4 border rounded-xl cursor-pointer transition ${formData.tipoUsuario === "empresario" ? "border-pink-500 shadow-md text-pink-600" : "border-gray-300 text-gray-600"}`}>
              <div className="mb-1 text-2xl">🏢</div>
              <span className="text-sm font-semibold">Empresario</span>
            </button>
          </div>

          {errors.general && <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">{errors.general}</div>}
          {successMessage && <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">{successMessage}</div>}

          <form className="flex flex-col gap-3 text-left" onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400" />
            {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}

            <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400" />
            {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido}</p>}

            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} maxLength="15" className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400" />
            {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono}</p>}

            <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400" />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400" />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}

            <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400" />
            {errors.edad && <p className="text-red-500 text-xs">{errors.edad}</p>}

            <select name="genero" value={formData.genero} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option value="">Género</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
              <option value="otro">Otro</option>
            </select>
            {errors.genero && <p className="text-red-500 text-xs">{errors.genero}</p>}

            <div className="flex items-center text-xs gap-2">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" className="text-gray-600">
                Acepto los <Link to="/terminos" className="text-pink-600 underline hover:text-pink-800">términos y condiciones</Link> y la <Link to="/privacidad" className="text-pink-600 underline hover:text-pink-800">política de privacidad</Link>.
              </label>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-3 rounded-full font-bold text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-pink-400 via-pink-300 to-yellow-300 hover:scale-105 transition-transform"}`}>
              {loading ? "Registrando..." : "Registrarme"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-3">
              ¿Ya tienes cuenta? <Link to="/login" className="text-pink-600 underline hover:text-pink-800">Inicia sesión</Link>
            </p>
          </form>
        </div>
      </div>

      <footer className="bg-pink-100 text-center py-4 text-sm text-gray-600 mt-8">
        © {new Date().getFullYear()} Find & Rate — Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Registro;
