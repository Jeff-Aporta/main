let _id_ = 0;

function preorden(mapa, retorno = []) {
  retorno.push(mapa.LABEL);
  if (mapa.LEFT_CHILD) {
    preorden(mapa.LEFT_CHILD, retorno);
  }
  if (mapa.RIGHT_CHILD) {
    preorden(mapa.RIGHT_CHILD, retorno);
  }
  return retorno;
}

function inorden(mapa, retorno = []) {
  if (mapa.LEFT_CHILD) {
    inorden(mapa.LEFT_CHILD, retorno);
  }
  retorno.push(mapa.LABEL);
  if (mapa.RIGHT_CHILD) {
    inorden(mapa.RIGHT_CHILD, retorno);
  }
  return retorno;
}

function posorden(mapa, retorno = []) {
  if (mapa.LEFT_CHILD) {
    posorden(mapa.LEFT_CHILD, retorno);
  }
  if (mapa.RIGHT_CHILD) {
    posorden(mapa.RIGHT_CHILD, retorno);
  }
  retorno.push(mapa.LABEL);
  return retorno;
}

function recorridosHTML() {
  retorno = `
  <style>
    .tabla_recorridos td{
      min-width:30px;
      min-height:30px;
      text-align:center;
      border: black solid 1px;
      padding:5px;
    }
  </style>
  <table cellspacing=0 cellpadding=0 class="tabla_recorridos">
  <tbody>`;

  let arr_preorden = preorden(mapa);
  let arr_inorden = inorden(mapa);
  let arr_posorden = posorden(mapa);

  retorno += `<tr>`;
  retorno += `<td>Pre-orden</td>`;
  for (const e of arr_preorden) {
    retorno += `<td>`;
    retorno += e;
    retorno += `</td>`;
  }
  retorno += `</tr>`;

  retorno += `<tr style="font-weight:bolder;background:lightblue;">`;
  retorno += `<td>In-orden</td>`;
  for (const e of arr_inorden) {
    retorno += `<td>`;
    retorno += e;
    retorno += `</td>`;
  }
  retorno += `</tr>`;

  retorno += `<tr>`;
  retorno += `<td>Post-orden</td>`;
  for (const e of arr_posorden) {
    retorno += `<td>`;
    retorno += e;
    retorno += `</td>`;
  }
  retorno += `</tr>`;

  retorno += `</tbody></table>`;
  return retorno;
}

async function cambiarNodo() {
  let { value: cantidad_discos } = await swal.fire({
    title: "Cantidad de discos",
    input: "number",
  });
  if (cantidad_discos) {
    _cambiarNodo(mapa, 1, 2, 3, 1, cantidad_discos);
    generarÁrbol();
  }
}

function _cambiarNodo(tree, a, b, c, deep, cantidad_discos) {
  tree.LABEL = `${a} → ${c}`;
  //tree.LABEL = `${a} ${b} ${c}`;
  if (deep < cantidad_discos) {
    tree.LEFT_CHILD = {};
    tree.RIGHT_CHILD = {};
    _cambiarNodo(tree.LEFT_CHILD, a, c, b, deep + 1, cantidad_discos);
    _cambiarNodo(tree.RIGHT_CHILD, b, a, c, deep + 1, cantidad_discos);
  }
}

function generarArbolJSON(tree) {
  let retornoHTML = "";
  retornoHTML += `
          <li>
              <div class="nodo" id="nodo${_id_}" onclick="cambiarNodo();">
                   <a>${tree.LABEL}</a>
              </div>
          `;
  tree.id = `nodo${_id_}`;
  _id_++;
  retornoHTML += "<ul>";
  let keys = [];
  for (const key in tree) {
    if (key == "LABEL") {
      continue;
    }
    if (key == "id") {
      continue;
    }
    keys.push(key);
  }
  for (const key of keys) {
    let sub_mapa = tree[key];
    retornoHTML += generarArbolJSON(sub_mapa);
  }
  retornoHTML += "</ul>";
  retornoHTML += "</li>";
  return retornoHTML;
}
