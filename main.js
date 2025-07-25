const cardBoard = document.querySelector("#cardboard");  //Esse cardBoard vai no documento capturar o id cardBoad//
var botao = document.querySelector("button");
let totalAcertos = 0;
const imgs = [                                          //Criar uma const com as imagens, que tem um array e os nomes da imagem//
    "barcelona.svg",
    "chelsea-logo.svg",
    "psg-paris-saint-germain.svg",
    "real-madrid-c-f.svg",
    "manchester-city.svg",
    "napoli.svg",
];

let cardHTML = "";                       //Vai servir pra criar o nosso HTML com as imagens//

imgs.forEach(img => {                  //Pra criar o nosso HTML, uso forEach que vai trazer o img, esse forEach vai somar o cardHTML//
    cardHTML += `<div class="memory-card" data-card="${img}">
    <img class="front-face" src="img/${img}"/>
    <img class="back-face" src="img/uefa-champions-league.svg">
  </div>
  `;
});                                      //Coloquei uma div e 2 tipos de imagem,na primeira coloquei direcionando pra pasta img e utilizei o nome que vai vim as imagens//
                                        //A cada interacao ele vai buscar uma img daquela e abaixo com padrao com a imagem do js-badge//

 cardBoard.innerHTML = cardHTML + cardHTML;      //O cardboard vai receber o cardHTML somando com mais uma secao de cardHTML//   

 const cards = document.querySelectorAll(".memory-card");       //Pra pegar todos os meus memory-card , eu vou fazer um card//

 let firstCard, secondCard;                                   //Que vai ser a primeira e segunda carta a serem reveladas//
 let lockCards = false;                                      //Eu vou bloquear as cartas pra nao clicar em varias cartas//
  
 function FlipCard() {                               //A funcao de flipCard vai fazer a carta girar com intuito de mostrar a parte de tras dela//
   if(lockCards) return false;                      //Ele vai verificar se isso que ja esta true,se ja estiver ele nao vai permitir fazer um flip//
  this.classList.add("flip");                      //Pego esse this e ir na lista de classes dele e fazer uma rotacao nessa carta//

    if(!firstCard) {                             //Se a primeira carta ja foi preenchida,se ela for indefinida,ela define pelo this e retorne false pra sair da funcao//
      firstCard = this;

      return false;
    }

    secondCard = this;                          //A segunda carta//

    checkForMatch();
 }

 function checkForMatch(){
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;   //Verifico se a primeira carta e igual a segunda carta//

    totalAcertos += 1;
   
    !isMatch ? unFlipCards() : resetCards(isMatch);                   //Se o isMatch for false eu vou desabilitar a carta, e reseta essa variavel//
  }
 
 botao.addEventListener ('click', function() {
  window.location.reload();
  });

 function unFlipCards(){
  lockCards = true;                                  //Enquanto ele tiver verificando vai estar trancando as cartas//
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");    //Ele vai esperar 1 segundo e vai remover as cartas//
 
   resetCards();                         //Ele vai pegar esse valor null e armazenar dentro das suas variaveis//              
 }, 1000);
}

(function shuffle() {
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 12);    //Isso aqui embaralha as cartas novamente//
    card.style.order = rand;
  });
})();

function resetCards(isMatch = false) {      //Se essas cartas correspondem eu vou pegar meu first card e vou remover o evento de click//
  if (isMatch) {
    firstCard.removeEventListener("click", FlipCard);
    secondCard.removeEventListener("click", FlipCard);
  }
  
  if(totalAcertos === 12) {
    alert ("Parabens");
  }

  [firstCard, secondCard, lockCards] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", FlipCard));  //Para cada card percorrido eu escuto um evento de click e vai rodar uma funcao de flipCard//