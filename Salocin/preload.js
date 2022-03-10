function preload() {
  sprites = {
    personaje: {
      quieto: {
        parpadeo: millis(),
        arriba: loadImage("imgs/parpadeando-arriba.png"),
        derecha: loadImage("imgs/parpadeando-derecha.gif"),
        abajo: loadImage("imgs/parpadeando-abajo.gif"),
        izquierda: loadImage("imgs/parpadeando-izquierda.gif"),
      },
      caminando: {
        arriba: loadImage("imgs/caminando-arriba.gif"),
        derecha: loadImage("imgs/caminando-derecha.gif"),
        abajo: loadImage("imgs/caminando-abajo.gif"),
        izquierda: loadImage("imgs/caminando-izquierda.gif"),
      },
      roll: {
        //arriba: loadImage("imgs/roll-arriba.gif"),
        //derecha: loadImage("imgs/roll-derecha.gif"),
        //abajo: loadImage("imgs/roll-abajo.gif"),
        //izquierda: loadImage("imgs/roll-izquierda.gif")
      },
    },
  };
  let tiles = {};
  for (const img of rutas_tiles) {
    tiles[img] = loadImage(img);
  }
  sprites.tiles = tiles;
}
