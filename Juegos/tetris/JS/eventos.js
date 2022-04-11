let img_minos = []

_1LINEA = 0
_2LINEAS = 1
_3LINEAS = 2
_4LINEAS = 3
_PONER_MINO = 4
_ERROR = 5
_PERDER = 6
_MEJOR_PUNTAJE = 7
_RESERVA = 8
_INICIO = 9
_DIF = 10
_TETRIS = 11
_TSPIN = 12
_HAHA = 13
_COMBO = 14
_MENU = 15
_SHOW = 16

archivo_sonidos = [
  "1linea.ogg",
  "2lineas.ogg",
  "3lineas.ogg",
  "4lineas.ogg",
  "poner_mino.ogg",
  "error.ogg",
  "perder.ogg",
  "mejorPuntaje.ogg",
  "reserva.ogg",
  "inicio.ogg",
  "dificultad.ogg",
  "tetris.ogg",
  "t-spin.ogg",
  "haha.ogg",
  "combo.ogg",
  "menu.ogg",
  "show.ogg",
]

sonido = []

let archivo_fondo = [
  "fondo (1).mp3",
  "fondo (2).mp3",
  "fondo (3).mp3",
  "fondo (4).mp3",
  "fondo (5).mp3",
  "fondo (6).mp3",
  "fondo (7).mp3",
  "fondo (8).mp3"
]

fondo = []

let tson = 0

function sonar(i, v = 1) {
  if (millis() - tson < 50) {
    setTimeout(
      function() {
        sonar(i, v)
      }, 10
    )
    return
  }
  tson = millis()
  if (!cookie('efectos')) {
    return;
  }
  sonido[i].setVolume(v)
  sonido[i].play()
}

let mfondo

function reproducirFondo() {
  if (!cookie('fondo')) {
    if (mfondo) {
      mfondo.stop()
    }
    return
  }
  if (mfondo == undefined) {
    let n = archivo_fondo.length
    let i = floor(random(n))
    print(i)

    mfondo = fondo[i]
    mfondo.onended(function() {
      mfondo = undefined
      setTimeout(
        reproducirFondo,
        1000
      )
    })
  }
  if (!mfondo.isPlaying()) {
    mfondo.play()
    mfondo.setVolume(0.4)
  }
  print("Reproducir")

}

function Loading() {
  loading = select("#p5_loading")
  loading.addClass('color');
  loading.html(
    `
<iframe src="https://editor.p5js.org/Jeff-Aporta/embed/ZQ5mhzyav"></iframe> 
`
  )
}


function preload() {
  Loading()
  for (let r of archivo_sonidos) {
    sonido.push(loadSound("Sonidos/" + r))
  }

  for (let r of archivo_fondo) {
    fondo.push(loadSound("Sonidos/" + r))
  }

  let img_mino = loadImage(
    'Imagenes/mino.png',
    function() {
      let w = 25
      let h = 25
      for (let i = 0; i < 7; i++) {
        let g = createGraphics(w, h)
        g.image(
          img_mino,
          0, 0,
          w, h
        )
        g.drawingContext
          .globalCompositeOperation =
          "color"
        g.fill(tetracolor(i))
        g.rect(0, 0, w, h)
        img_minos.push(g)
      }
    }
  )
}

SPACE = 32


let tr = 0

tactil = []

function teclado() {
  let t = 85
  if (millis() - tr < t) {
    setTimeout(teclado, t)
    return
  }
  if (keyIsDown(RIGHT_ARROW) || tactil[RIGHT_ARROW]) {
    tetrimino.derecha()
  }
  if (keyIsDown(LEFT_ARROW) || tactil[LEFT_ARROW]) {
    tetrimino.izquierda()
  }

  if (keyIsDown(DOWN_ARROW) || tactil[DOWN_ARROW]) {
    tetrimino.abajo()
    tref = millis()
  }
  setTimeout(teclado, t)
}

P = 80
ESC = 27

function keyPressed() {
  switch (keyCode) {
    case P:
    case ESC:
      pausar()
  }
  tr = millis()
  if (juegoTerminado || pausa) {
    return
  }

  switch (keyCode) {
    case RIGHT_ARROW:
      tetrimino.derecha()
      break;
    case LEFT_ARROW:
      tetrimino.izquierda()
      break;
    case UP_ARROW:
      girar()
      break;
    case DOWN_ARROW:
      tetrimino.abajo()
      tref = millis()
      break;
    case SPACE:
      tetrimino.caidaInmediata()
      break;
    case SHIFT:
      usarReserva()
      break;
  }
}