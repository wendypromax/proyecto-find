// Server.js (ES Modules)
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const app = express();
app.use(cors());
app.use(express.json());

/* 📌 Conexión a MySQL */
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "findyrate", // Cambia según tu DB
});

/* 📌 Cliente de Google */
const client = new OAuth2Client("TU_CLIENT_ID_DE_GOOGLE");

/* ============================
   🔹 Registro de usuario
   ============================ */
app.post("/registro", async (req, res) => {
  try {
    const {
      num_doc_usuario,
      nombre_usuario,
      apellido_usuario,
      telefono_usuario,
      correo_usuario,
      password_usuario,
      edad_usuario,
      genero_usuario,
      tipoUsuario, // "usuario" o "empresario"
    } = req.body;

    // 🔑 Hashear contraseña
    const hashedPassword = await bcrypt.hash(password_usuario, 10);

    // 🔹 Asignar rol
    const rol = tipoUsuario === "empresario" ? 2 : 1;

    // 📌 Insertar usuario
    const [result] = await pool.query(
      `INSERT INTO usuario 
      (num_doc_usuario, nombre_usuario, apellido_usuario, telefono_usuario, correo_usuario, estado_usuario, password_usuario, edad_usuario, genero_usuario, id_tipo_rolfk)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        num_doc_usuario,
        nombre_usuario,
        apellido_usuario,
        telefono_usuario,
        correo_usuario,
        "activo",
        hashedPassword,
        edad_usuario,
        genero_usuario,
        rol,
      ]
    );

    res.json({
      success: true,
      message: "Usuario registrado correctamente",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ success: false, message: "Error en el registro", error });
  }
});

/* ============================
   🔹 Login normal
   ============================ */
app.post("/login", async (req, res) => {
  try {
    const { correo_usuario, password_usuario } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE correo_usuario = ?",
      [correo_usuario]
    );

    if (rows.length === 0)
      return res.status(400).json({ success: false, message: "Usuario no encontrado" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password_usuario, user.password_usuario);

    if (!isMatch)
      return res.status(400).json({ success: false, message: "Contraseña incorrecta" });

    res.json({ success: true, message: "Login exitoso", user });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error en login", error });
  }
});

/* ============================
   🔹 Login con Google
   ============================ */
app.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ success: false, message: "Token de Google requerido" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "TU_CLIENT_ID_DE_GOOGLE",
    });

    const payload = ticket.getPayload();
    const correo_usuario = payload.email;
    const nombre_usuario = payload.given_name;
    const apellido_usuario = payload.family_name || "";
    const genero_usuario = payload.gender || "no especificado";

    const [rows] = await pool.query("SELECT * FROM usuario WHERE correo_usuario = ?", [correo_usuario]);

    let user;
    if (rows.length === 0) {
      const [result] = await pool.query(
        `INSERT INTO usuario
        (num_doc_usuario, nombre_usuario, apellido_usuario, telefono_usuario, correo_usuario, estado_usuario, password_usuario, edad_usuario, genero_usuario, id_tipo_rolfk)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          "google-" + Date.now(),
          nombre_usuario,
          apellido_usuario,
          "0000000000",
          correo_usuario,
          "activo",
          "",
          0,
          genero_usuario,
          1, // rol por defecto
        ]
      );

      const [newUser] = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [result.insertId]);
      user = newUser[0];
    } else {
      user = rows[0];
    }

    res.json({ success: true, message: "Login con Google exitoso", user });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ success: false, message: "Error en login con Google", error });
  }
});

/* ============================
   🔹 Servidor
   ============================ */
app.listen(5000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:5000");
});
