class cronometro {
  constructor(
    cronoHTML,
    tiempo_referencia,
    segundos_transcurridos,
    detenerCronometro
  ) {
    //Esta variable se encarga de conectar al elemento HTML con JS
    this.cronoHTML = cronoHTML;
    this.tiempo_referencia = tiempo_referencia; //Es el momento en el que inicia a crónometrar
    this.segundos_transcurridos = segundos_transcurridos; //es el tiempo transcurrido el (segundos)
    this.detenerCrono = detenerCronometro; //indica cuando hay que detener el crónometro (cuando el juego términa)
  }

  iniciarCronometro() {
    this.tiempo_referencia = Date.now(); //obtiene la referencia de tiempo en ese momento
    this.detenerCrono = false; //se indica
    this.actualizarCronometro();
  }

  detenerCronometro() {
    //Se banderea la detención del cronometro
    this.detenerCrono = true;
  }

  cronometro() {
    //Tiempo actual menos tiempo de referencia
    return Date.now() - this.tiempo_referencia;
  }

  actualizarCronometro() {
    //Se actualiza cada segundo
    setTimeout(() => {
      this.segundos_transcurridos = Math.floor(this.cronometro() / 1000);
      if (!this.detenerCrono) {
        //La función es recursiva mientras no haya que detener el crónometro
        this.actualizarCronometro();
      }
      //Se actualiza el HTML del crónometro
      this.cronoHTML.innerHTML = this.HHMMSS(this.segundos_transcurridos);
    }, 1000);
  }

  /* 
  Función que convierte de segundos a formato de tiempo
  */
  HHMMSS(segundos) {
    let minutos = Math.floor(segundos / 60) % 60;
    let horas = Math.floor(segundos / 60 / 60);
    segundos = segundos % 60;
    /* 
    padStart es una función que pone ceros a la izquierda de los números
    */
    return (
      (horas + "").padStart(2, 0) +
      ":" +
      (minutos + "").padStart(2, 0) +
      ":" +
      (segundos + "").padStart(2, 0)
    );
  }
}

let _cronometro = new cronometro(
  document.getElementById("cronometro"),
  0,
  0,
  false
);
