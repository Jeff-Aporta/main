function windowResized() {
  draw();
  css_canvas();
}

function css_canvas() {
  let horizontal = windowWidth > windowHeight;
  let w, h;

  if (horizontal) {
    h = RESOLUCIÓN;
    w = Math.trunc((h * 16) / 9);
  } else {
    w = RESOLUCIÓN;
    h = Math.trunc((w * 16) / 9);
  }

  resizeCanvas(w, h);
  luces.resizeCanvas(w, h);

  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);

  let sx = windowWidth / width;
  let sy = windowHeight / height;
  s = min(sx, sy);
  canvas.style("transform", "scale(" + s + ")");
  canvas.style("image-rendering", "pixelated");

  setSizeById("menu-pausa");
  setSizeById("menu-press-any-key");
  setSizeById("menu-nuevo-juego");
  setSizeById("menu-selección-nuevo-juego");
  setSizeById("interno");

  function setSizeById(id) {
    document.getElementById(id).style.transformOrigin = "center center";
    document.getElementById(id).style.transform = `scale(${s})`;
    document.getElementById(id).style.width = width + "px";
    document.getElementById(id).style.height = height + "px";
    document.getElementById(id).style.left = x + "px";
    document.getElementById(id).style.top = y + "px";
  }
}
