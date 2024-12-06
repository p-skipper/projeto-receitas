// Função para verificar se o usuário está logado
function checkLoginStatus() {
  const user = localStorage.getItem("loggedInUser");

  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");
  const loginLink = document.getElementById("login-link");

  // Se o usuário estiver logado, oculta o botão de login e exibe o botão de logout
  if (user) {
    loginButton.style.display = "none"; // Ocultar o botão de login
    logoutButton.style.display = "block"; // Exibir o botão de logout
    loginLink.style.display = "none"; // Ocultar o link de login
  } else {
    loginButton.style.display = "block"; // Exibir o botão de login
    logoutButton.style.display = "none"; // Ocultar o botão de logout
    loginLink.style.display = "block"; // Exibir o link de login
  }
}

// Função para realizar o logout do usuário
function logout() {
  // Remover o usuário logado do localStorage
  localStorage.removeItem("loggedInUser");

  // Recarregar a página para atualizar a interface
  window.location.reload();
}

// Verificar o status de login quando a página for carregada
document.addEventListener("DOMContentLoaded", checkLoginStatus);

// Função para navegar com filtro de categoria
function navigateWithFilter(category) {
  window.location.href = `recipe_page.html?category=${category}`;
}

// Buscar e exibir receitas (carrossel e receitas em destaque)
document.addEventListener("DOMContentLoaded", () => {
  fetch("recipes.json")
    .then((response) => response.json())
    .then((data) => {
      const carouselRecipes = data.filter((recipe) => recipe.slider === true);
      const cardRecipes = data.filter((recipe) => recipe.destaque === true);

      let currentIndex = 0;

      // Função para atualizar o carrossel
      function updateCarousel() {
        const imageElement = document.getElementById("carousel-image");
        const recipe = carouselRecipes[currentIndex];
        imageElement.src = recipe.imagem;

        // Adicionar evento de clique à imagem do carrossel para navegar até a página de detalhes da receita
        imageElement.addEventListener("click", () => {
          window.location.href = `recipe_detail.html?recipeTitle=${encodeURIComponent(recipe.titulo)}`;
        });
      }

      // Função para mover o slide do carrossel
      function moveSlide(step) {
        currentIndex =
          (currentIndex + step + carouselRecipes.length) %
          carouselRecipes.length;
        updateCarousel();
      }

      // Se houver receitas no carrossel, inicializa a exibição
      if (carouselRecipes.length > 0) {
        updateCarousel();
      } else {
        console.log("Não há receitas com 'slider': true.");
      }

      // Adicionar ouvintes de eventos para navegação no carrossel
      const prevButton = document.querySelector(".prev");
      const nextButton = document.querySelector(".next");
      prevButton.addEventListener("click", () => moveSlide(-1));
      nextButton.addEventListener("click", () => moveSlide(1));

      // Criar e exibir os cartões de receitas para "Destaques"
      const recipeContainer = document.getElementById("recipe-container");
      cardRecipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.imagem;
        recipeImage.alt = recipe.titulo;

        // Adicionar um evento de clique a cada cartão de receita para navegar até a página de detalhes da receita
        recipeImage.addEventListener("click", () => {
          window.location.href = `recipe_detail.html?recipeTitle=${encodeURIComponent(recipe.titulo)}`;
        });

        const recipeInfo = document.createElement("div");
        recipeInfo.classList.add("recipe-info");

        const recipeTitle = document.createElement("p");
        recipeTitle.textContent = recipe.titulo;

        const recipeDescription = document.createElement("p");
        recipeDescription.textContent =
          recipe.descricao.length > 100
            ? recipe.descricao.substring(0, 100) + "..."
            : recipe.descricao;

        recipeInfo.appendChild(recipeTitle);
        recipeInfo.appendChild(recipeDescription);

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeInfo);

        recipeContainer.appendChild(recipeCard);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar as receitas:", error);
    });
});
