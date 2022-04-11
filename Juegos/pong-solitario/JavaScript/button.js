class Button {

  constructor(x, y, w, h) {
    this.area = new Rectangle(
      x, y, w, h
    )
    this.drawArea = true
  }

  mouseMoved(x, y) {
    let mx = x || mouseX
    let my = y || mouseY
    this.isMouseOver = this.area
      .collidePoint(mx, my)
  }

  mouseDragged(x, y) {
    let mx = x || mouseX
    let my = y || mouseY
    this.mouseMoved(x, y)
    this.isMousePressed =
      this.isMouseOver && mouseIsPressed
  }

  mouseReleased(x, y) {
    let mx = x || mouseX
    let my = y || mouseY
    this.mouseDragged(x, y)
    if (this.isMouseOver) {
      if (this.action) {
        this.action()
      }
    }
  }

  mousePressed(x, y) {
    let mx = x || mouseX
    let my = y || mouseY
    this.mouseDragged(x, y)
  }

  settingDrawAreaMouseOver() {
    fill('#A6D4F3')
  }

  settingDrawAreaMousePressed() {
    fill('#3C92CE')
  }

  drawingArea() {
    this.area.draw()
  }

  drawingAreaProtocol() {
    if (this.drawArea) {
      if (this.isMouseOver) {
        this.settingDrawAreaMouseOver()
      }
      if (this.isMousePressed) {
        this.settingDrawAreaMousePressed()
      }
      this.drawingArea()
    }
  }

  drawText() {
    textAlign(CENTER, CENTER)
    textSize(30)
    fill(0)
    if (this.text) {
      text(
        this.text,
        this.area.w / 2 + this.area.x,
        this.area.h / 2 + this.area.y
      )
    }
  }

  draw() {
    push()
    this.drawingAreaProtocol()
    this.drawText()
    pop()
  }

}

class Rectangle {

  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  copy() {
    return new Rectangle(this.x, this.y, this.w, this.h)
  }

  collidePoint(x, y) {
    if (x instanceof p5.Vector) {
      y = x.y
      x = x.x
    }
    return x >= this.x && x <= this.x + this.w &&
      y >= this.y && y <= this.y + this.h;
  }

  collideRect(rectangle) {
    let rect1 = this;
    let rect2 = rectangle;

    return rect1.left < rect2.right &&
      rect2.left < rect1.right &&
      rect1.top < rect2.bottom &&
      rect2.top < rect1.bottom;
  }
  
  collideCircle(circulo){
    return circulo.collideRect(this);
  }
  
  isInside(rectangulo){
    return this.left>rectangulo.left && 
      this.top > rectangulo.top &&
      this.right<rectangulo.right &&
      this.bottom < rectangulo.bottom
  }

  union(rectangle) {
    let x = min(this.topleft.x, rectangle.topleft.x);
    let y = min(this.topleft.y, rectangle.topleft.y);
    let w = max(this.bottomright.x, rectangle.bottomright.x) - x;
    let h = max(this.bottomright.y, rectangle.bottomright.y) - y;
    return new Rectangle(x, y, w, h)
  }

  intersect(rectangle) {
    if (!this.collideRect(rectangle)) {
      return new Rectangle()
    }

    let points = []
    let vertices1 = this.vertices
    let vertices2 = rectangle.vertices

    for (let i in vertices1) {
      if (this.collidePoint(vertices2[i])) {
        points.push(vertices2[i])
      }
      if (rectangle.collidePoint(vertices1[i])) {
        points.push(vertices1[i])
      }
    }

    function generarRectangulo() {
      let x1 = Number.MAX_VALUE
      let y1 = Number.MAX_VALUE
      let x2 = Number.MIN_VALUE
      let y2 = Number.MIN_VALUE
      for (let i in points) {
        x1 = min(points[i].x, x1)
        y1 = min(points[i].y, y1)
        x2 = max(points[i].x, x2)
        y2 = max(points[i].y, y2)
      }
      return new Rectangle(x1, y1, x2 - x1, y2 - y1);
    }

    if (points.length >= 3) {
      return generarRectangulo()
    }


    function corteEntreVectores(a, b, c, d) {

      function proporciónDeChoque(a, b, c, d) {
        let V1 = b.copy().sub(a);
        let V2 = d.copy().sub(c);
        let V3 = a.copy().sub(c);

        function determinante(a, b) {
          return a.x * b.y - a.y * b.x;
        }
        return determinante(V2, V3) / determinante(V1, V2);
      }

      let t = proporciónDeChoque(a, b, c, d)
      let u = proporciónDeChoque(c, d, a, b)
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        points.push(b.copy().sub(a).mult(t).add(a))
      }
    }

    corteEntreVectores(
      this.topleft, this.bottomleft,
      rectangle.topleft, rectangle.topright
    )
    corteEntreVectores(
      this.topleft, this.bottomleft,
      rectangle.bottomleft, rectangle.bottomright
    )
    corteEntreVectores(
      this.topright, this.bottomright,
      rectangle.topleft, rectangle.topright
    )
    corteEntreVectores(
      this.topright, this.bottomright,
      rectangle.bottomleft, rectangle.bottomright
    )

    return generarRectangulo()
  }

  move(x, y) {
    this.x = x
    this.y = y
  }

  resize(w, h) {
    this.w = w
    this.h = h
  }

  get pos() {
    return this.topleft;
  }

  get size() {
    return createVector(this.w, this.h)
  }

  get top() {
    return this.y
  }

  get right() {
    return this.x + this.w
  }

  get bottom() {
    return this.y + this.h
  }

  get left() {
    return this.x
  }

  get topleft() {
    return createVector(this.left, this.top)
  }

  get topright() {
    return createVector(this.right, this.top)
  }

  get bottomleft() {
    return createVector(this.left, this.bottom)
  }

  get bottomright() {
    return createVector(this.right, this.bottom)
  }

  get vertices() {
    return [
      this.topleft, this.topright,
      this.bottomleft, this.bottomright
    ]
  }

  draw() {
    rect(
      this.x, this.y, this.w, this.h
    )
  }

  drawVertices() {
    for (let i in this.vertices) {
      point(this.vertices[i])
    }
  }
}