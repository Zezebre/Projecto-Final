// DECLARAR OS ELEMENTOS HTML
 
const formulario = document.querySelector("#form-musica");
const lista = document.querySelector("#lista-fotos");
const mensagem = document.querySelector("#mensagem");
 
// criar função para ir buscar as fotos TODAS
// FAZER UM GET AO BACKEND
 
async function carregarfotos() {
  try {
    // pedido ao servidor
    // JSON
    const resposta = await fetch("/api/fotos");
    // JSON -> JS
    const fotos = await resposta.json(); // <--- array de objetos
    console.log(fotos);
    // JÁ TEMOS AS fotos NO FRONTEND
    lista.replaceChildren(); // Limpar
 
    for (const musica of fotos) {
      const item = document.createElement("li");
      item.textContent = `${musica.titulo} - ${musica.artista} (${musica.ano})`;
      lista.appendChild(item);
    }
  } catch (error) {
    console.log(error);
    mensagem.textContent = "Erro ao carregar as músicas.";
  }
}
 
// CRIAR UMA FUNÇÃO PARA CRIAR UMA MÚSICA NOVA
// FAZER UM POST AO BACKEND
 
async function criarMusica(evento) {
  evento.preventDefault(); //Impedir que o formulário faça refresh à página
  const titulo = document.querySelector("#titulo").value.trim();
  const artista = document.querySelector("#artista").value.trim();
  const genero = document.querySelector("#genero").value.trim();
  const ano = Number(document.querySelector("#ano").value);
 
  const novaMusica = {
    titulo: titulo,
    artista: artista,
    genero: genero,
    ano: ano,
  };
  console.log(novaMusica);
  try {
    await fetch("/api/fotos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(novaMusica),
    });
 
    await carregarfotos();
    formulario.reset();
  } catch (error) {}
}
 
formulario.addEventListener("submit", criarMusica);
 
carregarfotos();
 