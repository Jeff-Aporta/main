let PRIMERO_EN_COLA = 0;
let PRIMERO_EL_MAS_CERCANO = 1;

let p1 = "Mono";
let p2 = "Monosilaba";
let p3 = "bac";
let p4 = "abc";

console.log("Primero en cola:");
console.log(
  "'" +
    p1 +
    "' vs '" +
    p2 +
    "' : " +
    (100 * similitud(p1, p2, PRIMERO_EN_COLA)).toFixed(2)
);
console.log(
  "'" +
    p1 +
    "' vs '" +
    p3 +
    "' : " +
    (100 * similitud(p1, p3, PRIMERO_EN_COLA)).toFixed(2)
);
console.log(
  "'" +
    p1 +
    "' vs '" +
    p4 +
    "' : " +
    (100 * similitud(p1, p4, PRIMERO_EN_COLA)).toFixed(2)
);

console.log("Primero el más cercano:");
console.log(
  "'" + p1 + "' vs '" + p2 + "' : " + (100 * similitud(p1, p2)).toFixed(2)
);
console.log(
  "'" + p1 + "' vs '" + p3 + "' : " + (100 * similitud(p1, p3)).toFixed(2)
);
console.log(
  "'" + p1 + "' vs '" + p4 + "' : " + (100 * similitud(p1, p4)).toFixed(2)
);

function similitud(
  cadena1,
  cadena2,
  criterio = PRIMERO_EL_MAS_CERCANO,
  inyectiva = true
) {
  if (cadena1 == undefined || cadena2 == undefined) {
    //Si alguna de las cadenas no está definida
    return 0;
  }
  let len1 = cadena1.length;
  let len2 = cadena2.length;
  if (len1 == 0 || len2 == 0) {
    /*
    1. similitud simple
    1.1 Violación de la Definiciòn 1
    Alguna de las cadenas no tiene caracteres
    */
    return 0;
  }
  if (cadena1 == cadena2) {
    /*
    1. similitud simple
    1.2 Caso de igualdad de cadenas
    las cadenas son iguales
    */
    return 1;
  }
  if (len1 > len2) {
    //Aseguramos que la cadena1 sea más corta que la cadena 2
    //len1<=len2
    let temp = cadena1;
    cadena1 = cadena2;
    cadena2 = temp;
    len1 = cadena1.length;
    len2 = cadena2.length;
  }
  if (inyectiva && cadena2.startsWith(cadena1)) {
    /*
    2. Similitud potencial
    similitud = similitudPotencial
    */
    return len1 / len2;
  }

  let caracterVinculado = []; //marcas para asegurar que Fe sea inyectiva
  for (let j = 0; j < len2; j++) {
    caracterVinculado.push(false); //asegura que inicialmente ningún i está vinculado
  }

  let sum = 0;
  for (let i = 0; i < len1; i++) {
    let Fe;
    switch (criterio) {
      case PRIMERO_EN_COLA:
        Fe = Fe_primeroEnCola(i, cadena1, cadena2, caracterVinculado);
        break;
      case PRIMERO_EL_MAS_CERCANO:
      default:
        Fe = Fe_primeroElMasCercano(i, cadena1, cadena2, caracterVinculado);
        break;
    }
    if (Fe == undefined) {
      continue;
    }
    distancia = Math.abs(i - Fe);
    lat = Math.max(i + 1, len2 - i);
    vpd = distancia / lat;
    sc = 1 - vpd;
    sum += sc;
    if (inyectiva) {
      caracterVinculado[Fe] = true;
    }
  }

  let similitud = sum / len2;

  return similitud;

  function Fe_primeroEnCola(i, cadena1, cadena2, caracterVinculado) {
    let len2 = cadena2.length;
    for (let j = 0; j < len2; j++) {
      if (!caracterVinculado[j] && cadena1[i] == cadena2[j]) {
        return j;
      }
    }
    return undefined;
  }

  function Fe_primeroElMasCercano(i, cadena1, cadena2, caracterVinculado) {
    /*
    Implementación de la función de emparejamiento con 
    el criterio de primero el más cercano
     */
    let len2 = cadena2.length;
    for (let d = 0; ; d++) {
      let j1 = i - d;
      let j2 = i + d;
      if (j1 < 0 && j2 >= len2) {
        break;
      }
      if (j1 >= 0) {
        if (!caracterVinculado[j1] && cadena1[i] == cadena2[j1]) {
          return j1;
        }
      }
      if (j2 < len2) {
        if (!caracterVinculado[j2] && cadena1[i] == cadena2[j2]) {
          return j2;
        }
      }
    }
    return undefined;
  }
}

function BusquedaAcertada(cadena1, cadena2) {
  cadena1 = cadena1.normalizar();
  cadena2 = cadena2.normalizar();
  if (
    cadena1 == undefined ||
    cadena2 == undefined ||
    cadena1.length == 0 ||
    cadena2.length == 0
  ) {
    return 0;
  }
  if (cadena1.length > cadena2.length) {
    let temp = cadena1;
    cadena1 = cadena2;
    cadena2 = temp;
  }
  let simil = 0;
  let maxsimil = 0;
  let similp = 0;
  let coinci = 0;
  if (cadena1.split(" ").length >= 5) {
    let palabra3 = cadena1.eraseAll(" ");
    let palabra4 = cadena2.eraseAll(" ");
    simil = Math.max(
      similitud(cadena1, cadena2),
      similitud(palabra3, palabra4)
    );
    maxsimil = Math.max(
      maxSimilitud(cadena1, cadena2),
      maxSimilitud(palabra3, palabra4)
    );
    similp = Math.max(
      similtudPromedio(cadena1, cadena2),
      similtudPromedio(palabra3, palabra4)
    );
    coinci = Math.max(
      Coincidencia(cadena1, cadena2),
      Coincidencia(palabra3, palabra4)
    );
  } else {
    simil = similitud(cadena1, cadena2);
    maxsimil = maxSimilitud(cadena1, cadena2);
    similp = similtudPromedio(cadena1, cadena2);
    coinci = Coincidencia(cadena1, cadena2);
  }

  let a = 4.25;
  let b = 3.15;
  let c = 2.2;
  return (
    (a * simil + 1.2 * a * maxsimil + b * coinci + c * similp) /
    (2.2 * a + b + c)
  );
}

function similtudPromedio(palabra1, palabra2) {
  if (
    palabra1 == null ||
    palabra2 == null ||
    palabra1.length == 0 ||
    palabra2.length == 0
  ) {
    return 0;
  }
  if (palabra1.length > palabra2.length) {
    let temp = palabra1;
    palabra1 = palabra2;
    palabra2 = temp;
  }
  let palabras1 = palabra1.split(" ");
  let palabras2 = palabra2.split(" ");
  let promedio = 0;
  for (let i = 0; i < palabras1.length; i++) {
    let max = 0;
    for (let j = 0; j < palabras2.length; j++) {
      max = Math.max(max, similitud(palabras1[i], palabras2[j]));
      if (max == 1) {
        break;
      }
    }
    promedio += max;
  }
  return promedio / palabras1.length;
}

function maxSimilitud(palabra1, palabra2) {
  if (
    palabra1 == null ||
    palabra2 == null ||
    palabra1.length == 0 ||
    palabra2.length == 0
  ) {
    return 0;
  }
  if (palabra1.length > palabra2.length) {
    let temp = palabra1;
    palabra1 = palabra2;
    palabra2 = temp;
  }
  let max = 0;
  let palabras1 = palabra1.split(" ");
  let palabras2 = palabra2.split(" ");
  for (const palabras11 of palabras1) {
    for (const palabras21 of palabras2) {
      max = Math.max(max, similitud(palabras11, palabras21));
      if (max == 1) {
        return 1;
      }
    }
  }
  return Math.max(max, similitud(palabra1, palabra2));
}

//COMPARACIÓN

function Coincidencia(palabra1, palabra2) {
  if (
    palabra1 == null ||
    palabra2 == null ||
    palabra1.length == 0 ||
    palabra2.length == 0
  ) {
    return 0;
  }
  if (palabra1.length > palabra2.length) {
    let temp = palabra1;
    palabra1 = palabra2;
    palabra2 = temp;
  }
  let valoración = 0;

  if (palabra1.equals(palabra2)) {
    return 1;
  }
  let palabras1 = palabra1.trim().split(" ");
  let len2 = palabra2.length;
  for (const prueba of palabras1) {
    if (CoincidenciaSimple(prueba, palabra2) == 1) {
      valoración += prueba.length / len2;
      continue;
    }
    valoración += (maxSimilitud(prueba, palabra2) * prueba.length) / len2;
  }
  return valoración;
}

function CoincidenciaSimple(palabra1, palabra2) {
  if (
    palabra1 == null ||
    palabra2 == null ||
    palabra1.length == 0 ||
    palabra2.length == 0
  ) {
    return 0;
  }
  if (palabra1.contains(palabra2) || palabra2.contains(palabra1)) {
    return 1;
  }
  let palabras2 = palabra2.trim().split(" ");
  for (const string of palabras2) {
    if (palabra1.contains(string)) {
      return 1;
    }
  }
  return 0;
}
