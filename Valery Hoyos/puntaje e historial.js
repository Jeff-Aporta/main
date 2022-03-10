/* 
Autora: Valery Hoyos (2021 - Colombia)

Resumen de este módulo:
Este módulo se encarga de gestionar el puntaje de la partida y también el historial
de las partidas jugadas, lo hace por medio del Local Storage que es una herramienta 
que traen los navegadores por defecto para almacenar datos de forma no-safe (no segura)
ya que al hacerle mantenimiento al navegador el localstorage puede ser limpiado
*/

class puntaje_historial {
  constructor() {
    this.Ranking = JSON.parse(localStorage.getItem("Ranking"));
    /* 
    Lee el estado inicial del historial para mostrar en pantalla
    */
    if (this.Ranking == null) {
      this.Ranking = [];
      let html = "";
      html += `
          <tr>
            <td>No hay Historial aún</td>
          </tr>
          `;
      document.getElementById("tablaRanking").innerHTML = html;
    } else {
      this.actualizarTablaHistorial();
    }
  }

  /* 
  Borra el puntaje actual y lo actualiza en pantalla
  */
  borrarPuntaje() {
    puntaje = 0;
    this.actualizarPuntaje();
  }

  /* 
  Actualiza el puntaje en pantalla
  */
  actualizarPuntaje() {
    document.getElementById("_puntaje").innerHTML =
      "Puntaje: " + puntaje + "/" + _baseDeDatos.cantidadPreguntas;
  }

  /* 
  Genera la tabla correspondiente para ver el historial
  */
  actualizarTablaHistorial() {
    let html = "";
    for (const r of this.Ranking) {
      html += `
        <tr>
          <td>${r.nombre}</td>
          <td>${r.puntaje}</td>
        </tr>
        `;
    }
    document.getElementById("tablaRanking").innerHTML = html;
  }

  /* 
  Cuando una partida ha sido finalizada, este puntaje se agrega al historial y 
  además lo guarda en el localstorage
  */
  adicionarAlHistorial(nombre, puntaje) {
    this.Ranking.push(
      new RegistroHistorico(
        nombre,
        puntaje + " (" + HHMMSS(_cronometro.segundos_transcurridos) + ")"
      )
    );
    if (this.Ranking.length > 10) {
      this.Ranking.shift();
    }
    localStorage.setItem("Ranking", JSON.stringify(this.Ranking));
  }
}

/* 
Este es un modelo de objeto que sirve para modelar el historial
*/
function RegistroHistorico(nombre, puntaje) {
  this.nombre = nombre;
  this.puntaje = puntaje;
}


_puntaje_historial = new puntaje_historial()