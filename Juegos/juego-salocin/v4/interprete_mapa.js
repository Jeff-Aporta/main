const INDEX_TILE_PASTO_1 = 0;
const INDEX_TILE_ARENA = 1;
const INDEX_TILE_NIEVE = 2;
const INDEX_TILE_TIERRA = 3;
const INDEX_TILE_AGUA = 4;
const INDEX_TILE_ROCA = 5;
const INDEX_TILE_AGUA_PROFUNDA = 6;
const INDEX_TILE_TIERRA_CON_ROCA = 7;

rutas_tiles = [
  "https://i.ibb.co/7tL3rZL/grass2.png",
  "https://i.ibb.co/TPtfDkT/sand.png",
  "https://i.ibb.co/HCgdWpk/textura-nieve.jpg",
  "https://i.ibb.co/HTHW0wD/terracotta.png",
  "https://i.ibb.co/NTvPHG4/CK2ea0R.gif",
  "https://i.ibb.co/fC41tqy/blackstone.png",
  "https://i.ibb.co/NTvPHG4/CK2ea0R.gif",
  "https://i.ibb.co/WDmYWC4/piedritas.png",
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
    let dy =
      Math.floor(height / ESCALA_UNIDAD / 2) +
      2 +
      (jugador.corriendo ? 2 : 0) +
      (jugador.roll ? 2 : 0);
    let dx =
      Math.floor(width / ESCALA_UNIDAD / 2) +
      2 +
      (jugador.corriendo ? 2 : 0) +
      (jugador.roll ? 2 : 0);

    let capa_pasto = [];
    for (let fila = y - dy; fila < y + dy; fila++) {
      for (let columna = x + dx; columna > x - dx; columna--) {
        let index = indexPerlinNoise(columna, fila);
        let indexR = indexPerlinNoise(columna + 1, fila);
        let indexL = indexPerlinNoise(columna - 1, fila);
        let indexU = indexPerlinNoise(columna, fila - 1);
        let indexD = indexPerlinNoise(columna, fila + 1);

        push();
        try {
          let img = sprites.tiles[rutas_tiles[index.index]];
          switch (index.index) {
            case INDEX_TILE_ROCA:
              noStroke();
              fill("gray");
              rect(
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD
              );
              img = sprites.texturas.B;
              drawingContext.globalAlpha = 0.2;
              image(
                img,
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD,
                ((abs(columna + 1000000) % 4) * img.width) / 4,
                ((abs(fila + 1000000) % 4) * img.height) / 4,
                img.width / 4,
                img.height / 4
              );
              drawingContext.globalAlpha = 0.5;
              strokeWeight(5);
              if (indexR.index != INDEX_TILE_ROCA) {
                stroke(indexR.color[0], indexR.color[1], indexR.color[2]);
                line(
                  ESCALA_UNIDAD * columna + ESCALA_UNIDAD,
                  ESCALA_UNIDAD * fila,
                  ESCALA_UNIDAD * columna + ESCALA_UNIDAD,
                  ESCALA_UNIDAD * fila + ESCALA_UNIDAD
                );
              }
              if (indexD.index != INDEX_TILE_ROCA) {
                stroke(indexD.color[0], indexD.color[1], indexD.color[2]);
                line(
                  ESCALA_UNIDAD * columna,
                  ESCALA_UNIDAD * fila + ESCALA_UNIDAD,
                  ESCALA_UNIDAD * columna + ESCALA_UNIDAD,
                  ESCALA_UNIDAD * fila + ESCALA_UNIDAD
                );
              }
              if (indexU.index != INDEX_TILE_ROCA) {
                stroke(indexU.color[0], indexU.color[1], indexU.color[2]);
                line(
                  ESCALA_UNIDAD * columna,
                  ESCALA_UNIDAD * fila,
                  ESCALA_UNIDAD * columna + ESCALA_UNIDAD,
                  ESCALA_UNIDAD * fila
                );
              }
              if (indexL.index != INDEX_TILE_ROCA) {
                stroke(indexL.color[0], indexL.color[1], indexL.color[2]);
                line(
                  ESCALA_UNIDAD * columna,
                  ESCALA_UNIDAD * fila,
                  ESCALA_UNIDAD * columna,
                  ESCALA_UNIDAD * fila + ESCALA_UNIDAD
                );
              }
              break;
            case INDEX_TILE_PASTO_1:
              let x = 10;
              let y = 10;
              let w = 64;
              let h = 64;
              let R = indexR.index != INDEX_TILE_PASTO_1;
              let D = indexD.index != INDEX_TILE_PASTO_1;
              let L = indexL.index != INDEX_TILE_PASTO_1;
              let U = indexU.index != INDEX_TILE_PASTO_1;
              if (R) {
                w += 10;
              }
              if (D) {
                h += 10;
              }
              if (U) {
                y = 0;
                h += 10;
              }
              if (L) {
                x = 0;
                w += 10;
              }
              let index_R = indexPerlinNoise(columna + 1, fila - 1);
              let index_L = indexPerlinNoise(columna - 1, fila - 1);
              let _R = index_R.index == INDEX_TILE_PASTO_1;
              let _L = index_L.index == INDEX_TILE_PASTO_1;
              if (
                !sprites[
                  `pasto${_R ? "R" : ""}${_L ? "L" : ""}-${x}-${y}-${w}-${h}`
                ]
              ) {
                sprites[
                  `pasto${_R ? "R" : ""}${_L ? "L" : ""}-${x}-${y}-${w}-${h}`
                ] = (
                  _R && _L
                    ? sprites.pasto_esq_RL
                    : _R
                    ? sprites.pasto_esq_R
                    : _L
                    ? sprites.pasto_esq_L
                    : sprites.pasto
                ).get(x, y, w, h);
              }
              let pasto =
                sprites[
                  `pasto${_R ? "R" : ""}${_L ? "L" : ""}-${x}-${y}-${w}-${h}`
                ];
              capa_pasto.push({
                img: pasto,
                x: ESCALA_UNIDAD * columna + x - 10,
                y: ESCALA_UNIDAD * fila + y - 10,
                w: ESCALA_UNIDAD + w - 64,
                h: ESCALA_UNIDAD + h - 64,
                c: columna,
                f: fila,
              });
              break;
            case INDEX_TILE_NIEVE:
              fill("white");
              noStroke();
              rect(
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD
              );
              drawingContext.globalAlpha = 0.2;
              image(
                img,
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD
              );
              break;
            case INDEX_TILE_AGUA:
              image(
                sprites.tiles[rutas_tiles[INDEX_TILE_ARENA]],
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD
              );
              drawingContext.globalAlpha = 0.3;
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
            case INDEX_TILE_AGUA_PROFUNDA:
              image(
                sprites.tiles[rutas_tiles[INDEX_TILE_ARENA]],
                ESCALA_UNIDAD * columna,
                ESCALA_UNIDAD * fila,
                ESCALA_UNIDAD,
                ESCALA_UNIDAD
              );
              drawingContext.globalAlpha = 0.7;
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
              drawingContext.globalAlpha = 1;
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
    for (const p of capa_pasto) {
      image(p.img, p.x, p.y, p.w, p.h);
      let n = map(noise(p.c, p.f), n_mas_bajo, n_mas_alto, 0, 1);
      if (n < 0.1) {
        image(
          sprites.texturas.C,
          ESCALA_UNIDAD * p.c,
          ESCALA_UNIDAD * p.f,
          ESCALA_UNIDAD,
          ESCALA_UNIDAD
        );
      } else if (n < 0.25) {
        image(
          sprites.texturas.A,
          ESCALA_UNIDAD * p.c,
          ESCALA_UNIDAD * p.f,
          ESCALA_UNIDAD,
          ESCALA_UNIDAD
        );
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
  for (let columna = -1000; columna < 1000; columna++) {
    indexPerlinNoise(columna, 0);
  }
  print("Perlin mayor = " + n_mas_alto);
  print("Perlin menor = " + n_mas_bajo);
}

function indexPerlinNoise(columna, fila) {
  let n = noise(columna * EXTENSIÓN + 1000, fila * EXTENSIÓN + 2000) ** 2;
  if (n > n_mas_alto) {
    n_mas_alto = n;
  }
  if (n < n_mas_bajo) {
    n_mas_bajo = n;
  }
  let ajustador = floor(
    map(n, n_mas_bajo - 0.0001, n_mas_alto + 0.0001, 0, rutas_tiles.length+1)
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
        index: INDEX_TILE_TIERRA_CON_ROCA,
        color: [95, 70, 44],
      };
    case 3:
      return {
        index: INDEX_TILE_TIERRA,
        color: [200, 100, 0],
      };
    case 4:
    case 5:
      return {
        index: INDEX_TILE_PASTO_1,
        color: [0, 200, 0],
      };
    case 6:
      return {
        index: INDEX_TILE_ARENA,
        color: [255, 200, 50],
      };
    case 7:
      return {
        index: INDEX_TILE_AGUA,
        color: [181, 194, 121],
      };
    case 8:
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
