(function(){
    let playerHand = [];
    let pcHand = [];
    let playingDeck = [];
    let playerScore = document.getElementById("pScore");
    const pcScore = document.getElementById("pcScore");
    const pCards = document.getElementById("pCards");
    const pcCards = document.getElementById("pcCards");
    const buttons = document.getElementById("buttons");
    const playingButtons = document.getElementById("playingButtons");
    const heading = document.getElementById("heading");
    playingButtons.style.display= "none";
    let scorePlayer = 0;
    let scorePC = 0;

    // each card goes from the deck to the players hand
    function givePlayerCard() {
        playerHand.push(playingDeck.pop());    // each card goes from the deck array to the players hand array
        if(playerHand[playerHand.length-1].value === "A" && scorePlayer + playerHand[playerHand.length-1].weight > 21 ){
            playerHand[playerHand.length-1].weight = 1;
        }                                                                       // if an ace with 11 weight, points would be more than 21 ==> weight is 1
        scorePlayer = scorePlayer + playerHand[playerHand.length-1].weight;     // weight of card adds to the score
        let imgLink;                                                            // select img source according to suits
        switch (playerHand[playerHand.length-1].suits){
            case 'H': imgLink="resources/h.png"
                break;
            case 'D': imgLink="resources/d.png"
                break;
            case 'C': imgLink="resources/c.png"
                break;
            case 'S': imgLink="resources/s.png"
                break;
        }
        playerScore.innerHTML = scorePlayer;                                // print the score in html
        //print the card body in html as div
        pCards.innerHTML = pCards.innerHTML +'<div class="cards"> <h2>'+ playerHand[playerHand.length-1].value + '</h2> <img src="'+ imgLink + '" alt="' + playerHand[playerHand.length-1].suits + '" width="35" height="35"> </div>';
    }
    function giveComputerCard() {
        pcHand.push(playingDeck.pop());         // each card goes from the deck array to the players hand array
        if(pcHand[pcHand.length-1].value === "A" && scorePC + pcHand[pcHand.length-1].weight > 21 ){
            pcHand[pcHand.length-1].weight = 1;
        }                                                                     // if an ace with 11 weight, points would be more than 21 ==> weight is 1
        scorePC = scorePC + pcHand[pcHand.length-1].weight;                   // weight of card adds to the score
        let imgLink;                                                          // select img source according to suits
        switch (pcHand[pcHand.length-1].suits){
            case 'H': imgLink="resources/h.png"
                break;
            case 'D': imgLink="resources/d.png"
                break;
            case 'C': imgLink="resources/c.png"
                break;
            case 'S': imgLink="resources/s.png"
                break;
            }
            pcScore.innerHTML= scorePC;                                         // print the score in html
            //print the card body in html as div
            pcCards.innerHTML = pcCards.innerHTML +'<div class="cards"> <h2>'+ pcHand[pcHand.length-1].value + '</h2> <img src="'+ imgLink + '" alt="' + pcHand[pcHand.length-1].suits + '" width="35" height="35"> </div>';
    }
    //creating deck 4*13 cards with multiple classes
    function createDeck() {
        let suits = ['H', 'C', 'D', 'S'];
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        let deck = [];
        for (let suitCounter = 0; suitCounter < 4; suitCounter++) {
            for (let rankCounter = 0; rankCounter < 13; rankCounter++) {
                let weight = parseInt(ranks[rankCounter]);
                weight = isNaN(weight) ? 10 : weight;
                weight = ranks[rankCounter]==='A' ? 11 : weight;
                let card = {value:ranks[rankCounter], suits:suits[suitCounter], weight: weight}
                deck.push(card);
            }
        }
        return deck;
    }
    //random schuffle
    function schuffleDeck(deck) {
        for (let i = 0; i < 52; i++) {
            let tempCard = deck[i];
            let randindex = Math.floor(Math.random() * 52);
            deck[i] = deck[randindex];
            deck[randindex] = tempCard;
        }
    }
    // start game buttons function,
    // prepares the deck, and gives each player 2 cards, then the start button disappears, and the 2 reaction buttons appear for the game
    function startGame() {
        scorePlayer = 0;
        scorePC = 0;
        playerHand = [];
        pcHand = [];
        heading.innerHTML = "...";
        playingDeck = createDeck();
        schuffleDeck(playingDeck);


        pCards.innerHTML = "";
        pcCards.innerHTML= "";
        for (i = 0; i < 4; i++){
            if (i % 2 === 0){
                  givePlayerCard();
            }else{
                giveComputerCard();
            }
        }
        playingButtons.style.display= "table-row";
        buttons.style.display= "none";
        fastBlackJack();
    }
    function youWon(){
        heading.innerHTML = "You won!";
        buttons.style.display= "table-row";
        playingButtons.style.display= "none";
    }
    function youLost(){
        heading.innerHTML = "You lost";
        buttons.style.display= "table-row";
        playingButtons.style.display= "none";
    }
    function Push(){
        heading.innerHTML = "Push";
        buttons.style.display= "table-row";
        playingButtons.style.display= "none";
    }
    function blackJack(){
        heading.innerHTML = "Blackjack";
        buttons.style.display= "table-row";
        playingButtons.style.display= "none";
    }
    function fastBlackJack() {
        if (scorePC === 21) {
            if (scorePlayer === scorePC) {
                Push();
            } else {
                blackJack();
                setTimeout(youLost, 3000);
            }
        }
            if (scorePlayer === 21) {
                blackJack();
                setTimeout(youWon, 3000);

            }


    }
   // adds additional card to players hand, and to computers hand if its score is not more than 15, possible outcomes
   function getCard() {
       givePlayerCard();
       if (scorePC < 16) {
           giveComputerCard();
       }
        fastBlackJack();
       if (scorePlayer > 21) {
           youLost()
       } else if (scorePC > 21) {
           youWon()
       }
   }


    // player won't pull more cards, computer only if its score is lower then players
    function Stall(){
        if (scorePlayer > scorePC ) {
            giveComputerCard();
            Stall();
        }else{
            evaluate();
        }

    }

     // checking for outcomes
    function evaluate(){
        if (scorePlayer === scorePC) {
            Push();
        }else if (scorePlayer > 21 ){
            youLost()
        } else if (scorePC > 21 ){
            youWon ();
        } else if (scorePC === 21 ){
            blackJack();
            setTimeout(youLost, 3000);
        }else if (scorePlayer === 21){
            blackJack();
            setTimeout(youWon, 3000);

        }else if (scorePC < scorePlayer ){
            youWon();
        }else {
            youLost()
        }

    }

    // button eventlisteners
    const play = document.getElementById('start')
    const gimme = document.getElementById('newcard')
    const stall = document.getElementById('stall')
    play.addEventListener("click", ev => {
        startGame();
    });
    gimme.addEventListener("click", ev => {
        getCard();
  
    });
    stall.addEventListener('click', ev =>{
    Stall();
    });
  //      console.log(myhand)
})();