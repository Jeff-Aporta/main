document.oncontextmenu = () => false;
noScroll()

insertarElementos()

function insertarElementos() {
  texto = readText(
    "GUI html/juego terminado.txt"
  )
  texto += readText(
    "GUI html/flechas-vertical.txt"
  )
  texto += readText(
    "GUI html/flechas-horizontal.txt"
  )
  texto += readText(
    "GUI html/menu.txt"
  )
  texto += readText(
    "GUI html/creditos.txt"
  )
  texto += readText(
    "GUI html/modo.txt"
  )
  document.write(texto)
}

function hidden(e) {
  let t = 0.5
  let v = e.style("visibility")
  if (v == "visible") {
    sonar(_SHOW)
    setTimeout(function() {
      e.style(
        "visibility",
        "hidden"
      )
      setTimeout(() => e.style(
        "animation",
        "none"
      ), 300)
    }, t * 1000)
    e.style(
      "animation",
      "desvanecer " + t + "s forwards"
    )
  } else {
    e.style(
      "visibility",
      "hidden"
    )
  }
}

function show(e) {
  let t = 0.5
  let v = e.style("visibility")
  if (v == "hidden") {
    setTimeout(function() {
      e.style(
        "animation",
        "none"
      )
    }, t * 1000)
    e.style(
      "animation",
      "aparecer " + t + "s forwards"
    )
  }
  e.style(
    "visibility",
    "visible"
  )
}

function modo() {
  let menu = select("#menu")
  hidden(menu)
  let modo = select("#modo")
  show(modo)
}

function Normal() {
  normal = true
  nuevoJuego()
}

function entrenamiento() {
  normal = false
  nuevoJuego()
}

function ocultarTodo() {
  let menu = select("#menu")
  hidden(menu)
  let creditos = select("#creditos")
  hidden(creditos)
  let modo = select("#modo")
  hidden(modo)
  let juegoT = select(
    "#juegoTerminado"
  )
  hidden(juegoT)
}

function menu() {
  sonar(_MENU)
  juegoTerminado = true
  ocultarTodo()
  let menu = select("#menu")
  show(menu)


  let puntaje = select('#puntaje');
  let mp = cookie("mp-tetris") || 0
  puntaje.html("⭐" + mp)
}

function creditos() {
  let menu = select("#menu")
  hidden(menu)
  let creditos = select("#creditos")
  show(creditos)
  let e = document.getElementById(
    "creditos"
  );
  e.scrollTop = 0
}

function GUI_init() {

  if (cookie('tactil') == null) {
    createCookie(
      "tactil",
      isMobile()
    )
  }
  let tactil = select('#tactil');
  tactil.checked(
    cookie('tactil')
  )
  tactil.changed(function() {
    createCookie(
      "tactil",
      tactil.checked()
    )
    visibilidad_tactil()
  });
  visibilidad_tactil()

  if (cookie('fondo') == null) {
    createCookie(
      "fondo",
      true
    )
  }
  let checkfondo = select('#fondo');
  checkfondo.checked(
    cookie('fondo')
  )
  checkfondo.changed(function() {
    createCookie(
      "fondo",
      checkfondo.checked()
    )
    reproducirFondo()
  });

  if (cookie('efectos') == null) {
    createCookie(
      "efectos",
      true
    )
  }
  let efectos = select('#efectos');
  efectos.checked(
    cookie('efectos')
  )
  efectos.changed(function() {
    createCookie(
      "efectos",
      efectos.checked()
    )
  });

  if (cookie('auto') == null) {
    createCookie(
      "auto",
      isMobile()
    )
  }
  let auto = select('#auto');
  auto.checked(
    cookie('auto')
  )
  auto.changed(function() {
    createCookie(
      'auto',
      auto.checked()
    )
    print("mobil-rotación: " + auto.checked())
    css_canvas()
  });
}

function visibilidad_tactil() {
  let jt = juegoTerminado
  if (cookie('tactil') && !jt) {
    tactil_visible()
  } else {
    tactil_invisible()
  }
}

function tactil_invisible() {
  controles = [
    GUI_flechas_vertical,
    GUI_flechas_H_I,
    GUI_flechas_H_D
  ]
  for (let c of controles) {
    c.style(
      "visibility",
      "hidden"
    )
  }
}

function tactil_visible() {
  tactil_invisible()
  if (width > height) {
    GUI_flechas_H_I.style(
      "visibility",
      "visible"
    )
    GUI_flechas_H_D.style(
      "visibility",
      "visible"
    )
  } else {
    GUI_flechas_vertical.style(
      "visibility",
      "visible"
    )
  }
}


function windowResized() {
  css_canvas()
}

function ocultarControles() {
  controles = [
    GUI_flechas_vertical,
    GUI_flechas_H_I,
    GUI_flechas_H_D
  ]
  for (let c of controles) {
    c.style(
      "visibility",
      "hidden"
    )
  }
}

function css_canvas() {

  let horizontal = windowWidth > windowHeight

  if (!cookie('auto')) {
    horizontal = true
  }

  let w, h

  if (horizontal) {
    h = marcoH + 20
    w = h * 16 / 9
  } else {
    w = marcoW + 20
    h = w * 16 / 9
  }


  resizeCanvas(
    w,
    h
  );
  let x = (windowWidth - width) / 2
  let y = (windowHeight - height) / 2
  canvas.position(x, y)

  let sx = windowWidth / width
  let sy = windowHeight / height
  s = min(sx, sy)
  canvas.style(
    "transform",
    "scale(" + s + ")"
  )

  x = (windowWidth - width * s) / 2
  y = (windowHeight - height * s) / 2
  w = width * s
  h = height * s

  //flechas vertical-----
  GUI_flechas_vertical = select(
    "#flechas-vertical"
  )
  if (width < height) {
    let l = (height - marcoH) / 2.05
    GUI_flechas_vertical.size(
      width ,
      l
    )
  }
  GUI_flechas_vertical.position(
    x,
    h - GUI_flechas_vertical.height*s
  )
   GUI_flechas_vertical.style(
    "transform-origin", "left top"
  )
  GUI_flechas_vertical.style(
    "transform", "scale(" + s + ")"
  )

  //Flechas horizontal

  GUI_flechas_H_I = select(
    "#flechas-H-I"
  )
  GUI_flechas_H_D = select(
    "#flechas-H-D"
  )
  if (width > height) {
    let l = (width - marcoW) / 2.1
    GUI_flechas_H_I.size(
      l,
      height
    )
    GUI_flechas_H_D.size(
      l,
      height
    )
  }
  GUI_flechas_H_I.position(x, y)
  GUI_flechas_H_D.position(
    w - GUI_flechas_H_D.width*s + x,
    y
  )
  GUI_flechas_H_I.style(
    "transform-origin", "left top"
  )
  GUI_flechas_H_I.style(
    "transform", "scale(" + s + ")"
  )
   GUI_flechas_H_D.style(
    "transform-origin", "left top"
  )
  GUI_flechas_H_D.style(
    "transform", "scale(" + s + ")"
  )

  let l = [
    "#menu",
    "#modo",
    "#juegoTerminado",
    "#creditos"
  ]
  for (let id of l) {
    let e = select(
      id
    )
    e.style(
      "transform-origin", "left top"
    )
    e.size(width, height)
    e.style("transform", "scale(" + s + ")")
    e.position(x, y)
  }

  GUI_menu = select(
    "#menu"
  )
  GUI_juegoTerminado = select(
    "#juegoTerminado"
  )

}

function css_nuevoJuego() {
  let e = canvas
  setTimeout(function() {
    e.style(
      "animation",
      "none"
    )
  }, 1000)
  e.style(
    "animation",
    "nuevoJuego 1s forwards"
  )
}

function css_juegoTerminado() {
  let e = canvas
  e.style(
    "animation",
    "juegoTerminado 1s forwards"
  )
}