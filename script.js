// Step 1: Create a new div element and assign it to a variable called cardElement.
function createNewCard() {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');

  // Step 2: Write the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of cardElement.
  cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div>
  `;

  // Step 3: Return the cardElement.
  return cardElement;
}


function appendNewCard(parentElement) {
  // Step 1: Create a new card by calling createNewCard() and assign it to a variable named cardElement.
  const cardElement = createNewCard();

  // Step 2: Append the card element to the parentElement (making the card element a "child").
  parentElement.appendChild(cardElement);

  // Step 3: Return the card element.
  return cardElement;
}

function shuffleCardImageClasses() {
  // Step 1: Create a new array that contains two of each image class string in order (e.g. "image-1", "image-1", "image-2", "image-2"...).
  const cardClasses = [];
  for (let i = 1; i <= 6; i++) {
    cardClasses.push(`image-${i}`, `image-${i}`);
  }

  // Step 2: Use the _.shuffle function from the Underscore.js library to randomly shuffle the array.
  const shuffledClasses = _.shuffle(cardClasses);

  // Step 3: Return the shuffled array of class names.
  return shuffledClasses;
}

function createCards(parentElement, shuffledImageClasses) {
  // Step 1: Make an empty array to hold our card objects.
  const cardArray = [];

  // Step 2: Write a for loop that loops 12 times to create the 12 cards we need.
  for (let i = 0; i < 12; i++) {
    // Step 2(a): Use appendNewCard to create/append a new card and store the result in a variable.
    const cardElement = appendNewCard(parentElement);

    // Step 2(b): Add an image class to the new card element using shuffledImageClasses[i].
    cardElement.classList.add(shuffledImageClasses[i]);

    // Step 2(c): Append a new object to the card object array.
    cardArray.push({
      index: i,
      element: cardElement,
      imageClass: shuffledImageClasses[i]
    });
  }

  // Step 3: Return the array of 12 card objects.
  return cardArray;
}


function doCardsMatch(cardObject1, cardObject2) {
  // Step 1: Determine if two cards match.
  return cardObject1.imageClass === cardObject2.imageClass;
}


let counters = {};

function incrementCounter(counterName, parentElement) {
  // Step 1: If the 'counterName' property is not defined in the 'counters' object, initialize it with a value of 0.
  if (!counters.hasOwnProperty(counterName)) {
    counters[counterName] = 0;
  }

  // Step 2: Increment the counter for 'counterName'.
  counters[counterName]++;

  // Step 3: Change the HTML within 'parentElement' to display the new counter value.
  parentElement.innerText = counters[counterName];
}


let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  // Step 1: Use the 'incrementCounter' function to add one to the flip counter UI.
  const flipCounterElement = document.getElementById('flip-count');
  incrementCounter('flips', flipCounterElement);

  // Step 2: If 'lastCardFlipped' is null (this is the first card flipped), update 'lastCardFlipped' and return.
  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  // Step 3: If the cards don't match, remove the "flipped" class from each, reset 'lastCardFlipped' to null, and use a 'return' to exit the function.
if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    let tempLastCardFlipped = lastCardFlipped; 
    setTimeout(() => {
      if (tempLastCardFlipped !== null) {
        tempLastCardFlipped.element.classList.remove("flipped");
      }
      newlyFlippedCard.element.classList.remove("flipped");
      lastCardFlipped = null;
    }, 1000); // Delay for visual feedback
    return;
  }
  // ... (rest of the code) ...



  // Step 4: Now we have two matching cards. Increment the match counter and optionally add a "glow" effect to the matching cards.
  const matchCounterElement = document.getElementById("match-count");
  incrementCounter('matches', matchCounterElement); 
  lastCardFlipped.element.classList.add('glow');
  newlyFlippedCard.element.classList.add('glow');

  // Step 5: Play either the win audio or match audio based on whether the user has the number of matches needed to win.
  if (counters.matches === 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }

  // Step 6: Reset 'lastCardFlipped' to null.
  lastCardFlipped = null;
}

function resetGame() {
  // Step 1: Get the card container by its id and store it in a variable.
  const cardContainer = document.getElementById('card-container');

  // Step 2: Clear all the cards.
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  // Step 3: Get the HTML elements that display the flip and match counts and reset their inner text to 0.
  document.getElementById('flip-count').innerText = 0;
  document.getElementById('match-count').innerText = 0;

  // Step 4: Reassign the value of the `counters` dictionary to an empty object.
  counters = {};

  // Step 5: Set lastCardFlipped back to null.
  lastCardFlipped = null;

  // Step 6: Set up a new game.
  setUpGame();
}

// ⛔️ Set up the game. Do not edit below this line! ⛔
setUpGame();
