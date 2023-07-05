// Elements
const drinkSelect = document.querySelector("#cocktails");
const categorySelect = document.querySelector("#categories");
const cocktailContainer = document.querySelector(".cocktail-container");

// Function calls
getACocktails();
getNACocktails();

// Event Listeners
drinkSelect.addEventListener("change", getCocktail);
categorySelect.addEventListener("change", getNADrink);

//Dropdown Functiond
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
    .then((categories) => renderCategoryOptions(categories.drinks))
    .catch((error) => alert(error));
}

function renderCocktailOptions(cocktails) {
  cocktails.forEach((cocktail) => {
    const option = document.createElement("option");
    option.value = cocktail.strDrink;
    option.textContent = cocktail.strDrink;
    drinkSelect.append(option);
  });
}

function renderCategoryOptions(categories) {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.strDrink;
    option.textContent = category.strDrink;
    categorySelect.append(option);
  });
}

// Card Functions

function getCocktail() {
  const aCocktail = e.target.value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${aCocktail}`)
    .then((r) => r.json())
    .then((alchoholic) => renderAllCocktails(alchoholic.drinks))
    .catch((error) => alert(error));
}

function getNADrink() {
  const nADrink = e.target.value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${nADrink}`)
    .then((r) => r.json())
    .then((nonAlcoholic) => renderAllNAlcoholic(nonAlcoholic.drinks))
    .catch((error) => alert(error));
}

function renderAllCocktails(aDrinks) {
  aDrinks.forEach((aDrink) => {
    renderCocktailCard(aDrink);
  });
  drinkSelect.value = "";
  categorySelect.value = "";
}

function renderCocktailCard(aDrink) {
  const {
    idDrink: cocktailId,
    strDrinkThumb: cocktailImage,
    strDrink: cocktailName,
  } = aDrink;

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  //add event listener to card
}

function renderAllNAlcoholic(NDrinks) {
  NDrinks.forEach((nDrink) => {});
  drinkSelect.value = "";
  categorySelect.value = "";
}
