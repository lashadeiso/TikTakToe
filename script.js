const newStart = document.querySelector(".new-start ");
const gameDisplay = document.querySelector(".game-display");
const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");
let allBoxes;
let itemArr = [];
let winner = false;

function boxItem() {
  let boxElement = document.createElement("li");
  boxElement.setAttribute("class", "box");
  let p = document.createElement("p");
  boxElement.appendChild(p);
  gameDisplay.appendChild(boxElement);
}
function generateBox() {
  [...Array(9)].map(() => {
    boxItem();
  });
}
generateBox();

function itemsChecker(index, num) {
  if (
    itemArr[index] != "" &&
    itemArr[index] === itemArr[index + num] &&
    itemArr[index] === itemArr[index + 2 * num]
  ) {
    winner = true;
    allBoxes[index].classList.add("winner-item");
    allBoxes[index + num].classList.add("winner-item");
    allBoxes[index + 2 * num].classList.add("winner-item");
  }
}

function winnerChecker() {
  allBoxes.forEach((item) => {
    itemArr.push(item.firstElementChild.innerHTML);
  });
  itemsChecker(0, 1);
  itemsChecker(3, 1);
  itemsChecker(6, 1);
  itemsChecker(0, 3);
  itemsChecker(1, 3);
  itemsChecker(2, 3);
  itemsChecker(0, 4);
  itemsChecker(2, 2);
  itemArr = [];

  if (winner) {
    if (leftSide.classList.contains("active")) {
      leftSide.classList.remove("active");
      rightSide.classList.add("winner-player");
    }
    if (rightSide.classList.contains("active")) {
      rightSide.classList.remove("active");
      leftSide.classList.add("winner-player");
    }
  }
}
function itemSymbol(clName, symbol, item) {
  if (
    !winner &&
    clName.classList.contains("active") &&
    item.firstElementChild.innerHTML != "X" &&
    item.firstElementChild.innerHTML != "O"
  ) {
    item.firstElementChild.innerHTML = symbol;
    leftSide.classList.toggle("active");
    rightSide.classList.toggle("active");
  }
}
function insertSymbol() {
  allBoxes = document.querySelectorAll(".box");
  allBoxes.forEach((item) => {
    item.addEventListener("click", () => {
      itemSymbol(leftSide, "X", item);
      itemSymbol(rightSide, "O", item);
      winnerChecker();
    });
  });
}

newStart.addEventListener("click", () => {
  winner = false;
  insertSymbol();
  rightSide.classList.remove("winner-player");
  leftSide.classList.remove("winner-player");
  rightSide.classList.contains("active") &&
    rightSide.classList.remove("active");
  leftSide.classList.add("active");
  allBoxes.forEach((item) => {
    item.classList.remove("winner-item");
    item.firstElementChild.innerHTML = "";
  });
});
