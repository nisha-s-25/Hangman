const countries = ['ARGENTINA', 'BRAZIL', 'CANADA', 'DENMARK', 'EGYPT', 'FRANCE', 'GERMANY', 'HUNGARY', 'INDIA', 'JAPAN', 'KENYA', 'LUXEMBORG', 'MEXICO', 'NETHERLAND', 'OMAN', 'PORTUGAL', 'QATAR', 'RUSSIA', 'SPAIN', 'TURKEY', 'UGANDA', 'VIETNAM', 'YEMEN', 'ZIMBABWE'];
let selectedWord = '';
let correctLetters = [];
let wrongLetters = [];

const wordDisplay = document.getElementById('wordDisplay');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const messageDisplay = document.getElementById('message');
const keyboard = document.querySelector('.keyboard');
const restartButton = document.getElementById('restartButton');
const hangmanCanvas = document.getElementById('hangmanCanvas');
const ctx = hangmanCanvas.getContext('2d');

// Initialize the game
function init() {
    selectedWord = countries[Math.floor(Math.random() * countries.length)];
    correctLetters = [];
    wrongLetters = [];
    messageDisplay.innerHTML = '';
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    updateDisplay();
    createKeyboard();
}

// Create keyboard buttons
function createKeyboard() {
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement('button');
        button.classList.add('key');
        button.innerText = String.fromCharCode(i);
        button.addEventListener('click', handleKeyClick);
        keyboard.appendChild(button);
    }
}

// Handle key clicks
function handleKeyClick(e) {
    const letter = e.target.innerText.toUpperCase();
    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            updateDisplay();
            checkGameStatus();
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLetters();
            drawHangman(wrongLetters.length);
            checkGameStatus();
        }
    }
    e.target.disabled = true;
}

// Update the word display
function updateDisplay() {
    wordDisplay.innerHTML = selectedWord
        .split('')
        .map(letter => (correctLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

// Update the wrong letters display
function updateWrongLetters() {
    wrongLettersDisplay.innerHTML = `Wrong Letters: ${wrongLetters.join(', ')}`;
}

// Check game status (win/lose)
function checkGameStatus() {
    if (wordDisplay.innerText.replace(/ /g, '') === selectedWord) {
        messageDisplay.innerHTML = 'Congratulations! You won!';
        disableKeys();
    } else if (wrongLetters.length >= 8) {
        messageDisplay.innerHTML = `You lost! The word was ${selectedWord}.`;
        disableKeys();
    }
}

// Disable all keyboard buttons
function disableKeys() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.disabled = true);
}

// Draw hangman
function drawHangman(wrongGuessCount) {
    switch(wrongGuessCount) {
        case 1:
            drawBase();
            break;
        case 2:
            drawPole();
            break;
        case 3:
            drawBeam();
            break;
        case 4:
            drawRope();
            break;
        case 5:
            drawHead();
            break;
        case 6:
            drawBody();
            break;
        case 7:
            drawArms();
            break;
        case 8:
            drawLegs();
            break;
        default:
            break;
    }
}

function drawBase() {
    ctx.beginPath();
    ctx.moveTo(10, 190);
    ctx.lineTo(190, 190);
    ctx.stroke();
}

function drawPole() {
    ctx.beginPath();
    ctx.moveTo(50, 190);
    ctx.lineTo(50, 10);
    ctx.stroke();
}

function drawBeam() {
    ctx.beginPath();
    ctx.moveTo(50, 10);
    ctx.lineTo(150, 10);
    ctx.stroke();
}

function drawRope() {
    ctx.beginPath();
    ctx.moveTo(150, 10);
    ctx.lineTo(150, 30);
    ctx.stroke();
}

function drawHead() {
    ctx.beginPath();
    ctx.arc(150, 50, 20, 0, Math.PI * 2, true); // Circle
    ctx.stroke();
}

function drawBody() {
    ctx.beginPath();
    ctx.moveTo(150, 70);
    ctx.lineTo(150, 130);
    ctx.stroke();
}

function drawArms() {
    ctx.beginPath();
    ctx.moveTo(150, 90);
    ctx.lineTo(130, 110);
    ctx.moveTo(150, 90);
    ctx.lineTo(170, 110);
    ctx.stroke();
}

function drawLegs() {
    ctx.beginPath();
    ctx.moveTo(150, 130);
    ctx.lineTo(130, 160);
    ctx.moveTo(150, 130);
    ctx.lineTo(170, 160);
    ctx.stroke();
}

// Restart the game
restartButton.addEventListener('click', init);

// Start the game on page load
init();
