// Elements
const aDrinkSelect = document.querySelector("#cocktails");
const nADrinkSelect = document.querySelector("#NADrinks");
const cocktailContainer = document.querySelector(".cocktail-container");

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
  cocktailContainer.replaceChildren();
  recipes.forEach((recipe) => {
    renderRecipeCard(recipe);
  });
  aDrinkSelect.value = "";
  nADrinkSelect.value = "";
}

function renderRecipeCard(alDrink) {
  const {
    //idDrink: cocktailId,
    strDrinkThumb: cocktailImage,
    strDrink: cocktailName,
  } = alDrink;

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  //add event listener to card

  const image = document.createElement("img");
  image.src = cocktailImage;

  const title = document.createElement("h3");
  title.textContent = cocktailName;

  cardDiv.append(image, title);
  cocktailContainer.append(cardDiv);
} 
