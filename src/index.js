import Sprite from "./sprite.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const MAP_SRC = "../assets/Pellet_Town.png";
const PLAYER_MAIN_SRC = "../assets/player_character";
const CONTAINER_WITDTH = 1024;
const CONTAINER_HEIGHT = 576;

canvas.width = CONTAINER_WITDTH;
canvas.height = CONTAINER_HEIGHT;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

const imageMap = new Image();
imageMap.src = MAP_SRC;

const playerImage = new Image();
playerImage.src = PLAYER_MAIN_SRC + "/playerDown.png";
console.log(playerImage);

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

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      // console.log(event.key);
      keys.w.pressed = true;
      break;
    case "d":
      // console.log(event.key);
      keys.d.pressed = true;
      break;
    case "s":
      // console.log(event.key);
      keys.s.pressed = true;
      break;
    case "a":
      // console.log(event.key);
      keys.a.pressed = true;
      // console.log(keys.a.pressed);
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
  { x: -785, y: -650 },
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
  context.drawImage(
    playerImage,
    0,
    0,
    playerImage.width * 0.25,
    playerImage.height,
    playerStart_X,
    playerStart_Y +   0.3,
    playerImage.width * 0.25,
    playerImage.height
  );
  // console.log(y)
  const movement = 3;
  if (keys.w.pressed) {
    background.moveUp(movement);
  } else if (keys.d.pressed) {
    background.moveRight(movement);
  } else if (keys.s.pressed) {
    background.moveDown(movement);
  } else if (keys.a.pressed) {
    background.moveLeft(movement);
  }
})();
