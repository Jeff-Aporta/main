/* 
Autora: Valery Hoyos (2021 - Colombia)

Resumen de este módulo:
Este módulo se encarga de servir de interfaz para el tratamiento de los 
elementos HTML dentro de Javascript
*/

class controlHTML {
  constructor(
    categoria,
    element_pregunta,
    img,
    botonesHTML,
    juego,
    presentación,
    ranking
  ) {
    this.categoria = categoria; //obtiene el elemento categoria
    this.element_pregunta = element_pregunta; //obtiene el elemento pregunta
    this.img = img; //obtiene el elemento imagen
    this.botonesHTML = botonesHTML; //obtiene los elementos botones y los indexa en un array
    this.juego = juego;
    this.presentación = presentación;
    this.ranking = ranking;
  }

  /* 
  La función cambiar pantalla sirve para cambiar entre las diferentes "ventanas"
  del proyecto, haciendo que haya una tansición entre una vista y otra
  */
  cambiarPantalla(pantalla) {
    /* 
    Para empezar, todas las vistas se ponen invisibles
    */
    this.juego.style.display = "none";
    this.presentación.style.display = "none";
    this.ranking.style.display = "none";

    /* 
    Luego, según la vista deseada se activa con un unline-block
    */
    switch (pantalla) {
      case "juego":
        this.juego.style.display = "inline-block";
        break;
      case "presentación":
        this.presentación.style.display = "inline-block";
        if (Ranking) {
          this.ranking.style.display = "inline-block";
        }
        break;
      case "ranking":
        this.ranking.style.display = "inline-block";
        break;
    }
  }
}


let _controlHTML = new controlHTML(
  document.getElementById("categoria"),
  document.getElementById("pregunta"),
  document.getElementById("imagen"),
  [
    document.getElementById("btn1"),
    document.getElementById("btn2"),
    document.getElementById("btn3"),
    document.getElementById("btn4"),
  ],
  document.getElementById("Juego"),
  document.getElementById("Presentación"),
  document.getElementById("ranking")
);