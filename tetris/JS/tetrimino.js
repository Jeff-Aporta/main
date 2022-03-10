let tref = 0

function caidaAutomatica() {
  let d = 5 * puntaje
  if (puntaje > 160) {
    d = 5 * 160
  }
  let c = normal ? 1000 - d : 1000
  if (millis() - tref < c) {
    return
  }
  tref = millis()
  if (!juegoTerminado) {
    tetrimino.abajo()
  }
}

function v(x, y) {
  return createVector(x, y)
}

Z = 0
S = 1
J = 2
L = 3
T = 4
O = 5
I = 6

function tetramapa(tipo) {
  switch (tipo) {
    case Z:
      return [
        v(), v(-1, -1), v(0, -1), v(1, 0)
      ]
    case S:
      return [
        v(), v(0, -1), v(1, -1), v(-1, 0)
      ]
    case J:
      return [
        v(), v(-1, -1), v(-1, 0), v(1, 0)
      ]
    case L:
      return [
        v(), v(-1, 0), v(1, -1), v(1, 0)
      ]
    case T:
      return [
        v(), v(-1, 0), v(0, -1), v(1, 0)
      ]
    case O:
      return [
        v(), v(0, -1), v(1, -1), v(1, 0)
      ]
    case I:
      return [
        v(), v(1, 0), v(2, 0), v(-1, 0)
      ]
  }
}

function tetracolor(tipo) {
  switch (tipo) {
    case Z:
      return 'red'
    case S:
      return 'lime'
    case J:
      return 'orange'
    case L:
      return 'blue'
    case T:
      return 'magenta'
    case O:
      return 'yellow'
    case I:
      return 'cyan'
  }
}

class Tetrimino {

  constructor(tipo) {
    if (tipo == undefined) {
      tipo = floor(random(7))
    }
    this.tipo = tipo
    this.x = 4
    this.y = 0
    this.mapa = tetramapa(tipo)
  }

  dibujar() {
    fill(tetracolor(this.tipo))
    for (let mino of this.mapa) {
      pintar_mino(
        mino.x + this.x,
        mino.y + this.y,
        this.tipo
      )
    }
    caidaAutomatica()
  }

  caidaInmediata() {
    for (let mino of this.mapa) {
      let x = mino.x + this.x
      let y = mino.y + this.y
      let sx = mino.x + this.espectro.x
      let sy = mino.y + this.espectro.y

      let x1 = tamC * x + tx
      let y1 = tamF * y + ty
      let x2 = tamC * sx + tx
      let y2 = tamF * sy + ty
      brilloCaida.push(
        new BrilloCaida(
          x1,
          y1,
          tamC,
          y2 - y1 + tamF,
          tetracolor(this.tipo),
          200
        )
      )
    }

    this.x = this.espectro.x
    this.y = this.espectro.y
    this.abajo()
  }

  calcularEspectro() {
    this.espectro = this.clonar()
    while (this.espectro._abajo()) {
      continue
    }
  }

  dibujarEspectro() {
    this.calcularEspectro()
    fill(255, 50)
    for (let mino of this.espectro.mapa) {
      pintar_celda(
        mino.x + this.espectro.x,
        mino.y + this.espectro.y
      )
    }
  }

  clonar() {
    let clon = new Tetrimino()
    clon.x = this.x
    clon.y = this.y
    clon.mapa = this.mapa;
    return clon
  }

  reiniciar() {
    tetrimino = new Tetrimino(
      próximos[0].tipo
    )
    for (let i = 0; i < 6; i++) {
      próximos[i] = próximos[i + 1]
    }
    próximos[6] = new Tetrimino()
    posicionarPróximos()
  }


  dentroTablero() {
    let mapat = this.mapaTransformado()
    for (let e of mapat) {
      if (e.x < 0) {
        return false
      }
      if (e.x >= cols) {
        return false
      }
      if (e.y >= fils) {
        return false
      }
    }
    return true
  }

  colisiónTablero() {
    let mapat = this.mapaTransformado()
    for (let e of mapat) {
      if (e.y < 0) {
        continue
      }
      if (tablero[e.x][e.y] != undefined) {
        return true
      }
    }
    return false
  }

  movimientoErroneo() {
    if (!this.dentroTablero()) {
      return true
    }
    if (this.colisiónTablero()) {
      return true
    }
    return false
  }

  girarD() {
    for (let mino of this.mapa) {
      mino.girar90gI()
    }
    if (this.movimientoErroneo()) {

      this.y--
      if (this.movimientoErroneo()) {
        if (this.tipo == I) {
          this.y--
          if (this.movimientoErroneo()) {
            this.y++
            this.y++
          } else {
            return
          }
        } else {
          this.y++
        }
      } else {
        return
      }

      this.x++
      if (this.movimientoErroneo()) {
        if (this.tipo == I) {
          this.x++
          if (this.movimientoErroneo()) {
            this.x--
            this.x--
          } else {
            return
          }
        } else {
          this.x--
        }
      } else {
        return
      }

      this.x--
      if (this.movimientoErroneo()) {
        if (this.tipo == I) {
          this.x--
          if (this.movimientoErroneo()) {
            this.x++
            this.x++
          } else {
            return
          }
        } else {
          this.x++
        }
      } else {
        return
      }
      sonar(_ERROR)
      this.girarI()
    }

  }

  girarI() {
    for (let mino of this.mapa) {
      mino.girar90gD()
    }
  }

  izquierda() {
    this.x--
    if (this.movimientoErroneo()) {
      sonar(_ERROR)
      this.derecha()
    }
    tref = millis()
  }

  derecha() {
    this.x++
    if (this.movimientoErroneo()) {
      sonar(_ERROR)
      this.izquierda()
    }
    tref = millis()
  }

  arriba() {
    this.y--
  }

  _abajo() {
    this.y++
    if (this.movimientoErroneo()) {
      this.arriba()
      return false
    }
    return true
  }

  abajo() {
    if (!this._abajo()) {
      almacenarTetrimino(this)
      this.reiniciar()
    }
  }

  mapaTransformado() {
    let mapat = []
    for (let mino of this.mapa) {
      mapat.push(
        v(mino.x + this.x, mino.y + this.y)
      )
    }
    return mapat
  }
}