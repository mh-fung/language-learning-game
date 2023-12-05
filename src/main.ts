import './styles/main.scss';
import { Card, cardArrayEasy, cardArrayIntermediate, cardArrayHard } from './card';

//Gaining access to the html elements
const display = document.querySelector<HTMLElement>("#display-board")
const cardContainer = document.querySelector<HTMLDivElement>(".card-container");
const buttonEasy = document.querySelector<HTMLButtonElement>(".button--easy");
const buttonInter = document.querySelector<HTMLButtonElement>(".button--inter");
const buttonHard = document.querySelector<HTMLButtonElement>(".button--hard");
if (!display||!cardContainer || !buttonEasy|| !buttonInter|| !buttonHard) {
  throw new Error("Issues with Selector");
};

const cards = document.querySelectorAll<HTMLDivElement>(".card");
//Function that renders the card content for the easy level
const renderCardContentEasy = () => {
  cards.forEach(card => {
    card.classList.remove("complete");
    card.addEventListener("click", flipCard)
  })
  numberOfCompletedPairs = 0
  display.innerText = `completed: ${numberOfCompletedPairs}/6`
  cardArrayEasy.forEach(card => {
    const index = cardArrayEasy.indexOf(card);
    cards[index].innerHTML = `<p>${cardArrayEasy[index].chineseWord}</p><p>${cardArrayEasy[index].englishMeaning}</p>`;
  })
  setTimeout(flipCards, 3000)
};
buttonEasy.addEventListener("click", renderCardContentEasy)
//Function that renders the card content for the intermediate level
const renderCardContentInter = () => {
  cards.forEach(card => {
    card.classList.remove("complete");
    card.addEventListener("click", flipCard)
  })
  numberOfCompletedPairs = 0
  display.innerText = `completed: ${numberOfCompletedPairs}/6`
  cardArrayEasy.forEach(card => {
    const index = cardArrayEasy.indexOf(card);
    cards[index].innerHTML = `<p>${cardArrayIntermediate[index].chineseWord}</p><p>${cardArrayIntermediate[index].englishMeaning}</p>`;
  })
  setTimeout(flipCards, 3000)
};
buttonInter.addEventListener("click", renderCardContentInter)

//Function that renders the card content for the hard level
const renderCardContentHard = () => {
  cards.forEach(card => {
    card.classList.remove("complete");
    card.addEventListener("click", flipCard)
  })
  numberOfCompletedPairs = 0
  display.innerText = `completed: ${numberOfCompletedPairs}/6`
  cardArrayEasy.forEach(card => {
    const index = cardArrayEasy.indexOf(card);
    cards[index].innerHTML = `<p>${cardArrayHard[index].chineseWord}</p><p>${cardArrayHard[index].englishMeaning}</p>`;
  })
  setTimeout(flipCards, 3000)
};
buttonHard.addEventListener("click", renderCardContentHard)

//Function that flips all cards
const flipCards = () => {
  cards.forEach(card => {
    card.classList.toggle("flip");
  })
  buttonEasy.style.display = "none";
  buttonInter.style.display = "none";
  buttonHard.style.display = "none";
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
      buttonEasy.style.display = "unset";
      buttonInter.style.display = "unset";
      buttonHard.style.display = "unset";
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