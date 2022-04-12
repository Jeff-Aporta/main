let circulos = [];

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 45; i++) {
    circulos.push(
      new Circulo(random(25, width - 25), random(25, height - 25), 50)
    );
  }
}

function draw() {
  background("lightgray");
  fill(255, 255, 255, 128);
  for (const circulo of circulos) {
    circulo.draw();
  }
  for (let i = 0; i < 10; i++) {
    forceManyCircles(circulos);
  }
  for (const circulo of circulos) {
    circulo.x = constrain(circulo.x, circulo.r, width - circulo.r);
    circulo.y = constrain(circulo.y, circulo.r, height - circulo.r);
  }
}

class Circulo {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  draw() {
    circle(this.x, this.y, this.r * 2);
  }

  distanceCenter(circulo) {
    return distanceEuclidean(this, circulo);
  }
}
