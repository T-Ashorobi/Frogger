const gridCreator = document.querySelector(".grid");
const cellHolder = [];
const startButton = document
  .querySelector("#startButton")
  .addEventListener("click", (event) => {
    createAGrid();
  }); // [fix] a user can hit this button multiple time and recreate multiple grids.
let startGrass;
let startGrassArr;
let endPoint;
let frogPosition = 1;
const width = 12;

function createAGrid() {
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

  dangerRoad();

  // frogMove();
  // cellHolder[frogPosition].classList.add("frog");
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

//the reason i couldn't chain method this was because i was asking to add a classList to an array but thats not possible. I needed to iterate through the array and add my class.
// startGrass = document.querySelectorAll(".cell").slice(132, 144).classList.add("startZ"); <- this goes on line 13.

function frogMove(e) {
  // Why can i not start at "gridCreator?" = There's only one grid item. If i hard coded multiple div's then i could use "gridCreator".

  cellHolder[frogPosition].classList.add("frog");
  // const key = event.key;
  console.log(e);
  if (e.key === "ArrowLeft") {
    // cellHolder[frogPosition].classList.add("frog");
    frogPosition -= 1;
    console.log("arrow left");
  } else if (e.key === "ArrowUp") {
    frogPosition -= width;
    console.log("arrow top");
  } else if (e.key === "ArrowRight") {
    // cellHolder[frogPosition].classList.add("frog");
    frogPosition += 1;
    console.log("arrow right");
  } else if (e.key === "ArrowDown") {
    frogPosition += width;
    console.log("arrow down");
  }
  // cellHolder[frogPosition].classList.add("frog");

  cellHolder[frogPosition].classList.remove("frog");
}
document.addEventListener("keydown", frogMove);

// let movement = document.addEventListener("keydown", (event) => {
//   console.log(event);
// });
