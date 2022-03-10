let pelota;
let raqueta;
let juego;
let btn_pausa;

let s //escala

function setup() {
  canvas = createCanvas(622, 350);
  css_canvas()
  noStroke()
  background(0);
  pelota = new Pelota()
  raqueta = new Raqueta()
  juego = new Juego()
  juego.nuevoJuego()
  btn_pausa = new Button(
    width - 40,
    0,
    40,
    40
  )
  btn_pausa.text = "⏸️"
  btn_pausa.drawArea = false
  btn_pausa.action = function() {
    if (millis() - pt > 1000) {
      if (PAUSA) {
        reanudar()
      } else {
        pausar()
      }
    }
    pt = millis()
  }
  window.addEventListener(
    'blur',
    pausar
  );
}



function draw() {
  calc_mxy()
  background(0, 20);
  if (INICIO) {
    dibujarInicio()
    return
  }
  dibujarElementosJuego()
  dibujarPausa()
  juego.dibujar()
}

function windowResized() {
  css_canvas()
}

function css_canvas() {
  let sx = windowWidth / width
  let sy = windowHeight / height
  s = min(sx, sy)
  
  canvas.position(
    (windowWidth - width) / 2,
    (windowHeight - height) / 2
  )
  canvas.style(
    "transform",
    "scale(" + s + ")"
  )
}