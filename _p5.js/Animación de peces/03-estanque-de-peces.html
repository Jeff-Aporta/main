<!DOCTYPE html>
<html lang="en">

<head>
     <title>Animación de peces</title>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
</head>

<body>
     <script>

          function preload() {
               img = {
                    suelo: loadImage("https://i.ibb.co/pJDjpBj/01.jpg"),
                    pez: loadImage("https://i.ibb.co/phvXBP8/fish-unscreen-1.gif"),
                    agua: loadImage("https://i.ibb.co/NTvPHG4/CK2ea0R.gif"),
                    loto: loadImage("https://i.ibb.co/0CrhhhV/pixlr-bg-result.png"),
                    hoja: loadImage("https://i.ibb.co/5RCcSm7/pixlr-bg-result-1.png")
               }
          }

          peces = []
          lotos = []
          hojas = []

          function setup() {
               createCanvas(900, 510)
               img.agua.actualFrame = 0
               img.pez.actualFrame = 0
               for (let i = 0; i < 15; i++) {
                    peces.push(new Pez())
               }
               let quiebres = 2
               let l = new Loto(width / 2, height / 2)
               l.dibujar = () => {
               }
               lotos.push(l)
               for (let i = 0; i < quiebres; i++) {
                    let x = 250 * cos(i * 2 * PI / quiebres) + width / 2
                    let y = 200 * sin(i * 2 * PI / quiebres) + height / 2
                    lotos.push(new Loto(x, y))
               }
               for (let i = 0; i < 15; i++) {
                    hojas.push({
                         x: random(width),
                         y: random(height),
                         escala: random(0.05, 0.2),
                         angulo: random(2 * PI)
                    })
               }
          }

          function draw() {
               image(img.suelo, 0, 0, width, height)
               background(0, 0, 0, 50)
               dibujarPeces()
               dibujarAgua()
               dibujarHojas()
               dibujarLoto()
          }

          function dibujarHojas() {
               for (const h of hojas) {
                    push()
                    h.x += 0.3 * random(-1, 1) + random(0.5)
                    h.y += 0.3 * random(-1, 1) + random(0.5)
                    translate(h.x, h.y)
                    rotate(h.angulo)
                    scale(h.escala)
                    scale(1 + sin(frameCount / 20) / 10)
                    drawingContext.filter = "drop-shadow(20px 20px 20px rgba(0,0,0,1))"
                    image(img.hoja, 0, 0)
                    pop()
               }

               for (const h of hojas) {
                    if (h.x > width + 30 || h.y > height + 30) {
                         hojas.splice(hojas.indexOf(h), 1)
                         if (random() < 0.5) {
                              hojas.push({
                                   x: -30,
                                   y: random(height),
                                   escala: random(0.05, 0.2),
                                   angulo: random(2 * PI)
                              })
                         } else {
                              hojas.push({
                                   x: random(width),
                                   y: -30,
                                   escala: random(0.05, 0.2),
                                   angulo: random(2 * PI)
                              })
                         }
                    }
               }
          }

          function dibujarPeces() {
               for (const p of peces) {
                    p.dibujar()
               }
          }

          class Loto {
               constructor(x, y) {
                    this.x = x
                    this.y = y
                    this.escala = 0.15
               }

               dibujar() {
                    let pos = createVector(this.x, this.y)
                         .sub(width / 2, height / 2)
                         .rotate(0.001)
                         .add(width / 2, height / 2)
                         .add(0.3 * random(-1, 1), 0.3 * random(-1, 1))
                    this.x = pos.x
                    this.y = pos.y
                    push()
                    translate(this.x, this.y)
                    translate(-img.loto.width * this.escala / 2, -img.loto.height * this.escala / 2)
                    scale(this.escala * (1 + sin(frameCount / 20) / 40))

                    drawingContext.filter = "drop-shadow(20px 20px 20px rgba(0,0,0,1))"
                    image(img.loto, 0, 0)
                    pop()
               }
          }

          class Pez {
               constructor() {
                    let angulo_inicio = random(2 * PI)
                    this.posicion = p5.Vector.fromAngle(angulo_inicio, random(50, 400))
                    this.posicion.add(width / 2, height / 2)
                    this.aceleracion = createVector(
                         -sin(angulo_inicio), cos(angulo_inicio)
                    ).mult((random() < 0.5 ? -1 : 1) * random(100, 400))
                    this.escala = random(0.2, 0.6)
                    this.hue = random(0, 720)
               }

               dibujar() {
                    push()
                    let m = this.aceleracion.copy().mag()
                    this.posicion.add(this.aceleracion.copy().normalize().mult(5 * noise(this.posicion.x, this.posicion.y, frameCount / 10)))
                    for (const l of lotos) {
                         let d = this.posicion.dist(createVector(l.x, l.y))
                         this.aceleracion.add(
                              p5.Vector.fromAngle(
                                   atan2(
                                        this.posicion.y - l.y,
                                        this.posicion.x - l.x
                                   ),
                                   -(d / 600)
                              )
                         )
                    }
                    translate(this.posicion.x, this.posicion.y)
                    rotate(this.aceleracion.heading() - PI / 2)
                    scale(this.escala, this.escala)
                    translate(-img.pez.width / 2, -img.pez.height)
                    drawingContext.filter = `hue-rotate(${this.hue}deg) drop-shadow(10px 10px 10px black)`
                    img.pez.setFrame(int(img.pez.actualFrame))
                    img.pez.actualFrame += 0.2
                    img.pez.actualFrame %= img.pez.numFrames()
                    image(img.pez, 0, 0)
                    pop()
               }
          }

          function dibujarAgua() {
               push()
               drawingContext.globalCompositeOperation = "soft-light"
               //drawingContext.globalAlpha = 0.3
               img.agua.setFrame(int(img.agua.actualFrame))
               img.agua.actualFrame += 0.6
               img.agua.actualFrame %= img.agua.numFrames()
               image(img.agua, 0, 0, width, height)
               pop()
          }

          function dibujarLoto() {
               for (const l of lotos) {
                    l.dibujar()
               }
          }
     </script>
</body>

</html>