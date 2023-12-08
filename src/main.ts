import './styles/main.scss';
import {cardArrayLevel1, cardArrayLevel2, cardArrayLevel3 } from './card';

//Gain access to the html elements
const display = document.querySelector<HTMLElement>(".display-board");
const instruction = document.querySelector<HTMLElement>(".instruction");
const timer = document.querySelector<HTMLHeadingElement>(".timer");
const cardContainer = document.querySelector<HTMLDivElement>(".card-container");
const buttonContainer = document.querySelector<HTMLElement>(".buttons");

if (!display || !instruction || !timer || !cardContainer || !buttonContainer) {
  throw new Error("Issues with Selector");
};
const cards = document.querySelectorAll<HTMLDivElement>(".card");
const buttons = document.querySelectorAll<HTMLButtonElement>(".button");

//Function to reset the game
const reset = () => {
  instruction.style.display = "none";
  buttonContainer.style.display = "none";
  buttons.forEach(button => {
    button.style.display = "none";
  });
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


const renderCardContent = (event: Event) => {
  //reset to the beginning stage of the game
  reset();
  //set the timer and flip the cards
  setTimer();
  //add eventlistener to the each specific card after viewing
  addEventListenerToTheCardsAfterViewing();
  const target = event.currentTarget as HTMLButtonElement;
  switch (target.innerText) {
    case "Level 1.0":
      cardArrayLevel1.sort(() => {
        return 0.5 - Math.random();
      });
      cardArrayLevel1.forEach(card => {
        const index = cardArrayLevel1.indexOf(card);
        cards[index].innerHTML = `<p class="card__words">${cardArrayLevel1[index].tradChinese}</p><p>${cardArrayLevel1[index].englishMeaning}</p>`;
      });
      break;
    case "Level 1.1":
      cardArrayLevel1.sort(() => {
        return 0.5 - Math.random();
      });
      cardArrayLevel1.forEach(card => {
        if (card.hideEng == true) {
          const index = cardArrayLevel1.indexOf(card);
          cards[index].innerHTML = `<p class="card__words">${cardArrayLevel1[index].tradChinese}</p>`;
        } else {
          const index = cardArrayLevel1.indexOf(card);
          cards[index].innerHTML = `<p class="card__words">${cardArrayLevel1[index].tradChinese}</p><p class="card__words">${cardArrayLevel1[index].englishMeaning}</p>`;
        }
      });
      break;
    case "Level 1.2":
      cardArrayLevel1.sort(() => {
        return 0.5 - Math.random();
      });
      cardArrayLevel1.forEach(card => {
        const index = cardArrayLevel1.indexOf(card);
        cards[index].innerHTML = `<p class="card__words">${cardArrayLevel1[index].tradChinese}</p>`;
      });
      break;
    case "Level 2.0":
      cardArrayLevel2.sort(() => {
        return 0.5 - Math.random();
      });
      cardArrayLevel2.forEach(card => {
        const index = cardArrayLevel2.indexOf(card);
        cards[index].innerHTML = `<p class="card__words">${cardArrayLevel2[index].tradChinese}</p><p class="card__words">${cardArrayLevel2[index].englishMeaning}</p>`;
      });
      break;
    case "Level 2.1":
      cardArrayLevel2.sort(() => {
        return 0.5 - Math.random();
      });
      cardArrayLevel2.forEach(card => {
        if (card.hideEng == true) {
          const index = cardArrayLevel2.indexOf(card);
          cards[index].innerHTML = `<p class="card__words">${cardArrayLevel2[index].tradChinese}</p>`;
        } else {
          const index = cardArrayLevel2.indexOf(card);
          cards[index].innerHTML = `<p class="card__words">${cardArrayLevel2[index].tradChinese}</p><p class="card__words">${cardArrayLevel2[index].englishMeaning}</p>`;
        }
      });
      break;
    case "Level 2.2":
      cardArrayLevel2.sort(() => {
        return 0.5 - Math.random();
      });
      cardArrayLevel2.forEach(card => {
        const index = cardArrayLevel2.indexOf(card);
        cards[index].innerHTML = `<p class="card__words">${cardArrayLevel2[index].tradChinese}</p>`;
      });
      break
    case "Level 3.0":
      cardArrayLevel3.sort(() => {
        return 0.5 - Math.random();
      });
      cardArrayLevel3.forEach(card => {
        const index = cardArrayLevel3.indexOf(card);
        cards[index].innerHTML = `<p class="card__words">${cardArrayLevel3[index].tradChinese}</p><p class="card__words">${cardArrayLevel3[index].englishMeaning}</p>`;
      });
      break;
    case "Level 3.1":
      cardArrayLevel3.sort(() => {
        return 0.5 - Math.random();
      });
      cardArrayLevel3.forEach(card => {
        if (card.hideEng == true) {
          const index = cardArrayLevel3.indexOf(card);
          cards[index].innerHTML = `<p class="card__words">${cardArrayLevel3[index].tradChinese}</p>`;
        } else {
          const index = cardArrayLevel3.indexOf(card);
          cards[index].innerHTML = `<p class="card__words">${cardArrayLevel3[index].tradChinese}</p><p class="card__words">${cardArrayLevel3[index].englishMeaning}</p>`;
        }
      });
      break;
    default:
      cardArrayLevel3.sort(() => {
        return 0.5 - Math.random();
      });
      cardArrayLevel3.forEach(card => {
        const index = cardArrayLevel3.indexOf(card);
        cards[index].innerHTML = `<p class="card__words">${cardArrayLevel3[index].tradChinese}</p>`;
      });
  };
};

buttons.forEach(button => {
  button.addEventListener("click", renderCardContent);
});


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
  };
};
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
      buttons.forEach(button => {
        button.style.display = "flex";
      });
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
  };
};