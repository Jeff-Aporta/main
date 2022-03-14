function preload() {
  document.getElementById("p5_loading").innerHTML = `
  <img src = "https://i.ibb.co/C9S9kLT/Logo.png">
  <span style="color:white;margin:20px;font-size:300%;">
    PANTALLA DE CARGA
  </span>
  `;
  document.getElementById("p5_loading").style.display = "flex";
  document.getElementById("p5_loading").style.flexDirection = "column";
  document.getElementById("p5_loading").style.justifyContent = "center";
  document.getElementById("p5_loading").style.alignItems = "center";
  sprites = {
    luz_radial: loadImage("https://docs.google.com/drawings/d/e/2PACX-1vTF1T8JGCp6_-OwkImPKV-_zCTVjjXLSuEePXfuJhSO8YHsP60M_varkhEmgfxdNIdPRtDV1FF4P0eE/pub?w=200&h=200"),
    personaje: {
      quieto: {
        parpadeo: millis(),
        arriba: loadImage("imgs/parpadeando-arriba.png"),
        derecha: loadImage("imgs/parpadeando-derecha.gif"),
        abajo: loadImage("imgs/parpadeando-abajo.gif"),
        izquierda: loadImage("imgs/parpadeando-izquierda.gif"),
        bote: {
          arriba: loadImage("imgs/bote-parpadeando-arriba.png"),
          derecha: loadImage("imgs/bote-parpadeando-derecha.gif"),
          abajo: loadImage("imgs/bote-parpadeando-abajo.gif"),
          izquierda: loadImage("imgs/bote-parpadeando-izquierda.gif"),
        },
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
