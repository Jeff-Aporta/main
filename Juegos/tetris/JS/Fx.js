let brilloCaida = []

class BrilloCaida {
  constructor(x, y, w, h, color, t) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
    this.inicio = millis()
    this.t = t
  }

  porcentaje() {
    let p = (millis() - this.inicio) / this.t
    return p > 1 ? 1 : p
  }

  muerte() {
    return this.porcentaje() == 1
  }

  dibujar() {
    if (this.muerte()) {
      brilloCaida.remove(this)
    }
    push()
    g.clear()
    linearGradient(
      0, 0,
      'rgba(255,255,255,0)',
      0, g.height,
      this.color,
      g.drawingContext
    )
    drawingContext
      .globalAlpha = 1 - this.porcentaje();
    g.noStroke()
    g.rect(
      0, 0,
      g.width, g.height
    )
    image(
      g,
      this.x,
      this.y,
      this.w,
      this.h
    )
    pop()
  }
}

let brilloFila = []

class BrilloFila {
  constructor(f, t) {
    this.f = f
    this.inicio = millis()
    this.t = t
  }
  porcentaje() {
    let p = (millis() - this.inicio) / this.t
    return p > 1 ? 1 : p
  }

  muerte() {
    return this.porcentaje() == 1
  }

  dibujar() {
    if (this.muerte()) {
      brilloFila.remove(this)
    }
    fill(255, 255 * this.porcentaje())
    for (let i = 0; i < cols; i++) {
      pintar_celda(
        i,
        this.f
      )
    }
  }
}

let textoCentrado = []

class TextoCentrado {
  constructor(texto, color, t) {
    this.texto = texto
    this.color = color
    this.inicio = millis()
    this.t = t
  }
  porcentaje() {
    let p = (millis() - this.inicio) / this.t
    return p > 1 ? 1 : p
  }

  muerte() {
    return this.porcentaje() == 1
  }

  dibujar() {
    if (this.muerte()) {
      textoCentrado.remove(this)
    }
    push()
    let p = this.porcentaje()
    drawingContext
      .globalAlpha = 1 - p
    
    stroke(
      255
    )
    strokeWeight(10*(1-p))
    fill(
      this.color
    )
    textAlign(CENTER, CENTER)
    textSize(150*p)
    text(
      this.texto, 
      width / 2, 
      height / 2
    )
    pop()
  }
}