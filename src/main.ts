import './styles/main.scss';
import {cardArrayLevel1, cardArrayLevel2, cardArrayLevel3 } from './card';

//Variables
let firstCardContent: string;
let firstCard: HTMLDivElement;
let secondCardContent: string;
let secondCard: HTMLDivElement;
let hasFlippedCard: boolean = false;
let numberOfCompletedPairs: number = 0;
let time = 15;

//Query Selectors
const display = document.querySelector<HTMLElement>(".score-board");
const instruction = document.querySelector<HTMLElement>(".instruction");
const timer = document.querySelector<HTMLHeadingElement>(".timer");
const cardContainer = document.querySelector<HTMLDivElement>(".card-container");
const buttonContainer = document.querySelector<HTMLElement>(".buttons");

if (!display || !instruction || !timer || !cardContainer || !buttonContainer) {
  throw new Error("Issues with Selector");
};
const cards = document.querySelectorAll<HTMLDivElement>(".card");
const buttons = document.querySelectorAll<HTMLButtonElement>(".button");

//Major functions
//Function that render the card content
const renderCardContent = (event: Event) => {
  //Initiate the game and reset variables (Find the details below in the function declaration section of startAndReset)
  startAndReset();
  //Set the timer and flip the cards (Find the details below in the function declaration section of setTimer)
  setTimer();
  //Add event listener to the each specific card after viewing (Find the details below in the function declaration section of addEventListenerToTheCardsAfterViewing)
  addEventListenerToTheCardsAfterViewing();
  //A switch statement that matches the chosen level (i.e. the buttons) with the corresponsing card arrays
  const target = event.currentTarget as HTMLButtonElement;
  switch (target.innerText) {
    case "Level 1.0":
      //.sort() method is used here to randomise the order of the array
      cardArrayLevel1.sort(() => {
        return 0.5 - Math.random();
      });
      //Get the card content of each card and put it into the html (i.e. both the traditional Chinese character and the english equivalent)
      cardArrayLevel1.forEach(card => {
        const index = cardArrayLevel1.indexOf(card);
        cards[index].innerHTML = `<p class="card__words">${cardArrayLevel1[index].tradChinese}</p><p>${cardArrayLevel1[index].englishMeaning}</p>`;
      });
      break;
    case "Level 1.1":
      cardArrayLevel1.sort(() => {
        return 0.5 - Math.random();
      });
      //Get the card content of each card and put it into the html, based on the coniditon (i.e. whether the english meaning should be hided or not)
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
      //Get the card content of each card and put it into the html (i.e. only the traditional Chinese character)
      cardArrayLevel1.forEach(card => {
        const index = cardArrayLevel1.indexOf(card);
        cards[index].innerHTML = `<p class="card__words">${cardArrayLevel1[index].tradChinese}</p>`;
      });
      break;
//Similar steps for other difficulty levels
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

//Function to start and reset the game
const startAndReset = () => {
  //Hide the instruction section and button section
  instruction.style.display = "none";
  buttonContainer.style.display = "none";
  buttons.forEach(button => {
    button.style.display = "none";
  });
  //Remove the class of "complete", reset variables when this is not the first attempt
  cards.forEach(card => {
    card.classList.remove("complete");
  });
  numberOfCompletedPairs = 0;
  display.innerText = `Completed: ${numberOfCompletedPairs}/6`;
};

//Function to set the timer and flip all the cards afterwards
const setTimer = () => {
  setTimeout(flipAllCards, 16000);
  const startTimer = setInterval(updateTimer, 1000);
  const stopTimer = () => {
    timer.innerText = "00:00";
    time = 15;
    clearInterval(startTimer);
  };
  setTimeout(stopTimer, 16000);
};

//Function of the timer
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

//Function that flips the card when it is clicked
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
    //A function that checks the pairs will be called after 0.5seconds, so that the player have the chance to see the cards picked are the same or not
    setTimeout(isSame, 500);
  };
};
//Function that checks whether the first card and the second card are the same or not
const isSame = () => {
  if (firstCardContent === secondCardContent) {
    hasFlippedCard = false;
    firstCard.classList.add("complete");
    secondCard.classList.add("complete");
    //The event listener of the cards are removed below after they are correctly picked, so that the player cannot reclick the cards
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    numberOfCompletedPairs += 1;
    display.innerText = `Completed: ${numberOfCompletedPairs}/6`;
    //Game completed when the number reaches 6
    if (numberOfCompletedPairs == 6) {
      //Difficulty level buttons appears
      buttonContainer.style.display = "flex";
      buttons.forEach(button => {
        button.style.display = "flex";
      });
    };
    return true
  } else if (firstCardContent !== secondCardContent) {
    //Reset the variables when the cards don't match with each other
    firstCard.classList.add("flip");
    firstCard.addEventListener("click", flipCard);
    firstCardContent = "";
    secondCard.classList.add("flip");
    secondCardContent = "";
    hasFlippedCard = false;
    return false
  };
};

//Function that adds eventlistener to the cards after viewing, so that nothing would be chnaged before the game starts
const addEventListenerToTheCardsAfterViewing = () => {
  const addEventListenerToTheCards = () => {
    cards.forEach(card => {
      card.addEventListener("click", flipCard);
    });
  };
  setTimeout(addEventListenerToTheCards, 16000);
};
//Add event listener to the buttons to render the card content
buttons.forEach(button => {
  button.addEventListener("click", renderCardContent);
});