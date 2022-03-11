PI = Math.PI;
E = Math.E;

function lerp(a, b, t) {
  return (b - a) * t + a;
}

function trayectoriaCircular(x, y, r, a) {
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

function distancia3D(vector1, vector2) {
  return (
    ((vector1.x - vector2.x) ** 2 +
      (vector1.y - vector2.y) ** 2 +
      (vector1.z - vector2.z) ** 2) **
    0.5
  );
}
