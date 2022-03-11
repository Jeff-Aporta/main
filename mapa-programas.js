let mapa_programas = [
     {
          LABEL: "Métodos numéricos",
          HTML: "",
          CHILDS: [
               {
                    LABEL: "Cadenas de Markov",
                    HTML: "",
                    URL: "Cadenas de Markov/index.html"
               },
               {
                    LABEL: "Regresión Lineal",
                    HTML: "",
                    URL: "regresion-lineal/index.html"
               }
          ]
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
                    Entiendo y manejo el concepto de árbol binario y además dominó sus 3 tipos de 
                    recorridos preorden,  inorden y postorden. He modelado aplicaciones basadas en este concepto con el fin de poder practicar 
                    y afinar mis destrezas como desarrollador.
                    `,
                    URL: "estructura-de-datos/arboles-binarios-recorridos/index.html"
               },
               {
                    LABEL: "Torres de Hanói",
                    HTML: "Generación automática del camino a seguir para solucionar las torres de Hanói",
                    URL: "estructura-de-datos/arboles-binarios-Torres-de-hanoi/index.html"
               }
          ]
     },
     {
          LABEL: "Algebra Lineal",
          HTML: `
          Manejo bien el concepto de vectores, matrices, transformaciones lineales e inversas
          `,
          CHILDS: [
               {
                    LABEL: "Proyección ortogonal",
                    HTML: ``,
                    URL: "https://editor.p5js.org/Jeff-Aporta/sketches/ksKMrBxek"
               },
               {
                    LABEL: "Recta Vectorial",
                    HTML: "Dados dos puntos en el espacio, se puede determinar una ecuación " + LaTeX(`
                    \\vec{r}(t)=(\\vec{b}-\\vec{a})t+\\vec{a}
                    `) + " que representa la unión entre estos dos puntos por medio de una recta",
                    URL: "https://editor.p5js.org/Jeff-Aporta/sketches/kEuExklg8"
               },
               {
                    LABEL: "intersección recta-círculo",
                    HTML: "Algoritmo que en determina de forma exacta las intersecciones entre una recta y un circulo",
                    URL: "https://editor.p5js.org/Jeff-Aporta/sketches/ecBurGM3N"
               },
          ]
     },
     {
          LABEL: "Arte",
          HTML: "",
          CHILDS: [
               {
                    LABEL: "Poligonometrismo",
                    HTML: "",
                    URL: "poligonometrismo/index.html"
               }
          ]
     },
     {
          LABEL: "Animaciones",
          HTML: "",
          CHILDS: [
               {
                    LABEL: "Starfield",
                    HTML: "",
                    URL: "Starfield/index.html"
               },
               {
                    LABEL: "Estanque de peces",
                    HTML: "",
                    URL: "Estanque-de-peces/index.html"
               },
               {
                    LABEL: "Planeta Tierra",
                    HTML: "",
                    URL: "_p5.js/Planeta/index.html"
               },
          ]
     },
     {
          LABEL: "Algoritmos",
          HTML: "",
          CHILDS: [
               {
                    LABEL: "Liquidos con Ley de Hooke",
                    HTML: "",
                    URL: "liquido-ley-de-hooke/index.html"
               },
               {
                    LABEL: "Juego de la Vida de Conway",
                    HTML: "",
                    URL: "juego-de-la-vida-conway/index.html"
               },
               {
                    LABEL: "Árbol recursivo",
                    HTML: "",
                    URL: "Arbol-recursivo/index.html"
               },
               {
                    LABEL: "Conjunto de Mandelbrot",
                    HTML: "",
                    URL: "Mandelbrot-Set/index.html"
               },
               {
                    LABEL: "Espiral de Ulam",
                    HTML: "",
                    URL: "_p5.js/espiral-de-ulam/index.html"
               },
               {
                    LABEL: "Ruido de Perlin",
                    HTML: "",
                    URL: "_p5.js/perlin-noise/index.html"
               },
          ]
     },
     {
          LABEL: "Utilidades",
          HTML: "",
          CHILDS: [
               {
                    LABEL: "Simulación de dados",
                    HTML: "",
                    URL: "simulador-de-dados/index.html"
               },
               {
                    LABEL: "Temporizador (tipo moneda en 3D)",
                    HTML: "",
                    URL: "temporizador-tipo-moneda/index.html"
               },
               {
                    LABEL: "Cubo de imágenes",
                    HTML: "",
                    URL: "cubo-de-imagenes/index.html"
               },
          ]
     },
     {
          LABEL: "Juegos",
          HTML: "",
          CHILDS: [
               {
                    LABEL: "Pong solitario",
                    HTML: `
                    Desarrollé un versionamiento de Pong (1972), y además hice un video explicando el proceso 
                    completo para llegar al resultado.
                    <br><br>
                    <div style="text-align:center;">
                         <iframe class="youtube-frame" src="https://www.youtube.com/embed/MCEl05ZbZ80" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    `,
                    URL: "pong-solitario/index.html"
               },
               {
                    LABEL: "Tetris",
                    HTML: `
                    Desarrollé un versionamiento de Tetris (1984), y además hice un video explicando el proceso 
                    completo para llegar al resultado.
                    <br><br>
                    <div style="text-align:center;">
                         <iframe class="youtube-frame" src="https://www.youtube.com/embed/y_rnUOHUoQ4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    `,
                    URL: "tetris/index.html"
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
                    URL: "juego-de-preguntas/juego-de-preguntas-v1/index.html"
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
                    URL: "buscaminas/index.html"
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
                    URL: "flappy-bird/index.html"
               },
          ]
     },
]