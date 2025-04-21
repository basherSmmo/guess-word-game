let game = document.querySelector(".game");
let check = document.querySelector("input[value='Check Word']");
let hint = document.querySelector("input[class='hint']");
let result = document.getElementById("result");

// rules
let numberOfTries = 5;
let numberOfHints = 2;
let numberOfLetters = 6;

// the words
let word = [
  "Bucket",
  "Castle",
  "Driver",
  "Forest",
  "Garden",
  "Helmet",
  "Laptop",
  "Market",
  "Office",
  "Person",
  "Rocket",
  "Summer",
  "Tunnel",
  "Velvet",
  "Window",
  "Banana",
  "Orange",
  "Jumper",
  "Winter",
  "Summer",
  "Ticket",
  "Puzzle",
  "Hammer",
  "Bottle",
  "Window",
][(Math.random() * 3).toFixed(0)].toUpperCase();
console.log(word);

// Create try rows
for (let i = 0; i < numberOfTries; i++) {
  let row = document.createElement("div");
  row.setAttribute("class", "row");
  let div = document.createElement("div");
  div.append(document.createTextNode(`Try ${numberOfTries - i}`));
  row.append(div);
  for (let i = 1; i <= numberOfLetters; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.setAttribute("disabled", "");
    row.append(input);
  }
  game.prepend(row);
}
let rows = document.querySelectorAll(".row");
let inputs = document.querySelectorAll("input[type='text']");

let tryNumber = 0;
check.addEventListener("click", function () {
  let completeWord = 0;
  numberOfTries--;
  if (rows[tryNumber] != undefined) {
    Array.from(rows[tryNumber].children)
      .slice(1)
      .forEach((e, i) => {
        if (e.value === word[i]) {
          e.style.background = "#f09618";
          completeWord++;
        } else if (word.split("").includes(e.value)) {
          e.style.background = "#0ba78b";
        } else {
          e.style.background = "#272d41";
        }
      });
  }
  tryNumber++;
  disabledInputs();
  nextTry();
  if (completeWord === numberOfLetters || numberOfTries === 0) {
    let message;
    if (completeWord === numberOfLetters) {
      disabledInputs();
      message = "win";
    } else {
      message = "lose";
      result.style.color = "red";
      check.style.cursor = "no-drop";
    }
    let counter = 5;
    result.innerHTML = `You ${message} the word was <span>${word.toLowerCase()}</span> <span>${counter}</span>`;
    let couterTimer = setInterval(() => {
      result.innerHTML = `You ${message} the word was <span>${word.toLowerCase()}</span> <span >${--counter}</span>`;
      counter === 0 ? clearInterval(couterTimer) : null;
    }, 1000);
    setTimeout((_) => {
      window.location.reload();
    }, 5000);
  }
  console.log(numberOfTries);
});

function disabledInputs() {
  inputs.forEach((e) => e.setAttribute("disabled", ""));
}

function nextTry() {
  if (rows[tryNumber] != undefined) {
    Array.from(rows[tryNumber].children)
      .slice(1)
      .forEach((e) => {
        e.removeAttribute("disabled");
        e.addEventListener("keyup", function (event) {
          e.value = e.value.slice(0, 1).toUpperCase();
          if (e.value != "" && e.nextElementSibling != undefined) {
            e.nextElementSibling.focus();
          }
          if (event.code === "ArrowLeft") {
            e.previousElementSibling.focus();
          }
        });
      });
    rows[tryNumber].children[1].focus();
  }
}
nextTry();


hint.value = `${numberOfHints} Hints`;
let getChance = [...rows[tryNumber].children].slice(1).map((e, i) => (e = i));
hint.onclick = function () {
  if (rows[tryNumber] !== undefined && numberOfHints !== 0) {
    let workOnce = 0;
    let random = Math.trunc(Math.random() * getChance.length);
    Array.from(rows[tryNumber].children).forEach((e, i, ar) => {
      if (
        workOnce === 0 &&
        ar.slice(1)[getChance[random]].value != word[getChance[random]]
      ) {
        ar.slice(1)[getChance[random]].value = word[getChance[random]];
        workOnce++;
        getChance.splice(random, 1);
        numberOfHints--;
        hint.value = `${numberOfHints} Hints`;
      }
    });
    if (numberOfHints === 0) {
      hint.style.cursor = "no-drop";
      hint.setAttribute("disabled", "");
    }
  }
};
