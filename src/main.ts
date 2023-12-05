import './styles/main.scss';
import { Card, cardArray1, cardArray2 } from './card';

//Gaining access to the html elements
const cardContainer = document.querySelector<HTMLDivElement>(".card-container");
const buttonStart = document.querySelector<HTMLButtonElement>(".button");
const buttonBegin = document.querySelector<HTMLButtonElement>(".buttonBegin");
if (!cardContainer || !buttonBegin|| !buttonStart) {
  throw new Error("Issues with Selector");
};

const cards = document.querySelectorAll<HTMLDivElement>(".card");


//Function that renders the card content
const renderCardContent = (cardArray: Card[]): any => {
  cardArray.forEach(card => {
    const index = cardArray.indexOf(card)
    cards[index].innerHTML = `<p>${cardArray[index].chineseWord}</p><p>${cardArray[index].englishMeaning}</p>`
  })
};
buttonStart.addEventListener("click", renderCardContent(cardArray1))

//function that flips all cards
const flipCards = () => {
  cards.forEach(card => {
    card.classList.toggle("flip");
  })
  buttonBegin.style.display = "none";
}
//Add event listener to the button
buttonBegin.addEventListener("click", flipCards);

//Game begins
let firstCard: string;
let firstValue: HTMLDivElement;
let secondCard: string;
let secondValue: HTMLDivElement;
let hasFlippedCard = false;

const flipCard = (event: Event) => {
  const target = event.currentTarget as HTMLDivElement;
  target.classList.toggle("flip");
  if (hasFlippedCard === false) {
    firstValue = target
    firstCard = target.innerHTML;
    hasFlippedCard = true;
  } else {
    secondValue = target;
    secondCard = target.innerHTML;
    setTimeout(isSame, 1000)
  }

}
const isSame = () => {
  if (firstCard === secondCard) {
    hasFlippedCard = false;
    firstValue.classList.add("complete");
    firstValue.removeEventListener("click", flipCard);
    secondValue.classList.add("complete");
    secondValue.removeEventListener("click", flipCard);
    return true
  } else if (firstCard !== secondCard){
    firstValue.classList.add("flip");
    firstCard = "";
    secondValue.classList.add("flip");
    secondCard = "";
    hasFlippedCard = false;
    return false
  }
}


cards.forEach(card => {
  card.addEventListener("click", flipCard);
})