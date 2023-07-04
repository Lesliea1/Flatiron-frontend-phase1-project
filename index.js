const drinkSelect = document.querySelector("#cocktails");
const categorySelect = document.querySelector("#categories");

// Function calls
getCocktails();
getCategories();

// Event Listeners
drinkSelect.addEventListener("change", getDrink);
categorySelect.addEventListener("change", getCocktailByCategory);

function getCocktails() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
    .then((r) => r.json())
    .then((cocktails) => renderCocktailOptions(cocktails.drinks))
    .catch((error) => alert(error));
}

function getCategories() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
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
