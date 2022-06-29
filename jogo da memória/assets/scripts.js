const cards        = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard      = false;
let firstCard, secondCard;

var currentNumberWrapper = document.getElementById("currentNumber");
var currentNumber = 0;
var erro;

function restart() {
    location.reload(); //restarta a página
}

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return; 
    }
    /* Adiciona +1 no Contador de erros*/ 
    currentNumber = currentNumber +1;
    currentNumberWrapper.innerHTML = currentNumber;

    /* Verifica Quantas vezes errou para travar o jogo*/
    if(currentNumber == 6) {
        erro = document.getElementById('error');
        console.log(erro);
        erro.style.display="block";
        lockBoard = true;
        
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard]     = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})(); //método para invocar a função quando iniciar o código

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});