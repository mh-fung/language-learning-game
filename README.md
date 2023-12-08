# Traditional Chinese Learning Game
This is a browser based game using HTML, CSS/SCSS and TypeScript and more.

This game is a memory card flipping game but instead of pictures, traditional chinese characters are used. The player will have to pick two cards at a time and if they don't match, the cards will be flipped back.

## Code Snippet
This the core function that flips the card when the card is clicked. 

```const flipCard = (event: Event) => {
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
```
