import './styles/main.scss';
import { Card, cardArray1 } from './card';

//Gaining access to the html elements
const cardContainer = document.querySelector<HTMLDivElement>(".card-container");
const buttonStart = document.querySelector<HTMLButtonElement>(".button");
const buttonBegin = document.querySelector<HTMLButtonElement>(".buttonB");
const buttonClear = document.querySelector<HTMLButtonElement>(".button--clear");
if (!cardContainer || !buttonBegin|| !buttonStart|| !buttonClear) {
  throw new Error("Issues with Selector");
};

const cards = document.querySelectorAll<HTMLDivElement>(".card");




//function that flips all cards
const flipCards = () => {
  cards.forEach(card => {
    card.classList.toggle("flip");
  })
}
//Function that renders the card content. for card[0] -> card--1
const renderCardContent = (cardArray: Card[]): any => {
  cards.forEach(card => {
    card.innerHTML = `<p>${cardArray[Number(card.innerText) - 1].chineseWord}</p><p>${cardArray[Number(card.innerText) - 1].englishMeaning}</p>`
  });
  console.log("here")
};
buttonStart.addEventListener("click", renderCardContent(cardArray1))

//Add event listener to the button
buttonBegin.addEventListener("click", flipCards);

//function to clear the content
const flipOver = () => {
  cards.forEach(card => {
    card.innerHTML = ""
  })
}
//Add event listener to the button
buttonClear.addEventListener("click", flipOver)


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
    setTimeout(isSame, 1500)
  }

}
const isSame = () => {
  if (firstCard === secondCard) {
    console.log("Match!");
    hasFlippedCard = false;
    firstValue.classList.add("complete");
    firstValue.removeEventListener("click", flipCard);
    secondValue.classList.add("complete");
    secondValue.removeEventListener("click", flipCard);
    return true
  } else if (firstCard !== secondCard){
    console.log("sorry");
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