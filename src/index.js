`use strict`;
import Sprite from "./sprite.js";
import collision_arr from "../assets/data/collision.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const MAP_SRC = "../assets/Pellet_Town.png";
const PLAYER_MAIN_SRC = "../assets/player_character";
const CONTAINER_WITDTH = 1024;
const CONTAINER_HEIGHT = 576;

const offSet ={
  x:-785,
  y:-650
}

canvas.width = CONTAINER_WITDTH;
canvas.height = CONTAINER_HEIGHT;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

const imageMap = new Image();
imageMap.src = MAP_SRC;

const playerImage = new Image();
playerImage.src = PLAYER_MAIN_SRC + "/playerDown.png";
console.log(playerImage);

// ********************

const collisionMap = [];
for (let i = 0; i < collision_arr.length; i += 70) {
  //  70 is the width of the given map which means there are 70 columns
  const startFrom = i;
  const upTo = i + 70;

  collisionMap.push(collision_arr.slice(startFrom, upTo));
}

class Boundary {
  /* 
  Requirement:
    Original picture boundaries width and height were 12px * 12px suqare
    Dues to reszing the original picutre 4 times large, the above dimensions also should be take as
    4 time mutliple of them. Therefore resize picutre get boundaries of 48px*48px
  */
  static resizedPixel = 48;
  static boundaryIdentifier = 1025;
  // static width;
  // static height;

  constructor({ position }) {
    this.position = position;
    this.width = Boundary.resizedPixel;
    this.height =Boundary.resizedPixel;
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  static isBoundary(val) {
    return this.boundaryIdentifier === val;
  }
}

const boundaries = [];
// const BOUNDARY_IDENIFIER_VALUE = 1025;
collisionMap.forEach((row, mapRowNum) =>
  row.forEach((item, mapColNum) => {
    if (Boundary.isBoundary(item)) {
      const boundry = {
        position: {
          x: mapColNum * Boundary.resizedPixel +offSet.x,
          y: mapRowNum * Boundary.resizedPixel+offSet.y,
        },
      };
      boundaries.push(new Boundary(boundry));
    }
  })
);
console.dir(collisionMap);
console.dir(boundaries);

// ********************

// imageMap.addEventListener("load", () => {
//   context.drawImage(imageMap, -785, -660);
//   // context.drawImage(player,450,350);
//   console.log(imageMap);
// });

const playerStart_X = CONTAINER_WITDTH * 0.5 - playerImage.width * 0.7 * 0.5;
const playerStart_Y = (CONTAINER_HEIGHT - playerImage.height) * 0.5;

// playerImage.addEventListener("load", () => {

// });

const keys = {
  w: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};
let lastKey = "";
const isLastKey = (keyVal) => {
  return lastKey === keyVal;
};
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      // console.log(event.key);
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "d":
      // console.log(event.key);
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "s":
      // console.log(event.key);
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "a":
      // console.log(event.key);
      keys.a.pressed = true;
      // console.log(keys.a.pressed);
      lastKey = "a";
      break;
  }
  // console.log(keys);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      // console.log(event.key);
      keys.w.pressed = false;
      break;
    case "d":
      // console.log(event.key);
      keys.d.pressed = false;
      break;
    case "s":
      // console.log(event.key);
      keys.s.pressed = false;
      break;
    case "a":
      // console.log(event.key);
      keys.a.pressed = false;
      // console.log(keys.a.pressed);
      break;
  }
  // console.log(keys);
});

// TODO: need to identify if its ok to pass context to sprite
//
const background = new Sprite(
  context,
  { x: offSet.x, y: offSet.y},
  undefined,
  imageMap
);
// console.log(context);

let y = 0;
(function animate() {
  window.requestAnimationFrame(animate);
  // y++;
  // context.drawImage(imageMap, -785, -650);
  background.draw();
  boundaries.forEach(boundary=>boundary.draw())
  context.drawImage(
    playerImage,
    0,
    0,
    playerImage.width * 0.25,
    playerImage.height,
    playerStart_X,
    playerStart_Y + 0.3,
    playerImage.width * 0.25,
    playerImage.height
  );
  // console.log(y)
  const movement = 3;
  if (keys.w.pressed && isLastKey("w")) {
    background.moveUp(movement);
  } else if (keys.d.pressed && isLastKey("d")) {
    background.moveRight(movement);
  } else if (keys.s.pressed && isLastKey("s")) {
    background.moveDown(movement);
  } else if (keys.a.pressed && isLastKey("a")) {
    background.moveLeft(movement);
  }
})();
