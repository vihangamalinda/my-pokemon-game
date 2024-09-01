export default class Sprite {
  #position;
  #image;
  constructor(canvasContext, position, velocity, image) {
    this.canvasContext = canvasContext;
    this.#position = position;
    this.#image = image;
  }

  draw() {
    this.canvasContext.drawImage(this.#image, this.#position.x, this.#position.y);
  }

  moveUp(value) {
    this.#position.y+=value;
  }
  moveDown(value) {
    this.#position.y-=value;
  }
  moveLeft(value) {
    this.#position.x+=value;
  }
  moveRight(value) {
    this.#position.x-=value;
  }
}
