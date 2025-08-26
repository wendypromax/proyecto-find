// src/pages/register/Registro.jsx
import React, { useState } from "react";

const Registro = () => {
  const [tipoRegistro, setTipoRegistro] = useState("usuario"); // default usuario

  // Colores diferentes según el tipo
  const colores = tipoRegistro === "usuario"
    ? { borde: "pink-500", foco: "focus:ring-pink-300", boton: "bg-pink-500 hover:bg-pink-600", link: "text-pink-500" }
    : { borde: "blue-500", foco: "focus:ring-blue-300", boton: "bg-blue-500 hover:bg-blue-600", link: "text-blue-500" };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-yellow-100">
      {/* Tarjeta blanca */}
      <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-2xl w-[550px] max-w-lg min-h-[750px] flex flex-col justify-start">
        
        {/* Título */}
        <h2 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500">
          Find and Rate
        </h2>

        {/* Mensaje de bienvenida */}
        <p className="text-center text-gray-600 mb-6">
          ✨🎉 Únete a nuestra comunidad y descubre lugares increíbles! 🎉✨
        </p>

        <p className="text-center text-gray-700 font-medium mb-4">
          ¿Cómo te quieres registrar?
        </p>

        {/* Botones lado a lado (siempre visibles) */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setTipoRegistro("usuario")}
            className={`flex items-center justify-center gap-2 py-4 px-6 border-2 rounded-2xl font-bold text-lg transition-all w-40 
              ${tipoRegistro === "usuario" 
                ? "border-pink-500 text-pink-500 bg-pink-50" 
                : "border-pink-300 text-pink-400 hover:bg-pink-50"}`}
          >
            👤 Usuario
          </button>

          <button
            onClick={() => setTipoRegistro("empresario")}
            className={`flex items-center justify-center gap-2 py-4 px-6 border-2 rounded-2xl font-bold text-lg transition-all w-40 
              ${tipoRegistro === "empresario" 
                ? "border-blue-500 text-blue-500 bg-blue-50" 
                : "border-blue-300 text-blue-400 hover:bg-blue-50"}`}
          >
            🏢 Empresario
          </button>
        </div>

        {/* Formulario compartido */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Nombre</label>
            <input type="text" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${colores.foco}`} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Apellido</label>
            <input type="text" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${colores.foco}`} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Correo Electrónico</label>
            <input type="email" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${colores.foco}`} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Número de Teléfono</label>
            <input type="tel" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${colores.foco}`} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Contraseña</label>
            <input type="password" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${colores.foco}`} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirmar Contraseña</label>
            <input type="password" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${colores.foco}`} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Edad</label>
            <input type="number" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${colores.foco}`} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Género</label>
            <select className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${colores.foco}`}>
              <option value="">Selecciona una opción</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="terminos" />
            <label htmlFor="terminos" className="text-sm text-gray-600">
              Acepto los <span className={`${colores.link}`}>términos y condiciones</span> y la{" "}
              <span className={`${colores.link}`}>política de privacidad</span> de VSDE Rate.
            </label>
          </div>

          <button
            type="submit"
            className={`${colores.boton} text-white py-3 rounded-xl font-bold transition-all`}
          >
            Registrar
          </button>

          <p className="text-center text-gray-600 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className={`${colores.link} font-medium`}>Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
