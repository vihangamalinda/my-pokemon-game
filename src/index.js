const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const MAP_SRC = "../assets/Pellet_Town.png";
const CONTAINER_WITDTH= 1024;
const CONTAINER_HEIGHT= 576;

canvas.width = CONTAINER_WITDTH;
canvas.height = CONTAINER_HEIGHT;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

const imageMap = new Image();
imageMap.src = MAP_SRC;

addEventListener("load",()=>{
    context.drawImage(imageMap, -750, -500);
  console.log(imageMap);
    

})
// setTimeout(() => {
// }, 5000);

console.log(context);
