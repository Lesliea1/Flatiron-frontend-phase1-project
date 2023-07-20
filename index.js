// Elements
const aDrinkSelect = document.querySelector("#cocktails");
const nADrinkSelect = document.querySelector("#NADrinks");
const recipeContainer = document.querySelector(".recipe-container");

// Function calls
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
  recipeContainer.replaceChildren();
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

  const image = document.createElement("img");
  image.src = recipeImage;

  const title = document.createElement("h3");
  title.textContent = recipeName;

  cardDiv.append(image, title);
  recipeContainer.append(cardDiv);
}

function getRecipeDetails(e, recipeId) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then((r) => r.json())
    .then((recipes) => renderRecipeDetails(recipes.drinks[0]))
    .catch((error) => alert(error));
}

function renderRecipeDetails(recipeDetails) {
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

  //const ingredientsPs = ingredients.map;

  const ingredientsArea = document.querySelector(".recipe-details-ingredients");
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingredients";
  ingredientsTitle.style.textDecoration = "underline";
  ingredientsArea.replaceChildren();
  ingredientsArea.append(ingredientsTitle);

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

  for (let i = 1; i < 21; i++) {
    let measure = recipe["strMeasure" + i.toString()];
    let ingredient = recipe["strIngredient" + i.toString()];
    if (
      measure &&
      ingredient &&
      measure.trim() !== "" &&
      ingredient.trim() !== ""
    ) {
      let ingredientString = measure.trim() + "" + ingredient.trim();
      ingredientArray.push(ingredientString);
    }
  }
  return ingredientArray;
}
