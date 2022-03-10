function TL(
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
  let IMG = drawingContext.getImageData(0, 0, width, height);
  for (let c = 0; c < width; c++) {
    for (let f = 0; f < height; f++) {
      let i = (c + f * IMG.width) * 4;
      IMG.data[i] = constrain(
        IMG.data[i] * rx + IMG.data[i + 1] * ry + IMG.data[i + 2] * rz,
        0,
        255
      );
      IMG.data[i + 1] = constrain(
        IMG.data[i] * gx + IMG.data[i + 1] * gy + IMG.data[i + 2] * gz,
        0,
        255
      );
      IMG.data[i + 2] = constrain(
        IMG.data[i] * bx + IMG.data[i + 1] * by + IMG.data[i + 2] * bz,
        0,
        255
      );
    }
  }
  drawingContext.putImageData(IMG, 0, 0);
}

function bordes(fuerza = 1) {
  let IMG = drawingContext.getImageData(0, 0, width, height);
  resultado = drawingContext.createImageData(width, height);
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
  drawingContext.putImageData(resultado, 0, 0);
}

function apagarCanales(xR, xG, xB) {
  let IMG = drawingContext.getImageData(0, 0, width, height);
  for (let c = 0; c < width; c++) {
    for (let f = 0; f < height; f++) {
      let i = (c + f * IMG.width) * 4;
      IMG.data[i] *= xR;
      IMG.data[i + 1] *= xG;
      IMG.data[i + 2] *= xB;
    }
  }
  drawingContext.putImageData(IMG, 0, 0);
}

function desfaceDeCanales(xR, yR, xG, yG, xB, yB) {
  let R = drawingContext.getImageData(0, 0, width, height);
  let G = drawingContext.getImageData(0, 0, width, height);
  let B = drawingContext.getImageData(0, 0, width, height);
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
  let dR = createGraphics(width, height);
  dR.drawingContext.putImageData(R, 0, 0);
  let dG = createGraphics(width, height);
  dG.drawingContext.putImageData(G, 0, 0);
  let dB = createGraphics(width, height);
  dB.drawingContext.putImageData(B, 0, 0);
  push();
  fill("black");
  rect(0, 0, width, height);
  drawingContext.globalCompositeOperation = "screen";
  image(dR, xR, yR);
  image(dG, xG, yG);
  image(dB, xB, yB);
  pop();
}
