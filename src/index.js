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

imageMap.addEventListener("load", () => {
  context.drawImage(imageMap, -785, -600);
  // context.drawImage(player,450,350);
  console.log(imageMap);
});

const playerStart_X = (CONTAINER_WITDTH * 0.5)- (playerImage.width*0.7) * 0.5;
const playerStart_Y = (CONTAINER_HEIGHT - playerImage.height) * 0.5;

playerImage.addEventListener("load", () => {
  context.drawImage(
    playerImage,
    0,
    0,
    playerImage.width * 0.25,
    playerImage.height,
    playerStart_X,
    playerStart_Y,
    playerImage.width * 0.25,
    playerImage.height
  );
});

console.log(context);
