// server.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const { OAuth2Client } = require("google-auth-library");

console.log(bcrypt);

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de MySQL
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // tu password
  database: "findyrate", // 🔹 Nombre actualizado de la DB
});

// Secret para JWT
const JWT_SECRET = "tu_secreto_jwt_aqui";

// Configuración Google OAuth
const CLIENT_ID = "TU_CLIENT_ID_DE_GOOGLE";
const client = new OAuth2Client(CLIENT_ID);

/**
 * ============================
 *      REGISTRO DE USUARIO
 * ============================
 */
app.post("/registro", async (req, res) => {
  try {
    const { tipoUsuario, nombre, apellido, pais, email, telefono, password, edad, genero } = req.body;

    if (!nombre || !apellido || !pais || !email || !password || !edad || !genero) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Revisar si el email ya existe
    const [existing] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario en la DB
    await db.query(
      `INSERT INTO usuario (tipoUsuario, nombre, apellido, pais, email, telefono, password, edad, genero)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [tipoUsuario, nombre, apellido, pais, email, telefono, hashedPassword, edad, genero]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

/**
 * ============================
 *      LOGIN CON EMAIL
 * ============================
 */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Correo y contraseña son obligatorios" });

    const [userResult] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);
    if (userResult.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = userResult[0];

    // Validar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login exitoso", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

/**
 * ============================
 *      LOGIN CON GOOGLE
 * ============================
 */
app.post("/google-login", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "Token de Google es obligatorio" });

    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    // Revisar si el usuario ya existe
    const [existing] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);
    let userId;

    if (existing.length === 0) {
      // Crear usuario nuevo
      const [result] = await db.query(
        `INSERT INTO usuario (tipoUsuario, nombre, apellido, email)
         VALUES (?, ?, ?, ?)`,
        ["usuario", given_name, family_name, email]
      );
      userId = result.insertId;
    } else {
      userId = existing[0].id;
    }

    // Generar JWT
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login con Google exitoso", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error con login de Google" });
  }
});

/**
 * ============================
 *      SERVIDOR ESCUCHANDO
 * ============================
 */
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
