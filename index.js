// elements https://www.themealdb.com/api/json/v1/1/list.php?a=list */

const drinkSelect = document.querySelector("#cocktails");

// Function calls
getCocktails();

function getCocktails() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
    .then((r) => r.json())
    .then((cocktails) => console.log()) //renderCocktailOptions(cocktails.drinks))
    .catch();
}
