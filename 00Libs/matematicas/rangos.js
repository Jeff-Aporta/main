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
    if (typeof extremo1 != "number") {
      throw "el extremo1 no puede ser: " + extremo1;
    }
    if (extremo2 == undefined) {
      this.lowerLimit = 0;
      this.upperLimit = extremo1;
    } else {
      if (typeof extremo2 != "number") {
        throw "el extremo2 no puede ser: " + extremo2;
      }
      this.lowerLimit = extremo1;
      this.upperLimit = extremo2;
    }
  }

  set(extremo1, extremo2) {
    if (typeof extremo1 != "number") {
      throw "el extremo1 no puede ser: " + extremo1;
    }
    if (extremo2 == undefined) {
      this.lowerLimit = 0;
      this.upperLimit = extremo1;
    } else {
      if (typeof extremo2 != "number") {
        throw "el extremo2 no puede ser: " + extremo2;
      }
      this.lowerLimit = extremo1;
      this.upperLimit = extremo2;
    }
  }

  get head() {
    return Math.max(this.upperLimit, this.lowerLimit);
  }

  get tail() {
    return Math.min(this.upperLimit, this.lowerLimit);
  }

  get mag() {
    return this.upperLimit - this.lowerLimit;
  }

  get sense() {
    return Math.sign(this.mag);
  }

  invertirSentido() {
    this.set(this.upperLimit, this.lowerLimit);
  }

  valoration(n, incluyente = true) {
    if (n == this.upperLimit && incluyente) {
      return POR_DENTRO;
    }
    if (this.lowerLimit < this.upperLimit) {
      if (n < this.lowerLimit) {
        return POR_DETRAS;
      }
      if (n > this.upperLimit) {
        return POR_DELANTE;
      }
      return POR_DENTRO;
    } else {
      if (n > this.lowerLimit) {
        return POR_DETRAS;
      }
      if (n <= this.upperLimit) {
        return POR_DELANTE;
      }
      return POR_DENTRO;
    }
  }

  lerp(t) {
    if (this.lowerLimit == 0) {
      return this.upperLimit * t;
    }
    return (this.upperLimit - this.lowerLimit) * t + this.lowerLimit;
  }

  constrain(t) {
    if (t > this.head) {
      return this.head;
    }
    if (t < this.tail) {
      return this.tail;
    }
    return t;
  }

  porcentuality(t) {
    return (t - this.lowerLimit) / (this.upperLimit - this.lowerLimit);
  }

  porcentuality_reduced(t, includeUpperLimit) {
    if (n == this.lowerLimit) {
      return 0;
    }
    if (n == this.upperLimit) {
      return includeUpperLimit ? 1 : 0;
    }
    let p = this.porcentuality(t);
    let Vpr = p % 1;
    let retorno = n > 0 ? Vpr : 1 + Vpr;
    if (includeUpperLimit && retorno == 0 && p > 0) {
      retorno = 1;
    }
    return retorno;
  }

  inverse(t) {
    return this.upperLimit + this.lowerLimit - t;
  }

  discretize(t, levels) {
    if (levels > 1) {
      if (levels == 2) {
        if (t < (this.upperLimit + this.lowerLimit) / 2) {
          return this.lowerLimit;
        } else {
          return this.upperLimit;
        }
      }
      let Δlevels = levels - 1;
      let value_porcent = this.porcentuality(t);
      let v = Math.round(Δlevels * value_porcent) / Δlevels;
      return this.lerp(v);
    }
    return this.upperLimit;
  }

  setCircular(n) {
    if (this.valoration(n) == POR_DENTRO) {
      return n;
    }
    return this.porcentuality_reduced(n) * this.mag + this.upperLimit;
  }

  setReflex(n) {
    let Vp = this.porcentuality(n);
    if (Math.floor(Vp) % 2 == 0 || this.porcentuality_reduced(n) == 0) {
      return this.setCircular(n);
    } else {
      return this.inverse(this.setCircular(n));
    }
  }
}
