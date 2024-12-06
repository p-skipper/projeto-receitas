// Espera o carregamento completo do conteúdo da página
document.addEventListener('DOMContentLoaded', () => {
  // Substitua pelo caminho correto do seu arquivo ou URL de busca
  fetch('recipes.json')
    .then(response => response.json()) // Converte a resposta em JSON
    .then(recipes => {
      // Pega o título da receita a partir dos parâmetros da URL
      const urlParams = new URLSearchParams(window.location.search);
      const recipeTitle = urlParams.get('recipeTitle'); // Obtém o parâmetro 'recipeTitle' da URL

      // Encontra a receita pelo título
      const recipe = recipes.find(r => r.titulo === recipeTitle);
      if (recipe) {
        // Se a receita for encontrada, exibe os detalhes
        displayRecipeDetails(recipe);
      } else {
        // Caso não encontre a receita, exibe um erro
        console.error('Receita não encontrada!');
      }
    })
    .catch(error => {
      // Em caso de erro na busca dos dados
      console.error('Erro ao buscar os dados da receita:', error);
    });
});

// Função que exibe os detalhes da receita na página
function displayRecipeDetails(recipe) {
  // Definir a imagem da receita
  const recipeImage = document.getElementById('recipe-image');
  recipeImage.src = recipe.imagem; // Atribui a URL da imagem

  // Definir o título da receita
  const recipeTitle = document.getElementById('recipe-title');
  recipeTitle.textContent = recipe.titulo; // Atribui o título da receita

  // Definir o tempo de preparo da receita
  const recipeTime = document.getElementById('recipe-time');
  recipeTime.textContent = recipe.tempo; // Atribui o tempo de preparo

  // Definir a dificuldade da receita
  const recipeDifficulty = document.getElementById('recipe-difficulty');
  recipeDifficulty.textContent = recipe.dificuldade; // Atribui o nível de dificuldade

  // Definir a descrição da receita
  const recipeDescription = document.getElementById('recipe-description');
  recipeDescription.textContent = recipe.descricao; // Atribui a descrição

  // Definir a lista de ingredientes
  const ingredientsList = document.getElementById('ingredients-list');
  ingredientsList.innerHTML = ''; // Limpa a lista antes de adicionar os ingredientes
  // Para cada ingrediente na receita, cria um item de lista
  for (const [ingredient, quantity] of Object.entries(recipe.ingredientes)) {
    const listItem = document.createElement('li');
    listItem.textContent = `${ingredient}: ${quantity}`; // Cria o item de lista com o nome e quantidade do ingrediente
    ingredientsList.appendChild(listItem); // Adiciona o item à lista de ingredientes
  }

  // Definir a lista de passos de preparo
  const stepsList = document.getElementById('steps-list');
  stepsList.innerHTML = ''; // Limpa a lista de passos antes de adicionar
  // Para cada passo de preparo, cria um item de lista
  for (const [step, instruction] of Object.entries(recipe.passos)) {
    const listItem = document.createElement('li');
    listItem.textContent = instruction; // Cria o item de lista com a instrução do passo
    stepsList.appendChild(listItem); // Adiciona o item à lista de passos
  }
}

// Novamente, escuta o carregamento da página para pegar os detalhes da receita
document.addEventListener('DOMContentLoaded', () => {
  // Substitua pelo caminho correto do seu arquivo ou URL de busca
  fetch('recipes.json')
    .then(response => response.json()) // Converte a resposta em JSON
    .then(recipes => {
      // Pega o título da receita a partir dos parâmetros da URL
      const urlParams = new URLSearchParams(window.location.search);
      const recipeTitle = urlParams.get('recipeTitle'); // Obtém o parâmetro 'recipeTitle' da URL

      // Encontra a receita pelo título
      const recipe = recipes.find(r => r.titulo === recipeTitle);
      if (recipe) {
        // Se a receita for encontrada, exibe os detalhes
        displayRecipeDetails(recipe);
      } else {
        // Caso não encontre a receita, exibe um erro
        console.error('Receita não encontrada!');
      }
    })
    .catch(error => {
      // Em caso de erro na busca dos dados
      console.error('Erro ao buscar os dados da receita:', error);
    });
});

// Função para exibir os detalhes da receita, com a adição de checkboxes para marcar ingredientes como concluídos
function displayRecipeDetails(recipe) {
  // Definir a imagem da receita
  const recipeImage = document.getElementById('recipe-image');
  recipeImage.src = recipe.imagem; // Atribui a URL da imagem

  // Definir o título da receita
  const recipeTitle = document.getElementById('recipe-title');
  recipeTitle.textContent = recipe.titulo; // Atribui o título da receita

  // Definir o tempo de preparo da receita
  const recipeTime = document.getElementById('recipe-time');
  recipeTime.textContent = recipe.tempo; // Atribui o tempo de preparo

  // Definir a dificuldade da receita
  const recipeDifficulty = document.getElementById('recipe-difficulty');
  recipeDifficulty.textContent = recipe.dificuldade; // Atribui a dificuldade da receita

  // Definir a descrição da receita
  const recipeDescription = document.getElementById('recipe-description');
  recipeDescription.textContent = recipe.descricao; // Atribui a descrição

  // Definir a lista de ingredientes com caixas de seleção
  const ingredientsList = document.getElementById('ingredients-list');
  ingredientsList.innerHTML = ''; // Limpa a lista antes de adicionar os ingredientes
  // Para cada ingrediente, cria-se um item de lista com uma caixa de seleção
  for (const [ingredient, quantity] of Object.entries(recipe.ingredientes)) {
    const listItem = document.createElement('li');
    listItem.classList.add('ingredient-item'); // Adiciona uma classe ao item de ingrediente

    // Cria a checkbox para cada ingrediente
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; // Tipo da checkbox
    checkbox.classList.add('ingredient-checkbox'); // Adiciona uma classe à checkbox
    
    // Adiciona evento para alternar o estilo de riscado no ingrediente
    checkbox.addEventListener('click', () => {
      if (checkbox.checked) {
        listItem.classList.add('completed'); // Marca o ingrediente como concluído (risca)
      } else {
        listItem.classList.remove('completed'); // Remove o risco do ingrediente
      }
    });

    // Adiciona a checkbox e o texto ao item da lista
    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(`${ingredient}: ${quantity}`));
    
    ingredientsList.appendChild(listItem); // Adiciona o item à lista de ingredientes
  }

  // Definir a lista de passos de preparo
  const stepsList = document.getElementById('steps-list');
  stepsList.innerHTML = ''; // Limpa a lista de passos antes de adicionar
  // Para cada passo de preparo, cria-se um item de lista
  for (const [step, instruction] of Object.entries(recipe.passos)) {
    const listItem = document.createElement('li');
    listItem.textContent = instruction; // Cria o item de lista com a instrução do passo
    stepsList.appendChild(listItem); // Adiciona o item à lista de passos
  }
}
