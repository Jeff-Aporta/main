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
          ),
        IMG: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Markovkate_01.svg/1024px-Markovkate_01.svg.png`,
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
        `,
        IMG: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Linear_regression.svg/350px-Linear_regression.svg.png",
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
        `,
        IMG: "https://i.ibb.co/GPNZQkZ/poisson.png",
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
        `,
        IMG: "https://i.ibb.co/09nvD4c/bt.png",
        URL: "estructura-de-datos/arboles-binarios-recorridos/",
      },
      {
        LABEL: "Torres de Hanói",
        HTML: `Este algoritmo lo descubrí en el año 2019, es una serie de pasos a seguir para
        poder dar generación automática del camino a seguir para solucionar las torres de Hanói,
        aunque ya hay algoritmos para resolver las torres de Hanói, este se diferencia en que este
        se puede realizar de forma manual con papel y lapíz.
        `,
        IMG: "https://i.ibb.co/ZWMqB9H/torres-de-hano.png",
        URL: "estructura-de-datos/arboles-binarios-Torres-de-hanoi/",
      },
      {
        LABEL: "Modelador de Grafos y Dijkstra",
        HTML: `
        Con está aplicación, se podrá modelar gráficamente grafos, obtener sus elementos caracteristicos 
        y además podrás ejecutar el algoritmo de Dijkstra para poder encontrar el camino más corto entre 
        un nodo y otro 
        `,
        IMG: "https://i.ibb.co/s2DzBCY/Nodos-6.png",
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
        `,
        IMG: "https://i.ibb.co/09QGVrM/proy-a-b.png",
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
        `,
        IMG: "https://upload.wikimedia.org/wikipedia/commons/9/97/Is-circle-line-s.svg",
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
        `,
        IMG: "https://i.ibb.co/25XpW5H/Ecuaciones-007.png",
        FIT: "cover",
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
        `,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/SDnhXcOZiXM" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "Starfield/",
      },
      {
        LABEL: "Estanque de peces",
        HTML: `
        Trata de unos peces dentro de un estanque que se mueven de forma satelital al rededor de
        unas flores que simulan ser puntos de atracción, el movimiento es suave y pareciera 
        aleatorio.
        Hice un video explicando el proceso completo para llegar al resultado
        `,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/0cvC6XRYz24" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "Estanque-de-peces/",
      },
      {
        LABEL: "Tierra y luna",
        HTML: `
        Esta es una animación impactante, porque con unas 
        pocas líneas de código se logra un efecto muy bueno, aplicando transformaciones lineales y
        de traslación.
        `,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/ijqsaG5qp3Y" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "00p5.js/Planeta/",
      },
    ],
  },
  {
    LABEL: "Algoritmos",
    HTML: ``,
    CHILDS: [
      {
        LABEL: "Force many body",
        HTML: `
        Algoritmo qe expulsa cuerpos que están dentro de otros.
        <br>
        <br>
        <a class="btn btn-success" href="force-many-body/">Ir a publicación</a>`,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/irVVFs3Nlg0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "force-many-body/",
      },
      {
        LABEL: "Liquidos con Ley de Hooke",
        HTML: `
        Algoritmo que simula liquidos en dos dimensiones.
        `,
        URL: "liquido-ley-de-hooke/",
      },
      {
        LABEL: "Juego de la Vida de Conway",
        HTML: ``,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/JA3dvpNbUJs" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "juego-de-la-vida-conway/",
      },
      {
        LABEL: "Árbol recursivo",
        HTML: ``,
        VIDEO: `<iframe  class="youtube-frame" src="https://www.youtube.com/embed/noe_P35Md5M" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "Arbol-recursivo/",
      },
      {
        LABEL: "Conjunto de Mandelbrot",
        HTML: ``,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/SW0dq_DzeWk" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "Mandelbrot-Set/",
      },
      {
        LABEL: "Espiral de Ulam",
        HTML: ``,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/QyBchDTyxIs" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "00p5.js/espiral-de-ulam/",
      },
      {
        LABEL: "Ruido de Perlin",
        HTML: ``,
        URL: "00p5.js/perlin-noise/",
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
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/0OiQUS9UwIk" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "temporizador-tipo-moneda/",
      },
      {
        LABEL: "Cubo de imágenes",
        HTML: ``,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/ljzZFkxL9YY" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
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
            `,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/MCEl05ZbZ80" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "Juegos/pong-solitario/",
      },
      {
        LABEL: "Tetris",
        HTML: `
                    Desarrollé un versionamiento de Tetris (1984), y además hice 
                    un video explicando el proceso completo para llegar al 
                    resultado.
                    `,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/y_rnUOHUoQ4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "Juegos/tetris/",
      },
      {
        LABEL: "Juego de preguntas v1",
        HTML: `
                    Desarrollé un juego de preguntas y respuestas inspirado en pregunta2 que tiene la 
                    posibilidad de mostrar imagenes de apoyo a la pregunta, cuenta con una base de datos 
                    de al rededor de más de 1100 preguntas.
                    `,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/HHDCktzuUCk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "Juegos/juego-de-preguntas/juego-de-preguntas-v1/",
      },
      {
        LABEL: "Buscaminas",
        HTML: `
                    Desarrollé un versionamiento de Buscaminas (1989), y además hice un video explicando el proceso 
                    completo para llegar al resultado.
                    `,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/xwapo6FFhnQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "Juegos/buscaminas/",
      },
      {
        LABEL: "Juegos/Flappy Bird",
        HTML: `
                    Desarrollé un versionamiento de Flappy bird (2013), y además hice un video explicando el proceso 
                    completo para llegar al resultado.
                    `,
        VIDEO: `<iframe class="youtube-frame" src="https://www.youtube.com/embed/nfNe-SPlumY" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        URL: "Juegos/flappy-bird/",
      },
    ],
  },
];
