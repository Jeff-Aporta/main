class Raqueta {

  constructor() {
    this.w = 110
    this.h = 20
    this.reiniciar()
  }

  reiniciar() {
    this.pos = createVector(
      (width - this.w) / 2,
      height - this.h - 10
    )
    this.moverDerecha = false
    this.moverIzquierda = false
  }

  dibujar() {
    this.mover()
    fill(255)
    rect(
      this.pos.x,
      this.pos.y,
      this.w,
      this.h,
      10
    )
  }

  mover() {
    if(PAUSA){
      return
    }
    fill(0)
    rect(
      this.pos.x,
      this.pos.y,
      this.w,
      this.h
    )
    this.moverConEvento()
    this.evitarSalidaPorLaterales()
  }

  moverConEvento() {
    let vel = 15
    if (this.moverIzquierda) {
      this.pos.x -= vel
    }
    if (this.moverDerecha) {
      this.pos.x += vel
    }
  }

  evitarSalidaPorLaterales() {
    let r = this.convRectángulo()
    if (r.izquierda < 0) {
      this.pos.x = 0
    }
    if (r.derecha > width) {
      this.pos.x = width - this.w
    }
  }

  convRectángulo() {
    return new Rectángulo(
      this.pos.x,
      this.pos.y,
      this.w,
      this.h
    )
  }

}