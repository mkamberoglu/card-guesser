/** @type {HTMLDivElement} */
const cards = document.querySelectorAll(".card");


const cardClicked = function(e) {
    const cardSide = e.target.classList[0];
    const cardParent = e.target.parentElement.classList;
    if (cardSide === "back") {
        cardParent.add("flip");
    } else if (cardSide === "front") {
        cardParent.remove("flip")
    }
}

const flipHandler = function() {
    cards.forEach(item => item.addEventListener("click", cardClicked))
}

flipHandler() 

