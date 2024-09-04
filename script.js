let deck = [];
let oldCards = [];
let currentCardIndex = 0;
let deckId = null;

$(document).ready(function() {
    // Inicializar el mazo
    initializeDeck();

    // Event Listeners
    $('#deck').click(drawCard);
    $('#current-card').click(drawCard);
    $('#next-card').click(showNextCard);
    $('#prev-card').click(showPreviousCard);
    $('#shuffle-deck').click(shuffleDeck);
});

function initializeDeck() {
    // Generar las cartas usando la API
    $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", function(data) {
        deckId = data.deck_id;
        $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`, function(data) {
            deck = data.cards;
            $('#deck').attr('src', 'https://deckofcardsapi.com/static/img/back.png'); // Imagen de mazo boca abajo
        });
    });
}

function drawCard() {
    if (deck.length > 0 && currentCardIndex < deck.length) {
        $('#deck').removeClass('d-none');
        $('#current-card').removeClass('d-none');
        $('#current-card').attr('src', deck[currentCardIndex].image);
        oldCards.push(deck[currentCardIndex]);
        updateOldCards();
        currentCardIndex++;
    }
}

function showNextCard() {
    if (currentCardIndex < deck.length - 1) {
        $('#current-card').attr('src', deck[currentCardIndex].image);
        currentCardIndex++;
        oldCards.push(deck[currentCardIndex]);
        updateOldCards();
    }
}

function showPreviousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        $('#current-card').attr('src', deck[currentCardIndex].image);
    }
}

function shuffleDeck() {
    currentCardIndex = 0;
    oldCards = [];
    $('#deck').removeClass('d-none');
    $('#current-card').addClass('d-none');
    $('#old-cards-container').empty(); // Limpiar cartas viejas
    initializeDeck();
}

function updateOldCards() {
    $('#old-cards-container').empty();
    oldCards.forEach(card => {
        $('#old-cards-container').append(`<img src="${card.image}" alt="Old Card" class="old-card">`);
    });
}
