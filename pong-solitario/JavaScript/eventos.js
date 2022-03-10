KEY_P = 80

let mx, my

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      raqueta.moverDerecha = true
      break;
    case LEFT_ARROW:
      raqueta.moverIzquierda = true
      break;
  }
}

function keyReleased() {
  switch (keyCode) {
    case KEY_P:
      btn_pausa.action()
      break;
    case RIGHT_ARROW:
      raqueta.moverDerecha = false
      break;
    case LEFT_ARROW:
      raqueta.moverIzquierda = false
      break;
  }
  INICIO = false
  juego.nuevoJuego()
}

function calc_mxy() {
  mx = mouseX / s
  my = mouseY / s
}

function mouseMoved() {
  try {
    calc_mxy()
    btn_pausa.mouseMoved(mx, my)
  } catch (e) {}
}

function mouseDragged() {
  try {
    calc_mxy()
    btn_pausa.mouseDragged(mx, my)
  } catch (e) {}
}

function mousePressed() {
  try {
    calc_mxy()
    btn_pausa.mousePressed(mx, my)
    if (mx < width / 2) {
      raqueta.moverIzquierda = true
    } else {
      raqueta.moverDerecha = true
    }
  } catch (e) {}
}

let pt = 0

function mouseReleased() {
  try {
    btn_pausa.mouseReleased(mx, my)
    INICIO = false
    if (PAUSA) {
      btn_pausa.action()
    }
    raqueta.moverDerecha = false
    raqueta.moverIzquierda = false
    juego.nuevoJuego()
  } catch (e) {}
}