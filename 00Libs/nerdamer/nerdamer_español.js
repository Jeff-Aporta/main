var core = nerdamer.getCore()
var PARSER = core.PARSER

nerdamer.register({
  name: 'derivar',
  visible: true,
  numargs: [1, 3],
  build: function () {
    return core.Calculus.diff
  }
})
nerdamer.register({
  name: 'simplificar',
  visible: true,
  numargs: 1,
  build: function () {
    return core.Algebra.Simplify.simplify
  }
})

nerdamer.register({
  name: 'derivada',
  visible: true,
  numargs: [1, 3],
  build: function () {
    return core.Calculus.diff
  }
})

nerdamer.register({
  name: 'integrar',
  visible: true,
  numargs: [1, 3],
  build: function () {
    return core.Calculus.integrate
  }
})

nerdamer.register({
  name: 'integral',
  visible: true,
  numargs: [1, 3],
  build: function () {
    return core.Calculus.integrate
  }
})

nerdamer.register({
  name: 'sen',
  visible: true,
  numargs: [1, 3],
  build: function () {
    return PARSER.trig.sin
  }
})

nerdamer.register({
  name: 'asen',
  visible: true,
  numargs: [1, 3],
  build: function () {
    return PARSER.trig.asin
  }
})

nerdamer.register({
  name: 'senh',
  visible: true,
  numargs: [1, 3],
  build: function () {
    return PARSER.trigh.sinh
  }
})

nerdamer.register({
  name: 'asenh',
  visible: true,
  numargs: [1, 3],
  build: function () {
    return PARSER.trigh.asinh
  }
})
