import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

/* ============================
   🔹 Conexión a MySQL
   ============================ */
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "findyrate", // Cambia según tu DB
});

/* ============================
   🔹 Recuperar cuenta
   ============================ */
app.post("/recuperar-cuenta", async (req, res) => {
  try {
    const { correo } = req.body;

    if (!correo)
      return res.status(400).json({ success: false, message: "Correo requerido" });

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE correo_usuario = ?",
      [correo]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Correo no registrado" });
    }

    const user = rows[0];

    // 🔹 Generar token seguro
    const token = crypto.randomBytes(32).toString("hex");
    const expiration = new Date(Date.now() + 3600 * 1000); // 1 hora

    // Guardar token en la DB
    await pool.query(
      "UPDATE usuario SET reset_token = ?, reset_token_expiration = ? WHERE id_usuario = ?",
      [token, expiration, user.id_usuario]
    );

    // 🔹 Configurar Nodemailer (Gmail)
   const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "tuemail@gmail.com",      // tu correo real
    pass: "tu_app_password",        // App Password de 16 caracteres
  },
});

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    try {
      const info = await transporter.sendMail({
        from: '"Find & Rate" <tuemail@gmail.com>',
        to: correo,
        subject: "Recuperación de contraseña",
        html: `<p>Hola ${user.nombre_usuario},</p>
               <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
               <a href="${resetLink}">${resetLink}</a>
               <p>Este enlace expira en 1 hora.</p>`,
      });

      console.log("Correo enviado, ID:", info.messageId);
      res.json({ success: true, message: "¡Enlace de recuperación enviado correctamente!" });

    } catch (err) {
      console.error("Error enviando correo:", err);
      res.status(500).json({ success: false, message: "No se pudo enviar el correo", error: err });
    }

  } catch (error) {
    console.error("Error en recuperar-cuenta:", error);
    res
      .status(500)
      .json({ success: false, message: "Error en la recuperación de cuenta", error });
  }
});

/* ============================
   🔹 Restablecer contraseña
   ============================ */
app.post("/reset-password", async (req, res) => {
  try {
    const { token, nuevaPassword } = req.body;

    if (!token || !nuevaPassword)
      return res
        .status(400)
        .json({ success: false, message: "Token y nueva contraseña requeridos" });

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE reset_token = ? AND reset_token_expiration > NOW()",
      [token]
    );

    if (rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Token inválido o expirado" });
    }

    const user = rows[0];
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

    await pool.query(
      "UPDATE usuario SET password_usuario = ?, reset_token = NULL, reset_token_expiration = NULL WHERE id_usuario = ?",
      [hashedPassword, user.id_usuario]
    );

    res.json({ success: true, message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error en reset-password:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al actualizar la contraseña", error });
  }
});

/* ============================
   🔹 Servidor
   ============================ */
app.listen(5000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:5000");
});
