// IMPORTAÇÃO EXPRESS
const express = require("express");
const path = require("path");
// INIT EXPRESS
const app = express();
// definir PORTA
const PORT = 3000;
// IMPORTAR BIBLIOTECA PARA TRABALHAR COM SQL
const mysql = require("mysql2/promise");
// INJETAR VARIAVEIS DE AMBIENTE
require("dotenv").config();
//para ir ao FrontEnd
app.use(express.static(path.join(__dirname, "frontend")));
 
app.use(express.json());
 
// - CONFIGURAÇÃO MYSQL
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});
 
app.get("/", (req, res) => {
  res.send("Ola");
});
 
// --- GET /api/fotos ---
app.get("/api/fotos/mar", async (req, res) => {
  try {
    const [fotos] = await pool.execute("SELECT titulo FROM mar");
    res.status(200).json(fotos);
  } catch (error) {
    console.log("Erro GET /api/fotos/mar", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a foto" });
  }
});
 
// --- GET /api/fotos ---  encontrar uma música em especifico
app.get("/api/fotos/mar/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const [foto] = await pool.execute(`SELECT titulo * FROM mar WHERE id = ?`, [
      id,
    ]);
    if (foto.length === 0) {
      res.status(404).json({ msg: "Foto não existe" });
    }
    res.status(200).json(foto);
  } catch (error) {
    console.log("Erro GET /api/fotos/mar", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a foto" });
  }
});

app.get("/api/fotos/arquitectura", async (req, res) => {
  try {
    const [fotos] = await pool.execute("SELECT titulo FROM arquitectura");
    res.status(200).json(fotos);
  } catch (error) {
    console.log("Erro GET /api/fotos/arquitectura", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a foto" });
  }
});
 
// --- GET /api/fotos ---  encontrar uma música em especifico
app.get("/api/fotos/arquitectura/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const [foto] = await pool.execute(`SELECT titulo * FROM arquitectura WHERE id = ?`, [
      id,
    ]);
    if (foto.length === 0) {
      res.status(404).json({ msg: "Foto não existe" });
    }
    res.status(200).json(foto);
  } catch (error) {
    console.log("Erro GET /api/fotos/arquitectura", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a foto" });
  }
});

app.get("/api/fotos/cercas", async (req, res) => {
  try {
    const [fotos] = await pool.execute("SELECT titulo FROM cercas");
    res.status(200).json(fotos);
  } catch (error) {
    console.log("Erro GET /api/fotos/cercas", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a foto" });
  }
});
 
// --- GET /api/fotos ---  encontrar uma música em especifico
app.get("/api/fotos/cercas/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const [foto] = await pool.execute(`SELECT titulo * FROM arquitectura WHERE id = ?`, [
      id,
    ]);
    if (foto.length === 0) {
      res.status(404).json({ msg: "Foto não existe" });
    }
    res.status(200).json(foto);
  } catch (error) {
    console.log("Erro GET /api/fotos/cercas", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a foto" });
  }
});


app.listen(PORT, async () => {
  console.log(`Servidor a rolar na porta ${PORT}`);
  try {
    await pool.execute("SELECT 1");
    console.log("Ligação ao MYSQL efetuada com sucesso");
  } catch (error) {
    console.log(error);
  }
});