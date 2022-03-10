let font;
let sonido_raqueta;
let sonido_perder;
let sonido_pared;
let sonido_juegoTerminado;
let sonido_fondo;
let highscore;

function Loading() {
  loading = select("#p5_loading")
  loading.html(
    `
<iframe src="https://editor.p5js.org/Jeff-Aporta/embed/ZQ5mhzyav"></iframe>   
    `
  )
}

function preload() {
  Loading()
  let texto = select("#texto")

  let carpeta = "Sonidos/"
  
  sonido_fondo = loadSound(
    carpeta + "fondo.mp3"
  )
  highscore= loadSound(
    carpeta + "highscore.ogg"
  )
  sonido_vida = loadSound(
    carpeta + "vida.ogg"
  )
  sonido_raqueta = loadSound(
    carpeta + "raqueta.ogg"
  )
  sonido_perder = loadSound(
    carpeta + "perder.ogg"
  )
  sonido_pared = loadSound(
    carpeta + "pared.ogg"
  )
  sonido_juegoTerminado = loadSound(
    carpeta + "juego terminado.ogg"
  )
}