let startGrass;
let startGrassArr;
let endPoint;
let frogPosition = 138;
const width = 12;
let car1Position = 12;
let car1_2Position = 12; //I want to add a setTimeout and it'll move at the same pace as car1;
let car1_3Position = 12;
let car1_4Position = 12;
let car1_5Position = 12;
let car2Position = 47;
let car2_2Position = 47;
let car2_3Position = 47;
let car2_4Position = 47;
let car3Position = 60;
let car3_2Position = 60;
let car3_3Position = 60;
let car4Position = 95;
let car4_2Position = 95;
let car5Position = 108;
const gridCreator = document.querySelector(".grid");
let cellHolder = [];
let car1Timer;
let car1_2Timer;
let car1_3Timer;
let car1_4Timer;
let car1_5Timer;
let car2Timer;
let car2_2Timer;
let car2_3Timer;
let car2_4Timer;
let car3Timer;
let car3_2Timer;
let car3_3Timer;
let car4Timer;
let car4_2Timer;
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

    car1Timer = setInterval(moveRight, 150); // this isn't regestering because its within a function. -> Its because it was set to a "const". Once it Hugo changed it to a "let" Im able to access transfer its value in all different scopes.
    setTimeout(() => {
      // moveRight1_2();
      setInterval(moveRight1_2, 150);
    }, 1000);

    setTimeout(() => {
      setInterval(moveRight1_3, 50);
    }, 2000); // have one of the cars move so fast but it'll be in a different color.

    setTimeout(() => {
      setInterval(moveRight1_4, 150);
    }, 3000);

    setTimeout(() => {
      setInterval(moveRight1_5, 30);
    }, 4000);

    car2Timer = setInterval(moveLeft1, 150);

    setTimeout(() => {
      setInterval(moveLeft1_2, 75);
    }, 1000);

    setTimeout(() => {
      setInterval(moveLeft1_3, 100);
    }, 2000);

    setTimeout(() => {
      setInterval(moveLeft1_4, 50);
    }, 3000);

    car3Timer = setInterval(moveRight3, 150);

    setTimeout(() => {
      setInterval(moveRight3_2, 50);
    }, 1000);

    setTimeout(() => {
      setInterval(moveRight3_3, 200);
    }, 2000);

    car4Timer = setInterval(moveLeft2, 100);

    setTimeout(() => {
      setInterval(moveLeft2_2, 75);
    }, 2000);

    car5Timer = setInterval(moveRight5, 100);
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
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar1_2(frogPosition)) {
    clearInterval(car1_2Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar1_3(frogPosition)) {
    clearInterval(car1_3Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar1_4(frogPosition)) {
    clearInterval(car1_4Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar1_5(frogPosition)) {
    clearInterval(car1_5Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar2(frogPosition)) {
    // console.log("hit");
    clearInterval(car2Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar2_2(frogPosition)) {
    clearInterval(car2_2Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar2_3(frogPosition)) {
    clearInterval(car2_3Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar2_4(frogPosition)) {
    clearInterval(car2_4Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar3(frogPosition)) {
    // console.log("hit");
    clearInterval(car3Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar3_2(frogPosition)) {
    // console.log("hit");
    clearInterval(car3_2Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar3_3(frogPosition)) {
    // console.log("hit");
    clearInterval(car3_3Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar4(frogPosition)) {
    // console.log("hit");
    clearInterval(car4Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar4_2(frogPosition)) {
    // console.log("hit");
    clearInterval(car4_2Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (thereIsCar5(frogPosition)) {
    // console.log("hit");
    clearInterval(car1Timer);
    window.alert("Putain de merde!. Tu es mort, please refresh the game.");
    hideFrog();
  } else if (cellHolder[frogPosition].classList.contains("ep")) {
    console.log(cellHolder[frogPosition]);
    setTimeout(() => {
      window.alert("congrats you've made it safely to the other side");
    }, 200);
    hideFrog();
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
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}

/*----------car1_2---------------------- */

function car1_2Display(index1_2) {
  cellHolder[index1_2].classList.add("car1_2");
}

function hideCar1_2(index1_2) {
  cellHolder[index1_2].classList.remove("car1_2");
}

// setTimeout(hideCar1_2, 2000);

let maxGrid1_2 = car1_2Position + 12;

function moveRight1_2() {
  hideCar1_2(car1_2Position++);
  car1_2Display(car1_2Position);
  if (car1_2Position >= maxGrid1_2) {
    car1_2Display(car1_2Position);
    hideCar1_2(car1_2Position);
    car1_2Position = 11;
  }
  if (thereIsAFrog(car1_2Position)) {
    // console.log("hit");
    clearInterval(car1_2Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}

/*----------car1_2---------------------- */

/*----------car1_3---------------------- */

function car1_3Display(index1_3) {
  cellHolder[index1_3].classList.add("car1_3");
}

function hideCar1_3(index1_3) {
  cellHolder[index1_3].classList.remove("car1_3");
}

let maxGrid1_3 = car1_3Position + 12;

function moveRight1_3() {
  hideCar1_3(car1_3Position++);
  car1_3Display(car1_3Position);
  if (car1_3Position >= maxGrid1_3) {
    car1_3Display(car1_3Position);
    hideCar1_3(car1_3Position);
    car1_3Position = 11;
  }
  if (thereIsAFrog(car1_3Position)) {
    clearInterval(car1_3Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}

/*----------car1_3---------------------- */

/*----------car1_4---------------------- */

function car1_4Display(index1_4) {
  cellHolder[index1_4].classList.add("car1_4");
}

function hideCar1_4(index1_4) {
  cellHolder[index1_4].classList.remove("car1_4");
}

let maxGrid1_4 = car1_4Position + 12;

function moveRight1_4() {
  hideCar1_4(car1_4Position++);
  car1_4Display(car1_4Position);
  if (car1_4Position >= maxGrid1_4) {
    car1_4Display(car1_4Position);
    hideCar1_4(car1_4Position);
    car1_4Position = 11;
  }
  if (thereIsAFrog(car1_4Position)) {
    clearInterval(car1_4Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}
/*----------car1_4---------------------- */
/*----------car1_5---------------------- */

function car1_5Display(index1_5) {
  cellHolder[index1_5].classList.add("car1_5");
}

function hideCar1_5(index1_5) {
  cellHolder[index1_5].classList.remove("car1_5");
}

let maxGrid1_5 = car1_5Position + 12;

function moveRight1_5() {
  hideCar1_5(car1_5Position++);
  car1_5Display(car1_5Position);
  if (car1_5Position >= maxGrid1_5) {
    car1_5Display(car1_5Position);
    hideCar1_5(car1_5Position);
    car1_5Position = 11;
  }
  if (thereIsAFrog(car1_5Position)) {
    clearInterval(car1_5Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}

/*----------car1_5---------------------- */

/*----------car2---------------------- */

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
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}
/*----------car2---------------------- */

/*----------car2_2---------------------- */

function car2_2Display(index2_2) {
  cellHolder[index2_2].classList.add("car2_2");
}

function hideCar2_2(index2_2) {
  cellHolder[index2_2].classList.remove("car2_2");
}

let count2_2 = car2_2Position;
let maxGrid2_2 = car2_2Position - 10;

function moveLeft1_2() {
  if (car2_2Position < maxGrid2_2) {
    hideCar2_2(car2_2Position);
    car2_2Position = 47;
    // console.log("check");
    car2_2Display(car2_2Position);
    return;
  }
  hideCar2_2(car2_2Position);
  car2_2Display(--car2_2Position);
  if (thereIsAFrog(car2_2Position)) {
    // console.log("hit");
    clearInterval(car2_2Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}

/*----------car2_2---------------------- */

/*----------car2_3---------------------- */
function car2_3Display(index2_3) {
  cellHolder[index2_3].classList.add("car2_3");
}

function hideCar2_3(index2_3) {
  cellHolder[index2_3].classList.remove("car2_3");
}

let count2_3 = car2_3Position;
let maxGrid2_3 = car2_3Position - 10;

function moveLeft1_3() {
  if (car2_3Position < maxGrid2_3) {
    hideCar2_3(car2_3Position);
    car2_3Position = 47;
    // console.log("check");
    car2_3Display(car2_3Position);
    return;
  }
  hideCar2_3(car2_3Position);
  car2_3Display(--car2_3Position);
  if (thereIsAFrog(car2_3Position)) {
    // console.log("hit");
    clearInterval(car2_3Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}
/*----------car2_3---------------------- */

/*----------car2_4---------------------- */
function car2_4Display(index2_4) {
  cellHolder[index2_4].classList.add("car2_4");
}

function hideCar2_4(index2_4) {
  cellHolder[index2_4].classList.remove("car2_4");
}

let count2_4 = car2_4Position;
let maxGrid2_4 = car2_4Position - 10;

function moveLeft1_4() {
  if (car2_4Position < maxGrid2_4) {
    hideCar2_4(car2_4Position);
    car2_4Position = 47;
    // console.log("check");
    car2_4Display(car2_4Position);
    return;
  }
  hideCar2_4(car2_4Position);
  car2_4Display(--car2_4Position);
  if (thereIsAFrog(car2_4Position)) {
    // console.log("hit");
    clearInterval(car2_4Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}
/*----------car2_4---------------------- */

/*----------car3---------------------- */

function car3Display(index3) {
  cellHolder[index3].classList.add("car3");
}

function hideCar3(index3) {
  cellHolder[index3].classList.remove("car3");
}

let count3 = car3Position;
let maxGrid3 = car3Position + 10;

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
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}

/*----------car3---------------------- */

/*----------car3_2---------------------- */

function car3_2Display(index3_2) {
  cellHolder[index3_2].classList.add("car3_2");
}

function hideCar3_2(index3_2) {
  cellHolder[index3_2].classList.remove("car3_2");
}

let count3_2 = car3_2Position;
let maxGrid3_2 = car3_2Position + 10;

function moveRight3_2() {
  if (car3_2Position > maxGrid3_2) {
    hideCar3_2(car3_2Position);
    car3_2Position = 60;
    car3_2Display(car3_2Position);
    return;
  }
  hideCar3_2(car3_2Position);
  car3_2Display(++car3_2Position);
  if (thereIsAFrog(car3_2Position)) {
    // console.log("hit");
    clearInterval(car3_2Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}

/*----------car3_2---------------------- */

/*----------car3_3---------------------- */
function car3_3Display(index3_3) {
  cellHolder[index3_3].classList.add("car3_3");
}

function hideCar3_3(index3_3) {
  cellHolder[index3_3].classList.remove("car3_3");
}

let count3_3 = car3_3Position;
let maxGrid3_3 = car3_3Position + 10;

function moveRight3_3() {
  if (car3_3Position > maxGrid3_3) {
    hideCar3_3(car3_3Position);
    car3_3Position = 60;
    car3_3Display(car3_3Position);
    return;
  }
  hideCar3_3(car3_3Position);
  car3_3Display(++car3_3Position);
  if (thereIsAFrog(car3_3Position)) {
    // console.log("hit");
    clearInterval(car3_3Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}
/*----------car3_3---------------------- */

/*----------car4---------------------- */

function car4Display(index4) {
  cellHolder[index4].classList.add("car4");
}

function hideCar4(index4) {
  cellHolder[index4].classList.remove("car4");
}

let count4 = car4Position;
let maxGrid4 = car4Position - 10;

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
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}

/*----------car4---------------------- */

/*----------car4_2---------------------- */

function car4_2Display(index4_2) {
  cellHolder[index4_2].classList.add("car4_2");
}

function hideCar4_2(index4_2) {
  cellHolder[index4_2].classList.remove("car4_2");
}

let count4_2 = car4_2Position;
let maxGrid4_2 = car4_2Position - 10;

function moveLeft2_2() {
  if (car4_2Position < maxGrid4_2) {
    hideCar4_2(car4_2Position);
    car4_2Position = 95;
    // console.log("check");
    car4_2Display(car4_2Position);
    return;
  }
  hideCar4_2(car4_2Position);
  car4_2Display(--car4_2Position);
  if (thereIsAFrog(car4_2Position)) {
    // console.log("hit");
    clearInterval(car4_2Timer);
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}

/*----------car4_2---------------------- */
/*----------car5---------------------- */

function car5Display(index5) {
  cellHolder[index5].classList.add("car5");
}

function hideCar5(index5) {
  cellHolder[index5].classList.remove("car5");
  // console.log("test hide", index5);
}

let count5 = car5Position;
let maxGrid5 = car5Position + 10;

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
    window.alert("PUTAIN!!!!!!. You lost, please refresh the game.");
    hideFrog();
  }
}
/*----------car5---------------------- */

function thereIsAFrog(position) {
  return cellHolder[position].classList.contains("frog");
}

function thereIsCar1(position1) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position1].classList.contains("car1");
}
/*---------------------car1_2------------------------------*/

function thereIsCar1_2(position1_2) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position1_2].classList.contains("car1_2");
}

/*---------------------car1_2------------------------------*/

/*---------------------car1_3------------------------------*/

function thereIsCar1_3(position1_3) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position1_3].classList.contains("car1_3");
}

/*---------------------car1_3------------------------------*/

/*---------------------car1_4------------------------------*/
function thereIsCar1_4(position1_4) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position1_4].classList.contains("car1_4");
}

/*---------------------car1_4------------------------------*/

/*---------------------car1_5------------------------------*/

function thereIsCar1_5(position1_5) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position1_5].classList.contains("car1_5");
}

/*---------------------car1_5------------------------------*/

/*---------------------car2------------------------------*/

function thereIsCar2(position2) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position2].classList.contains("car2");
}
/*---------------------car2------------------------------*/

/*---------------------car2_2------------------------------*/
function thereIsCar2_2(position2_2) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position2_2].classList.contains("car2_2");
}
/*---------------------car2_2------------------------------*/

/*---------------------car2_3------------------------------*/
function thereIsCar2_3(position2_3) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position2_3].classList.contains("car2_3");
}
/*---------------------car2_3------------------------------*/

/*---------------------car2_4------------------------------*/
function thereIsCar2_4(position2_4) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position2_4].classList.contains("car2_4");
}
/*---------------------car2_4------------------------------*/

/*---------------------car3------------------------------*/

function thereIsCar3(position3) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position3].classList.contains("car3");
}
/*---------------------car3------------------------------*/

/*---------------------car3_2------------------------------*/
function thereIsCar3_2(position3_2) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position3_2].classList.contains("car3_2");
}
/*---------------------car3_2------------------------------*/

/*---------------------car3_3------------------------------*/
function thereIsCar3_3(position3_3) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position3_3].classList.contains("car3_3");
}
/*---------------------car3_3------------------------------*/
/*---------------------car4------------------------------- */

function thereIsCar4(position4) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position4].classList.contains("car4");
}
/*---------------------car4------------------------------- */

/*---------------------car4_2------------------------------- */

function thereIsCar4_2(position4_2) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position4_2].classList.contains("car4_2");
}

/*---------------------car4_2------------------------------- */

function thereIsCar5(position5) {
  // return cellHolder[position1].querySelectorAll("car");
  return cellHolder[position5].classList.contains("car5");
}

// function endGame() {
//   return window.alert("congrats you've made it safely to the other side");
// }

//I can also add this for the cars to see if there's a frog.

/* [fix bug-1: the reason why we were able to reproduce a grid again because there was not any way to reset it. We made this possible by reverting the "cellHolder" back to an empty array which meant there isnt any div's to work with then also we had to clear out the with all the div's that were attached and this was done with setting the innerHTML of gridCreator to an empty string.*/
