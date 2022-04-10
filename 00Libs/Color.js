class Color {
  constructor(r = 0, g = 0, b = 0, a = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  static fromHex(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return new Color(
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    );
  }

  static fromStringRGB(hex) {
    const arr = hex.replace("rgb(", "").replace(")", "").replace(" ","").split(",");
    const arrnum = arr.map((e) => {
      return parseInt(e);
    });
    return new Color(
      arrnum[0],
      arrnum[1],
      arrnum[2]
    );
  }

  static random() {
    return new Color(Math.random(255), random(255), random(255));
  }

  get intR() {
    return int(this.r);
  }

  get intG() {
    return int(this.g);
  }

  get intB() {
    return int(this.b);
  }

  get intA() {
    return int(this.a);
  }

  get toVector() {
    return {
      x: this.r,
      y: this.g,
      z: this.b,
    };
  }

  get toStringRGB() {
    return `rgb(${this.intR},${this.intG},${this.intB})`;
  }

  get toInt() {
    return (this.intA << 24) | (this.intR << 16) | (this.intG << 8) | this.intB;
  }

  get toHex() {
    return (
      "#" +
      this.intR.toString(16).padStart(2, 0) +
      this.intG.toString(16).padStart(2, 0) +
      this.intB.toString(16).padStart(2, 0)
    );
  }

  get nombreCercano() {
    let color;
    let distanciaMinima = Number.MAX_VALUE;
    for (const key in ColoresConNombre) {
      const element = ColoresConNombre[key];
      const d = distancia3D(element.vector, this.toVector);
      if (d == 0) {
        color = key;
        break;
      }
      if (d < distanciaMinima) {
        distanciaMinima = d;
        color = key;
      }
    }
    return color;
  }
}

const ColoresConNombre = {
  IndianRed: {
    hex: "#CD5C5C",
    stringRGB: "rgb(205, 92, 92)",
    vector: {
      x: 205,
      y: 92,
      z: 92,
    },
  },
  LightCoral: {
    hex: "#F08080",
    stringRGB: "rgb(240, 128, 128)",
    vector: {
      x: 240,
      y: 128,
      z: 128,
    },
  },
  Salmon: {
    hex: "#FA8072",
    stringRGB: "rgb(250, 128, 114)",
    vector: {
      x: 250,
      y: 128,
      z: 114,
    },
  },
  DarkSalmon: {
    hex: "#E9967A",
    stringRGB: "rgb(233, 150, 122)",
    vector: {
      x: 233,
      y: 150,
      z: 122,
    },
  },
  LightSalmon: {
    hex: "#FFA07A",
    stringRGB: "rgb(255, 160, 122)",
    vector: {
      x: 255,
      y: 160,
      z: 122,
    },
  },
  Crimson: {
    hex: "#DC143C",
    stringRGB: "rgb(220, 20, 60)",
    vector: {
      x: 220,
      y: 20,
      z: 60,
    },
  },
  Red: {
    hex: "#FF0000",
    stringRGB: "rgb(255, 0, 0)",
    vector: {
      x: 255,
      y: 0,
      z: 0,
    },
  },
  FireBrick: {
    hex: "#B22222",
    stringRGB: "rgb(178, 34, 34)",
    vector: {
      x: 178,
      y: 34,
      z: 34,
    },
  },
  DarkRed: {
    hex: "#8B0000",
    stringRGB: "rgb(139, 0, 0)",
    vector: {
      x: 139,
      y: 0,
      z: 0,
    },
  },
  Pink: {
    hex: "#FFC0CB",
    stringRGB: "rgb(255, 192, 203)",
    vector: {
      x: 255,
      y: 192,
      z: 203,
    },
  },
  LightPink: {
    hex: "#FFB6C1",
    stringRGB: "rgb(255, 182, 193)",
    vector: {
      x: 255,
      y: 182,
      z: 193,
    },
  },
  HotPink: {
    hex: "#FF69B4",
    stringRGB: "rgb(255, 105, 180)",
    vector: {
      x: 255,
      y: 105,
      z: 180,
    },
  },
  DeepPink: {
    hex: "#FF1493",
    stringRGB: "rgb(255, 20, 147)",
    vector: {
      x: 255,
      y: 20,
      z: 147,
    },
  },
  MediumVioletRed: {
    hex: "#C71585",
    stringRGB: "rgb(199, 21, 133)",
    vector: {
      x: 199,
      y: 21,
      z: 133,
    },
  },
  PaleVioletRed: {
    hex: "#DB7093",
    stringRGB: "rgb(219, 112, 147)",
    vector: {
      x: 219,
      y: 112,
      z: 147,
    },
  },
  Coral: {
    hex: "#FF7F50",
    stringRGB: "rgb(255, 127, 80)",
    vector: {
      x: 255,
      y: 127,
      z: 80,
    },
  },
  Tomato: {
    hex: "#FF6347",
    stringRGB: "rgb(255, 99, 71)",
    vector: {
      x: 255,
      y: 99,
      z: 71,
    },
  },
  OrangeRed: {
    hex: "#FF4500",
    stringRGB: "rgb(255, 69, 0)",
    vector: {
      x: 255,
      y: 69,
      z: 0,
    },
  },
  DarkOrange: {
    hex: "#FF8C00",
    stringRGB: "rgb(255, 140, 0)",
    vector: {
      x: 255,
      y: 140,
      z: 0,
    },
  },
  Orange: {
    hex: "#FFA500",
    stringRGB: "rgb(255, 165, 0)",
    vector: {
      x: 255,
      y: 165,
      z: 0,
    },
  },
  Gold: {
    hex: "#FFD700",
    stringRGB: "rgb(255, 215, 0)",
    vector: {
      x: 255,
      y: 215,
      z: 0,
    },
  },
  Yellow: {
    hex: "#FFFF00",
    stringRGB: "rgb(255, 255, 0)",
    vector: {
      x: 255,
      y: 255,
      z: 0,
    },
  },
  LightYellow: {
    hex: "#FFFFE0",
    stringRGB: "rgb(255, 255, 224)",
    vector: {
      x: 255,
      y: 255,
      z: 224,
    },
  },
  LemonChiffon: {
    hex: "#FFFACD",
    stringRGB: "rgb(255, 250, 205)",
    vector: {
      x: 255,
      y: 250,
      z: 205,
    },
  },
  LightGoldenrodYellow: {
    hex: "#FAFAD2",
    stringRGB: "rgb(250, 250, 210)",
    vector: {
      x: 250,
      y: 250,
      z: 210,
    },
  },
  PapayaWhip: {
    hex: "#FFEFD5",
    stringRGB: "rgb(255, 239, 213)",
    vector: {
      x: 255,
      y: 239,
      z: 213,
    },
  },
  Moccasin: {
    hex: "#FFE4B5",
    stringRGB: "rgb(255, 228, 181)",
    vector: {
      x: 255,
      y: 228,
      z: 181,
    },
  },
  PeachPuff: {
    hex: "#FFDAB9",
    stringRGB: "rgb(255, 218, 185)",
    vector: {
      x: 255,
      y: 218,
      z: 185,
    },
  },
  PaleGoldenrod: {
    hex: "#EEE8AA",
    stringRGB: "rgb(238, 232, 170)",
    vector: {
      x: 238,
      y: 232,
      z: 170,
    },
  },
  Khaki: {
    hex: "#F0E68C",
    stringRGB: "rgb(240, 230, 140)",
    vector: {
      x: 240,
      y: 230,
      z: 140,
    },
  },
  DarkKhaki: {
    hex: "#BDB76B",
    stringRGB: "rgb(189, 183, 107)",
    vector: {
      x: 189,
      y: 183,
      z: 107,
    },
  },
  Lavender: {
    hex: "#E6E6FA",
    stringRGB: "rgb(230, 230, 250)",
    vector: {
      x: 230,
      y: 230,
      z: 250,
    },
  },
  Thistle: {
    hex: "#D8BFD8",
    stringRGB: "rgb(216, 191, 216)",
    vector: {
      x: 216,
      y: 191,
      z: 216,
    },
  },
  Plum: {
    hex: "#DDA0DD",
    stringRGB: "rgb(221, 160, 221)",
    vector: {
      x: 221,
      y: 160,
      z: 221,
    },
  },
  Violet: {
    hex: "#EE82EE",
    stringRGB: "rgb(238, 130, 238)",
    vector: {
      x: 238,
      y: 130,
      z: 238,
    },
  },
  Orchid: {
    hex: "#DA70D6",
    stringRGB: "rgb(218, 112, 214)",
    vector: {
      x: 218,
      y: 112,
      z: 214,
    },
  },
  Fuchsia: {
    hex: "#FF00FF",
    stringRGB: "rgb(255, 0, 255)",
    vector: {
      x: 255,
      y: 0,
      z: 255,
    },
  },
  Magenta: {
    hex: "#FF00FF",
    stringRGB: "rgb(255, 0, 255)",
    vector: {
      x: 255,
      y: 0,
      z: 255,
    },
  },
  MediumOrchid: {
    hex: "#BA55D3",
    stringRGB: "rgb(186, 85, 211)",
    vector: {
      x: 186,
      y: 85,
      z: 211,
    },
  },
  MediumPurple: {
    hex: "#9370DB",
    stringRGB: "rgb(147, 112, 219)",
    vector: {
      x: 147,
      y: 112,
      z: 219,
    },
  },
  RebeccaPurple: {
    hex: "#663399",
    stringRGB: "rgb(102, 51, 153)",
    vector: {
      x: 102,
      y: 51,
      z: 153,
    },
  },
  BlueViolet: {
    hex: "#8A2BE2",
    stringRGB: "rgb(138, 43, 226)",
    vector: {
      x: 138,
      y: 43,
      z: 226,
    },
  },
  DarkViolet: {
    hex: "#9400D3",
    stringRGB: "rgb(148, 0, 211)",
    vector: {
      x: 148,
      y: 0,
      z: 211,
    },
  },
  DarkOrchid: {
    hex: "#9932CC",
    stringRGB: "rgb(153, 50, 204)",
    vector: {
      x: 153,
      y: 50,
      z: 204,
    },
  },
  DarkMagenta: {
    hex: "#8B008B",
    stringRGB: "rgb(139, 0, 139)",
    vector: {
      x: 139,
      y: 0,
      z: 139,
    },
  },
  Purple: {
    hex: "#800080",
    stringRGB: "rgb(128, 0, 128)",
    vector: {
      x: 128,
      y: 0,
      z: 128,
    },
  },
  Indigo: {
    hex: "#4B0082",
    stringRGB: "rgb(75, 0, 130)",
    vector: {
      x: 75,
      y: 0,
      z: 130,
    },
  },
  SlateBlue: {
    hex: "#6A5ACD",
    stringRGB: "rgb(106, 90, 205)",
    vector: {
      x: 106,
      y: 90,
      z: 205,
    },
  },
  DarkSlateBlue: {
    hex: "#483D8B",
    stringRGB: "rgb(72, 61, 139)",
    vector: {
      x: 72,
      y: 61,
      z: 139,
    },
  },
  MediumSlateBlue: {
    hex: "#7B68EE",
    stringRGB: "rgb(123, 104, 238)",
    vector: {
      x: 123,
      y: 104,
      z: 238,
    },
  },
  GreenYellow: {
    hex: "#ADFF2F",
    stringRGB: "rgb(173, 255, 47)",
    vector: {
      x: 173,
      y: 255,
      z: 47,
    },
  },
  Chartreuse: {
    hex: "#7FFF00",
    stringRGB: "rgb(127, 255, 0)",
    vector: {
      x: 127,
      y: 255,
      z: 0,
    },
  },
  LawnGreen: {
    hex: "#7CFC00",
    stringRGB: "rgb(124, 252, 0)",
    vector: {
      x: 124,
      y: 252,
      z: 0,
    },
  },
  Lime: {
    hex: "#00FF00",
    stringRGB: "rgb(0, 255, 0)",
    vector: {
      x: 0,
      y: 255,
      z: 0,
    },
  },
  LimeGreen: {
    hex: "#32CD32",
    stringRGB: "rgb(50, 205, 50)",
    vector: {
      x: 50,
      y: 205,
      z: 50,
    },
  },
  PaleGreen: {
    hex: "#98FB98",
    stringRGB: "rgb(152, 251, 152)",
    vector: {
      x: 152,
      y: 251,
      z: 152,
    },
  },
  LightGreen: {
    hex: "#90EE90",
    stringRGB: "rgb(144, 238, 144)",
    vector: {
      x: 144,
      y: 238,
      z: 144,
    },
  },
  MediumSpringGreen: {
    hex: "#00FA9A",
    stringRGB: "rgb(0, 250, 154)",
    vector: {
      x: 0,
      y: 250,
      z: 154,
    },
  },
  SpringGreen: {
    hex: "#00FF7F",
    stringRGB: "rgb(0, 255, 127)",
    vector: {
      x: 0,
      y: 255,
      z: 127,
    },
  },
  MediumSeaGreen: {
    hex: "#3CB371",
    stringRGB: "rgb(60, 179, 113)",
    vector: {
      x: 60,
      y: 179,
      z: 113,
    },
  },
  SeaGreen: {
    hex: "#2E8B57",
    stringRGB: "rgb(46, 139, 87)",
    vector: {
      x: 46,
      y: 139,
      z: 87,
    },
  },
  ForestGreen: {
    hex: "#228B22",
    stringRGB: "rgb(34, 139, 34)",
    vector: {
      x: 34,
      y: 139,
      z: 34,
    },
  },
  Green: {
    hex: "#008000",
    stringRGB: "rgb(0, 128, 0)",
    vector: {
      x: 0,
      y: 128,
      z: 0,
    },
  },
  DarkGreen: {
    hex: "#006400",
    stringRGB: "rgb(0, 100, 0)",
    vector: {
      x: 0,
      y: 100,
      z: 0,
    },
  },
  YellowGreen: {
    hex: "#9ACD32",
    stringRGB: "rgb(154, 205, 50)",
    vector: {
      x: 154,
      y: 205,
      z: 50,
    },
  },
  OliveDrab: {
    hex: "#6B8E23",
    stringRGB: "rgb(107, 142, 35)",
    vector: {
      x: 107,
      y: 142,
      z: 35,
    },
  },
  Olive: {
    hex: "#808000",
    stringRGB: "rgb(128, 128, 0)",
    vector: {
      x: 128,
      y: 128,
      z: 0,
    },
  },
  DarkOliveGreen: {
    hex: "#556B2F",
    stringRGB: "rgb(85, 107, 47)",
    vector: {
      x: 85,
      y: 107,
      z: 47,
    },
  },
  MediumAquamarine: {
    hex: "#66CDAA",
    stringRGB: "rgb(102, 205, 170)",
    vector: {
      x: 102,
      y: 205,
      z: 170,
    },
  },
  DarkSeaGreen: {
    hex: "#8FBC8B",
    stringRGB: "rgb(143, 188, 139)",
    vector: {
      x: 143,
      y: 188,
      z: 139,
    },
  },
  LightSeaGreen: {
    hex: "#20B2AA",
    stringRGB: "rgb(32, 178, 170)",
    vector: {
      x: 32,
      y: 178,
      z: 170,
    },
  },
  DarkCyan: {
    hex: "#008B8B",
    stringRGB: "rgb(0, 139, 139)",
    vector: {
      x: 0,
      y: 139,
      z: 139,
    },
  },
  Teal: {
    hex: "#008080",
    stringRGB: "rgb(0, 128, 128)",
    vector: {
      x: 0,
      y: 128,
      z: 128,
    },
  },
  Aqua: {
    hex: "#00FFFF",
    stringRGB: "rgb(0, 255, 255)",
    vector: {
      x: 0,
      y: 255,
      z: 255,
    },
  },
  Cyan: {
    hex: "#00FFFF",
    stringRGB: "rgb(0, 255, 255)",
    vector: {
      x: 0,
      y: 255,
      z: 255,
    },
  },
  LightCyan: {
    hex: "#E0FFFF",
    stringRGB: "rgb(224, 255, 255)",
    vector: {
      x: 224,
      y: 255,
      z: 255,
    },
  },
  PaleTurquoise: {
    hex: "#AFEEEE",
    stringRGB: "rgb(175, 238, 238)",
    vector: {
      x: 175,
      y: 238,
      z: 238,
    },
  },
  Aquamarine: {
    hex: "#7FFFD4",
    stringRGB: "rgb(127, 255, 212)",
    vector: {
      x: 127,
      y: 255,
      z: 212,
    },
  },
  Turquoise: {
    hex: "#40E0D0",
    stringRGB: "rgb(64, 224, 208)",
    vector: {
      x: 64,
      y: 224,
      z: 208,
    },
  },
  MediumTurquoise: {
    hex: "#48D1CC",
    stringRGB: "rgb(72, 209, 204)",
    vector: {
      x: 72,
      y: 209,
      z: 204,
    },
  },
  DarkTurquoise: {
    hex: "#00CED1",
    stringRGB: "rgb(0, 206, 209)",
    vector: {
      x: 0,
      y: 206,
      z: 209,
    },
  },
  CadetBlue: {
    hex: "#5F9EA0",
    stringRGB: "rgb(95, 158, 160)",
    vector: {
      x: 95,
      y: 158,
      z: 160,
    },
  },
  SteelBlue: {
    hex: "#4682B4",
    stringRGB: "rgb(70, 130, 180)",
    vector: {
      x: 70,
      y: 130,
      z: 180,
    },
  },
  LightSteelBlue: {
    hex: "#B0C4DE",
    stringRGB: "rgb(176, 196, 222)",
    vector: {
      x: 176,
      y: 196,
      z: 222,
    },
  },
  PowderBlue: {
    hex: "#B0E0E6",
    stringRGB: "rgb(176, 224, 230)",
    vector: {
      x: 176,
      y: 224,
      z: 230,
    },
  },
  LightBlue: {
    hex: "#ADD8E6",
    stringRGB: "rgb(173, 216, 230)",
    vector: {
      x: 173,
      y: 216,
      z: 230,
    },
  },
  SkyBlue: {
    hex: "#87CEEB",
    stringRGB: "rgb(135, 206, 235)",
    vector: {
      x: 135,
      y: 206,
      z: 235,
    },
  },
  LightSkyBlue: {
    hex: "#87CEFA",
    stringRGB: "rgb(135, 206, 250)",
    vector: {
      x: 135,
      y: 206,
      z: 250,
    },
  },
  DeepSkyBlue: {
    hex: "#00BFFF",
    stringRGB: "rgb(0, 191, 255)",
    vector: {
      x: 0,
      y: 191,
      z: 255,
    },
  },
  DodgerBlue: {
    hex: "#1E90FF",
    stringRGB: "rgb(30, 144, 255)",
    vector: {
      x: 30,
      y: 144,
      z: 255,
    },
  },
  CornflowerBlue: {
    hex: "#6495ED",
    stringRGB: "rgb(100, 149, 237)",
    vector: {
      x: 100,
      y: 149,
      z: 237,
    },
  },
  RoyalBlue: {
    hex: "#4169E1",
    stringRGB: "rgb(65, 105, 225)",
    vector: {
      x: 65,
      y: 105,
      z: 225,
    },
  },
  Blue: {
    hex: "#0000FF",
    stringRGB: "rgb(0, 0, 255)",
    vector: {
      x: 0,
      y: 0,
      z: 255,
    },
  },
  MediumBlue: {
    hex: "#0000CD",
    stringRGB: "rgb(0, 0, 205)",
    vector: {
      x: 0,
      y: 0,
      z: 205,
    },
  },
  DarkBlue: {
    hex: "#00008B",
    stringRGB: "rgb(0, 0, 139)",
    vector: {
      x: 0,
      y: 0,
      z: 139,
    },
  },
  Navy: {
    hex: "#000080",
    stringRGB: "rgb(0, 0, 128)",
    vector: {
      x: 0,
      y: 0,
      z: 128,
    },
  },
  MidnightBlue: {
    hex: "#191970",
    stringRGB: "rgb(25, 25, 112)",
    vector: {
      x: 25,
      y: 25,
      z: 112,
    },
  },
  Cornsilk: {
    hex: "#FFF8DC",
    stringRGB: "rgb(255, 248, 220)",
    vector: {
      x: 255,
      y: 248,
      z: 220,
    },
  },
  BlanchedAlmond: {
    hex: "#FFEBCD",
    stringRGB: "rgb(255, 235, 205)",
    vector: {
      x: 255,
      y: 235,
      z: 205,
    },
  },
  Bisque: {
    hex: "#FFE4C4",
    stringRGB: "rgb(255, 228, 196)",
    vector: {
      x: 255,
      y: 228,
      z: 196,
    },
  },
  NavajoWhite: {
    hex: "#FFDEAD",
    stringRGB: "rgb(255, 222, 173)",
    vector: {
      x: 255,
      y: 222,
      z: 173,
    },
  },
  Wheat: {
    hex: "#F5DEB3",
    stringRGB: "rgb(245, 222, 179)",
    vector: {
      x: 245,
      y: 222,
      z: 179,
    },
  },
  BurlyWood: {
    hex: "#DEB887",
    stringRGB: "rgb(222, 184, 135)",
    vector: {
      x: 222,
      y: 184,
      z: 135,
    },
  },
  Tan: {
    hex: "#D2B48C",
    stringRGB: "rgb(210, 180, 140)",
    vector: {
      x: 210,
      y: 180,
      z: 140,
    },
  },
  RosyBrown: {
    hex: "#BC8F8F",
    stringRGB: "rgb(188, 143, 143)",
    vector: {
      x: 188,
      y: 143,
      z: 143,
    },
  },
  SandyBrown: {
    hex: "#F4A460",
    stringRGB: "rgb(244, 164, 96)",
    vector: {
      x: 244,
      y: 164,
      z: 96,
    },
  },
  Goldenrod: {
    hex: "#DAA520",
    stringRGB: "rgb(218, 165, 32)",
    vector: {
      x: 218,
      y: 165,
      z: 32,
    },
  },
  DarkGoldenrod: {
    hex: "#B8860B",
    stringRGB: "rgb(184, 134, 11)",
    vector: {
      x: 184,
      y: 134,
      z: 11,
    },
  },
  Peru: {
    hex: "#CD853F",
    stringRGB: "rgb(205, 133, 63)",
    vector: {
      x: 205,
      y: 133,
      z: 63,
    },
  },
  Chocolate: {
    hex: "#D2691E",
    stringRGB: "rgb(210, 105, 30)",
    vector: {
      x: 210,
      y: 105,
      z: 30,
    },
  },
  SaddleBrown: {
    hex: "#8B4513",
    stringRGB: "rgb(139, 69, 19)",
    vector: {
      x: 139,
      y: 69,
      z: 19,
    },
  },
  Sienna: {
    hex: "#A0522D",
    stringRGB: "rgb(160, 82, 45)",
    vector: {
      x: 160,
      y: 82,
      z: 45,
    },
  },
  Brown: {
    hex: "#A52A2A",
    stringRGB: "rgb(165, 42, 42)",
    vector: {
      x: 165,
      y: 42,
      z: 42,
    },
  },
  Maroon: {
    hex: "#800000",
    stringRGB: "rgb(128, 0, 0)",
    vector: {
      x: 128,
      y: 0,
      z: 0,
    },
  },
  White: {
    hex: "#FFFFFF",
    stringRGB: "rgb(255, 255, 255)",
    vector: {
      x: 255,
      y: 255,
      z: 255,
    },
  },
  Snow: {
    hex: "#FFFAFA",
    stringRGB: "rgb(255, 250, 250)",
    vector: {
      x: 255,
      y: 250,
      z: 250,
    },
  },
  HoneyDew: {
    hex: "#F0FFF0",
    stringRGB: "rgb(240, 255, 240)",
    vector: {
      x: 240,
      y: 255,
      z: 240,
    },
  },
  MintCream: {
    hex: "#F5FFFA",
    stringRGB: "rgb(245, 255, 250)",
    vector: {
      x: 245,
      y: 255,
      z: 250,
    },
  },
  Azure: {
    hex: "#F0FFFF",
    stringRGB: "rgb(240, 255, 255)",
    vector: {
      x: 240,
      y: 255,
      z: 255,
    },
  },
  AliceBlue: {
    hex: "#F0F8FF",
    stringRGB: "rgb(240, 248, 255)",
    vector: {
      x: 240,
      y: 248,
      z: 255,
    },
  },
  GhostWhite: {
    hex: "#F8F8FF",
    stringRGB: "rgb(248, 248, 255)",
    vector: {
      x: 248,
      y: 248,
      z: 255,
    },
  },
  WhiteSmoke: {
    hex: "#F5F5F5",
    stringRGB: "rgb(245, 245, 245)",
    vector: {
      x: 245,
      y: 245,
      z: 245,
    },
  },
  SeaShell: {
    hex: "#FFF5EE",
    stringRGB: "rgb(255, 245, 238)",
    vector: {
      x: 255,
      y: 245,
      z: 238,
    },
  },
  Beige: {
    hex: "#F5F5DC",
    stringRGB: "rgb(245, 245, 220)",
    vector: {
      x: 245,
      y: 245,
      z: 220,
    },
  },
  OldLace: {
    hex: "#FDF5E6",
    stringRGB: "rgb(253, 245, 230)",
    vector: {
      x: 253,
      y: 245,
      z: 230,
    },
  },
  FloralWhite: {
    hex: "#FFFAF0",
    stringRGB: "rgb(255, 250, 240)",
    vector: {
      x: 255,
      y: 250,
      z: 240,
    },
  },
  Ivory: {
    hex: "#FFFFF0",
    stringRGB: "rgb(255, 255, 240)",
    vector: {
      x: 255,
      y: 255,
      z: 240,
    },
  },
  AntiqueWhite: {
    hex: "#FAEBD7",
    stringRGB: "rgb(250, 235, 215)",
    vector: {
      x: 250,
      y: 235,
      z: 215,
    },
  },
  Linen: {
    hex: "#FAF0E6",
    stringRGB: "rgb(250, 240, 230)",
    vector: {
      x: 250,
      y: 240,
      z: 230,
    },
  },
  LavenderBlush: {
    hex: "#FFF0F5",
    stringRGB: "rgb(255, 240, 245)",
    vector: {
      x: 255,
      y: 240,
      z: 245,
    },
  },
  MistyRose: {
    hex: "#FFE4E1",
    stringRGB: "rgb(255, 228, 225)",
    vector: {
      x: 255,
      y: 228,
      z: 225,
    },
  },
  Gainsboro: {
    hex: "#DCDCDC",
    stringRGB: "rgb(220, 220, 220)",
    vector: {
      x: 220,
      y: 220,
      z: 220,
    },
  },
  LightGray: {
    hex: "#D3D3D3",
    stringRGB: "rgb(211, 211, 211)",
    vector: {
      x: 211,
      y: 211,
      z: 211,
    },
  },
  Silver: {
    hex: "#C0C0C0",
    stringRGB: "rgb(192, 192, 192)",
    vector: {
      x: 192,
      y: 192,
      z: 192,
    },
  },
  DarkGray: {
    hex: "#A9A9A9",
    stringRGB: "rgb(169, 169, 169)",
    vector: {
      x: 169,
      y: 169,
      z: 169,
    },
  },
  Gray: {
    hex: "#808080",
    stringRGB: "rgb(128, 128, 128)",
    vector: {
      x: 128,
      y: 128,
      z: 128,
    },
  },
  DimGray: {
    hex: "#696969",
    stringRGB: "rgb(105, 105, 105)",
    vector: {
      x: 105,
      y: 105,
      z: 105,
    },
  },
  LightSlateGray: {
    hex: "#778899",
    stringRGB: "rgb(119, 136, 153)",
    vector: {
      x: 119,
      y: 136,
      z: 153,
    },
  },
  SlateGray: {
    hex: "#708090",
    stringRGB: "rgb(112, 128, 144)",
    vector: {
      x: 112,
      y: 128,
      z: 144,
    },
  },
  DarkSlateGray: {
    hex: "#2F4F4F",
    stringRGB: "rgb(47, 79, 79)",
    vector: {
      x: 47,
      y: 79,
      z: 79,
    },
  },
  Black: {
    hex: "#000000",
    stringRGB: "rgb(0, 0, 0)",
    vector: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};

/* for (const k in ColoresConNombre) {
  if (Object.hasOwnProperty.call(ColoresConNombre, k)) {
    const c = ColoresConNombre[k];
    const arr = c.stringRGB.replace("rgb(", "").replace(")", "").split(", ");
    const arrnum = arr.map((e) => {
      return parseInt(e);
    });
    ColoresConNombre[k].vector = {
      x: arrnum[0],
      y: arrnum[1],
      z: arrnum[2],
    };
    console.log(JSON.stringify(ColoresConNombre, null, "\t"));
  }
}
 */
