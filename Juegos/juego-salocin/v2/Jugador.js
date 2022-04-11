class Jugador {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = ESCALA_UNIDAD;
    this.h = ESCALA_UNIDAD;
    //Variables de movimiento
    this.movimiento = createVector(0, 0);
    this.dirección = DOWN_ARROW;
    this.mover = false;
    this.corriendo = false;
    this.piso = -1;
    //Eventos de roll
    this.roll = undefined;
    this.rollDuration = 100;
    this.startRoll = 0;
    this.rollWait = 0;
    //limitadores velocidad
    this.velocidadCaminar = 1;
    this.velocidadRoll = 10;
    //interacción mapa
    this.cuadroDirectamenteSiguiente = createVector(0, 0);
    this.prev_cuadroDirectamenteSiguiente = createVector(0, 0);
  }

  keysLogic() {
    if (keyIsDown(SHIFT) && !this.roll) {
      if (millis() - this.rollWait > 1000) {
        if (
          keyIsDown(DOWN_ARROW) ||
          keyIsDown(UP_ARROW) ||
          keyIsDown(RIGHT_ARROW) ||
          keyIsDown(LEFT_ARROW)
        ) {
          this.roll = this.dirección;
          this.startRoll = millis();
        }
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.movimiento.x += this.velocidadCaminar;
      if (!this.mover) {
        this.dirección = RIGHT_ARROW;
        this.mover = true;
      }
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.movimiento.x -= this.velocidadCaminar;
      if (!this.mover) {
        this.dirección = LEFT_ARROW;
        this.mover = true;
      }
    }
    if (keyIsDown(UP_ARROW)) {
      this.movimiento.y -= this.velocidadCaminar;
      if (!this.mover) {
        this.dirección = UP_ARROW;
        this.mover = true;
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.movimiento.y += this.velocidadCaminar;
      if (!this.mover) {
        this.dirección = DOWN_ARROW;
        this.mover = true;
      }
    }
    if (this.piso == INDEX_TILE_AGUA_PROFUNDA) {
      this.movimiento.x = constrain(
        this.movimiento.x,
        -this.velocidadCaminar * 0.7,
        this.velocidadCaminar * 0.7
      );
      this.movimiento.y = constrain(
        this.movimiento.y,
        -this.velocidadCaminar * 0.7,
        this.velocidadCaminar * 0.7
      );
    } else {
      if (this.roll) {
        switch (this.roll) {
          case DOWN_ARROW:
            this.movimiento = createVector(
              0,
              this.velocidadRoll * (this.corriendo ? 3 : 1)
            );
            break;
          case UP_ARROW:
            this.movimiento = createVector(
              0,
              -this.velocidadRoll * (this.corriendo ? 3 : 1)
            );
            break;
          case RIGHT_ARROW:
            this.movimiento = createVector(
              this.velocidadRoll * (this.corriendo ? 3 : 1),
              0
            );
            break;
          case LEFT_ARROW:
            this.movimiento = createVector(
              -this.velocidadRoll * (this.corriendo ? 3 : 1),
              0
            );
            break;
        }
        if (millis() - this.startRoll >= this.rollDuration) {
          this.roll = undefined;
          this.movimiento = createVector(0, 0);
          this.rollWait = millis();
        }
      } else {
        this.movimiento.x = constrain(
          this.movimiento.x,
          -this.velocidadCaminar * (this.corriendo ? 3 : 1),
          this.velocidadCaminar * (this.corriendo ? 3 : 1)
        );
        this.movimiento.y = constrain(
          this.movimiento.y,
          -this.velocidadCaminar * (this.corriendo ? 3 : 1),
          this.velocidadCaminar * (this.corriendo ? 3 : 1)
        );
      }
    }
  }

  doubleKeyPressed(key) {
    switch (key) {
      case UP_ARROW:
      case DOWN_ARROW:
      case LEFT_ARROW:
      case RIGHT_ARROW:
        this.correr();
        break;
    }
  }

  correr() {
    this.corriendo = true;
    setTimeout(() => {
      if (
        !keyIsDown(UP_ARROW) &&
        !keyIsDown(DOWN_ARROW) &&
        !keyIsDown(LEFT_ARROW) &&
        !keyIsDown(RIGHT_ARROW)
      ) {
        this.corriendo = false;
      } else {
        this.correr();
      }
    }, 500);
  }

  keyReleased() {
    if (keyCode == RIGHT_ARROW) {
      if (this.dirección == RIGHT_ARROW) {
        this.mover = false;
      }
      this.movimiento.x = 0;
    }
    if (keyCode == LEFT_ARROW) {
      if (this.dirección == LEFT_ARROW) {
        this.mover = false;
      }
      this.movimiento.x = 0;
    }
    if (keyCode == UP_ARROW) {
      if (this.dirección == UP_ARROW) {
        this.mover = false;
      }
      this.movimiento.y = 0;
    }
    if (keyCode == DOWN_ARROW) {
      if (this.dirección == DOWN_ARROW) {
        this.mover = false;
      }
      this.movimiento.y = 0;
    }
  }

  escogerSprite() {
    this.piso = indexPerlinNoise(this.cx, this.cy).index;

    this.sprite = sprites.personaje.quieto.derecha;

    if (this.piso == INDEX_TILE_AGUA_PROFUNDA) {
      if (this.dirección == RIGHT_ARROW) {
        this.sprite = sprites.personaje.caminando.derecha;
      }
      if (this.dirección == LEFT_ARROW) {
        this.sprite = sprites.personaje.caminando.izquierda;
      }
      if (this.dirección == DOWN_ARROW) {
        this.sprite = sprites.personaje.caminando.abajo;
      }
      if (this.dirección == UP_ARROW) {
        this.sprite = sprites.personaje.caminando.arriba;
      }
      if (this.sprite.numFrames()) {
        this.sprite.setFrame(Math.floor(this.sprite.aframe));
        this.sprite.aframe =
          (this.sprite.aframe + (this.corriendo ? 0.4 : 0.2)) %
          this.sprite.numFrames();
      }
    } else {
      if (this.mover) {
        if (this.dirección == RIGHT_ARROW) {
          this.sprite = sprites.personaje.caminando.derecha;
        }
        if (this.dirección == LEFT_ARROW) {
          this.sprite = sprites.personaje.caminando.izquierda;
        }
        if (this.dirección == DOWN_ARROW) {
          this.sprite = sprites.personaje.caminando.abajo;
        }
        if (this.dirección == UP_ARROW) {
          this.sprite = sprites.personaje.caminando.arriba;
        }
        if (this.sprite.numFrames()) {
          this.sprite.setFrame(Math.floor(this.sprite.aframe));
          this.sprite.aframe =
            (this.sprite.aframe + (this.corriendo ? 0.4 : 0.2)) %
            this.sprite.numFrames();
        }
        if (this.roll) {
          if (this.sprite.numFrames()) {
            this.sprite.setFrame(Math.floor(this.sprite.aframe));
            this.sprite.aframe =
              (this.sprite.aframe + 1) % this.sprite.numFrames();
          }
        }
      } else {
        if (this.dirección == RIGHT_ARROW) {
          this.sprite = sprites.personaje.quieto.derecha;
        }
        if (this.dirección == LEFT_ARROW) {
          this.sprite = sprites.personaje.quieto.izquierda;
        }
        if (this.dirección == DOWN_ARROW) {
          this.sprite = sprites.personaje.quieto.abajo;
        }
        if (this.dirección == UP_ARROW) {
          this.sprite = sprites.personaje.quieto.arriba;
        }

        if (millis() - sprites.personaje.quieto.parpadeo > 5000) {
          if (this.sprite.numFrames()) {
            if (this.sprite.aframe < this.sprite.numFrames()) {
              this.sprite.aframe = this.sprite.aframe + 0.2;
            } else {
              sprites.personaje.quieto.parpadeo = millis();
              this.sprite.aframe = 0;
            }
          }
        }
      }
    }

    this.sprite.setFrame(Math.floor(this.sprite.aframe));
  }

  marcarCuadroDirectamenteSiguiente() {
    noFill();
    let dborde = 0.7;
    let alpha = 128;
    switch (this.dirección) {
      case RIGHT_ARROW:
        if (this.pisoDerecha) {
          stroke(
            this.pisoDerecha.color[0] * dborde,
            this.pisoDerecha.color[1] * dborde,
            this.pisoDerecha.color[2] * dborde,
            alpha
          );
        }
        this.cuadroDirectamenteSiguiente.set(this.cxDerecha, this.cyDerecha);
        break;
      case LEFT_ARROW:
        if (this.pisoIzquierda) {
          stroke(
            this.pisoIzquierda.color[0] * dborde,
            this.pisoIzquierda.color[1] * dborde,
            this.pisoIzquierda.color[2] * dborde,
            alpha
          );
        }
        this.cuadroDirectamenteSiguiente.set(
          this.cxIzquierda,
          this.cyIzquierda
        );
        break;
      case DOWN_ARROW:
        if (this.pisoAbajo) {
          stroke(
            this.pisoAbajo.color[0] * dborde,
            this.pisoAbajo.color[1] * dborde,
            this.pisoAbajo.color[2] * dborde,
            alpha
          );
        }
        this.cuadroDirectamenteSiguiente.set(this.cxAbajo, this.cyAbajo);
        break;
      case UP_ARROW:
        if (this.pisoArriba) {
          stroke(
            this.pisoArriba.color[0] * dborde,
            this.pisoArriba.color[1] * dborde,
            this.pisoArriba.color[2] * dborde,
            alpha
          );
        }
        this.cuadroDirectamenteSiguiente.set(this.cxArriba, this.cyArriba);
        break;
    }
    this.prev_cuadroDirectamenteSiguiente.set(
      lerp(
        this.prev_cuadroDirectamenteSiguiente.x,
        this.cuadroDirectamenteSiguiente.x,
        0.1
      ),
      lerp(
        this.prev_cuadroDirectamenteSiguiente.y,
        this.cuadroDirectamenteSiguiente.y,
        0.1
      )
    );
    rect(
      this.prev_cuadroDirectamenteSiguiente.x * ESCALA_UNIDAD,
      this.prev_cuadroDirectamenteSiguiente.y * ESCALA_UNIDAD,
      this.w,
      this.h
    );
  }

  draw() {
    push();

    this.keysLogic();

    this.x += this.movimiento.x;
    this.y += this.movimiento.y;

    //noFill();
    //stroke("white");
    //rect(this.cx * ESCALA_UNIDAD, this.cy * ESCALA_UNIDAD, this.w, this.h);
    this.marcarCuadroDirectamenteSiguiente();

    /* rectMode(CENTER);
    stroke(255, 255, 255, 100);
    rect(this.x, this.y, this.w, this.h); */

    this.cxDerecha = this.cx + 1;
    this.cyDerecha = this.cy;

    this.cxIzquierda = this.cx - 1;
    this.cyIzquierda = this.cy;

    this.cxAbajo = this.cx;
    this.cyAbajo = this.cy + 1;

    this.cxArriba = this.cx;
    this.cyArriba = this.cy - 1;

    this.pisoDerecha = indexPerlinNoise(this.cxDerecha, this.cyDerecha);
    this.pisoIzquierda = indexPerlinNoise(this.cxIzquierda, this.cyIzquierda);
    this.pisoArriba = indexPerlinNoise(this.cxArriba, this.cyArriba);
    this.pisoAbajo = indexPerlinNoise(this.cxAbajo, this.cyAbajo);

    if (this.piso == INDEX_TILE_AGUA_PROFUNDA) {
      if (
        this.movimiento.x > 0 &&
        this.pisoDerecha.index != INDEX_TILE_AGUA_PROFUNDA
      ) {
        this.x = Math.round(this.x);
      }
      if (
        this.movimiento.x < 0 &&
        this.pisoIzquierda.index != INDEX_TILE_AGUA_PROFUNDA
      ) {
        this.x = Math.round(this.x);
      }
      if (
        this.movimiento.y < 0 &&
        this.pisoArriba.index != INDEX_TILE_AGUA_PROFUNDA
      ) {
        this.y = Math.floor(this.y);
      }
      if (
        this.movimiento.y > 0 &&
        this.pisoAbajo.index != INDEX_TILE_AGUA_PROFUNDA
      ) {
        this.y = Math.round(this.y);
      }
    }

    translate(this.x, this.y);
    luces.translate(this.x, this.y);

    this.escogerSprite();

    if (this.piso == INDEX_TILE_AGUA_PROFUNDA) {
      image(
        this.sprite.get(0, 0, this.sprite.width, this.sprite.height * 0.7),
        -this.w * 0.5,
        -this.h * 0.3,
        this.w,
        this.h * 0.7
      );
    } else {
      image(this.sprite, -this.w / 2, -this.h / 2, this.w, this.h);
    }

    this.dibujarLinterna();

    if (this.roll) {
      push();
      luces.push();
      blendMode(SCREEN);
      fill("white");
      var gradient = drawingContext.createLinearGradient(
        this.w / 2,
        this.h / 2,
        -this.w / 2,
        this.h / 2
      );
      gradient.addColorStop(0, "white");
      gradient.addColorStop(0.1, "yellow");
      gradient.addColorStop(0.2, "orange");
      gradient.addColorStop(1, "transparent");
      drawingContext.fillStyle = gradient;
      luces.drawingContext.fillStyle = gradient;
      noStroke();
      if (this.roll == UP_ARROW) {
        rotate(-PI / 2);
        luces.rotate(-PI / 2);
      }
      if (this.roll == LEFT_ARROW) {
        rotate(PI);
        luces.rotate(PI);
      }
      if (this.roll == DOWN_ARROW) {
        rotate(PI / 2);
        luces.rotate(PI / 2);
      }
      circle(0, 0, this.w);
      luces.circle(0, 0, this.w);
      pop();
      luces.pop();
    }
    pop();
  }

  dibujarLinterna() {
    if (FACTOR_TIEMPO < 0.45) {
      luces.push();
      let radioLuz = 12;
      if (this.movimiento.y < 0) {
        if (this.movimiento.x > 0) {
          luces.rotate(-PI / 4);
        } else if (this.movimiento.x < 0) {
          luces.rotate((-3 * PI) / 4);
        } else {
          luces.rotate(-PI / 2);
        }
      } else if (this.movimiento.y > 0) {
        if (this.movimiento.x > 0) {
          luces.rotate(PI / 4);
        } else if (this.movimiento.x < 0) {
          luces.rotate((3 * PI) / 4);
        } else {
          luces.rotate(PI / 2);
        }
      } else {
        if (this.dirección == UP_ARROW) {
          rotate(-PI / 2);
          luces.rotate(-PI / 2);
        }
        if (this.dirección == LEFT_ARROW) {
          rotate(PI);
          luces.rotate(PI);
        }
        if (this.dirección == DOWN_ARROW) {
          rotate(PI / 2);
          luces.rotate(PI / 2);
        }
      }
      luces.drawingContext.globalCompositeOperation = "destination-out";
      luces.image(
        sprites.luz_radial,
        (-radioLuz * ESCALA_UNIDAD) / 2,
        (-radioLuz * ESCALA_UNIDAD) / 2,
        radioLuz * ESCALA_UNIDAD + ESCALA_UNIDAD * 0.6,
        radioLuz * ESCALA_UNIDAD
      );
      luces.pop();
    }
  }
}
