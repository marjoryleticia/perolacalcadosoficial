/* ======================================
   Script principal - Pérola Calçados
   Consulta de CEP usando a API ViaCEP
   ====================================== */

// Captura os elementos da página
const btnBuscar = document.getElementById("btnBuscar");
const inputCep = document.getElementById("cep");
const resultado = document.getElementById("resultado");

// Adiciona o evento de clique ao botão
btnBuscar.addEventListener("click", buscarCep);

// Permite buscar também ao pressionar "Enter"
inputCep.addEventListener("keypress", function (e) {
  if (e.key === "Enter") buscarCep();
});

// Função principal de busca
function buscarCep() {
  // Remove caracteres que não sejam números
  const cep = inputCep.value.replace(/\D/g, "");

  // Validação simples: CEP precisa ter 8 dígitos
  if (cep.length !== 8) {
    resultado.className = "erro";
    resultado.innerHTML = "⚠️ Digite um CEP válido com 8 números.";
    return;
  }

  // Mensagem enquanto carrega
  resultado.className = "";
  resultado.innerHTML = "🔎 Buscando...";

  // Faz a requisição para a API ViaCEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((dados) => {
      // Se o CEP não existir, a API retorna { erro: true }
      if (dados.erro) {
        resultado.className = "erro";
        resultado.innerHTML = "❌ CEP não encontrado.";
        return;
      }

      // Exibe as informações na tela
      resultado.className = "";
      resultado.innerHTML = `
        <p><strong>Rua:</strong> ${dados.logradouro || "-"}</p>
        <p><strong>Bairro:</strong> ${dados.bairro || "-"}</p>
        <p><strong>Cidade:</strong> ${dados.localidade || "-"}</p>
        <p><strong>Estado:</strong> ${dados.uf || "-"}</p>
      `;
    })
    .catch(() => {
      resultado.className = "erro";
      resultado.innerHTML = "⚠️ Erro ao buscar o CEP. Tente novamente.";
    });
}
