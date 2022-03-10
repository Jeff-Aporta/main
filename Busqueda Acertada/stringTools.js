String.prototype.normalizar = function () {
    let retorno = this.toLowerCase().normalize("NFD")
    retorno = retorno.replace(/[\u0300-\u036f]/g, "")
    retorno = retorno.replace("×", "x")
    retorno = retorno.replace("\n", " ")
    retorno = retorno.replace("\t", " ")
    while (retorno.includes("  ")) {
        retorno = retorno.replace("  ", " ")
    }
    retorno = retorno.trim()
    return retorno;
}

String.prototype.eraseAll =  function (erase) {
    return this.replaceAll(erase,"");
}

String.prototype.equals = function (other) {
    return this == other;
}

String.prototype.contains = function (other) {
    return this.includes(other);
}

String.prototype.extraerPalabra = function (n) {
    return this.split(" ")[n - 1]
}

String.prototype.cantidadPalabras = function () {
    return this.split(" ").length
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}