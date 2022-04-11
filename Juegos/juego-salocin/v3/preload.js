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
    luz_radial: loadImage(
      "https://docs.google.com/drawings/d/e/2PACX-1vTF1T8JGCp6_-OwkImPKV-_zCTVjjXLSuEePXfuJhSO8YHsP60M_varkhEmgfxdNIdPRtDV1FF4P0eE/pub?w=200&h=200"
    ),
    personaje: {
      quieto: {
        parpadeo: millis(),
        arriba: loadImage("https://i.ibb.co/9rymgpk/parpadeando-arriba.png"),
        derecha: loadImage("https://i.ibb.co/0tZfJjW/parpadeando-derecha.gif"),
        abajo: loadImage("https://i.ibb.co/v4KTkHD/parpadeando-abajo.gif"),
        izquierda: loadImage(
          "https://i.ibb.co/hsRW46C/parpadeando-izquierda.gif"
        ),
      },
      caminando: {
        arriba: loadImage("https://i.ibb.co/Cns0xGr/caminando-arriba.gif"),
        derecha: loadImage("https://i.ibb.co/VCw7rsG/caminando-derecha.gif"),
        abajo: loadImage("https://i.ibb.co/McFNmZt/caminando-abajo.gif"),
        izquierda: loadImage(
          "https://i.ibb.co/31bvR7V/caminando-izquierda.gif"
        ),
      },
    },
    bad_link: {
      quieto: {
        parpadeo: millis(),
        arriba: loadImage("https://i.ibb.co/9rymgpk/parpadeando-arriba.png"),
        derecha: loadImage("https://i.ibb.co/0tZfJjW/parpadeando-derecha.gif"),
        abajo: loadImage("https://i.ibb.co/v4KTkHD/parpadeando-abajo.gif"),
        izquierda: loadImage(
          "https://i.ibb.co/hsRW46C/parpadeando-izquierda.gif"
        ),
      },
      caminando: {
        arriba: loadImage("https://i.ibb.co/Cns0xGr/caminando-arriba.gif"),
        derecha: loadImage("https://i.ibb.co/VCw7rsG/caminando-derecha.gif"),
        abajo: loadImage("https://i.ibb.co/McFNmZt/caminando-abajo.gif"),
        izquierda: loadImage(
          "https://i.ibb.co/31bvR7V/caminando-izquierda.gif"
        ),
      },
    },
    pasto:loadImage("https://i.ibb.co/Rp3VMFv/grass-con-borde.png"),
    pasto_esq_RL:loadImage("https://i.ibb.co/H4wyp01/grass-con-borde2.png"),
    pasto_esq_R:loadImage("https://i.ibb.co/MDX97G4/grass-con-borde3.png"),
    pasto_esq_L:loadImage("https://i.ibb.co/1279F77/grass-con-borde4.png"),
    texturas:{
      A: loadImage("https://i.ibb.co/8rWWyCg/textura-pasto.png"),
      C: loadImage("https://i.ibb.co/qjdxV8c/textura-pasto2.png"),
      B: loadImage("https://i.ibb.co/rskbwkm/rocks.jpg"),
    },
    transiciones: {
      water: {
        sand: {
          top: loadImage("https://i.ibb.co/8xYwHf5/water-sand-top.png"),
          down: loadImage("https://i.ibb.co/WWHJ7yf/water-sand-down.png"),
          left: loadImage("https://i.ibb.co/VjRxJBk/water-sand-left.png"),
          right: loadImage("https://i.ibb.co/txfz7Fn/water-sand-right.png"),
        },
      },
    },
  };
  let tiles = {};
  for (const img of rutas_tiles) {
    tiles[img] = loadImage(img);
  }
  sprites.tiles = tiles;
}

function transformarTiles(){

}
