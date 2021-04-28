(function(){
    let playerHand = [];
    let pcHand = [];
    let playingDeck = [];
    let playerScore = document.getElementById("pScore");
    const pcScore = document.getElementById("pcScore");
    const pCards = document.getElementById("pCards");
    const pcCards = document.getElementById("pcCards");
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
            var tempCard = deck[i];
            var randindex = Math.floor(Math.random() * 52);
            deck[i] = deck[randindex];
            deck[randindex] = tempCard;
        }
    }
    function startGame() {
        playingDeck = createDeck();
        schuffleDeck(playingDeck);
        playerScore.innerHTML = 0;
        pcScore.innerHTML = 0;
        for (i = 0; i < 4; i++){
            if (i % 2 === 0){
                playerHand.push(playingDeck.pop());
                playerScore.innerHTML = parseInt(playerScore.innerHTML) + playerHand[playerHand.length-1].weight;

                console.log(playerHand)
            }else{
                pcHand.push(playingDeck.pop());
                pcScore.innerHTML = parseInt(pcScore.innerHTML) + pcHand[pcHand.length-1].weight;


            }
        }




    }

   // get card
   function getCard(){
       playerHand.push(playingDeck.pop());
       playerScore.innerHTML =parseInt(playerScore.innerHTML) + playerHand[playerHand.length-1].weight;
       if (pcScore.innerHTML < 16) {
           pcHand.push(playingDeck.pop());
           pcScore.innerHTML = parseInt(pcScore.innerHTML) + pcHand[pcHand.length-1].weight;
       }
    }


    const play = document.getElementById('start')
    const gimme = document.getElementById('newcard')
    play.addEventListener("click", ev => {
        startGame();
  
    });
    gimme.addEventListener("click", ev => {
        getCard();
  
    })
  //      console.log(myhand)
})();