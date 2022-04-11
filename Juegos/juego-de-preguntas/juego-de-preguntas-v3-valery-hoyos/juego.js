/* 
Autora: Valery Hoyos (2021 - Colombia)

Resumen de este módulo:
Este módulo se encarga de contener las funciones y variables propias de la gestión del juego
tiene funciones caracteristicas como el inicio o el fin del juego, escoger una pregunta
y la validación de la respuesta asignada por el jugador
*/


/* 
Declaración de las variables correspondientes al juego
*/
let contadorPreguntas = 0; //Sirve para llevar un seguimiento de cuantas preguntas se han respondido
let segundosEsperar_cuandoResponda = 3 * 1000; //Sirve para controlar cuanto tiempo pasará antes de mostrar la siguiente pregunta
let BotonesFuncionales = true; //sirve para habilitar o deshabilitar los botones cuando sea necesario
let puntaje //se declara el puntaje
let preguntaSeleccionada; //esta variable llevará el seguimiento de la pregunta actual, con todos los datos correspondientes agregados en el documento de Excel

/* 
Se pone el puntaje en 0 y se muestra en el HTML
*/
_puntaje_historial.borrarPuntaje();

/* 
Esta función reinicia las variables y se encarga de inicializar el juego
*/
function iniciarJuego() {
  segundos_transcurridos = 0; //se pone el tiempo en 0
  _cronometro.HHMMSS(0)//Se muestra el tiempo en el HTML
  contadorPreguntas = 0; //se ponen la cantidad de preguntas respondidas en 0
  BotonesFuncionales = true; //Los botones se habilitan
  escogerPregunta(); //Se empieza el juego
}

async function escogerPregunta() {
  contadorPreguntas++;//siempre que se escoja una pregunta nueva, esta variable incrementará
  if (contadorPreguntas == _baseDeDatos.cantidadPreguntas) { //Con esta condición se determina que el juego ha finalizado porque la cantidad de preguntas resueltas son todas las que hay en la base de datos
    await swal.fire(
      "Felicidades, terminaste el juego",
      "Tu puntaje es de: " + puntaje + "/" + _baseDeDatos.cantidadPreguntas,
      "success"
    );//se muestra un mentaje de felicitaciones (recompensa)
    terminarJuego(); //El juego finaliza con esta función
    return;
  }
  if (contadorPreguntas == 1) {
    /* 
    Solamente inicia el crónometro al pasar a la segunda pregunta
     */
    _cronometro.iniciarCronometro(); //Se inicia el cronometro
  }
  let acumuladoPreguntas = 0;//esta es una variable auxiliar que ayuda a recorrer las preguntas según su categoria actual
  for (const i in _baseDeDatos.categorias) {
    if (contadorPreguntas >= acumuladoPreguntas + _baseDeDatos.categorias[i].length) {
      //Aquí se recorren todas las categorias en busca de qué pregunta se debe mostrar
      acumuladoPreguntas += _baseDeDatos.categorias[i].length;
      continue;
    }
    preguntaSeleccionada =
    _baseDeDatos. categorias[i][contadorPreguntas - acumuladoPreguntas];
    break;
  }
  _controlHTML.categoria.innerHTML = preguntaSeleccionada.categoria;
  _controlHTML.element_pregunta.innerHTML = preguntaSeleccionada.pregunta;
  if (preguntaSeleccionada.imagen) {
    _controlHTML.img.setAttribute("src", preguntaSeleccionada.imagen);
    if (preguntaSeleccionada.objectFit) {
      _controlHTML.img.style.objectFit = preguntaSeleccionada.objectFit;
    } else {
      _controlHTML.img.style.objectFit = "cover";
    }
    _controlHTML.img.style.height = "100px";
  } else {
    _controlHTML.img.style.height = "0";
  }
  let opciones = [
    preguntaSeleccionada.respuesta,
    preguntaSeleccionada.distractor1,
    preguntaSeleccionada.distractor2,
    preguntaSeleccionada.distractor3,
  ];
  opciones.sort(() => Math.random() - 0.5);
  for (let i = 0; i < _controlHTML.botonesHTML.length; i++) {
    _controlHTML.botonesHTML[i].innerHTML = opciones[i];
  }
}

async function validarRespuesta(i) {
  if (!BotonesFuncionales) {
    return;
  }
  BotonesFuncionales = false;
  if (_controlHTML.botonesHTML[i].innerHTML == preguntaSeleccionada.respuesta) {
    //respondió correctamente
    _controlHTML.botonesHTML[i].style.background = "rgba(0,255,0,0.5)";
    setTimeout(() => {
      respondeCorrectamente();
    }, segundosEsperar_cuandoResponda);
  } else {
    //respondió incorrectamente
    _controlHTML.botonesHTML[i].style.background = "rgba(255,0,0,0.5)";
    setTimeout(() => {
      respondeIncorrectamente();
    }, segundosEsperar_cuandoResponda / 2);
  }
}

function ponerBotonesEnColorOriginal() {
  for (let i = 0; i < _controlHTML.botonesHTML.length; i++) {
    _controlHTML.botonesHTML[i].style.background = "";
  }
}

async function respondeIncorrectamente() {
  await swal.fire(
    "Te haz equivocado",
    "La respuesta correcta era: " + preguntaSeleccionada.respuesta,
    "error"
  );
  ponerBotonesEnColorOriginal();
  BotonesFuncionales = true;
  escogerPregunta();
}

function respondeCorrectamente() {
  ponerBotonesEnColorOriginal();
  puntaje++;
  _puntaje_historial.actualizarPuntaje();
  BotonesFuncionales = true;
  escogerPregunta();
}

/* async function terminarJuegoVoluntario() {
  await swal.fire(
    "Suspención voluntaria",
    "Su puntaje es: " + puntaje,
    "success"
  );
  terminarJuego();
} */

async function terminarJuego() {
  _cronometro.detenerCronometro();
  BotonesFuncionales = false;
  let { value: nombre } = await swal.fire({
    input: "text",
    title: "Escriba su nombre",
  });
  if (nombre) {
    _puntaje_historial.adicionarAlHistorial(nombre, puntaje + "/" + _baseDeDatos.cantidadPreguntas);
  }
  _puntaje_historial.actualizarTablaHistorial();
  _controlHTML.cambiarPantalla("presentación");
  _puntaje_historial.borrarPuntaje();
}
