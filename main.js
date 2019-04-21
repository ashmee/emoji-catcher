const startGame = () => {
    const isMice = emoji => emoji === "🐭";
    const emojiArr = ["🐭", "🐶", "🐱", "🐼", "🐭", "🐷", "🐵", "🐰", "🐭", "🐭"];
    document.querySelector('button.button-start').removeEventListener("click", startGame);
    let lives = 3;
    let speed = document.getElementById('currentSpeed');
    speed.innerHTML = '0';
    score.innerHTML = '0';
    let star = document.querySelector('svg.speed__star');
    let miceCount = 0;
    let liveCount = document.querySelectorAll("div.lives__lives-box > svg");
    let hearts = document.querySelectorAll("div.lives__lives-box > svg > path");
    for (let i = 0; i< hearts.length; i++ ) {
        hearts[i].setAttribute("fill", "#FF1A00");
    }

    let getRandomHole = () =>
        Math.floor(Math.random() * 5); //рандомная нора

    let getRandomEmoji = () =>
        emojiArr[Math.floor(Math.random() * emojiArr.length)];

    let delayTime = setInterval(() => doGame(), 3000);

    const doGame = () => {
        let hole = document.getElementById("hole-" + getRandomHole());
        star.setAttribute("class", "speed__star");
        hole.setAttribute("class", "hole__animate");
        hole.innerText = getRandomEmoji();

        if (isMice(hole.innerText)) {
            miceCount++;
            if (miceCount % 5 === 0) {
                star.setAttribute("class", "speed__star animate");
                speed.innerHTML = Number(speed.innerHTML) + 1;
                clearInterval(delayTime);
                delayTime = setInterval(() =>
                    doGame(), 3000 - Number(speed.innerHTML)*200);
            }
        }

        let emojiClick = () => {
            if (isMice(hole.innerText)) {
                score.innerHTML = Number(score.innerHTML) + 10;
                hole.innerText = "";
                hole.removeEventListener("click", emojiClick, false);
            } else {
                --lives;
                liveCount[lives].querySelector('path').setAttribute("fill", "#A0B4BE");
                hole.innerText = "";
                hole.setAttribute("class", "");
                hole.removeEventListener("click", emojiClick, false);

                if (lives === 0) {
                    clearInterval(delayTime);
                    showEndgame();
                }
            }
        };

        hole.addEventListener("click", emojiClick, false);

        setTimeout( () => {
            hole.innerText = "";
            hole.removeEventListener("click", emojiClick, false);
        }, 1000);
    }

};

//popups
const showHelp = () => {
    let guide = document.querySelector(".guide");
    guide.style.display = "block";
    document.querySelector('div.guide > button.popup__button').addEventListener("click", closePopup);
};

let score = document.querySelector(".character-bar__scores");

const showEndgame = () => {
    let popupScore = document.querySelector(".endgame__number");
    let endgame = document.querySelector(".endgame");
    popupScore.innerHTML = score.innerHTML;
    endgame.style.display = "block";
    document.querySelector('div.endgame > button.popup__button').addEventListener("click", closePopup);
};

const closePopup = () => {
    document.querySelector(".guide").style.display = "none";
    document.querySelector(".endgame").style.display = "none";
    document.querySelector('button.button-start').addEventListener("click", startGame);
};

//запуск игры по клику на кнопке "Старт"
document.querySelector('button.button-start').addEventListener("click", startGame);

//help
document.querySelector('button.button-help').addEventListener("click", showHelp);