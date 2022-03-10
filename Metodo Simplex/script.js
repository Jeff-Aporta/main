OBTENER_MATRIZ = 0
COLUMNA_PIVOTE = 1
FILA_PIVOTE = 2
CONVERTIR_FILA_PIVOTE_EN_1 = 3
CONVERTIR_COLUMNA_PIVOTE_EN_0 = 4

PASO = -1

MatrizHTML = []
Matriz = []

function siguiente() {
    switch (PASO) {
        case -1:
            PASO = OBTENER_MATRIZ;
            document.getElementById("tabla").setAttribute("contenteditable", "false")
            break
        case CONVERTIR_COLUMNA_PIVOTE_EN_0:
            PASO = OBTENER_MATRIZ
            break
        default:
            PASO++
    }
    switch (PASO) {
        case OBTENER_MATRIZ:
            obtenerMatrizHTML();
            break
        case COLUMNA_PIVOTE:
            obtenerColumnaPivote()
            break
        case FILA_PIVOTE:
            obtenerFilaPivote()
            break
        case CONVERTIR_FILA_PIVOTE_EN_1:
            convertirFilaPivoteEn1()
            break
        case CONVERTIR_COLUMNA_PIVOTE_EN_0:
            convertirColumnaPivoteEn0()
    }
}

function convertirColumnaPivoteEn0() {
    for (let i = 0; i < FILAS(); i++) {
        if (i == FilaPivote) {
            continue
        }
        console.log(i)
        factor = -Matriz[i][ColumnaPivote]
        for (let j = 0; j < COLUMNAS(); j++) {
            Matriz[i][j] += factor * Matriz[FilaPivote][j]
            MatrizHTML[i][j].innerHTML = recortarDecimales(Matriz[i][j], 8)
        }
    }

}

function COLUMNAS() {
    filasTR = document.getElementById("tabla").querySelectorAll("tr")
    columnasTD = filasTR[0].querySelectorAll("td")
    return columnasTD.length - 1
}

function FILAS() {
    filasTR = document.getElementById("tabla").querySelectorAll("tr")
    return filasTR.length - 1
}

function recortarDecimales(n, cd) {
    for (let i = 0; i < cd; i++) {
        if (n == Number(n.toFixed(i))) {
            return n.toFixed(i)
        }
    }
    return n.toFixed(cd)
}

function convertirFilaPivoteEn1() {
    let factor = 1 / Matriz[FilaPivote][ColumnaPivote];
    for (let i = 0; i < COLUMNAS(); i++) {
        Matriz[FilaPivote][i] *= factor
        MatrizHTML[FilaPivote][i].innerHTML = recortarDecimales(Matriz[FilaPivote][i], 8)
    }
}

ColumnaPivote = -1
FilaPivote = -1

function obtenerColumnaPivote() {
    valor = Number.MAX_VALUE
    for (let C = 1; C < COLUMNAS() - 1; C++) {
        if (Matriz[0][C] != 0) {
            if (Matriz[0][C] < valor) {
                valor = Matriz[0][C]
                ColumnaPivote = C
            }
        }
    }
    console.log(ColumnaPivote)
    for (let i = 0; i < FILAS(); i++) {
        MatrizHTML[i][ColumnaPivote].style.background = "lightgreen"
    }
}

function obtenerFilaPivote() {
    let min = Number.MAX_VALUE
    for (let i = 1; i < FILAS(); i++) {
        let det = Matriz[i][COLUMNAS() - 1] / Matriz[i][ColumnaPivote]
        if (det < min) {
            min = det
            FilaPivote = i
        }
    }
    for (let i = 0; i < COLUMNAS(); i++) {
        MatrizHTML[FilaPivote][i].style.background = "lightblue"
    }
    MatrizHTML[FilaPivote][ColumnaPivote].style.background = "gold"
}

function limpiarMatrizHTML() {
    for (let i = 0; i < FILAS(); i++) {
        for (let C = 0; C < COLUMNAS(); C++) {
            MatrizHTML[F][C].style.background = "transparent"
        }
    }
}


function obtenerMatrizHTML() {
    Matriz = []
    MatrizHTML = []
    fila = []
    filaHTML = []
    for (let F = 0; F < FILAS(); F++) {
        for (let C = 0; C < COLUMNAS(); C++) {
            n = Number(document.getElementById(`e${C+1}${F+1}`).innerHTML)
            console.log(`e${C+1}${F+1}=${n}`)
            fila.push(n)
            filaHTML.push(document.getElementById(`e${C+1}${F+1}`));
            document.getElementById(`e${C+1}${F+1}`).style.background = "transparent"
        }

        Matriz.push(fila)
        MatrizHTML.push(filaHTML)
        fila = []
        filaHTML = []
    }
    console.log(MatrizHTML)
}