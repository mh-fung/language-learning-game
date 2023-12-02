import './styles/main.scss';
import { Card, cardArray1 } from './card';

//Gaining access to the html elements
const cardContainer = document.querySelector<HTMLDivElement>(".card-container");
const buttonStart = document.querySelector<HTMLButtonElement>(".button");
const buttonClear = document.querySelector<HTMLButtonElement>(".button--clear");
if (!cardContainer || !buttonStart|| !buttonClear) {
  throw new Error("Issues with Selector");
};

const cards = document.querySelectorAll<HTMLDivElement>(".card");


//Function that renders the card content. for card[0] -> card--1
const renderCardContent = (cardArray: Card[]): any => {
  cards.forEach(card => {
    card.innerHTML = `<p>${cardArray[Number(card.innerText) - 1].chineseWord}</p><p>${cardArray[Number(card.innerText) - 1].englishMeaning}</p>`
  });
  console.log("here")
};


//Add event listener to the button
buttonStart.addEventListener("click", renderCardContent(cardArray1));

//function to clear the content
const flipOver = () => {
  cards.forEach(card => {
    card.innerHTML = ""
  })
}
//Add event listener to the button
buttonClear.addEventListener("click", flipOver)