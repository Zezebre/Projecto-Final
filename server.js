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
app.use(express.static(path.join(__dirname, "public")));
 
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
app.get("/api/fotos", async (req, res) => {
  try {
    const [fotos] = await pool.execute("SELECT titulo FROM mar");
    res.status(200).json(fotos);
  } catch (error) {
    console.log("Erro GET /api/fotos", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a música" });
  }
});
 
// --- GET /api/fotos ---  encontrar uma música em especifico
app.get("/api/fotos/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const [foto] = await pool.execute(`SELECT titulo * FROM foto WHERE id = ?`, [
      id,
    ]);
    if (foto.length === 0) {
      res.status(404).json({ msg: "Música não existe" });
    }
    res.status(200).json(foto);
  } catch (error) {
    console.log("Erro GET /api/fotos", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a música" });
  }
});
// --- POST /api/fotos ---  Criar uma nova música
app.post("/api/fotos", async (req, res) => {
  const {titulo,artista,genero,ano} = req.body;
if(!titulo || !artista || !genero || !ano) {
  res.status(400).json ({msg:"Insira todos os dados"})
}
try {
    const [resultado] = await pool.execute(
      `INSERT INTO foto (titulo, artista, genero, ano) VALUES(?, ?, ?, ?)`,
      [titulo, artista, genero, ano],
    );
    res.status(200).json(resultado);
  } catch (error) {
    console.log("Erro POST /api/fotos", error.message);
    res.status(500).json({ Erro: "Erro ao tentar colocar a música" });
  }
 
  res.status(201).json({});
});
// --- PUT /api/fotos ---  Atualizar uma  música
 
app.put("/api/fotos/:id", async (req, res) => {
  const id = Number(req.params.id);
  // VAMOS PROCURAR NA BD SE EXISTE A MÚSICA OU NÃO
  try {
    const [foto] = await pool.execute(`SELECT * FROM foto WHERE id = ?`, [
      id,
    ]);
    if (foto.length === 0) {
      res.status(404).json({ msg: "Música não existe" });
    }
 
    //res.status(200).json(foto);
  } catch (error) {
    console.log("Erro PUT /api/fotos/id", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a música" });
  }
  // VAMOS BUSCAR OS DADOS AO BODY PARA ATUALIZAR NA BD
  const { titulo, artista, genero, ano } = req.body;
 
  if (!titulo || !artista || !genero || !ano) {
    console.log(req.body);
    return res
      .status(400)
      .json({ msg: "Insira todos os dados", foto: foto });
  }
 
  try {
    const [resultado] = await pool.execute(
      "UPDATE foto SET titulo = ?, artista = ?, genero = ?, ano = ? WHERE id = ?",
      [titulo, artista, genero, ano, id],
    );
    console.log(resultado);
    res.status(200).json({ msg: "Música foi atualizada", foto: req.body });
  } catch (error) {
    console.log("Erro PUT /api/fotos/id", error.message);
    res.status(500).json({ Erro: "Erro ao tentar atualizar a música" });
  }
});
// --- PATCH /api/fotos/:id/favorita ---
 
app.patch("/api/fotos/:id/favorita", async (req, res) => {
  const id = Number(req.params.id);
  // VAMOS PROCURAR NA BD SE EXISTE A MÚSICA OU NÃO
  let favorita;
  try {
    const [foto] = await pool.execute(`SELECT * FROM foto WHERE id = ?`, [
      id,
    ]);
    if (foto.length === 0) {
      res.status(404).json({ msg: "Música não existe" });
    }
 
    favorita = foto[0].favorita;
  } catch (error) {
    console.log("Erro PUT /api/fotos/id", error.message);
    res.status(500).json({ Erro: "Erro ao tentar encontrar a música" });
  }
  // VAMOS BUSCAR OS DADOS AO BODY PARA ATUALIZAR NA BD
 
  try {
    const [resultado] = await pool.execute(
      "UPDATE foto SET favorita = ? WHERE id = ?",
      [!favorita, id],
    );
 
    res.status(200).json({ msg: "Música foi atualizada", favorita });
  } catch (error) {
    console.log("Erro PUT /api/fotos/id", error.message);
    res.status(500).json({ Erro: "Erro ao tentar atualizar a música" });
  }
});
 
// --- DELETE /api/fotos ---  Eliminar uma  música
 
app.delete("/api/fotos/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const [existe] = await pool.execute("SELECT * FROM foto WHERE id = ?", [
      id,
    ]);
    if (!existe) return res.status(404).json({ msg: "Música não existe" });
 
    await pool.execute("DELETE FROM fotos WHERE id = ?", [id]);
    res.status(200).json({ msg: "Música exterminada", foto: existe[0] });
  } catch (error) {}
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