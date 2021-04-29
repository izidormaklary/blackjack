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
    function givePlayerCard() {
        playerHand.push(playingDeck.pop());
        if(playerHand[playerHand.length-1].value === "A" && playerScore.innerHTML + playerHand[playerHand.length-1].weight > 21 ){
            playerHand[playerHand.length-1].weight = 1;
        }
        playerScore.innerHTML = parseInt(playerScore.innerHTML) + playerHand[playerHand.length-1].weight;
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
        pCards.innerHTML = pCards.innerHTML +'<div class="cards"> <h2>'+ playerHand[playerHand.length-1].value + '</h2> <img src="'+ imgLink + '" alt="' + playerHand[playerHand.length-1].suits + '" width="35" height="35"> </div>';
    }
    function giveComputerCard() {
        pcHand.push(playingDeck.pop());
        if(pcHand[pcHand.length-1].value === "A" && pcScore.innerHTML + pcHand[pcHand.length-1].weight > 21 ){
            pcHand[pcHand.length-1].weight = 1;
        }
        pcScore.innerHTML = parseInt(pcScore.innerHTML) + pcHand[pcHand.length-1].weight;
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
        playingDeck = createDeck();
        schuffleDeck(playingDeck);
        playerScore.innerHTML = 0;
        pcScore.innerHTML = 0;
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

   // get card
   function getCard(){
       givePlayerCard();
       if (pcScore.innerHTML < 16) {
           giveComputerCard();
       }
       if (playerScore.innerHTML)
       if (pcScore.innerHTML > 21){
           heading.innerHTML = "You won!";
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
    stall
  //      console.log(myhand)
})();