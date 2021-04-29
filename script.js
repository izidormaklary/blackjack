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

    function givePlayerCard() {
        playerHand.push(playingDeck.pop());
        if(playerHand[playerHand.length-1].value === "A" && scorePlayer + playerHand[playerHand.length-1].weight > 21 ){
            playerHand[playerHand.length-1].weight = 1;
        }
        scorePlayer = scorePlayer + playerHand[playerHand.length-1].weight;
        let imgLink;
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
        playerScore.innerHTML = scorePlayer;
        pCards.innerHTML = pCards.innerHTML +'<div class="cards"> <h2>'+ playerHand[playerHand.length-1].value + '</h2> <img src="'+ imgLink + '" alt="' + playerHand[playerHand.length-1].suits + '" width="35" height="35"> </div>';
    }
    function giveComputerCard() {
        pcHand.push(playingDeck.pop());
        if(pcHand[pcHand.length-1].value === "A" && scorePC + pcHand[pcHand.length-1].weight > 21 ){
            pcHand[pcHand.length-1].weight = 1;
        }
        scorePC = scorePC + pcHand[pcHand.length-1].weight;
        let imgLink;
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
            pcScore.innerHTML= scorePC;
            pcCards.innerHTML = pcCards.innerHTML +'<div class="cards"> <h2>'+ pcHand[pcHand.length-1].value + '</h2> <img src="'+ imgLink + '" alt="' + pcHand[pcHand.length-1].suits + '" width="35" height="35"> </div>';
    }
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
    function schuffleDeck(deck) {
        for (let i = 0; i < 52; i++) {
            let tempCard = deck[i];
            let randindex = Math.floor(Math.random() * 52);
            deck[i] = deck[randindex];
            deck[randindex] = tempCard;
        }
    }
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
      //  buttons.innerHTML= '<td>\n' +
      //      '                   <button type="button" id="newcard" >get card</button>\n' +
      //      '               </td>\n' +
      //      '               <td>\n' +
      //      '                   <button type="button" id="stall">stall</button>\n' +
      //      '               </td>';
        playingButtons.style.display= "table-row";
        buttons.style.display= "none";



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
        heading.innerHTML = "Blackjack for you";
        buttons.style.display= "table-row";
        playingButtons.style.display= "none";
    }



   // get card
   function getCard(){
       givePlayerCard();
       if (scorePC < 16) {
           giveComputerCard();
       }
       if (scorePC === 21 || scorePlayer > 21){
           youLost();
       }else if (scorePlayer === 21 || scorePC > 21){
           youWon();
       }
    }


    function Stall(){
        if (scorePlayer > scorePC ) {
            giveComputerCard();
            Stall();
        }else{
            evaluate();
        }
    }


    function evaluate(){
        if (scorePlayer === scorePC) {
            Push();

        }else if (scorePlayer > 21 ){
            youLost()
        } else if (scorePC > 21 ){
            youWon ();
        } else if (scorePC === 21 ){
            youLost();
        }else if (scorePlayer === 21){
            youWon();
        }

    }


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