POR_DETRAS = -1;
POR_DENTRO = 0;
POR_DELANTE = 1;

AJUSTE_EXTREMOS = 0;
AJUSTE_EXTREMOS_ABS = 1;
AJUSTE_CIRCULAR = 2;
AJUSTE_CIRCULAR_ABS = 3;
AJUSTE_REFLEJO = 4;
AJUSTE_REFLEJO_INVERSO = 5;

class Rango {
  constructor(extremo1, extremo2) {
    if (!(extremo1 instanceof Number)) {
      throw "el extremo1 no puede ser: " + extremo1;
    }
    if (extremo2 == undefined) {
      this.extremoInicial = 0;
      this.extremoFinal = extremo1;
    } else {
      if (!(extremo2 instanceof Number)) {
        throw "el extremo2 no puede ser: " + extremo2;
      }
      this.extremoInicial = extremo1;
      this.extremoFinal = extremo2;
    }
  }

  ajustar(extremo1, extremo2) {
    if (!(extremo1 instanceof Number)) {
      throw "el extremo1 no puede ser: " + extremo1;
    }
    if (extremo2 == undefined) {
      this.extremoInicial = 0;
      this.extremoFinal = extremo1;
    } else {
      if (!(extremo2 instanceof Number)) {
        throw "el extremo2 no puede ser: " + extremo2;
      }
      this.extremoInicial = extremo1;
      this.extremoFinal = extremo2;
    }
  }

  get mag() {
    return this.extremoFinal - this.extremoInicial;
  }

  get sentido(){
     return Math.sign(this.mag)
  }

  invertirSentido() {
    this.ajustar(this.extremoFinal, this.extremoInicial);
  }
}
