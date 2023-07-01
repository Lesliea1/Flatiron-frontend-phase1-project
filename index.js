console.log ('js connected 2.0')


const handleFormInputFocus = () => {
console.log("it works!")
}

const searchTermsInput = document.body.querySelector("#search-terms")

searchTermsInput.addEventListener("focus", handleFormInputFocus);