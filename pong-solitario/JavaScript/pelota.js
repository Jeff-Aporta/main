class Pelota {

  constructor() {
    this.d = 30
    this.brillo = 0
    this.reiniciar()
    this.color = color(255, 128, 0);
  }

  cambiarColor() {
    colorMode(HSB, 100);
    this.color = color(
      random(100),
      100,
      100
    );
    colorMode(RGB, 255);
  }

  reiniciar() {
    this.pos = createVector(
      (width - this.d / 2) / 2,
      0
    )
    this.aceleración = createVector(
      random(-4, 4),
      random(2, 4)
    )
  }

  dibujar() {
    this.brillo *= 0.95
    ellipseMode(CORNER)
    fill(
      red(this.color)+this.brillo,
      green(this.color)+this.brillo,
      blue(this.color)+this.brillo
    )
    ellipse(
      this.pos.x,
      this.pos.y,
      this.d,
      this.d
    )
    this.mover()
  }

  chispas() {
    this.brillo = 255

    let r = 50
    let chispas = random(30)

    for (let i = 0; i < chispas; i++) {
      let dx = random(-r, r)
      let dy = random(-r, r)
      circle(
        this.pos.x + dx,
        this.pos.y + dy,
        random(2, 7)
      )
    }

  }

  mover() {
    if(PAUSA){
      return
    }
    let mov = this.aceleración.copy()
    mov.mult(dificultad)
    this.pos.add(mov)

    let r = this.convRectángulo()

    if (r.izquierda < 0) {
      this.aceleración.x *= -1
      this.chispas()
      sonido_pared.play()
    }
    if (r.derecha > width) {
      this.aceleración.x *= -1
      this.chispas()
      sonido_pared.play()
    }
    if (r.arriba < 0) {
      this.aceleración.y *= -1
      this.chispas()
      sonido_pared.play()
    }
    if (r.abajo > height) {
      juego.perder()
      sonido_perder.play()
      this.aceleración.y *= -1
      this.chispas()
    }
    if (this.colisiónRaqueta()) {
      juego.puntuar()
      sonido_raqueta.play()
      this.pos.y = raqueta.pos.y - this.d
      this.aceleración.y *= -1
      let v = 0.5
      this.aceleración.x += random(-v, v)
      this.chispas()
    }
  }

  colisiónRaqueta() {
    let r = this.convRectángulo()
    let r2 = raqueta.convRectángulo()
    return r.colisiónRect(r2);
  }

  convRectángulo() {
    return new Rectángulo(
      this.pos.x,
      this.pos.y,
      this.d,
      this.d
    )
  }

}