class Circle {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
  }

  copy() {
    return new Circle(this.x, this.y, this.d);
  }

  toRect() {
    return new Rectangle(this.x - this.r, this.y - this.r, this.d, this.d);
  }

  collideRect(rectangulo) {
    if (!rectangulo.collideRect(this.toRect())) {
      return false;
    }
    let vertices = [
      createVector(this.x, this.y + this.r),
      createVector(this.x, this.y - this.r),
      createVector(this.x + this.r, this.y),
      createVector(this.x - this.r, this.y),
    ];
    for (let i in vertices) {
      if (rectangulo.collidePoint(vertices[i])) {
        return true;
      }
    }
    vertices = rectangulo.vertices;
    for (let i in vertices) {
      if (this.collidePoint(vertices[i])) {
        return true;
      }
    }
    return false;
  }

  collideCircle(circulo) {
    let d = this.distanceCenter(circulo.center);
    let a = this.r + circulo.r;
    return d < a;
  }

  isInside_circle(circulo) {
    let d = this.distanceCenter(circulo.center);
    let a = Math.abs(this.r - circulo.r);
    return d < a;
  }

  collidePoint(x, y) {
    let d;
    if (x instanceof p5.Vector || x instanceof Object) {
      d = this.distanceCenter(x.x, x.y);
    } else {
      d = this.distanceCenter(x, y);
    }
    return d < this.r;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceCenter(x, y) {
    if (x instanceof p5.Vector || x instanceof Object) {
      y = x.y;
      x = x.x;
    }
    return ((this.center.x - x) ** 2 + (this.center.y - y) ** 2) ** 0.5;
  }

  set center(centro) {
    this.x = centro.x;
    this.y = centro.y;
  }

  get center() {
    return { x: this.x, y: this.y };
  }

  set r(r) {
    this.d = 2 * r;
  }

  get r() {
    return this.d / 2;
  }

  draw() {
    circle(this.x, this.y, this.d);
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  copy() {
    return new Rectangle(this.x, this.y, this.w, this.h);
  }

  collidePoint(x, y) {
    if (x instanceof p5.Vector || x instanceof Object) {
      y = x.y;
      x = x.x;
    }
    return (
      x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
    );
  }

  collideRect(rectangle) {
    let rect1 = this;
    let rect2 = rectangle;

    return (
      rect1.left < rect2.right &&
      rect2.left < rect1.right &&
      rect1.top < rect2.bottom &&
      rect2.top < rect1.bottom
    );
  }

  collideCircle(circulo) {
    return circulo.collideRect(this);
  }

  isInside(rectangulo) {
    return (
      this.left > rectangulo.left &&
      this.top > rectangulo.top &&
      this.right < rectangulo.right &&
      this.bottom < rectangulo.bottom
    );
  }

  union(rectangle) {
    let x = Math.min(this.topleft.x, rectangle.topleft.x);
    let y = Math.min(this.topleft.y, rectangle.topleft.y);
    let w = Math.max(this.bottomright.x, rectangle.bottomright.x) - x;
    let h = Math.max(this.bottomright.y, rectangle.bottomright.y) - y;
    return new Rectangle(x, y, w, h);
  }

  intersect(rectangle) {
    if (!this.collideRect(rectangle)) {
      return new Rectangle();
    }

    let points = [];
    let vertices1 = this.vertices;
    let vertices2 = rectangle.vertices;

    for (let i in vertices1) {
      if (this.collidePoint(vertices2[i])) {
        points.push(vertices2[i]);
      }
      if (rectangle.collidePoint(vertices1[i])) {
        points.push(vertices1[i]);
      }
    }

    function generarRectangulo() {
      let x1 = Number.MAX_VALUE;
      let y1 = Number.MAX_VALUE;
      let x2 = Number.MIN_VALUE;
      let y2 = Number.MIN_VALUE;
      for (let i in points) {
        x1 = Math.min(points[i].x, x1);
        y1 = Math.min(points[i].y, y1);
        x2 = Math.max(points[i].x, x2);
        y2 = Math.max(points[i].y, y2);
      }
      return new Rectangle(x1, y1, x2 - x1, y2 - y1);
    }

    if (points.length >= 3) {
      return generarRectangulo();
    }

    function corteEntreVectores(a, b, c, d) {
      function proporciónDeChoque(a, b, c, d) {
        let V1 = { x: b.x - a.x, y: b.y - a.y };
        let V2 = { x: d.x - c.x, y: d.y - c.y };
        let V3 = { x: a.x - c.x, y: a.y - c.y };

        function determinante(a, b) {
          return a.x * b.y - a.y * b.x;
        }
        return determinante(V2, V3) / determinante(V1, V2);
      }

      let t = proporciónDeChoque(a, b, c, d);
      let u = proporciónDeChoque(c, d, a, b);
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        points.push({
          x: (b.x - a.x) * t + a.x,
          y: (b.y - a.y) * t + a.y,
        });
      }
    }

    corteEntreVectores(
      this.topleft,
      this.bottomleft,
      rectangle.topleft,
      rectangle.topright
    );

    corteEntreVectores(
      this.topleft,
      this.bottomleft,
      rectangle.bottomleft,
      rectangle.bottomright
    );

    corteEntreVectores(
      this.topright,
      this.bottomright,
      rectangle.topleft,
      rectangle.topright
    );

    corteEntreVectores(
      this.topright,
      this.bottomright,
      rectangle.bottomleft,
      rectangle.bottomright
    );

    return generarRectangulo();
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  resize(w, h) {
    this.w = w;
    this.h = h;
  }

  get pos() {
    return this.topleft;
  }

  get size() {
    return [this.w, this.h];
  }

  get top() {
    return this.y;
  }

  get right() {
    return this.x + this.w;
  }

  get bottom() {
    return this.y + this.h;
  }

  get left() {
    return this.x;
  }

  get centerX() {
    return (this.right - this.left) / 2 + this.left;
  }

  get centerY() {
    return (this.bottom - this.top) / 2 + this.top;
  }

  get center() {
    return { x: this.centerX, y: this.centerY };
  }

  get topleft() {
    return { x: this.left, y: this.top };
  }

  get topright() {
    return { x: this.right, y: this.top };
  }

  get bottomleft() {
    return { x: this.left, y: this.bottom };
  }

  get bottomright() {
    return { x: this.right, y: this.bottom };
  }

  get vertices() {
    return [this.topleft, this.topright, this.bottomleft, this.bottomright];
  }

  get _defined() {
    return this.x && this.y && this.w && this.h;
  }

  draw() {
    if (this._defined) {
      rect(this.x, this.y, this.w, this.h);
    }
  }

  drawVertices() {
    for (let i in this.vertices) {
      point(this.vertices[i]);
    }
  }
}
