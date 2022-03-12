function LaTeX(latex, sz = "") {
  return `<img class="img-LaTeX" src="https://latex.codecogs.com/svg.image?${sz}&space;${escape(
    latex
  )}">`;
}
function urlLaTeX(latex, sz = "") {
  return `https://latex.codecogs.com/svg.image?${sz}&space;${escape(latex)}`;
}
function HTMLlightboxLaTeX(latex, sz = "",grupo="0") {
  return `
  <img class="img-LaTeX" src="${urlLaTeX(latex)}"
      data-lightbox="${urlLaTeX(
        latex,
        ""
      )}" data-lightbox-group="${grupo}">
  `;
}
