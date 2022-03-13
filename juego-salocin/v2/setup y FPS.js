FPS = -1;

function contadorFPS() {
  if (FPS != -1) {
    return;
  }
  FPS = 0;
  tiempo_ref = millis();
  fps_ref = frameCount;

  setInterval(calculador, 1000);

  function calculador() {
    seg_transc = (millis() - tiempo_ref) / 1000;

    if (seg_transc >= 1) {
      fps_transc = frameCount - fps_ref;
      FPS = (fps_transc / seg_transc).toFixed(2);
      //reiniciar referencias
      tiempo_ref = millis();
      fps_ref = frameCount;
    }
  }
}

function setup() {
  document.getElementById("menu-press-any-key").style.display = "flex";
  ESTADO = ESTADO_PRESS_ANY_KEY;

  canvas = createCanvas(1, 1);
  sprites.personaje.quieto.derecha.aframe = 0;
  sprites.personaje.quieto.izquierda.aframe = 0;
  sprites.personaje.quieto.abajo.aframe = 0;
  sprites.personaje.quieto.arriba.aframe = 0;
  sprites.personaje.quieto.bote.derecha.aframe = 0;
  sprites.personaje.quieto.bote.izquierda.aframe = 0;
  sprites.personaje.quieto.bote.abajo.aframe = 0;
  sprites.personaje.quieto.bote.arriba.aframe = 0;
  sprites.personaje.caminando.derecha.aframe = 0;
  sprites.personaje.caminando.izquierda.aframe = 0;
  sprites.personaje.caminando.abajo.aframe = 0;
  sprites.personaje.caminando.arriba.aframe = 0;
  sprites.tiles[rutas_tiles[INDEX_TILE_AGUA]].aframe = 0;

  mapa = new Mapa();
  jugador = new Jugador();
  jugador.x = 0;
  jugador.y = 0;
  jugador.pcx = 0;
  jugador.pcy = 0;
  jugador.cx = 0;
  jugador.cy = 0;
  contadorFPS();

  minimapa = createGraphics(50, 50);

  pixelDensity(1);
  minimapa.pixelDensity(1);

  css_canvas();
  noSmooth();

  let seed = Math.floor(Math.random() * 100000);
  seed = 12991;

  document.getElementById("semilla").value = seed;
  noiseSeed(Number(document.getElementById("semilla").value));
  noiseDetail(
    Number(document.getElementById("semilla2").value),
    Number(document.getElementById("semilla3").value)
  );
  recalcularMaxMinPerlin();

  keyPressed()
  document.getElementById("btn-crear-partida").click()
  document.getElementById("btn-empezar").click()
}
