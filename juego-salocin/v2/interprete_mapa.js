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
    let dy = Math.floor(height / ESCALA_UNIDAD / 2) + 2;
    let dx = Math.floor(width / ESCALA_UNIDAD / 2) + 2;

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
    push()
    if (
      jugador.piso == INDEX_TILE_AGUA_PROFUNDA
    ) {
      drawingContext.globalAlpha = 0.2;
      image(
        jugador.sprite,
        jugador.x - jugador.w / 2,
        jugador.y - jugador.h * 0.3,
        jugador.w,
        jugador.h
      );
    }
    pop()
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
