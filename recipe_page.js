// Carrega o arquivo JSON contendo as receitas
fetch('recipes.json')
  .then(response => response.json())  // Converte a resposta em formato JSON
  .then(data => {
    // Obtém os elementos HTML necessários
    const recipeContainer = document.getElementById('recipe-container'); // Onde as receitas serão exibidas
    const bookmarkFilter = document.getElementById('bookmark-filter');  // Ícone de filtro de favoritos
    const searchInput = document.querySelector(".input");  // Campo de busca
    let showFavoritesOnly = false;  // Variável para controlar se apenas os favoritos serão exibidos

    // Função para carregar os favoritos salvos no localStorage
    const loadFavorites = () => {
      return JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];  // Retorna um array de receitas favoritas, ou um array vazio se não houver
    };

    // Função para exibir as receitas
    const displayRecipes = (recipes) => {
      recipeContainer.innerHTML = ''; // Limpa o conteúdo do container antes de exibir as receitas

      // Loop para criar e adicionar um cartão de receita para cada receita
      recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');  // Cria o cartão da receita
        recipeCard.classList.add('recipe-card');  // Adiciona a classe 'recipe-card'

        // Criação da imagem da receita
        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.imagem;  // Define a fonte da imagem
        recipeImage.alt = recipe.titulo;  // Define o texto alternativo da imagem

        // Adiciona um evento de clique na imagem para redirecionar para a página de detalhes da receita
        recipeCard.addEventListener("click", () => {
          window.location.href = `recipe_detail.html?recipeTitle=${encodeURIComponent(recipe.titulo)}`;
        });

        // Criação do elemento que contém as informações da receita
        const recipeDetails = document.createElement('div');
        recipeDetails.classList.add('recipe-info');  // Adiciona a classe 'recipe-info'

        // Título da receita
        const recipeTitle = document.createElement('p');
        recipeTitle.textContent = recipe.titulo;

        // Tempo de preparo da receita
        const recipeTime = document.createElement('div');
        recipeTime.classList.add('recipe-time');
        const timeIcon = document.createElement('i');
        timeIcon.classList.add('fa', 'fa-clock');  // Ícone do tempo
        const timeText = document.createElement('p');
        timeText.textContent = `${recipe.tempo} min`;  // Exibe o tempo de preparo

        recipeTime.appendChild(timeIcon);  // Adiciona o ícone do tempo
        recipeTime.appendChild(timeText);  // Adiciona o texto com o tempo

        // Descrição da receita (limita a descrição a 100 caracteres)
        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = recipe.descricao.length > 100
          ? recipe.descricao.substring(0, 100) + "..."  // Limita a descrição a 100 caracteres
          : recipe.descricao;

        recipeDetails.appendChild(recipeTitle);  // Adiciona o título
        recipeDetails.appendChild(recipeTime);  // Adiciona o tempo
        recipeDetails.appendChild(recipeDescription);  // Adiciona a descrição

        // Ícone de favorito (marcar/desmarcar como favorito)
        const bookmarkIcon = document.createElement('i');
        bookmarkIcon.classList.add('fas', 'fa-bookmark', 'bookmark-icon');

        // Verifica se a receita está nos favoritos e aplica a classe 'bookmarked' se necessário
        const bookmarkedRecipes = loadFavorites();
        if (bookmarkedRecipes.includes(recipe.titulo)) {
          bookmarkIcon.classList.add('bookmarked');  // Marca como favorito
        }

        // Evento para adicionar/remover a receita dos favoritos
        bookmarkIcon.addEventListener('click', () => {
          let bookmarkedRecipes = loadFavorites();
          if (bookmarkedRecipes.includes(recipe.titulo)) {
            // Se já for favorito, remove dos favoritos
            bookmarkedRecipes = bookmarkedRecipes.filter(title => title !== recipe.titulo);
            bookmarkIcon.classList.remove('bookmarked');
          } else {
            // Se não for favorito, adiciona aos favoritos
            bookmarkedRecipes.push(recipe.titulo);
            bookmarkIcon.classList.add('bookmarked');
          }
          // Atualiza os favoritos no localStorage
          localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipes));
        });

        // Adiciona todos os elementos criados ao cartão da receita
        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeDetails);
        recipeCard.appendChild(bookmarkIcon);

        // Adiciona o cartão da receita ao container de receitas
        recipeContainer.appendChild(recipeCard);
      });
    };

    // Exibe as receitas quando a página for carregada
    displayRecipes(data);

    // Evento para o filtro de favoritos
    bookmarkFilter.addEventListener('click', () => {
      showFavoritesOnly = !showFavoritesOnly;  // Alterna entre exibir ou não apenas favoritos

      const bookmarkedRecipes = loadFavorites();
      const filteredRecipes = showFavoritesOnly
        ? data.filter(recipe => bookmarkedRecipes.includes(recipe.titulo))  // Filtra para mostrar apenas os favoritos
        : data;  // Caso contrário, mostra todas as receitas

      displayRecipes(filteredRecipes);  // Exibe as receitas filtradas

      // Muda a aparência do ícone de filtro para indicar se estamos mostrando apenas favoritos
      if (showFavoritesOnly) {
        bookmarkFilter.classList.add('bookmarked');
      } else {
        bookmarkFilter.classList.remove('bookmarked');
      }
    });

    // Eventos para o modal de filtros
    const filterModal = document.getElementById('filter-modal');  // Modal de filtros
    const filterIcon = document.getElementById('filter-icon');  // Ícone de filtro
    const closeModal = document.getElementById('close-modal');  // Botão de fechar o modal
    const applyFilters = document.getElementById('apply-filters');  // Botão de aplicar os filtros

    // Evento para abrir o modal de filtros
    filterIcon.addEventListener('click', () => {
      filterModal.style.display = 'block';  // Exibe o modal de filtros
    });

    // Evento para fechar o modal de filtros
    closeModal.addEventListener('click', () => {
      filterModal.style.display = 'none';  // Fecha o modal de filtros
    });

    // Evento para aplicar os filtros selecionados
    applyFilters.addEventListener('click', () => {
      const categoryFilter = document.getElementById('category-filter').value;  // Filtro de categoria
      const difficultyFilter = document.getElementById('difficulty-filter').value;  // Filtro de dificuldade
      const timeFilter = document.getElementById('time-filter').value;  // Filtro de tempo

      // Filtra as receitas de acordo com os filtros aplicados
      const filteredRecipes = data.filter(recipe => {
        const matchesCategory = categoryFilter ? recipe.categoria === categoryFilter : true;
        const matchesDifficulty = difficultyFilter ? recipe.dificuldade === difficultyFilter : true;
        const matchesTime = timeFilter ? (
          (timeFilter === '0-5' && recipe.tempo <= 5) ||
          (timeFilter === '5-15' && recipe.tempo > 5 && recipe.tempo <= 15) ||
          (timeFilter === '15-30' && recipe.tempo > 15 && recipe.tempo <= 30) ||
          (timeFilter === '30+' && recipe.tempo > 30)
        ) : true;
        return matchesCategory && matchesDifficulty && matchesTime;
      });

      displayRecipes(filteredRecipes);  // Exibe as receitas filtradas
      filterModal.style.display = 'none';  // Fecha o modal de filtros
    });

    // Evento para a busca de receitas
    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();  // Obtém o termo de busca em minúsculas
      const filteredRecipes = data.filter(recipe => {
        // Filtra as receitas que contêm o termo de busca no título ou na descrição
        return recipe.titulo.toLowerCase().includes(searchTerm) || recipe.descricao.toLowerCase().includes(searchTerm);
      });
      displayRecipes(filteredRecipes);  // Exibe as receitas filtradas pela busca
    });

  })
  .catch(error => {
    // Caso ocorra um erro ao carregar o arquivo JSON
    console.error('Erro ao carregar as receitas:', error);
  });
