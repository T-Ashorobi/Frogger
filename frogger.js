let startGrass;
let startGrassArr;
let endPoint;
let frogPosition = 138;
const width = 12;
let car1Position = 12;
let car1_2Position = 12; //I want to add a setTimeout and it'll move at the same pace as car1;
let car2Position = 47;
let car3Position = 60;
let car4Position = 95;
let car5Position = 108;
const gridCreator = document.querySelector(".grid");
let cellHolder = [];
let car1Timer;
let car2Timer;
let car3Timer;
let car4Timer;
let car5Timer;
const startButton = document
  .querySelector("#startButton")
  .addEventListener("click", (event) => {
    createAGrid();
    // The displayFrog function is placed here because we want this to be one of the first thing that pop up.
    displayFrog();
    car1Display(car1Position);
    car2Display(car2Position);
    car3Display(car3Position);
    car4Display(car4Position);
    car5Display(car5Position);
    car1Timer = setInterval(moveRight, 200); // this isn't regestering because its within a function. -> Its because it was set to a "const". Once it Hugo changed it to a "let" Im able to access transfer its value in all different scopes.
    car2Timer = setInterval(moveLeft1, 300);
    car3Timer = setInterval(moveRight3, 600);
    car4Timer = setInterval(moveLeft2, 800);
    car5Timer = setInterval(moveRight5, 700);
  });
/* [bug-1] a user can hit this button multiple time and recreate multiple grids.
 */

function createAGrid() {
  cellHolder = [];
  frogPosition = 138;
  /* [fix bug-1: the reason why we were able to reproduce a grid again because there was not any way to reset it. We made this possible by reverting the "cellHolder" back to an empty array which meant there isnt any div's to work with then also we had to clear out the with all the div's that were attached and this was done with setting the innerHTML of gridCreator to an empty string.*/
  // console.log(gridCreator.innerHTML);
  //ill need this part explained to me again.
  gridCreator.innerHTML = "";

  for (let i = 0; i < 144; i++) {
    createACell();
  }
  //since im working within the DOM the cell's that i've created are not an array but are NODES. So i need to see how I can convert it.
  //   console.log(`array?:`, startGrass);
  startGrass = document.querySelectorAll(".cell");

  startGrassArr = Array.from(startGrass);
  startGrassArr.slice(120).forEach((cell) => cell.classList.add("sp"));

  endPoint = Array.from(document.querySelectorAll(".cell"))
    .slice(0, 12)
    .forEach((block) => block.classList.add("ep"));

  console.log(endPoint);

  dangerRoad();
}

function createACell() {
  const div = document.createElement("div");
  div.classList.add("cell");
  gridCreator.append(div);
  cellHolder.push(div);
  // console.log(cellHolder);
}

function dangerRoad() {
  //i could have probably called "cellHolder" because its an array already.
  const road1 = Array.from(document.querySelectorAll(".cell"))
    .slice(12, 24)
    .forEach((element) => element.classList.add("rd-1"));

  const road2 = Array.from(document.querySelectorAll(".cell"))
    .slice(36, 48)
    .forEach((element) => element.classList.add("rd-2"));

  const road3 = Array.from(document.querySelectorAll(".cell"))
    .slice(60, 72)
    .forEach((element) => element.classList.add("rd-3"));

  const road4 = Array.from(document.querySelectorAll(".cell"))
    .slice(84, 96)
    .forEach((element) => element.classList.add("rd-1"));

  const road5 = Array.from(document.querySelectorAll(".cell"))
    .slice(108, 120)
    .forEach((element) => element.classList.add("rd-5"));
}

//the reason i couldn't chain method this was because i was asking to add a classList to an array but thats not possible. I needed to iterate through the array and add my class to each element.

// startGrass = document.querySelectorAll(".cell").slice(132, 144).classList.add("startZ"); <- this goes on line 13.

function frogMove(e) {
  // Why can i not start at "gridCreator?" = There's only one grid item. If i hard coded multiple div's then i could use "gridCreator".

  hideFrog();

  if (e.key === "ArrowLeft" && frogPosition % width !== 0) {
    frogPosition -= 1;
    // % only gives you the remainder its not division.
  } else if (e.key === "ArrowUp" && frogPosition - width > 0) {
    frogPosition -= width;
  } else if (e.key === "ArrowRight" && frogPosition % 12 !== 11) {
    frogPosition += 1;
  } else if (e.key === "ArrowDown" && frogPosition + width < 144) {
    frogPosition += width;
  }

  if (thereIsCar1(frogPosition)) {
    // console.log("hit");
    clearInterval(car1Timer);
    window.alert(
      "You hopped into the path of a car. You lost, please refresh the game."
    );
  } else if (thereIsCar2(frogPosition)) {
    // console.log("hit");
    clearInterval(car2Timer);
    window.alert(
      "You hopped into the path of a car. You lost, please refresh the game."
    );
  } else if (thereIsCar3(frogPosition)) {
    // console.log("hit");
    clearInterval(car1Timer);
    window.alert(
      "You hopped into the path of a car. You lost, please refresh the game."
    );
  } else if (thereIsCar4(frogPosition)) {
    // console.log("hit");
    clearInterval(car1Timer);
    window.alert(
      "You hopped into the path of a car. You lost, please refresh the game."
    );
  } else if (thereIsCar5(frogPosition)) {
    // console.log("hit");
    clearInterval(car1Timer);
    window.alert(
      "You hopped into the path of a car. You lost, please refresh the game."
    );
  } else if (cellHolder[frogPosition].classList.contains("ep")) {
    console.log(cellHolder[frogPosition]);
    setTimeout(() => {
      window.alert("congrats you've made it safely to the other side");
    }, 200);
  }

  displayFrog();
}
console.log(endPoint);
//This is place outside so if a keypress is heard it'll react immediately.
document.addEventListener("keydown", frogMove);

function displayFrog() {
  cellHolder[frogPosition].classList.add("frog");
}

function hideFrog() {
  cellHolder[frogPosition].classList.remove("frog");
}
/*----------car display and movement section---------------------- */

function car1Display(index) {
  cellHolder[index].classList.add("car1");
}

function hideCar1(index) {
  cellHolder[index].classList.remove("car1");
}

let maxGrid = car1Position + 12;
// const car1Timer = setInterval(moveRight, 2000);

function moveRight() {
  hideCar1(car1Position++);
  car1Display(car1Position);
  if (car1Position >= maxGrid) {
    car1Display(car1Position);
    hideCar1(car1Position);
    car1Position = 11;
  }
  if (thereIsAFrog(car1Position)) {
    // console.log("hit");
    clearInterval(car1Timer);
    window.alert("A car ran over you. You lost, please refresh the game.");
  }
}

function car2Display(index2) {
  cellHolder[index2].classList.add("car2");
}

function hideCar2(index2) {
  cellHolder[index2].classList.remove("car2");
}

let count2 = car2Position;
let maxGrid2 = car2Position - 10;

function moveLeft1() {
  if (car2Position < maxGrid2) {
    hideCar2(car2Position);
    car2Position = 47;
    // console.log("check");
    car2Display(car2Position);
    return;
  }
  hideCar2(car2Position);
  car2Display(--car2Position);
  if (thereIsAFrog(car2Position)) {
    // console.log("hit");
    clearInterval(car2Timer);
    window.alert("A car ran over you. You lost, please refresh the game.");
  }
}

function car3Display(index3) {
  cellHolder[index3].classList.add("car3");
}

function hideCar3(index3) {
  cellHolder[index3].classList.remove("car3");
  // console.log("test hide", index3);
}

let count3 = car3Position;
let maxGrid3 = car3Position + 10;
// const car1Timer = setInterval(moveRight, 2000);

function moveRight3() {
  if (car3Position > maxGrid3) {
    hideCar3(car3Position);
    car3Position = 60;
    car3Display(car3Position);
    return;
  }
  hideCar3(car3Position);
  car3Display(++car3Position);
  if (thereIsAFrog(car3Position)) {
    // console.log("hit");
    clearInterval(car3Timer);
    window.alert("A car ran over you. You lost, please refresh the game.");
  }
}

function car4Display(index4) {
  cellHolder[index4].classList.add("car4");
}

function hideCar4(index4) {
  cellHolder[index4].classList.remove("car4");
}

let count4 = car4Position;
let maxGrid4 = car4Position - 10;
// const car1Timer = setInterval(moveRight, 2000);

function moveLeft2() {
  if (car4Position < maxGrid4) {
    hideCar4(car4Position);
    car4Position = 95;
    // console.log("check");
    car4Display(car4Position);
    return;
  }
  hideCar4(car4Position);
  car4Display(--car4Position);
  if (thereIsAFrog(car4Position)) {
    // console.log("hit");
    clearInterval(car4Timer);
    window.alert("A car ran over you. You lost, please refresh the game.");
  }
}

function car5Display(index5) {
  cellHolder[index5].classList.add("car5");
}

function hideCar5(index5) {
  cellHolder[index5].classList.remove("car5");
  // console.log("test hide", index5);
}

let count5 = car5Position;
let maxGrid5 = car5Position + 10;
// const car1Timer = setInterval(moveRight, 2000);

function moveRight5() {
  if (car5Position > maxGrid5) {
    hideCar5(car5Position);
    car5Position = 108;
    // console.log("check");
    car5Display(car5Position);
    return;
  }
  hideCar5(car5Position);
  car5Display(++car5Position);
  if (thereIsAFrog(car5Position)) {
    // console.log("hit");
    clearInterval(car5Timer);
    window.alert("A car ran over you. You lost, please refresh the game.");
  }
}

function thereIsAFrog(position) {
  return cellHolder[position].classList.contains("frog");
}

function thereIsCar1(position1) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position1].classList.contains("car1");
}

function thereIsCar2(position2) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position2].classList.contains("car2");
}

function thereIsCar3(position3) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position3].classList.contains("car3");
}

function thereIsCar4(position4) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position4].classList.contains("car4");
}

function thereIsCar5(position5) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position5].classList.contains("car5");
}

// function endGame() {
//   return window.alert("congrats you've made it safely to the other side");
// }

//I can also add this for the cars to see if there's a frog.

/* [fix bug-1: the reason why we were able to reproduce a grid again because there was not any way to reset it. We made this possible by reverting the "cellHolder" back to an empty array which meant there isnt any div's to work with then also we had to clear out the with all the div's that were attached and this was done with setting the innerHTML of gridCreator to an empty string.*/
