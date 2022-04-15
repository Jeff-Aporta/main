function LaTeX(code) {
  return `https://latex.codecogs.com/svg.image?\\large&space;${code}`;
}

function opnLaTeX(code) {
  return `<img src="${LaTeX(code)}" style="height:40px">`;
}

let baseDePreguntas = [
  {
    pregunta: "",
    imagen: LaTeX(`\\int x dx`),
    respuesta: opnLaTeX("\\frac{1}{2}x^2"),
    distractores: [opnLaTeX("\\frac{1}{3}x^2"), opnLaTeX("x^2"), opnLaTeX("\\frac{1}{3}x^3")],
  },
  {
    pregunta: "¿Quién pintó la Mona lisa?",
    ayuda: "Tabién pintó la última cena",
    ayudaImg: "https://i.ibb.co/jw3cRLM/ultima-dena.jpg",
    imagen: "https://i.ibb.co/VMcQ65S/mona-lisa.jpg",
    respuesta: "Leonardo Da Vinci",
    distractores: ["Picasso", "Beethoven", "Miguel Ángel"],
  },
  {
    pregunta: "¿Cuanto es 2*2?",
    ayuda: "Es lo mismo que 2+2",
    respuesta: "4",
    distractores: ["2", "1", "3"],
  },
  {
    pregunta: "¿Cuanto es 5+5?",
    respuesta: "10",
    distractores: ["25", "9", "5"],
  },
];
