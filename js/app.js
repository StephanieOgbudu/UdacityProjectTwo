/*
 * Create a list that holds all of your cards
 */
let symbols = ['laugh-beam', 'laugh-beam', 'smile-beam', 'smile-beam', 'grin', 'grin', 'grin-wink', 'grin-wink', 'laugh', 'laugh', 'grin-squint-tears', 'grin-squint-tears', 'surprise', 'surprise', 'grin-beam-sweat', 'grin-beam-sweat'],
$container = $('.container'),
$scorePanel = $('.score-panel'),
$rating = $('.fa-star'),
$moves = $('.moves'),
$timer = $('.timer'),
$restart = $('.restart'),
$deck = $('.deck'),
open = [],
match = 0,
second = 0,
moves = 0,
wait = 600,
totalCard = symbols.length / 2,
stars3 = 14,
stars2 = 16,
star1 = 20;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function start() 
{
    let emojicard = shuffle(symbols);
    $deck.empty();
    moves = 0;
    match = 0;
    $moves.text('0');
    for (let i = 0; i < emojicard.length; i++) 
    {
        $deck.append($('<li class="card"><i class="fa fa-' + emojicard[i] + '"></i></li>'))
    }
    addCardListener();
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let addCardListener = function () 
{
    $deck.find('.card').bind('click', function () 
    {
        let $this = $(this);
        if ($this.hasClass('show') || $this.hasClass('match')) 
        { 
            return true; 
        }
        let card = $this.context.innerHTML;
        $this.addClass('open show');
        open.push(card);
        if (open.length > 1) 
        {
            if (card === open[0]) 
            {
                $deck.find('.open').addClass('match');
                setTimeout(function () 
                {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;
            } 
            else 
            {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () 
                {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.5);
            }
            open = [];
            moves++;
            rating(moves);
            $moves.html(moves);
        }
        if (totalCard === match) 
        {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () 
            {
                end(moves, score);
            }, 500);
        }
    });
}


//Rating Function
function rating(moves) {
    let rating = 3;
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return { score: rating };
}

function end(moves, score) 
{
    $('#winMove').text(`Moves: ${moves} moves`);
    $('#winScore').text(`Score: ${score}`);
    $('#winModal').modal('toggle');
}

$restart.bind('click', function (confirmed) 
{
    if (confirmed) 
    {
        $rating.removeClass('fa-star-o').addClass('fa-star');
        start();
    }
});



// Initiates the timer as soon as the game is loaded


start();