console.log("libreria mate-jeff.js FUNCIONANDO")

PI = Math.PI;
E = Math.E;

function lerp(a, b, t) {
  return (b - a) * t + a;
}

function point_circle(x, y, r, a) {
  return {
    x: r * cos(a) + x,
    y: r * sen(a) + y,
  };
}

function int(number) {
  if (number > 0) {
    return Math.floor(number);
  }
  if (number < 0) {
    return Math.ceil(number);
  }
  return 0;
}

function random(a, b) {
  if (a && b) {
    return (b - a) * Math.random() + a;
  }
  if (a) {
    return Math.random() * a;
  }
  return Math.random();
}

function cos(angle) {
  return Math.cos(angle);
}

function sin(angle) {
  return Math.sin(angle);
}

function sen(angle) {
  return sin(angle);
}

function distancia(x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2) ** 0.5;
}

function distancia3D(vector1, vector2) {
  return (
    ((vector1.x - vector2.x) ** 2 +
      (vector1.y - vector2.y) ** 2 +
      (vector1.z - vector2.z) ** 2) **
    0.5
  );
}

function proporciónDeChoque(a, b, c, d) {
  let V1 = { x: b.x - a.x, y: b.y - a.y };
  let V2 = { x: d.x - c.x, y: d.y - c.y };
  let V3 = { x: a.x - c.x, y: a.y - c.y };

  function determinante(a, b) {
    return a.x * b.y - a.y * b.x;
  }
  return determinante(V2, V3) / determinante(V1, V2);
}

function determinarProyección(a, b, c) {
  let U = { x: c.x - a.x, y: c.y - a.y };
  let V = { x: b.x - a.x, y: b.y - a.y };
  let k = (U.x * V.x + U.y * V.y) / (V.x ** 2 + V.y ** 2);
  let Qx = k * V.x + a.x;
  let Qy = k * V.y + a.y;
  let dd = { x: Qx - c.x, y: Qy - c.y };
  let d = (dd.x ** 2 + dd.y ** 2) ** 0.5;
  return { x: Qx, y: Qy, k, d };
}
