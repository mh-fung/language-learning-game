import './styles/main.scss';
import { Card, cardArrayEasy, cardArrayIntermediate, cardArrayHard } from './card';

//Gain access to the html elements
const display = document.querySelector<HTMLElement>("#display-board");
const instruction = document.querySelector<HTMLElement>(".instruction");
const timer = document.querySelector<HTMLHeadingElement>(".timer");
const cardContainer = document.querySelector<HTMLDivElement>(".card-container");
const buttonContainer = document.querySelector<HTMLElement>(".buttons")
const buttonEasy = document.querySelector<HTMLButtonElement>(".button--easy");
const buttonInter = document.querySelector<HTMLButtonElement>(".button--inter");
const buttonHard = document.querySelector<HTMLButtonElement>(".button--hard");
if (!display || !instruction || !timer || !cardContainer || !buttonContainer|| !buttonEasy || !buttonInter || !buttonHard) {
  throw new Error("Issues with Selector");
};
const cards = document.querySelectorAll<HTMLDivElement>(".card");

//Function to reset the game
const reset = () => {
  instruction.style.display = "none";
  buttonContainer.style.display = "none";
  buttonEasy.style.display = "none";
  buttonInter.style.display = "none";
  buttonHard.style.display = "none";
  cards.forEach(card => {
    card.classList.remove("complete");
  })
  numberOfCompletedPairs = 0
  display.innerText = `Completed: ${numberOfCompletedPairs}/6`;
};

//Function for updating the timer
let time = 15;
const updateTimer = () => {
  if (time < 10) {
    timer.innerHTML = `00:0${time}`;
    time--;
  } else {
    timer.innerHTML = `00:${time}`;
    time--;
  };
};
//Function that flips all cards
const flipAllCards = () => {
  cards.forEach(card => {
    card.classList.toggle("flip");
  });
};
//Function to set the timer and flip all the cards
const setTimer = () => {
  setTimeout(flipAllCards, 16000);
  const startTimer = setInterval(updateTimer, 1000);
  const stopTimer = () => {
    timer.innerText = "00:00";
    time = 15;
    clearInterval(startTimer);
  };
  setTimeout(stopTimer, 16000);
}
//Function to add eventlistener to the cards after viewing, so that nothing would be chnaged before the game starts
const addEventListenerToTheCardsAfterViewing = () => {
  const addEventListenerToTheCards = () => {
    cards.forEach(card => {
      card.addEventListener("click", flipCard);
    });
  };
  setTimeout(addEventListenerToTheCards, 16000);
}
//Function that renders the card content for the easy level
const renderCardContentEasy = () => {
  //reset to the beginning stage of the game
  reset();
  //set the timer and flip the cards
  setTimer();
  //add eventlistener to the each specific card after viewing
  addEventListenerToTheCardsAfterViewing();
  //render the content for the easy level
  cardArrayEasy.forEach(card => {
    const index = cardArrayEasy.indexOf(card);
    cards[index].innerHTML = `<p class="card__words">${cardArrayEasy[index].chineseWord}</p><p>${cardArrayEasy[index].englishMeaning}</p>`;
  });
};
buttonEasy.addEventListener("click", renderCardContentEasy);

//Function that renders the card content for the intermediate level
const renderCardContentInter = () => {
  reset();
  setTimer();
  addEventListenerToTheCardsAfterViewing();
  //render the content for the intermediate level
  cardArrayIntermediate.forEach(card => {
    const index = cardArrayIntermediate.indexOf(card);
    cards[index].innerHTML = `<p class="card__words">${cardArrayIntermediate[index].chineseWord}</p><p>${cardArrayIntermediate[index].englishMeaning}</p>`;
  });
};
buttonInter.addEventListener("click", renderCardContentInter);

//Function that renders the card content for the hard level
const renderCardContentHard = () => {
  reset();
  setTimer();
  addEventListenerToTheCardsAfterViewing();
  //render the content for the hard level
  cardArrayHard.forEach(card => {
    const index = cardArrayHard.indexOf(card);
    cards[index].innerHTML = `<p class="card__words">${cardArrayHard[index].chineseWord}</p><p>${cardArrayHard[index].englishMeaning}</p>`;
  });
};
buttonHard.addEventListener("click", renderCardContentHard)


//Game begins
let firstCardContent: string;
let firstCard: HTMLDivElement;
let secondCardContent: string;
let secondCard: HTMLDivElement;
let hasFlippedCard: boolean = false;
let numberOfCompletedPairs: number = 0;

const flipCard = (event: Event) => {
  const target = event.currentTarget as HTMLDivElement;
  target.classList.toggle("flip");
  if (hasFlippedCard === false) {
    firstCard = target;
    firstCardContent = target.innerHTML;
    hasFlippedCard = true;
    firstCard.removeEventListener("click", flipCard);
  } else {
    secondCard = target;
    secondCardContent = target.innerHTML;
    setTimeout(isSame, 500);
  }
}
const isSame = () => {
  if (firstCardContent === secondCardContent) {
    hasFlippedCard = false;
    firstCard.classList.add("complete");
    firstCard.removeEventListener("click", flipCard);
    secondCard.classList.add("complete");
    secondCard.removeEventListener("click", flipCard);
    numberOfCompletedPairs += 1;
    display.innerText = `Completed: ${numberOfCompletedPairs}/6`;
    if (numberOfCompletedPairs == 6) {
      //Game completed, diff level button appears
      buttonContainer.style.display = "flex";
      buttonEasy.style.display = "flex";
      buttonInter.style.display = "flex";
      buttonHard.style.display = "flex";
    }
    return true
  } else if (firstCardContent !== secondCardContent) {
    firstCard.classList.add("flip");
    firstCard.addEventListener("click", flipCard);
    firstCardContent = "";
    secondCard.classList.add("flip");
    secondCardContent = "";
    hasFlippedCard = false;
    return false
  }
}
