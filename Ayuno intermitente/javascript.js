let canvas;

function setup() {
    canvas = createCanvas(300, 300);
    canvas.parent("canvas-contenedor")
    if (!cookie("momento inicio")) {
        createCookie("momento inicio", ms_actual())
        createCookie("tiempo a calcular", h2ms(8))
    }
    textAlign(CENTER, CENTER)
    frameRate(1)
}

function draw() {
    clear()
    noStroke()
    fill("gray")
    circle(width / 2, height / 2, 270)
    fill(cookie("tiempo a calcular") == h2ms(16) ? "deeppink" : "greenyellow ")
    let porcentaje = (ms_actual() - cookie("momento inicio")) / cookie("tiempo a calcular")
    if (porcentaje > 1) {
        porcentaje = 1
    }
    theta = 2 * PI * porcentaje
    arc(width / 2, height / 2, 300, 300, 0, theta);
    stroke("black")
    strokeWeight(2)
    fill("white")
    textSize(30)
    tiempo_transcurrido = cookie("tiempo a calcular") - (ms_actual() - cookie("momento inicio"))
    tiempo_transcurrido /= 1000
    tiempo_transcurrido = int(tiempo_transcurrido)
    text(
        (cookie("tiempo a calcular") == h2ms(16) ? "16h" : "8h") +
        "\n " + (porcentaje * 100).toFixed(2) + "% " + "\n" + HHMMSS(tiempo_transcurrido),
        width / 2,
        height / 2
    )
}

function HHMMSS(segundos) {
    let signo = segundos < 0 ? "-" : ""
    segundos = abs(segundos)
    let s = segundos % 60
    let m = int((segundos / 60) % 60)
    let h = int((segundos / 60 / 60) % 60)
    return signo + (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s
}

function ms_actual() {
    return Date.now()
}

function h2ms(horas) {
    return horas * 60 * 60 * 1000
}

async function _8h() {
    iniciar(8)
}

async function _16h() {
    iniciar(16)
}

async function iniciar(tiempo) {
    createCookie("momento inicio", ms_actual())
    createCookie("tiempo a calcular", h2ms(tiempo))
}