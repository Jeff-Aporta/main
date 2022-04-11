let tetrimino

let reserva
let próximos = []

function setup() {
  contadorFPS()
  canvas = createCanvas(1, 1);
  canvas.style("z-index", "-1")
  css_canvas()
  GUI_init()
  reproducirFondo()
  for (let i = 0; i < 7; i++) {
    próximos.push(new Tetrimino())
  }
  posicionarPróximos()
  tetrimino = new Tetrimino()
  menu()
  css_canvas()
  teclado()
  drawingContext
    .font = "calibri";
  strokeJoin(ROUND);
}

let g

function pintarFondo() {
  if (!g) {
    g = createGraphics(1, 5)
  }
  g.push()
  colorMode(HSB,100)
  linearGradient(
    0,
    0,
    color(
      (frameCount / 15) % 100,
      80 + (frameCount/5)%20,
      100
    ).toString(),
    0,
    g.height,
    color(
      (frameCount / 15) % 100,
      100,
      20
    ).toString(),
    g.drawingContext
  )
  colorMode(RGB,255)
  g.noStroke()
  g.rect(
    0, 0,
    g.width, g.height
  )
  g.pop()
  image(g, 0, 0, width, height)
}

function fondoAnimado() {
  if (isMobile()) {
    return;
  }
  push()
  let r = 25
  let e = 9
  let b = 20
  translate(width / 2, height / 2)
  let t = 18 * 60 * 1000
  let k = 2 * PI * millis() / t
  rotate(k)
  fill(255, 30)
  noStroke()
  for (let j = 0; j < b; j++) {
    rotate(2 * PI / b + k)
    for (let i = 1; i <= e; i++) {
      circle(
        1.2 * r * i + 70,
        0,
        r
      )
    }
  }
  pop()
}

function draw() {
  visibilidad_tactil()
  pintarFondo()
  fondoAnimado()
  if (pausa) {
    push()
    textSize(80)
    textAlign(CENTER, CENTER)
    fill('white')
    stroke(0)
    strokeWeight(10)
    text("PAUSA 😴", width / 2, height / 2)
    pop()
    return
  }

  w = cols * tamC
  h = fils * tamF
  tx = (width - w) / 2
  ty = (height - h) / 2

  pintarTablero()
  tetrimino.dibujarEspectro()
  tetrimino.dibujar()
  dibujarPuntaje()
  if (reserva) {
    reserva.dibujar()
  }
  for (let b of brilloCaida) {
    b.dibujar()
  }
  for (let b of brilloFila) {
    b.dibujar()
  }
  for (let b of textoCentrado) {
    b.dibujar()
  }

  for (let t of próximos) {
    t.dibujar()
  }

  textSize(13)
  fill(0, 100)
  textAlign(LEFT, TOP)
  text("FPS " + FPS, 0, 0)
}