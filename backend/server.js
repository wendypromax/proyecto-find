import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 🔹 ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// 🔹 registro de usuarios
app.post("/registro", async (req, res) => {
  const { nombre, apellido, pais, email, telefono, password, edad, genero } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO usuarios (nombre, apellido, pais, email, telefono, password, edad, genero) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [nombre, apellido, pais, email, telefono, hashedPassword, edad, genero],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ 
          message: "Usuario registrado con éxito", 
          userId: result.insertId 
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// 🔹 login de usuarios
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(401).json({ error: "Usuario no encontrado" });

    const user = result[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return res.status(401).json({ error: "Contraseña incorrecta" });

    // 🔑 generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ 
      message: "Login exitoso", 
      token, 
      user: { id: user.id, nombre: user.nombre, email: user.email } 
    });
  });
});

// 🔹 middleware para proteger rutas
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token requerido" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.user = decoded;
    next();
  });
}

// 🔹 ejemplo de ruta protegida
app.get("/perfil", verifyToken, (req, res) => {
  res.json({ message: "Acceso permitido", user: req.user });
});

// 🔹 iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${process.env.PORT}`);
});
