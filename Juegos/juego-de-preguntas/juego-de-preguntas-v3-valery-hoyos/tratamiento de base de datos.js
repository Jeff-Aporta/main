/* 
Autora: Valery Hoyos (2021 - Colombia)

Resumen de este módulo:
Este módulo se encarga de servir de interfaz para el tratamiento de los 
elementos HTML dentro de Javascript
*/

class baseDeDatos {
  //esta es la dirección de la base de datos de la hoja de cálculo de google
  constructor() {
    this.urlBaseDeDatos =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRMlWQTKGpi-nM1T5JHhA6rY1sveZkQ6YU55TbttQSHw-z3_eNyGMmGH38S30KaiQ/pub?gid=956946914&single=true&output=tsv";

    //Se busca si la base de datos ya existe
    this.texto = localStorage.getItem(this.urlBaseDeDatos);

    if (!this.texto) {
      if (!window.navigator.onLine) {
        swal.fire(
          "Cuidado",
          "EL navegador no está en linea, la base de datos no se podrá descargar de Google sheets",
          "warning"
        );
      }
    } else {
      this.interpretadorBaseDatos(this.texto);
    }

    this.actualizarBaseDeDatos();
  }

  /* 
  Esta función se encarga de tomar el texto de la base de preguntas 
  y convertirlo a un objeto

  input: data -> es un texto en formato .tsv (valores separados por tabulación)
  */
  interpretadorBaseDatos(data) {
    let renglones = data.split("\n");
    this.cantidadPreguntas = renglones.length;
    this.categorias = [];
    for (const renglon of renglones) {
      let arr = renglon.split("\t");
      if (!this.categorias[arr[0]]) {
        this.categorias[arr[0]] = [];
      }
      if (arr[0].trim() == "") {
        continue;
      }
      this.categorias[arr[0]].push(new pregunta(arr));
    }
    for (const i in this.categorias) {
      this.categorias[i].sort(() => Math.random() - 0.5);
    }
  }

  /* 
  Esta es la función raíz, por donde empieza todo, sin esta el programa no puede arrancar
  ya que es la encargada de descargar la base de datos de google calc al localstorage
  */
  actualizarBaseDeDatos() {
    let urlBaseDeDatos = this.urlBaseDeDatos
    $.ajax({
      url: urlBaseDeDatos,
      success: function (data) {
        localStorage.setItem(urlBaseDeDatos, data);
      },
    });
  }
}

/* 
Este es un modelo de objeto que sirve para leer 
*/
function pregunta(arr) {
  this.categoria = arr[0];
  this.pregunta = arr[1];
  this.respuesta = arr[2];
  this.distractor1 = arr[3];
  this.distractor2 = arr[4];
  this.distractor3 = arr[5];
  this.imagen = arr[6];
  this.objectFit = arr[7];
}

_baseDeDatos = new baseDeDatos();
