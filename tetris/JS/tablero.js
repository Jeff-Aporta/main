tamC = 15
tamF = 15
cols = 10
fils = 20

let tx = 0
let ty = 0

tablero = []

let tdif = 0
let s_dif = isMobile() ? 30 : 15
let tlimdif = s_dif * 1000
let combo = 0

function dificultad() {
  if (juegoTerminado) {
    return
  }
  if (millis() - tdif < tlimdif) {
    return
  }
  if (tetrimino.espectro) {
    let y2 = tetrimino.espectro.y
    let y1 = tetrimino.y
    let h = y2 - y1
    if (h < 3) {
      return
    }
  }
  tdif = millis()
  sonar(_DIF)
  subir1linea()
  tlimdif = s_dif * 1000
}

for (let i = 0; i < cols; i++) {
  tablero.push([])
}

marcoW = tamC * (cols + 10)
marcoH = tamF * (fils + 1)



function pintarDificultad() {
  let tt = millis() - tdif
  let p = tt / tlimdif
  if (p > 1) {
    p = 1
  }
  let x = tx
  let y = tamF * -0.5 + ty
  fill(255)
  rect(
    x,
    y,
    cols * tamC * p,
    tamF / 2
  )
}

let imagenTablero
let imagenTableroMinos

function pintarTablero() {
  if (!imagenTablero) {
    imagenTablero = createGraphics(
      cols * tamC,
      fils * tamF
    )
    for (let c = 0; c < cols; c++) {
      for (let f = 0; f < fils; f++) {
        if((c+f)%2==0){
          imagenTablero.fill(0, 180)
        }else{
          imagenTablero.fill(0, 120)
        }
        imagenTablero.stroke(255, 20)
        
        
        imagenTablero.rect(
          tamC * c,
          tamF * f,
          tamC,
          tamF
        )
      }
    }
    imagenTablero.stroke(255,200)
    imagenTablero.strokeWeight(3)
    imagenTablero.noFill()
    imagenTablero.rect(
      0, 0, 
      imagenTablero.width,
      imagenTablero.height
    )
  }
  if (!imagenTableroMinos) {
    imagenTableroMinos = createGraphics(
      cols * tamC,
      fils * tamF
    )
    actualizarImgMinos()
  }

  push()
  strokeWeight(3)
  stroke(255, 150)
  fill(0, 60)

  marcoX = tamC * -5 + tx
  marcoY = tamF * -0.5 + ty

  rect(
    marcoX,
    marcoY,
    marcoW,
    marcoH,
    40
  )
  pop()

  if (normal) {
    pintarDificultad()
    dificultad()
  }

  image(imagenTableroMinos, tx, ty)
}

function actualizarImgMinos() {
  imagenTableroMinos.clear()
  imagenTableroMinos.image(
    imagenTablero,
    0,
    0
  )

  for (let c = 0; c < cols; c++) {
    for (let f = 0; f < fils; f++) {
      tab = tablero[c][f]
      if (tab != undefined) {
        imagenTableroMinos.image(
          img_minos[tab],
          tamC * c,
          tamF * f,
          tamC,
          tamF
        )
      }
    }
  }
}

function vaciarTablero() {
  for (let f = 0; f < fils; f++) {
    for (let c = 0; c < cols; c++) {
      tablero[c][f] = undefined
    }
  }
  actualizarImgMinos()
}

function subir1linea() {
  for (let c = 0; c < cols; c++) {
    for (let f = 0; f < fils; f++) {
      tablero[c][f] = tablero[c][f + 1]
    }
  }
  insertarMinosAbajo()
  actualizarImgMinos()
}

let contMin = 0

function insertarMinosAbajo() {
  let y = fils - 1
  let tipo
  switch (contMin) {
    case 0:
    case 1:
      tipo = O
      break
    case 2:
      tipo = L
      break
    case 3:
      tipo = Z
      break
    default:
      tipo = floor(random(7))
  }
  contMin++
  for (let c = 0; c < cols; c++) {
    tablero[c][y] = tipo
  }
  let x = floor(random(cols))
  tablero[x][y] = undefined
}


function buscarLineas() {
  let lineas = []
  for (let f = 0; f < fils; f++) {
    for (let c = 0; c < cols; c++) {
      if (tablero[c][f] != undefined) {
        if (c == cols - 1) {
          lineas.push(f)
        }
        continue;
      }
      break;
    }
  }
  return lineas
}

function borrarLineas() {
  let lineas = buscarLineas()
  let l = lineas.length

  puntuar(l)
  tlimdif += l * 1000

  if (l == 2 && tetrimino.tipo == T) {
    try {
      let x = tetrimino.x
      let y = tetrimino.y
      let l1 = tablero[x - 1][y - 1]
      let l2 = tablero[x + 1][y - 1]
      let b1 = l1 != undefined
      let b2 = l2 != undefined
      let t = new Tetrimino(T)
      t.girarD()
      t.girarD()
      let b3 = true
      for (let i = 0; i < 4; i++) {
        let e1 = tetrimino.mapa[i]
        let e2 = t.mapa[i]
        if (!e1.equals(e2)) {
          b3 = false
        }
      }
      if (b1 || b2) {
        if (b3) {
          textoCentrado.push(
            new TextoCentrado(
              "T-SPIN",
              "Magenta",
              1000
            )
          )
          sonar(_TSPIN)
          puntuar(4)
          tlimdif += (l + 1) * 1000
        }
      }
    } catch (e) {}

  }
  if (l == 0) {
    combo = 0
    try {
      for (let m of tetrimino.mapa) {
        let x = m.x + tetrimino.espectro.x
        let y = m.y + tetrimino.espectro.y
        if (y + 1 >= fils) {
          continue
        }
        let l = tablero[x][y + 1]
        if (l == undefined) {
          sonar(_HAHA, 0.7)
          break
        }
      }
    } catch (e) {}
  } else {
    combo++
  }

  if (combo > 1) {
    sonar(_COMBO)
    textoCentrado.push(
      new TextoCentrado(
        combo,
        tetracolor(tetrimino.tipo),
        1000
      )
    )
  }
  if (combo >= 2) {
    puntuar(l * combo)
  }


  switch (l) {
    case 1:
      sonar(_1LINEA)
      break
    case 2:
      sonar(_2LINEAS)
      break
    case 3:
      sonar(_3LINEAS)
      break
    case 4:
      sonar(_4LINEAS)
      sonar(_TETRIS)
      textoCentrado.push(
        new TextoCentrado(
          "TETRIS",
          "cyan",
          1000
        )
      )
      tlimdif += l * 1000
      break
  }
  for (let i of lineas) {
    brilloFila.push(
      new BrilloFila(i, 200)
    )
    for (let f = i; f >= 0; f--) {
      for (let c = 0; c < cols; c++) {
        if (f == 0) {
          tablero[c][f] = undefined
        } else {
          tablero[c][f] = tablero[c][f - 1]
        }
      }
    }
  }
}

function almacenarTetrimino(tetrimino) {
  usar_reserva = true
  sonar(_PONER_MINO)
  let mapa = tetrimino.mapaTransformado()
  for (let e of mapa) {
    if (e.y < 0) {
      if (!juegoTerminado) {
        terminarJuego()
      }
    }
    tablero[e.x][e.y] = tetrimino.tipo
  }
  borrarLineas()
  actualizarImgMinos()
}

function pintar_mino(x, y, tipo) {
  image(
    img_minos[tipo],
    tamC * x + tx,
    tamF * y + ty,
    tamC,
    tamF
  )
}

function pintar_celda(x, y) {
  rect(
    tamC * x + tx,
    tamF * y + ty,
    tamC,
    tamF
  )
}