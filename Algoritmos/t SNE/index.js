let colores = [];

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 500; i++) {
    colores.push(color(random(255), random(255), random(255)));
  }

  let matrizColores = colores.map((c) => [red(c), green(c), blue(c)]);

  let model = new TSNE({
    dim: 2,
    perplexity: 15.0,
    earlyExaggeration: 4.0,
    learningRate: 100.0,
    nIter: 100,
    metric: "euclidean",
  });

  model.init({
    data: matrizColores,
    type: "dense",
  });

  let [error, iter] = model.run();

  representación2Dcolores = model.getOutputScaled();

  for (let i = 0; i < colores.length; i++) {
    p = representación2Dcolores[i];
    colores[i].x = map(p[0], -1, 1, 0, width);
    colores[i].y = map(p[1], -1, 1, 0, height);
    colores[i].r = 10;
  }
}

function draw() {
  background("lightgray");
  for (let i = 0; i < colores.length; i++) {
    c = colores[i];
    fill(c);
    circle(c.x, c.y, c.r*2);
  }
  forceManyCircles(colores);
}
