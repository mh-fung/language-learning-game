import './styles/main.scss';
import { Card, cardArray1, cardArray2 } from './card';

//Gaining access to the html elements
const display = document.querySelector<HTMLElement>("#display-board")
const cardContainer = document.querySelector<HTMLDivElement>(".card-container");
const buttonStart = document.querySelector<HTMLButtonElement>(".button");
if (!display||!cardContainer || !buttonStart) {
  throw new Error("Issues with Selector");
};

const cards = document.querySelectorAll<HTMLDivElement>(".card");


//Function that renders the card content
const renderCardContent = () => {
  cards.forEach(card => {
    card.classList.remove("complete");
    card.addEventListener("click", flipCard)
  })
  numberOfCompletedPairs = 0
  display.innerText = `completed: ${numberOfCompletedPairs}/6`
  cardArray1.forEach(card => {
    const index = cardArray1.indexOf(card);
    cards[index].innerHTML = `<p>${cardArray1[index].chineseWord}</p><p>${cardArray1[index].englishMeaning}</p>`;
  })
  setTimeout(flipCards, 3000)
};
buttonStart.addEventListener("click", renderCardContent)

//function that flips all cards
const flipCards = () => {
  cards.forEach(card => {
    card.classList.toggle("flip");
  })
  buttonStart.style.display = "none";
}

//Game begins
let firstCard: string;
let firstValue: HTMLDivElement;
let secondCard: string;
let secondValue: HTMLDivElement;
let hasFlippedCard: boolean = false;
let numberOfCompletedPairs: number = 0;

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
    numberOfCompletedPairs += 1
    display.innerText = `completed: ${numberOfCompletedPairs}/6`
    if (numberOfCompletedPairs == 6) {
      //Game completed, should return to the beginning stage
      buttonStart.style.display = "unset";
      console.log("WOOOOHOOOOO")
    }
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