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
const resultTitle = document.getElementById("result-title");
const wrapCard = document.querySelector(".wrapper");


const gameHandler = function () {
    cards.forEach(item => item.classList.remove("flip"));
    cards.forEach(item => item.addEventListener("click", cardClicked));
    cardsBack.forEach(item => item.classList.remove("dis"));
}



const cardShuffler = function () {
    const animalArr = ["cat", "dog", "horse", "squirrel", "bee", "owl", "bird", "rabbit", "cat", "dog", "horse", "squirrel", "bee", "owl", "bird", "rabbit"];

    const arr = [];
    while (arr.length < 16) {
        const num = Math.floor(Math.random() * 16);
        if (arr.indexOf(num) === -1) {
            arr.push(num);
        }
    };

    const shuffledArray = [];
    for (let i = 0; i < arr.length; i++) {
        shuffledArray.push(animalArr[arr[i]]);
    }
    
    cardsFront.forEach(item => item.classList.value = "front");
    cardsFront.forEach((item,index) => item.classList.add(shuffledArray[index]));
    cardsFront.forEach((item,index) => console.log(item.classList));
}


const timerHandler = function () {
    let timeleft = 60;
    let downloadTimer = setInterval(function () {
        timeleft--;
        timer.innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            resultTitle.innerText = "YOU LOST!"
            gameEnd();
        } else if (guessRight.innerText === "0") {
            clearInterval(downloadTimer);
        }
    }, 1000)
}

const gameStart = function () {
    openingPop.classList.add("visibility");
    container.classList.remove("pop");
    closingPop.classList.add("visibility");
    cardsBack.forEach(item => {
        item.classList.remove("dis");
    })
    cards.forEach(item => {
        item.classList.remove("flip");
        item.classList.remove("liftup");
    });
    guessRight.innerText = "3";
    cardShuffler();
    timerHandler();
}

const winningSit = function () {
    let guessCount = parseInt(guessRight.innerText);
    guessCount--;
    
    guessRight.innerText = guessCount;
    cardsBack.forEach(item => item.classList.remove("dis"));
    cards.forEach(item => item.addEventListener("click", cardClicked));

    if (guessCount === 0) {
        resultTitle.innerText = "YOU WIN!"
        gameEnd();
    }
}

const cardClicked = function (e) {
    let count = 0;
    const cardSide = e.target.classList[0];
    const cardParent = e.target.parentElement.classList;
    if (cardSide === "back") {
        cardParent.add("flip");
    } else if (cardSide === "front") {
        cardParent.remove("flip")
    }
    cards.forEach(item => item.classList[1] === "flip" ? count++ : count += 0);
    
    if (count % 2 === 0) {
        let myArr = [];
        cards.forEach(item => item.removeEventListener("click", cardClicked));
        cardsBack.forEach(item => item.classList.add("dis"));
        cards.forEach(item => {
            if (item.classList[1] === "flip" && item.classList[2] !== "liftup") {
                myArr.push(item.firstElementChild.classList[1]);
            }
        });
        console.log(myArr)
        if (myArr[1] !== undefined && myArr[0] === myArr[1]) {
            setTimeout(winningSit, 2000);
            setTimeout(function () {
                cards.forEach(item => {
                    if (item.classList[1] === "flip") {
                        item.classList.add("liftup");
                    }
                });
            }, 2000);
        } else {
            setTimeout(gameHandler, 2000);
        }
    }
}

const flipHandler = function () {
    cards.forEach(item => item.addEventListener("click", cardClicked));

}

flipHandler();


const gameEnd = function () {
    closingPop.classList.remove("visibility");
    container.classList.add("pop");
    cardsBack.forEach(item => {
        item.classList.add("dis");
    });


}

startBtn.addEventListener("click", gameStart)
restartBtn.addEventListener("click", gameStart)


