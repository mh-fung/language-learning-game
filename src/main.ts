import './styles/main.scss';
import { Card, cardArray } from './card';

//Gaining access to the html elements
const cardContainer = document.querySelector<HTMLDivElement>(".card-container")
const buttonStart = document.querySelector<HTMLButtonElement>(".button");
if (!cardContainer || !buttonStart) {
  throw new Error("Issues with Selector");
}

//Function that renders the card content. 
const renderCardContent = (cardArray: Card[]): any => {
  cardArray.forEach(card => {
    cardContainer.innerHTML += `<div class="card">${card.chineseWord}, ${card.englishMeaning}</div>`
  });
};

//Add event listener to the button
buttonStart.addEventListener("click", renderCardContent(cardArray));