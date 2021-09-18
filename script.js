const quotes = [
    'Things are only impossible until they are not',
    'It is possible to commit no errors and still lose. That is not a weakness. That is life',
    'There is a way out of every box, a solution to every puzzle; it is just a matter of finding it.',
    'Without freedom of choice there is no creativity',
    'Logic is the beginning of wisdom, not the end',
    'Improve a mechanical device and you may double productivity. But improve yourself, you gain a thousandfold',
    'Compassion: that is the one thing no machine ever had. Maybe it is the one thing that keeps us ahead of them.',
];

const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');

let wordQueue;
let highlightPosition;
let startTime;

function startGame() {
    console.log("Game started!");

    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex];

    wordQueue = quoteText.split(' ');
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');

    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = 'highlight';

    input.focus();
    input.value = '';
    message.innerText = '';

    startTime = new Date().getTime();

    document.body.className = "";
    start.className = "started";
    setTimeout(() => { start.className = "button"; }, 2000);
}

function checkInput() {
    const currentWord = wordQueue[0].replaceAll(".", "").replaceAll(",", "");
    const typedValue = input.value.trim();

    if (currentWord !== typedValue) {
        input.className = currentWord.startsWith(typedValue) ? "" : "error";
        return;
    }

    wordQueue.shift(); //shift removes first item (0th element)
    input.value = ""; // empty textbox
    quote.childNodes[highlightPosition].className = ""; // unhighlight word

    if (wordQueue.length === 0) { // if we have run out of words in the queue then game over.
        gameOver();
        return;
    }

    highlightPosition++;                                            // increment highlight position
    quote.childNodes[highlightPosition].className = 'highlight';    // highlight new word
}

function gameOver() {
    const elapsedTime = new Date().getTime() - startTime;
    document.body.className = "winner";
    message.innerHTML = `<span class="congrats">Congratuations!</span> <br> You finished in ${elapsedTime / 1000} seconds.`;
}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);