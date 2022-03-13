function TL(
  ctx,
  rx = random(-0.5, 1.2),
  gx = random(-0.5, 1.2),
  bx = random(-0.5, 1.2),
  ry = random(-0.5, 1.2),
  gy = random(-0.5, 1.2),
  by = random(-0.5, 1.2),
  rz = random(-0.5, 1.2),
  gz = random(-0.5, 1.2),
  bz = random(-0.5, 1.2)
) {
  width = ctx.canvas.width;
  height = ctx.canvas.height;
  let IMG = ctx.getImageData(0, 0, width, height);
  for (let c = 0; c < width; c++) {
    for (let f = 0; f < height; f++) {
      let i = (c + f * IMG.width) * 4;
      IMG.data[i] =
        IMG.data[i] * rx + IMG.data[i + 1] * ry + IMG.data[i + 2] * rz;
      IMG.data[i + 1] =
        IMG.data[i] * gx + IMG.data[i + 1] * gy + IMG.data[i + 2] * gz;
      IMG.data[i + 2] =
        IMG.data[i] * bx + IMG.data[i + 1] * by + IMG.data[i + 2] * bz;
    }
  }
  ctx.putImageData(IMG, 0, 0);
}

function bordes(ctx, fuerza = 1) {
  width = ctx.canvas.width;
  height = ctx.canvas.height;
  let IMG = ctx.getImageData(0, 0, width, height);
  resultado = ctx.createImageData(width, height);
  for (let c = 0; c < width; c++) {
    for (let f = 0; f < height; f++) {
      let i = (c + f * IMG.width) * 4;
      let i2 = (constrain(c - 1, 0, width) + f * IMG.width) * 4;
      let i3 = (constrain(c + 1, 0, width) + f * IMG.width) * 4;
      let i4 = (c + constrain(f - 1, 0, height) * IMG.width) * 4;
      let i5 = (c + constrain(f + 1, 0, height) * IMG.width) * 4;
      resultado.data[i] = constrain(
        fuerza * 4 * IMG.data[i] -
          fuerza * IMG.data[i2] -
          fuerza * IMG.data[i3] -
          fuerza * IMG.data[i4] -
          fuerza * IMG.data[i5],
        0,
        255
      );
      resultado.data[i + 1] = constrain(
        fuerza * 4 * IMG.data[i + 1] -
          fuerza * IMG.data[i2 + 1] -
          fuerza * IMG.data[i3 + 1] -
          fuerza * IMG.data[i4 + 1] -
          fuerza * IMG.data[i5 + 1],
        0,
        255
      );
      resultado.data[i + 2] = constrain(
        fuerza * 4 * IMG.data[i + 2] -
          fuerza * IMG.data[i2 + 2] -
          fuerza * IMG.data[i3 + 2] -
          fuerza * IMG.data[i4 + 2] -
          fuerza * IMG.data[i5 + 2],
        0,
        255
      );
      resultado.data[i + 3] = IMG.data[i + 3];
    }
  }
  ctx.putImageData(resultado, 0, 0);
}

function InvertirCanales(ctx, xR = 1, xG = 1, xB = 1) {
  width = ctx.canvas.clientWidth;
  height = ctx.canvas.clientHeight;

  let IMG = ctx.getImageData(0, 0, width, height);
  for (let c = 0; c < width; c++) {
    for (let f = 0; f < height; f++) {
      let i = (c + f * IMG.width) * 4;
      IMG.data[i] = lerp(IMG.data[i], 255 - IMG.data[i], xR);
      IMG.data[i + 1] = lerp(IMG.data[i + 1], 255 - IMG.data[i + 1], xG);
      IMG.data[i + 2] = lerp(IMG.data[i + 1], 255 - IMG.data[i + 1], xB);
    }
  }
  ctx.putImageData(IMG, 0, 0);
}

function apagarCanales(ctx, xR, xG, xB) {
  width = ctx.canvas.width;
  height = ctx.canvas.height;
  let IMG = ctx.getImageData(0, 0, width, height);
  for (let c = 0; c < width; c++) {
    for (let f = 0; f < height; f++) {
      let i = (c + f * IMG.width) * 4;
      IMG.data[i] *= xR;
      IMG.data[i + 1] *= xG;
      IMG.data[i + 2] *= xB;
    }
  }
  ctx.putImageData(IMG, 0, 0);
}


let filter_dR
let filter_dG
let filter_dB

function desfaceDeCanales(
  ctx,
  xR = 10,
  yR = 10,
  xG = 5,
  yG = 5,
  xB = 0,
  yB = 0
) {
  width = ctx.canvas.width;
  height = ctx.canvas.height;
  let R = ctx.getImageData(0, 0, width, height);
  let G = ctx.getImageData(0, 0, width, height);
  let B = ctx.getImageData(0, 0, width, height);
  for (let c = 0; c < width; c++) {
    for (let f = 0; f < height; f++) {
      let i = (c + f * R.width) * 4;
      R.data[i + 1] = 0;
      R.data[i + 2] = 0;
      G.data[i + 0] = 0;
      G.data[i + 2] = 0;
      B.data[i + 0] = 0;
      B.data[i + 1] = 0;
    }
  }
  if (!filter_dR) {
    filter_dR = createGraphics(width, height);
  }
  if (!filter_dG) {
    filter_dG = createGraphics(width, height);
  }
  if (!filter_dB) {
    filter_dB = createGraphics(width, height);
  }
  if (width != filter_dR.width || height != filter_dR.height) {
    filter_dR.resizeCanvas(width, height);
    filter_dG.resizeCanvas(width, height);
    filter_dB.resizeCanvas(width, height);
  }
  filter_dR.drawingContext.putImageData(R, 0, 0);
  filter_dG.drawingContext.putImageData(G, 0, 0);
  filter_dB.drawingContext.putImageData(B, 0, 0);
  push();
  fill("black");
  rect(0, 0, width, height);
  ctx.globalCompositeOperation = "screen";
  image(filter_dR, xR, yR);
  image(filter_dG, xG, yG);
  image(filter_dB, xB, yB);
  pop();
}
