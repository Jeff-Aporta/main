class Rectángulo {

  constructor(x, y , w, h ) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  colisiónRect(rectángulo) {
    let rect1 = this;
    let rect2 = rectángulo;
    return rect1.izquierda < rect2.derecha &&
      rect2.izquierda < rect1.derecha &&
      rect1.arriba < rect2.abajo &&
      rect2.arriba < rect1.abajo;
  }

  get arriba() {
    return this.y
  }

  get derecha() {
    return this.x + this.w
  }

  get abajo() {
    return this.y + this.h
  }

  get izquierda() {
    return this.x
  }
}

function crearCookie(nombre, valor = "", días = 30) {
  valor = escape(valor)
  var ahora = new Date();
  ms = ahora.getTime() + días * 24 * 3600 * 1000;
  ahora.setTime(ms);
  creación = nombre + "=" + valor + "; ";
  expiración = "expires=" + ahora.toUTCString();
  document.cookie = creación + expiración + ";";
  n = Number(valor)
  if (!isNaN(n)) {
    return n
  }
  return unescape(valor)
}

function cookie(nombre) {
  let cookies = document.cookie
  let cookieArr = cookies.split("; ")
  for (let i in cookieArr) {
    elemento = cookieArr[i].split("=")
    if (elemento[0] == nombre) {
      n = Number(elemento[1])
      if (!isNaN(n)) {
        return n
      }
      return unescape(elemento[1])
    }
  }
  return null
}