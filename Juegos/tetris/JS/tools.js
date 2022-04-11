function paint(paint, ctx) {
  if (ctx) {
    ctx.fillStyle = paint;
  } else {
    drawingContext.fillStyle = paint;
  }
}

function linearGradient(
  x1, y1, color1, x2, y2, color2, ctx
) {
  var gradient = drawingContext
    .createLinearGradient(
      x1, y1, x2, y2
    );
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  paint(gradient, ctx)
}

function fx(...filtros) {
  if (filtros) {
    let fx
    for (let filtro of filtros) {
      if (fx) {
        fx += " " + filtro
      } else {
        fx = filtro
      }
    }
    drawingContext.filter = fx
    return
  }
  drawingContext.filter = "none"
}

function fx_hue(valor, ctx) {
  let ángulo;
  if (typeof valor == "number") {
    ángulo = valor + "deg";
  } else {
    ángulo = valor;
  }
  let fx = "hue-rotate(" + ángulo + ")";
  if (ctx) {
    ctx.filter = fx
  } else {
    drawingContext.filter = fx
  }
  return fx
}

FPS = -1;

function contadorFPS() {
  if (FPS != -1) {
    return;
  }
  FPS = 0
  tiempo_ref = millis();
  fps_ref = frameCount;

  setInterval(calculador, 1000)

  function calculador() {
    seg_transc = (millis() - tiempo_ref) / 1000

    if (seg_transc >= 1) {
      fps_transc = frameCount - fps_ref
      FPS = (fps_transc / seg_transc).toFixed(2)
      //reiniciar referencias
      tiempo_ref = millis()
      fps_ref = frameCount
    }
  }
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}

//Cookies

function createCookie(nombre, valor = "", días = 30) {
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
    if(typeof cookieArr[i]!="string"){
      continue
    }
    elemento = cookieArr[i].split("=")
    if (elemento[0] == nombre) {
      let v = elemento[1]
      switch (v) {
        case "null":
          return null
        case "undefined":
          return undefined
        case "true":
          return true
        case "false":
          return false
      }
      n = Number(v)
      if (!isNaN(n)) {
        return n
      }
      v = unescape(v)
      return v
    }
  }
  return null
}

function deleteCookie(nombre) {
  createCookie(nombre, "", -1)
}

function isMobile() {
  let c = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPod/i,
    /iPad/i,
    /BlackBerry/i,
    /iemobile/i,
    /Windows Phone/i
  ]
  for (let i of c) {
    if (navigator.userAgent.match(i)) {
      return true
    }
  }
  return false
}

function vibrate(...patron) {
  if (!patron) {
    patron = [100]
  }
  window.navigator.vibrate(patron);
}

function noScroll() {
  window.addEventListener(
    "scroll", 
    preventMotion, 
    false
  );
  window.addEventListener(
    "touchmove", 
    preventMotion, 
    false
  );

  function preventMotion(event) {
    window.scrollTo(0, 0);
    event.stopPropagation();
  }
}

Array.prototype.remove = function(e) {
  var index = this.indexOf(e);
  if (index > -1) {
    this.splice(index, 1);
    return true
  }
  return false
}