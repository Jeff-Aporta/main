const INDEX_TILE_PASTO_1 = 0;
const INDEX_TILE_PASTO_3 = 1;
const INDEX_TILE_ARENA = 2;
const INDEX_TILE_NIEVE = 3;
const INDEX_TILE_TIERRA = 4;
const INDEX_TILE_AGUA = 5;
const INDEX_TILE_ROCA = 6;
const INDEX_TILE_AGUA_PROFUNDA = 7;

rutas_tiles = [
  "https://i.ibb.co/jR2NTnk/grass-tile-1.png",
  "https://i.ibb.co/Z8DzY5N/grass-tile-3.png",
  "https://i.ibb.co/PxJdYHd/sand-tile.png",
  "https://i.ibb.co/m99NYxM/Sin-t-tulo-1.png",
  "https://i.ibb.co/pfsT7z5/tierra.png",
  "https://i.ibb.co/NTvPHG4/CK2ea0R.gif",
  "https://i.ibb.co/gDMxxQp/roca.jpg",
  "https://i.ibb.co/NTvPHG4/CK2ea0R.gif",
];

let EXTENSIÓN = 0.003;

let n_mas_alto = 0;
let n_mas_bajo = 10;

class Mapa {
  constructor() {}

  draw() {
    let agua = sprites.tiles[rutas_tiles[INDEX_TILE_AGUA]];
    agua.setFrame(Math.floor(agua.aframe));
    agua.aframe = (agua.aframe + 0.2) % agua.numFrames();

    let x = jugador.cx;
    let y = jugador.cy;
    let dy = Math.floor(height / ESCALA_UNIDAD / 2) + 6;
    let dx = Math.floor(width / ESCALA_UNIDAD / 2) + 6;

    for (let fila = y - dy; fila < y + dy; fila++) {
      for (let columna = x + dx; columna > x - dx; columna--) {
        /* image(
          sprites.tiles[
            this.guia.rutas[Number(this.guia.matriz[fila][columna])]
          ],
          ESCALA_UNIDAD * columna,
          ESCALA_UNIDAD * fila,
          ESCALA_UNIDAD,
          ESCALA_UNIDAD
        ); */
        let index = indexPerlinNoise(columna, fila);

        push();
        try {
          let img = sprites.tiles[rutas_tiles[index.index]];
          image(
            sprites.tiles[rutas_tiles[INDEX_TILE_ARENA]],
            ESCALA_UNIDAD * columna,
            ESCALA_UNIDAD * fila,
            ESCALA_UNIDAD,
            ESCALA_UNIDAD
          );

          drawingContext.globalAlpha = 0.7;

          switch (index.index) {
            case INDEX_TILE_AGUA:
              drawingContext.globalAlpha = 0.3;
            case INDEX_TILE_AGUA_PROFUNDA:
              image(
                img,
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD,
                ((abs(columna + 1000000) % 3) * img.width) / 3,
                ((abs(fila + 1000000) % 3) * img.height) / 3,
                img.width / 3,
                img.height / 3
              );
              break;
            default:
              image(
                img,
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD
              );
              break;
          }
        } catch (error) {}
        pop();
      }
    }
    push();
    if (jugador.piso == INDEX_TILE_AGUA_PROFUNDA) {
      drawingContext.globalAlpha = 0.2;
      image(
        jugador.sprite,
        jugador.x - jugador.w / 2,
        jugador.y - jugador.h * 0.3,
        jugador.w,
        jugador.h
      );
    }
    pop();
  }
}

function recalcularMaxMinPerlin() {
  n_mas_alto = 0;
  n_mas_bajo = 10;
  for (let fila = -200; fila < 200; fila++) {
    for (let columna = -200; columna < 200; columna++) {
      indexPerlinNoise(columna, fila);
    }
  }
  print("Perlin mayor = " + n_mas_alto);
  print("Perlin menor = " + n_mas_bajo);
}

function indexPerlinNoise(columna, fila) {
  let n = noise(columna * EXTENSIÓN + 1000, fila * EXTENSIÓN + 2000);
  if (n > n_mas_alto) {
    n_mas_alto = n;
  }
  if (n < n_mas_bajo) {
    n_mas_bajo = n;
  }
  let ajustador = floor(
    map(n, n_mas_bajo - 0.0001, n_mas_alto + 0.0001, 0, rutas_tiles.length)
  );
  switch (ajustador) {
    case 0:
      return {
        index: INDEX_TILE_NIEVE,
        color: [255, 255, 255],
      };
    case 1:
      return {
        index: INDEX_TILE_ROCA,
        color: [128, 128, 128],
      };
    case 2:
      return {
        index: INDEX_TILE_TIERRA,
        color: [200, 100, 0],
      };
    case 3:
      return {
        index: INDEX_TILE_PASTO_1,
        color: [0, 200, 0],
      };
    case 4:
      return {
        index: INDEX_TILE_PASTO_3,
        color: [0, 255, 0],
      };
    case 5:
      return {
        index: INDEX_TILE_ARENA,
        color: [255, 200, 50],
      };
    case 6:
      return {
        index: INDEX_TILE_AGUA,
        color: [181, 194, 121],
      };
    case 7:
      return {
        index: INDEX_TILE_AGUA_PROFUNDA,
        color: [0, 128, 255],
      };
  }
}

function actualizarMinimapa() {
  if (!mostrar_mapa) {
    return;
  }
  minimapa.loadPixels();
  for (let c = -minimapa.width / 2; c < minimapa.width / 2; c++) {
    for (let f = -minimapa.height / 2; f < minimapa.height / 2; f++) {
      let i =
        (c + minimapa.width / 2 + (f + minimapa.height / 2) * minimapa.width) *
        4;
      if ((c ** 2 + f ** 2) ** 0.5 < minimapa.width / 2) {
        let index = indexPerlinNoise(c * 2 + jugador.cx, f * 2 + jugador.cy);
        try {
          minimapa.pixels[i] = index.color[0];
          minimapa.pixels[i + 1] = index.color[1];
          minimapa.pixels[i + 2] = index.color[2];
        } catch (error) {}
        minimapa.pixels[i + 3] = 255;
      } else {
        minimapa.pixels[i + 3] = 0;
      }
    }
  }
  minimapa.updatePixels();
  minimapa.fill("red");
  minimapa.noStroke();
  minimapa.circle(minimapa.width / 2, minimapa.height / 2, 2.5);
}

function dibujarMapa() {
  loadPixels();
  let Ox = Math.floor(width / 2);
  let Oy = Math.floor(height / 2);
  for (let c = -Ox; c < Ox; c++) {
    for (let f = -Oy; f < Oy; f++) {
      let i = (c + Ox + (f + Oy) * width) * 4;
      let index = indexPerlinNoise(c + jugador.cx, f + jugador.cy);
      try {
        pixels[i] = index.color[0];
        pixels[i + 1] = index.color[1];
        pixels[i + 2] = index.color[2];
      } catch (error) {}
      pixels[i + 3] = 255;
    }
  }
  updatePixels();
  fill("red");
  noStroke();
  circle(width / 2, height / 2, 5);
}
