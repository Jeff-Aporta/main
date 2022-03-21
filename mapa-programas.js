let mapa_programas = [
  {
    LABEL: "CIENCIA",
    HTML: `
    Algoritmos que se usan en otras ramas de la ciencia, tales como estadística o metrología.
    `,
    CHILDS: [
      {
        LABEL: "Cadenas de Markov",
        HTML:
          `Esta es una aplicación que desarrollé como trabajo para la universidad, 
                    en la asignatura de estructura de datos. es un algoritmo básico y  
                    limitado, que dado un estado inicial ` +
          LaTeX("X_0=[a,b,c,...,z]", ``) +
          ` y una matriz de 
                    transición M, determina los siguientes estados de tendencia, en general ` +
          HTMLlightboxLaTeX(
            `\\vec{x_n} = \\vec{x_{n-1}} M`,
            ``,
            "Cadenas de markov"
          ) +
          `
          <br>
          <br>
          <div style="text-align:center;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Markovkate_01.svg/1024px-Markovkate_01.svg.png" data-lightbox-group="Regresión lineal"  class="miniatura-cuadrada">
          </div>
          `,
        URL: "cadenas-de-markov/",
      },
      {
        LABEL: "Regresión Lineal",
        HTML: `
        Es una técnica usada para predecir ciertos conjuntos de datos que tienen una dispersión
        lineal, pero que no están alineados. Este algoritmo es usado en fisica o estadistica
        para reducir margenes de error.
        <br>
        <br>
        ${HTMLlightboxLaTeX("y = ax+b", ``, "Regresión lineal")}
        <br>
        <br>
        <div style="text-align:center;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Linear_regression.svg/350px-Linear_regression.svg.png" data-lightbox-group="Regresión lineal"  class="miniatura-cuadrada">
        </div>
        `,
        URL: "regresion-lineal/",
      },
      {
        LABEL: "Distribución de Poisson",
        HTML: `
        Es una técnica usada en algunos casos para poder predecir una variable aleatoria x, con respecto
        a una media µ.
        <br>
        <br>
        ${HTMLlightboxLaTeX(
          "P(x) = \\frac{e^{-\\mu}\\cdot\\mu^x}{x!}",
          ``,
          "Distribución de Poisson"
        )}
        <br>
        <br>
        <div style="text-align:center;">
          <img src="https://i.ibb.co/GPNZQkZ/poisson.png" data-lightbox-group="Distribución de Poisson"  class="miniatura-cuadrada">
        </div>
        `,
        URL: "distribucion-de-poisson/",
      },
    ],
  },
  {
    LABEL: "Estructura de datos",
    HTML: `
          Manejo perfectamente las estructuras de vectores, matrices en n dimensiones y listas, 
          estas son esenciales para cualquier lenguaje de programación y además de estas estructuras 
          manejo brevemente otras como las que mostraré a continuación.
          `,
    CHILDS: [
      {
        LABEL: "Arboles Binarios",
        HTML: `
        Esta es una aplicación que desarrollé con el fin de poder brindar la facilidad a cualquier 
        persona de poder modelar un árbol binario con unos pocos clics, y además brindando de forma
        inmediata los recorridos preorden, inorden y postorden.
        <br>
        <br>
        <div style="text-align:center;">
          <img src="https://i.ibb.co/09nvD4c/bt.png" data-lightbox-group="Arboles binarios"  class="miniatura-cuadrada">
        </div>
        `,
        URL: "estructura-de-datos/arboles-binarios-recorridos/",
      },
      {
        LABEL: "Torres de Hanói",
        HTML: `Este algoritmo lo descubrí en el año 2019, es una serie de pasos a seguir para
        poder dar generación automática del camino a seguir para solucionar las torres de Hanói,
        aunque ya hay algoritmos para resolver las torres de Hanói, este se diferencia en que este
        se puede realizar de forma manual con papel y lapíz.
        <br>
        <br>
        <div style="text-align:center;position:relative;">
          <img src="https://i.ibb.co/ZWMqB9H/torres-de-hano.png" data-lightbox-group="torres de hanoi" class="miniatura-cuadrada">
        </div>
        `,
        URL: "estructura-de-datos/arboles-binarios-Torres-de-hanoi/",
      },
      {
        LABEL: "Modelador de Grafos y Dijkstra",
        HTML: `
        Con está aplicación, se podrá modelar gráficamente grafos, obtener sus elementos caracteristicos 
        y además podrás ejecutar el algoritmo de Dijkstra para poder encontrar el camino más corto entre 
        un nodo y otro 
        <br>
        <br>
        <div style="text-align:center;position:relative;">
          <img src="https://i.ibb.co/s2DzBCY/Nodos-6.png" data-lightbox-group="torres de hanoi" class="miniatura-cuadrada">
        </div>
        `,
        URL: "Grafos/",
      },
    ],
  },
  {
    LABEL: "Algebra Lineal",
    HTML: `
          Manejo bien el concepto de vectores, matrices, transformaciones lineales e inversas
          `,
    CHILDS: [
      {
        LABEL: "Proyección ortogonal",
        HTML: `
        la proyección ortogonal es aquella cuyas rectas proyectantes auxiliares son perpendiculares 
        a la recta de proyección, estableciéndose una relación entre todos los puntos del elemento 
        proyectante con los proyectado.
        <br><br>
        <img src="https://i.ibb.co/09QGVrM/proy-a-b.png" data-lightbox-group="proyección ortogonal" class="miniatura-cuadrada">
        `,
        URL: "https://editor.p5js.org/Jeff-Aporta/sketches/ksKMrBxek",
      },
      {
        LABEL: "Recta Vectorial",
        HTML: `
        Esta es una de mis ecuaciones favoritas, porque permiten pasar transitivamente de un estado
        a otro graficamente, está ecuación tiene multiples aplicaciones.
        <br>
        Dado un estado ${LaTeX("\\vec{a}")} y un estado ${LaTeX(
          "\\vec{b}"
        )}, para pasar
        transitivamente del estado ${LaTeX("\\vec{a}")} al ${LaTeX(
          "\\vec{b}"
        )} se aplica la 
        siguiente ecuación
        ${HTMLlightboxLaTeX(
          `\\vec{r}(t)=(\\vec{b}-\\vec{a})t+\\vec{a}`,
          "",
          "Recta vectorial"
        )}
        `,
        URL: "https://editor.p5js.org/Jeff-Aporta/sketches/kEuExklg8",
      },
      {
        LABEL: "intersección recta-círculo",
        HTML: `
        Algoritmo que en determina de forma exacta las intersecciones entre una recta y un circulo
        <br>
        Para la intersección de la recta y el círculo:
        <br>
        ${HTMLlightboxLaTeX(`Ax+By+C=0`, ``, "line-circle-intersect")}
        <br>
        ${HTMLlightboxLaTeX(`x^2+y^2=r^2`, ``, "line-circle-intersect")}
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Is-circle-line-s.svg" data-lightbox-group="line-circle-intersect" class="miniatura-cuadrada">
  
        `,
        URL: "https://editor.p5js.org/Jeff-Aporta/sketches/ecBurGM3N",
      },
    ],
  },
  {
    LABEL: "Arte",
    HTML: ``,
    CHILDS: [
      {
        LABEL: "Poligonometrismo",
        HTML: `
        Este software fue desarrollado e inventado por mi y es la base fundamentar con 
        la que desaarrolló el tipo de dibujos geométricos que hago, funciona fragmentando funciones de forma simetrica.
        <br>
        <br>
        <div style="text-align:center">
          <img src="https://i.ibb.co/25XpW5H/Ecuaciones-007.png" data-lightbox-group="poligonometrismo" class="miniatura-cuadrada">
        </div>
        `,
        URL: "poligonometrismo/",
      },
    ],
  },
  {
    LABEL: "Animaciones",
    HTML: ``,
    CHILDS: [
      {
        LABEL: "Starfield",
        HTML: `
        La primera vez que vi este efecto fue en Windows 95, y cuando empecé a estudiar computación
        gráfica este fue uno de los primeros proyectos que realicé.
        Y además hice un video explicando el proceso completo para llegar al resultado
        <br>
        <br>
        <div style="text-align:center;">
          <iframe class="youtube-frame" src="https://www.youtube.com/embed/SDnhXcOZiXM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `,
        URL: "Starfield/",
      },
      {
        LABEL: "Estanque de peces",
        HTML: `
        Trata de unos peces dentro de un estanque que se mueven de forma satelital al rededor de
        unas flores que simulan ser puntos de atracción, el movimiento es suave y pareciera 
        aleatorio.
        Hice un video explicando el proceso completo para llegar al resultado
        <br>
        <br>
        <div style="text-align:center;">
              <iframe class="youtube-frame" src="https://www.youtube.com/embed/0cvC6XRYz24" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `,
        URL: "Estanque-de-peces/",
      },
      {
        LABEL: "Tierra y luna",
        HTML: `
        Esta es una animación impactante, porque con unas 
        pocas líneas de código se logra un efecto muy bueno, aplicando transformaciones lineales y
        de traslación.
        <br>
        <br>
        <div style="text-align:center;">
            <iframe class="youtube-frame" src="https://www.youtube.com/embed/ijqsaG5qp3Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `,
        URL: "_p5.js/Planeta/",
      },
    ],
  },
  {
    LABEL: "Algoritmos",
    HTML: ``,
    CHILDS: [
      {
        LABEL: "Liquidos con Ley de Hooke",
        HTML: `
        Este es un algori
        `,
        URL: "liquido-ley-de-hooke/",
      },
      {
        LABEL: "Juego de la Vida de Conway",
        HTML: ``,
        URL: "juego-de-la-vida-conway/",
      },
      {
        LABEL: "Árbol recursivo",
        HTML: ``,
        URL: "Arbol-recursivo/",
      },
      {
        LABEL: "Conjunto de Mandelbrot",
        HTML: ``,
        URL: "Mandelbrot-Set/",
      },
      {
        LABEL: "Espiral de Ulam",
        HTML: ``,
        URL: "_p5.js/espiral-de-ulam/",
      },
      {
        LABEL: "Ruido de Perlin",
        HTML: ``,
        URL: "_p5.js/perlin-noise/",
      },
    ],
  },
  {
    LABEL: "Utilidades",
    HTML: ``,
    CHILDS: [
      {
        LABEL: "Simulación de dados",
        HTML: ``,
        URL: "simulador-de-dados/",
      },
      {
        LABEL: "Temporizador (tipo moneda en 3D)",
        HTML: ``,
        URL: "temporizador-tipo-moneda/",
      },
      {
        LABEL: "Cubo de imágenes",
        HTML: ``,
        URL: "cubo-de-imagenes/",
      },
    ],
  },
  {
    LABEL: "Juegos elementales",
    HTML: `
    En esta parte están agrupados un conjunto de programas de juegos cortos, 
    pueden ser considerados minijuegos, y su elaboración fue en corto tiempo.
    Estos juegos forman parte de una serie de retos que me propuse a mi mismo 
    para entender mejor los lenguajes de programación HTML, CSS y JS
    `,
    CHILDS: [
      {
        LABEL: "Pong solitario",
        HTML: `
            Desarrollé un versionamiento de Pong (1972), y además hice 
            un video explicando el proceso completo para llegar al 
            resultado.
            <br><br>
            <div style="text-align:center;">
                  <iframe class="youtube-frame" src="https://www.youtube.com/embed/MCEl05ZbZ80" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            `,
        URL: "pong-solitario/",
      },
      {
        LABEL: "Tetris",
        HTML: `
                    Desarrollé un versionamiento de Tetris (1984), y además hice 
                    un video explicando el proceso completo para llegar al 
                    resultado.
                    <br><br>
                    <div style="text-align:center;">
                         <iframe class="youtube-frame" src="https://www.youtube.com/embed/y_rnUOHUoQ4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    `,
        URL: "tetris/",
      },
      {
        LABEL: "Juego de preguntas v1",
        HTML: `
                    Desarrollé un juego de preguntas y respuestas inspirado en pregunta2 que tiene la 
                    posibilidad de mostrar imagenes de apoyo a la pregunta, cuenta con una base de datos 
                    de al rededor de más de 1100 preguntas.
                    <br><br>
                    <div style="text-align:center;">
                         <iframe class="youtube-frame" src="https://www.youtube.com/embed/HHDCktzuUCk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    `,
        URL: "juego-de-preguntas/juego-de-preguntas-v1/",
      },
      {
        LABEL: "Buscaminas",
        HTML: `
                    Desarrollé un versionamiento de Buscaminas (1989), y además hice un video explicando el proceso 
                    completo para llegar al resultado.
                    <br><br>
                    <div style="text-align:center;">
                         <iframe class="youtube-frame" src="https://www.youtube.com/embed/xwapo6FFhnQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    `,
        URL: "buscaminas/",
      },
      {
        LABEL: "Flappy Bird",
        HTML: `
                    Desarrollé un versionamiento de Flappy bird (2013), y además hice un video explicando el proceso 
                    completo para llegar al resultado.
                    <br><br>
                    <div style="text-align:center;">
                         <iframe class="youtube-frame" src="https://www.youtube.com/embed/nfNe-SPlumY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    `,
        URL: "flappy-bird/",
      },
    ],
  },
];
