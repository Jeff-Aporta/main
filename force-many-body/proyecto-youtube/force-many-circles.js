function forceManyCircles(circulos) {
  let retorno = false;
  for (let i = 0; i < circulos.length; i++) {
    const circulo1 = circulos[i];
    for (let j = i + 1; j < circulos.length; j++) {
      const circulo2 = circulos[j];
      retorno |= forceCircle(circulo1, circulo2);
    }
  }
  return retorno;
}

function forceCircle(body1, body2) {
  let d = body1.distanceCenter(body2);
  let dmin = body1.r + body2.r;
  let vd1 = {
    x: body1.x - body2.x,
    y: body1.y - body2.y,
  };
  let len = distanceEuclidean(vd1);
  vd1.x /= len;
  vd1.y /= len;
  // let f = dmin-d
  // vd1.x *= f;
  // vd1.y *= f;
  let vd2 = {
    x: -vd1.x,
    y: -vd1.y,
  };
  if (d < dmin) {
    body1.move(vd1.x, vd1.y);
    body2.move(vd2.x, vd2.y);
    return true;
  }
  return false;
}

function distanceEuclidean(p1, p2 = { x: 0, y: 0 }) {
  let x = (p1.x - p2.x) ** 2;
  let y = (p1.y - p2.y) ** 2;
  let d = Math.sqrt(x + y);
  return d;
}
