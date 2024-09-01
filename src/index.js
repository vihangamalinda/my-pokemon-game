`use strict`;
import Sprite from "./sprite.js";
import collision_arr from "../assets/data/collision.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const MAP_SRC = "../assets/Pellet_Town.png";
const PLAYER_MAIN_SRC = "../assets/player_character";
const CONTAINER_WITDTH = 1024;
const CONTAINER_HEIGHT = 576;

const offSet = {
  x: -785,
  y: -650,
};

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
    this.height = Boundary.resizedPixel;
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveUp(val) {
    this.position.y += val;
  }

  moveDown(val) {
    this.position.y -= val;
  }

  moveRight(val) {
    this.position.x -= val;
  }

  moveLeft(val) {
    this.position.x += val;
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
          x: mapColNum * Boundary.resizedPixel + offSet.x,
          y: mapRowNum * Boundary.resizedPixel + offSet.y,
        },
      };
      boundaries.push(new Boundary(boundry));
    }
  })
);
console.dir(collisionMap);
console.dir(boundaries);

// ********************

const playerImageWidth = 192;
const playerImageHeight = 68;

const playerStart_X = CONTAINER_WITDTH * 0.5 - playerImageWidth * 0.7 * 0.5;
const playerStart_Y = (CONTAINER_HEIGHT - playerImageHeight) * 0.5;

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
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
  }
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
  { x: offSet.x, y: offSet.y },
  undefined,
  imageMap
);

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  },
});

const movables = [background, testBoundary];

const player = new Sprite(
  context,
  {
    x: playerStart_X,
    y: playerStart_Y,
  },
  0,
  playerImage,
  { max: 4 }
);

(function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  // boundaries.forEach(boundary=>boundary.draw());
  testBoundary.draw();
  player.draw();

  collisionByPlayerMovement({ rectangle1: player, rectangle2: testBoundary });

  const movement = 3;
  if (keys.w.pressed && isLastKey("w")) {
    movables.forEach((movableUnit) => movableUnit.moveUp(movement));
  } else if (keys.d.pressed && isLastKey("d")) {
    movables.forEach((movableUnit) => movableUnit.moveRight(movement));
  } else if (keys.s.pressed && isLastKey("s")) {
    movables.forEach((movableUnit) => movableUnit.moveDown(movement));
  } else if (keys.a.pressed && isLastKey("a")) {
    movables.forEach((movableUnit) => movableUnit.moveLeft(movement));
  }
})();

// Collision logic
function collisionByPlayerMovement({ rectangle1, rectangle2 }) {
  const isCollidedByMovingRight =
    rectangle1.getPosition().x + rectangle1.singleFrameWidth >=
    rectangle2.position.x;
  const isCollidedByMovingDown =
    rectangle1.getPosition().y + rectangle1.singleFrameHeight >=
    rectangle2.position.y;
  const isCollidedByMovingLeft =
    rectangle1.getPosition().x <=
    rectangle2.position.x + rectangle1.singleFrameWidth;
  const isCollidedByMovingUp =
    rectangle1.getPosition().y <=
    rectangle2.position.y + rectangle1.singleFrameWidth;

  const isCollidedByXMovement =
    isCollidedByMovingRight && isCollidedByMovingLeft;
  const isCollidedByYMovement = isCollidedByMovingDown && isCollidedByMovingUp;
  if (isCollidedByXMovement && isCollidedByYMovement) {
    console.log("colliding");
  }
}
