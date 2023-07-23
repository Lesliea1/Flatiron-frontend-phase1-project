// Elements
const aDrinkSelect = document.querySelector("#cocktails");
const nADrinkSelect = document.querySelector("#NADrinks");
const recipeContainer = document.querySelector(".recipe-container");
const selectionH1 = document.querySelector(".selection-heading");
const recipeDetailsContainer = document.querySelector(
  ".recipe-details-container"
);

const recipeDetailsSection = document.querySelector(".recipe-details-section");
const welcomeSection = document.querySelector(".welcome");
const mainTitle = document.querySelector(".main-title");
// Function calls
showWelcome();
getACocktails();
getNACocktails();

// Event Listeners
aDrinkSelect.addEventListener("change", getCocktailRecipe);
nADrinkSelect.addEventListener("change", getNARecipe);

//Dropdown Functions
function getACocktails() {
  fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
  )
    .then((r) => r.json())
    .then((cocktails) => renderCocktailOptions(cocktails.drinks))
    .catch((error) => alert(error));
}

function getNACocktails() {
  fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
  )
    .then((r) => r.json())
    .then((nADrink) => renderCategoryOptions(nADrink.drinks))
    .catch((error) => alert(error));
}

function showWelcome() {
  recipeDetailsContainer.style.display = "none";
  recipeContainer.style.display = "none";
  welcomeSection.style.display = "grid";
  selectionH1.textContent = "";
}
function renderCocktailOptions(cocktails) {
  cocktails.forEach((cocktail) => {
    const option = document.createElement("option");
    option.value = cocktail.strDrink;
    option.textContent = cocktail.strDrink;
    aDrinkSelect.append(option);
  });
}

function renderCategoryOptions(nADrinks) {
  nADrinks.forEach((nADrink) => {
    const option = document.createElement("option");
    option.value = nADrink.strDrink;
    option.textContent = nADrink.strDrink;
    nADrinkSelect.append(option);
  });
}

// Recipe collections

function getCocktailRecipe(e) {
  const aDrink = e.target.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${aDrink}`)
    .then((r) => r.json())
    .then((recipes) => renderAllRecipes(recipes.drinks))
    .catch((error) => alert(error));
}

function getNARecipe(e) {
  const nADrink = e.target.value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nADrink}`)
    .then((r) => r.json())
    .then((recipes) => renderAllRecipes(recipes.drinks))
    .catch((error) => alert(error));
}

function renderAllRecipes(recipes) {
  welcomeSection.style.display = "none";
  recipeDetailsContainer.style.display = "none";
  recipeContainer.style.display = "grid";
  recipeContainer.replaceChildren();

  selectionH1.textContent = aDrinkSelect.value || nADrinkSelect.value;

  recipes.forEach((recipe) => {
    renderRecipeCard(recipe);
  });
  aDrinkSelect.value = "";
  nADrinkSelect.value = "";
}

function renderRecipeCard(recipe) {
  const {
    idDrink: recipeId,
    strDrinkThumb: recipeImage,
    strDrink: recipeName,
  } = recipe;

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.addEventListener("click", (e) => getRecipeDetails(e, recipeId));

  const recipeTitleDiv = document.createElement("div");
  recipeTitleDiv.classList.add("recipe-title");
  const image = document.createElement("img");
  image.src = recipeImage;

  const title = document.createElement("h3");
  title.textContent = recipeName;

  recipeTitleDiv.append(title);
  cardDiv.append(image, recipeTitleDiv);
  recipeContainer.append(cardDiv);
}

function getRecipeDetails(e, recipeId) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then((r) => r.json())
    .then((recipes) => renderRecipeDetails(recipes.drinks[0]))
    .catch((error) => alert(error));
}

function renderRecipeDetails(recipeDetails) {
  welcomeSection.style.display = "none";
  selectionH1.textContent = "";
  recipeDetailsContainer.style.display = "grid";
  recipeContainer.replaceChildren();

  const {
    strDrink: recipe,
    strDrinkThumb: image,
    strCategory: category,
    strInstructions: directions,
    strVideo: youTubeLink,
  } = recipeDetails;

  const title = document.createElement("p");
  title.textContent = recipe;
  let titleArea = document.querySelector(".recipe-details-title");
  titleArea.replaceChildren();
  titleArea.append(title);

  const imageArea = document.querySelector(".recipe-details-image");
  const recipeImage = document.createElement("img");
  recipeImage.src = image;
  recipeImage.alt - `Image for ${recipe}`;
  imageArea.replaceChildren();
  imageArea.append(recipeImage);

  const ingredients = parseIngredients(recipeDetails);

  const ingredientsPs = ingredients.map((ingredient) => {
    const ingredientP = document.createElement("p");
    ingredientP.textContent = ingredient;
    return ingredientP;
  });

  const ingredientsArea = document.querySelector(".recipe-details-ingredients");
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingredients";
  ingredientsTitle.style.textDecoration = "underline";
  ingredientsArea.replaceChildren();
  ingredientsArea.append(ingredientsTitle, ...ingredientsPs);

  const directionsArea = document.querySelector(".recipe-details-directions");
  const directionsTitle = document.createElement("h3");
  directionsTitle.textContent = "Directions";
  directionsTitle.style.textDecoration = "underline";
  const directionsP = document.createElement("p");
  directionsArea.replaceChildren();
  directionsP.textContent = directions;
  directionsArea.append(directionsTitle, directionsP);

  const resourcesArea = document.querySelector(".recipe-details-resources");
  const youTubeLinkATag = document.createElement("a");
  youTubeLinkATag.href = youTubeLink;
  youTubeLinkATag.target = "_blank";
  youTubeLinkATag.text = `How to make ${recipe} on YouTube.`;
  const cuisineCategory = document.createElement("p");
  cuisineCategory.textContent = `(Recipe: ${recipe}, Category: ${category})`;
  resourcesArea.replaceChildren();
  resourcesArea.append(youTubeLinkATag, cuisineCategory);
}

function parseIngredients(recipe) {
  const ingredientArray = [];

  for (let i = 1; i < 16; i++) {
    let measure = recipe["strMeasure" + i.toString()];
    let ingredient = recipe["strIngredient" + i.toString()];
    if (ingredient === "" || ingredient === null) {
      ingredient = "";
      measure = "";
      continue;
    }
    let ingredientString = measure.trim() + "" + ingredient.trim();
    ingredientArray.push(ingredientString);
  }
  return ingredientArray;
}