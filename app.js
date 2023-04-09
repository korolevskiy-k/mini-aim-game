const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let colors = ['#16d9e3', '#36f790', '#f736f7', '#8af736', '#f77d36'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

// Делегирование событий
timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {    
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }    
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
    timeEl.parentNode.classList.add('hide');

}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);        
    const x = getRandomNumber(0, 500 - size);
    const y = getRandomNumber(0, 500 - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`
    circle.style.background = colors[getRandomNumber(0, colors.length)];
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round((Math.random() * (max - min) + min));
}