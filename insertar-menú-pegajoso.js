document.write(
  readText(deep + "00frag-menu-pegajoso.html")
    .replace("index.html", deep + "index.html")
    .replace("jeff-aporta.html", deep + "jeff-aporta.html")
    .replace("librerias.html", deep + "librerias.html")
    .replace("jeff-dibuja.html", deep + "jeff-dibuja.html")
);

let wprevScroll = 0;

window.addEventListener("scroll", function () {
  let element = document.getElementById("menu-pegajoso");
  let wScrollCurrent = window.scrollY;
  if (element.getBoundingClientRect().top <= 0) {
    if (wScrollCurrent - wprevScroll > 0) {
      element.classList.add("menu-pegajoso-hide");
    } else {
      element.classList.remove("menu-pegajoso-hide");
    }
  }
  wprevScroll = wScrollCurrent;
});
