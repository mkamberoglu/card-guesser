/** @type {HTMLDivElement} */
const cards = document.querySelectorAll(".card");
/** @type {HTMLDivElement} */
const cardsFront = document.querySelectorAll(".front");
const startBtn = document.getElementById("start-btn");
const container = document.querySelector(".container");
const openingPop = document.querySelector(".opening");
const restartBtn = document.getElementById("restart-btn");
const closingPop = document.getElementById("closing");
/** @type {HTMLDivElement} */
const cardsBack = document.querySelectorAll(".back");
const timer = document.getElementById("left-time");
const guessRight = document.getElementById("guess-count");
const resultTitle = document.getElementById("result-title") 



const cardShuffler = function() {
    const animalArr = ["cat", "dog", "horse", "squirrel", "bee", "owl", "bird", "rabbit", "cat", "dog", "horse", "squirrel", "bee", "owl", "bird", "rabbit"];

    const arr = [];
    while (arr.length < 16) {
    const num = Math.floor(Math.random() * 16);
    if (arr.indexOf(num) === -1) {
        arr.push(num);
        }
    };

    for (let i = 0; i < arr.length; i++) {
        cardsFront[i].classList.add(animalArr[arr[i]]); 
    }   
}

const timerHandler = function() {
    let timeleft = 60;
    let downloadTimer = setInterval(function(){
        timeleft--;
        timer.innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            resultTitle.innerText = "YOU LOST!"
            gameEnd();
        }
    }, 1000)
}

const gameStart = function() {
    openingPop.classList.add("visibility");
    container.classList.remove("pop");
    closingPop.classList.add("visibility");
    cardsBack.forEach(item => {
        item.classList.remove("dis");
    })
    cardShuffler();
    timerHandler();

}

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
    cards.forEach(item => item.addEventListener("click", cardClicked));
}

flipHandler(); 


const gameEnd = function(){
    closingPop.classList.remove("visibility");
    container.classList.add("pop");
    cardsBack.forEach(item => {
        item.classList.add("dis");
    })
} 

startBtn.addEventListener("click", gameStart)
restartBtn.addEventListener("click", gameStart)


