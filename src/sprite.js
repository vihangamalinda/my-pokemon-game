export default class Sprite {
  #position;
  #image;
  #frames;

  constructor(canvasContext, position, velocity, image, frames = { max: 1 }) {
    this.canvasContext = canvasContext;
    this.#position = position;
    this.#image = image;
    this.#frames = frames;
    addEventListener("load", () => this.#setSingelFrameProperites());
  }

  #setSingelFrameProperites() {
    this.singleFrameWidth = this.#image.width / this.#frames.max;
    this.singleFrameHeight = this.#image.height;
  }

  draw() {
    this.canvasContext.drawImage(
      this.#image,
      0,
      0,
      this.#image.width / this.#frames.max,
      this.#image.height,
      this.#position.x,
      this.#position.y,
      this.#image.width / this.#frames.max,
      this.#image.height
    );
  }

  getPosition() {
    return this.#position;
  }

  moveUp(value) {
    this.#position.y += value;
  }
  moveDown(value) {
    this.#position.y -= value;
  }
  moveLeft(value) {
    this.#position.x += value;
  }
  moveRight(value) {
    this.#position.x -= value;
  }
}
