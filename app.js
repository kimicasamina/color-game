const diceBox = document.querySelector(".dice-box");
const rollBtn = document.querySelector(".roll-btn");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const colors = document.querySelectorAll(".color");
const dices = document.querySelectorAll(".dice");
let playersMoneyStr = document.querySelector(".money");
let statusStr = document.querySelector(".status");
let playersMoney = 1000;
let playersColor;
let betAmount = 0;
// listens for inputs on the form event
// when the player submit a bet
// decrease players money by the amount of bet
// wait for color events
// then take players color
// then wait when the player roll the dice
// generate dice colors
// check if playersCOlors matches the dice color
// if theres a match, increase the players money by the amount of their bet
//

form.addEventListener("submit", getBetAmount);

function getBetAmount(e) {
  e.preventDefault();
  if (isNaN(parseInt(input.value))) {
    console.log("please enter a valid number...");
  } else {
    betAmount = parseInt(input.value);
    playersMoney -= betAmount;
    playersMoneyStr.innerText = playersMoney;
    console.log("players money: ", playersMoneyStr.innerText);
    console.log("players remaining money: ", playersMoney);
  }

  // wait for players to bet on a color
  getPlayersColor();

  // roll dice
  rollBtn.addEventListener("click", rollDice);
}

function getPlayersColor() {
  colors.forEach((color) => {
    color.addEventListener("click", (e) => {
      playersColor = e.target.getAttribute("value");
      console.log("players color:", playersColor);
      // update status
      statusStr.innerText = `Players bet ${betAmount} on color ${playersColor}`;
    });
  });
}

function checkIfPlayerWon() {
  dices.forEach((dice) => {
    if (dice.style.backgroundColor == playersColor) {
      console.log("bet amount is ", betAmount);
      console.log("players color: ", playersColor);
      console.log("dice color: ", dice.style.backgroundColor);
      // if won, increment money
      playersMoney += betAmount * 2;
      playersMoneyStr.innerText = playersMoney;
    } else {
      // if lose, decrement money
      console.log(playersColor, "Players lose!");
      // playersMoney -= betAmount;
      playersMoneyStr.innerText = playersMoney;
    }
  });
}

function rollDice() {
  dices.forEach((dice) => {
    let color = generateRandomColor();
    dice.style.backgroundColor = `${color}`;
    dice.style.display = "flex";
    console.log("dice color: ", dice.style.backgroundColor);
  });
  checkIfPlayerWon();
}

function generateRandomColor() {
  const randNum = Math.floor(Math.random() * 6) + 1;
  let randColor = "";
  switch (randNum) {
    case 1:
      randColor = "blue";
      break;

    case 2:
      randColor = "red";
      break;

    case 3:
      randColor = "green";
      break;

    case 4:
      randColor = "yellow";
      break;

    case 5:
      randColor = "white";
      break;

    case 6:
      randColor = "pink";
      break;
  }

  return randColor;
}
