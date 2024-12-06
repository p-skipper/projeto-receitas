// Carrega os usuários armazenados no localStorage ou cria um array vazio caso não exista
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Função chamada quando o formulário de login é enviado
function handleLogin(event) {
  // Previne o comportamento padrão de envio do formulário
  event.preventDefault();

  // Captura os valores de e-mail e senha inseridos no formulário
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Valida o e-mail e a senha do usuário
  const userIsValid = validadeUser(email, password);

  // Se o usuário for válido, redireciona para a página principal (index.html) e armazena o usuário logado
  if (userIsValid) {
    // Encontrar o usuário validado e armazenar no localStorage
    const loggedInUser = usuarios.find((user) => user.email === email);

    // Salva o usuário logado no localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    // Redireciona para a página principal (index.html)
    window.location.assign("index.html");
  } else {
    // Se o usuário não for válido, destaca os campos de e-mail e senha com erro
    document.getElementById("email").classList.remove("outline");
    document.getElementById("email").classList.add("outlineError");
    document.getElementById("email").style.backgroundColor = "#ff660041";
    document.getElementById("errorEmail").innerText =
      "E-mail ou senha são inválidos";

    document.getElementById("password").classList.remove("outline");
    document.getElementById("password").classList.add("outlineError");
    document.getElementById("password").style.backgroundColor = "#ff660041";
  }
}

// Função que valida o usuário com base no e-mail e na senha fornecidos
function validadeUser(email, password) {
  // Retorna true se o e-mail e senha combinarem com algum usuário registrado
  return usuarios.some(
    (user) => user.email === email && user.password === password
  );
}

// Função que lida com o evento de colar (paste) no campo de senha
function handlePaste(event) {
  // Previne o comportamento padrão de colar
  event.preventDefault();

  // Captura o valor da senha e os dados colados
  const password = document.getElementById("password");
  const pastedData = event.clipboardData.getData("text");
  const currentPasswordValue = password.value;

  // Adiciona os dados colados de forma repetida no campo de senha
  const newPasswordValue = currentPasswordValue + pastedData + pastedData;
  password.value = newPasswordValue;
}

// Função que exibe a mensagem de confirmação quando o parâmetro de URL "form=submit" é encontrado
function showConfirmationMessage() {
  // Obtém os parâmetros da URL
  const url = new URLSearchParams(window.location.search);

  // Se o parâmetro "form" for igual a "submit", exibe a mensagem de confirmação
  if (url.get("form") === "submit") {
    const confirmationMessage = document.getElementById("confirmationMessage");
    confirmationMessage.classList.remove("invisible");
  }
}

// Adiciona o ouvinte de evento para a função de colar no campo de senha
document.getElementById("password").addEventListener("paste", handlePaste);

// Adiciona o ouvinte de evento para enviar o formulário e realizar o login
document.getElementById("loginForm").addEventListener("submit", handleLogin);

// Chama a função para exibir a mensagem de confirmação quando o documento estiver carregado
document.addEventListener("DOMContentLoaded", showConfirmationMessage);
