function LaTeX(latex, sz = "") {
  return `<img class="img-LaTeX" src="https://latex.codecogs.com/svg.image?${sz}&space;${escape(
    latex
  )}">`;
}

function urlLaTeX(latex, sz = "") {
  return `https://latex.codecogs.com/svg.image?${sz}&space;${escape(latex)}`;
}

base_preguntas = [
  {
    categoria: "Arte y literatura",
    pregunta: "¿Cuál de estás integrales es correcta?",
    respuesta: LaTeX("\\sum_{a}^{b}x^2+2"),
    incorrecta1: LaTeX("\\int_{a}^{b} x dx"),
    incorrecta2: LaTeX("\\int_{a}^{b} y dx"),
    incorrecta3: LaTeX("\\int_{a}^{b} z dx"),
    imagen: urlLaTeX("\\int \\sqrt[3]{1+3sen(x)}cos(x)\\text{ }dx"),
    objectFit: "contain",
  },
  {
    categoria: "Arte y literatura",
    pregunta: 'Pintor de  "El jardín de las delicias"',
    respuesta: "El Bosco",
    incorrecta1: "Velásquez",
    incorrecta2: "Picasso",
    incorrecta3: "Dalí\r",
    imagen: "https://i.ibb.co/SDjX7PM/jardin-de-las-delicias.jpg",
    objectFit: "cover",
  },
  {
    categoria: "Arte y literatura",
    pregunta: 'significado de  "El jardín de las delicias"',
    respuesta: "Mundo Terrenal",
    incorrecta1: "Es Mejor Morir",
    incorrecta2: "Dios Es El Camino",
    incorrecta3: "Adán Y Eva\r",
    imagen: "https://i.ibb.co/SDjX7PM/jardin-de-las-delicias.jpg",
    objectFit: "cover",
  },
];
