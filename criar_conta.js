document.addEventListener("DOMContentLoaded", () => {
  // Selecionando os elementos do formulário e os campos de e-mail e senha
  const form = document.getElementById("loginForm");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const errorEmail = document.getElementById("errorEmail");
  const errorPassword = document.getElementById("errorPassword");
  const confirmationMessage = document.getElementById("confirmationMessage");

  // Função para validar o formato do e-mail
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  // Função para validar o comprimento da senha (pelo menos 6 caracteres)
  function validatePassword(password) {
    return password.length >= 6;
  }

  // Evento para o envio do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Limpando as mensagens de erro antes de uma nova validação
    errorEmail.textContent = "";
    errorPassword.textContent = "";
    confirmationMessage.classList.add("invisible"); // Ocultando a mensagem de confirmação

    let valid = true; // Flag para determinar se o formulário é válido

    // Validação do e-mail
    if (!emailField.value || !validateEmail(emailField.value)) {
      errorEmail.textContent = "Por favor, insira um e-mail válido."; // Exibindo erro caso o e-mail seja inválido
      valid = false; // Definindo a flag como falsa se a validação falhar
    }

    // Validação da senha
    if (!passwordField.value || !validatePassword(passwordField.value)) {
      errorPassword.textContent = "A senha deve ter pelo menos 6 caracteres."; // Exibindo erro caso a senha seja inválida
      valid = false; // Definindo a flag como falsa se a validação falhar
    }

    // Se as validações passarem
    if (valid) {
      // Criando um objeto de usuário com e-mail e senha
      const user = {
        email: emailField.value,
        password: passwordField.value,
      };

      // Pegando os usuários armazenados no localStorage ou criando um array vazio se não houver nenhum usuário
      const users = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Adicionando o novo usuário à lista de usuários
      users.push(user);

      // Salvando a lista atualizada de usuários no localStorage
      localStorage.setItem("usuarios", JSON.stringify(users));

      // Exibindo a mensagem de confirmação
      confirmationMessage.classList.remove("invisible");

      // Resetando o formulário após o registro
      form.reset();
    }
  });
});
