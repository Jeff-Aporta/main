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
  //noiseSeed(2);

  canvas = createCanvas(1280, 720);
  pixelDensity(1);
  sprites.personaje.quieto.derecha.aframe = 0;
  sprites.personaje.quieto.izquierda.aframe = 0;
  sprites.personaje.quieto.abajo.aframe = 0;
  sprites.personaje.quieto.arriba.aframe = 0;
  sprites.personaje.caminando.derecha.aframe = 0;
  sprites.personaje.caminando.izquierda.aframe = 0;
  sprites.personaje.caminando.abajo.aframe = 0;
  sprites.personaje.caminando.arriba.aframe = 0;
  sprites.tiles[rutas_tiles[INDEX_TILE_AGUA]].aframe = 0
  css_canvas();
  noSmooth();
  mapa = new Mapa();
  jugador = new Jugador();
  jugador.x = 0;
  jugador.y = 0;
  jugador.pcx = 0;
  jugador.pcy = 0;
  jugador.cx = 0;
  jugador.cy = 0;
  contadorFPS();

  minimapa = createGraphics(100, 100);
  actualizarMinimapa();
}
