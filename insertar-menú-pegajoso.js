document.write(
  readText(deep + "00frag-menu-pegajoso.html").replaceAll(`#DEEP`, deep)
);

let wprevScroll = 0;

window.addEventListener("scroll", function () {
  let element = document.getElementById("menu-principal");
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
