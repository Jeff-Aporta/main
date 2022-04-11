juegoTerminado = true
pausa = false
normal = true
usar_reserva = true

puntaje = 0
mejorPuntaje = cookie("mp-tetris") || 0

function pausar() {
  if (juegoTerminado) {
    return
  }
  pausa = !pausa
}

function dibujarPuntaje() {

  fill(255)
  noStroke()
  texto = puntaje
  text(
    texto,
    marcoX + 20,
    marcoY + 100
  )
  texto = "⭐" + mejorPuntaje
  fill(255, 255, 0)
  text(
    texto,
    marcoX + 10,
    marcoY + 100 + textSize() + 10
  )
}

function puntuar(lineas) {
  puntaje += lineas
  if (puntaje > mejorPuntaje) {
    mejorPuntaje = puntaje
    createCookie(
      "mp-tetris",
      mejorPuntaje
    )
  }
}

function terminarJuego() {
  if (!juegoTerminado) {
    if (puntaje == mejorPuntaje) {
      sonar(_MEJOR_PUNTAJE)
    } else {
      sonar(_PERDER)
    }
  } else {
    return
  }
  juegoTerminado = true
  show(GUI_juegoTerminado)
  ocultarControles()
  css_juegoTerminado()
}

function nuevoJuego() {
  if (juegoTerminado) {
    sonar(_INICIO, 0.5)
    puntaje = 0

    ocultarTodo()

    juegoTerminado = false
    pausa = false
    css_nuevoJuego()
    vaciarTablero()
    tdif = millis()
    reserva = undefined
    css_canvas()
    contMin = 0
    if (normal) {
      for (let i = 0; i < 4; i++) {
        subir1linea()
      }
    }
  }
}

function posicionarPróximos() {
  for (let i in próximos) {
    próximos[i].x = cols + 1.5
    próximos[i].y = i * 3 + 1
  }
}

function usarReserva() {
  if (!usar_reserva) {
    sonar(_ERROR)
    return
  }
  usar_reserva = false
  sonar(_RESERVA, 0.6)
  tref = millis()
  if (reserva) {
    let t = tetrimino.tipo
    tetrimino = new Tetrimino(
      reserva.tipo
    )
    generarReserva(t)
  } else {
    let t = tetrimino.tipo
    generarReserva(t)
    tetrimino.reiniciar()
  }
}

function generarReserva(t) {
  reserva = new Tetrimino(t)
  reserva.x = -3.5
  reserva.y = 2
}

function girar() {
  tetrimino.girarD()
  tref = millis()
}