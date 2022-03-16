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
                    pez: loadImage("https://i.ibb.co/phvXBP8/fish-unscreen-1.gif"),
                    agua: loadImage("https://i.ibb.co/NTvPHG4/CK2ea0R.gif"),
                    loto: loadImage("https://i.ibb.co/0CrhhhV/pixlr-bg-result.png"),
               }
          }

          peces = []

          function setup() {
               createCanvas(800, 500)
               img.agua.actualFrame = 0
               for (let i = 0; i < 10; i++) {
                    peces.push(new Pez())
               }
          }

          function draw() {
               background("white")
               dibujarPeces()
               dibujarAgua()
               dibujarLoto()
               fullscreen();
          }

          function dibujarPeces() {
               for (const p of peces) {
                    p.dibujar()
               }
          }

          class Pez {
               constructor() {
                    let angulo_inicio = random(2 * PI)
                    this.posicion = p5.Vector.fromAngle(angulo_inicio, random(100, 300))
                    this.posicion.add(width / 2, height / 2)
                    this.aceleracion = createVector(
                         -sin(angulo_inicio), cos(angulo_inicio)
                    ).mult((random() < 0.5 ? -1 : 1) * random(5, 10))
                    this.escala = random(0.2, 0.5)
                    this.hue = random(0, 360)
               }

               dibujar() {
                    push()
                    this.posicion.add(this.aceleracion.copy().mult(0.2))
                    this.aceleracion.add(
                         p5.Vector.fromAngle(
                              atan2(
                                   this.posicion.y - height / 2,
                                   this.posicion.x - width / 2
                              ),
                              -0.1
                         )
                    )
                    applyMatrix(
                         this.escala, 0,
                         0, this.escala,
                         this.posicion.x, this.posicion.y
                    )
                    rotate(this.aceleracion.heading() - PI / 2)
                    drawingContext.filter = `hue-rotate(${this.hue}deg)`
                    image(img.pez, 0, 0)
                    pop()
               }
          }

          function dibujarAgua() {
               push()
               drawingContext.globalAlpha = 0.2
               img.agua.setFrame(int(img.agua.actualFrame))
               img.agua.actualFrame += 0.2
               img.agua.actualFrame %= img.agua.numFrames()
               image(img.agua, 0, 0, width, height)
               pop()
          }

          function dibujarLoto() {
               push()
               applyMatrix(
                    1 + sin(frameCount / 40) / 40, 0,
                    0, 1 + sin(frameCount / 40) / 40,
                    width / 2 - 130 / 2, height / 2 - 100 / 2
               )
               image(img.loto, 0, 0, 130, 100)
               pop()
          }
     </script>
</body>

</html>