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

  retorno += `<tr>`;
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

function cambiarNodo(id) {
  _cambiarNodo(mapa, id);
}

async function _cambiarNodo(tree, id) {
  if (tree.id == id) {
    let { value: opns } = await swal.fire({
      title: "Modificar nodo",
      html: `
      <div style="text-align:left;display:inline-block">
      Etiqueta:
      <br>
      <input type="text" id="txt" value="${tree.LABEL}">
      <br>
      <label><input type="checkbox" id="cbox1" ${
        tree.LEFT_CHILD ? "checked" : ""
      }> Rama Izquierda</label>
      <br>
      <label><input type="checkbox" id="cbox2"  ${
        tree.RIGHT_CHILD ? "checked" : ""
      }> Rama Derecha</label>
      </div>
      `,
      preConfirm: () => {
        return {
          NOMBRE: document.getElementById("txt").value,
          IZQUIERDA: document.getElementById("cbox1").checked,
          DERECHA: document.getElementById("cbox2").checked,
        };
      },
    });
    tree.LABEL = opns.NOMBRE;
    if (!opns.IZQUIERDA) {
      delete tree.LEFT_CHILD;
    } else {
      if (!tree.LEFT_CHILD) {
        tree.LEFT_CHILD = {
          LABEL: "",
        };
      }
    }
    if (!opns.DERECHA) {
      delete tree.RIGHT_CHILD;
    } else {
      if (!tree.RIGHT_CHILD) {
        tree.RIGHT_CHILD = {
          LABEL: "",
        };
      }
    }
    generarÁrbol();
    return;
  }
  if (tree.LEFT_CHILD) {
    _cambiarNodo(tree.LEFT_CHILD, id);
  }
  if (tree.RIGHT_CHILD) {
    _cambiarNodo(tree.RIGHT_CHILD, id);
  }
}

function generarArbolJSON(tree, raiz = true) {
  if (tree == undefined) {
    tree = -1;
  }
  let retornoHTML = "";
  retornoHTML += `
          <li style="${tree == -1 ? "visibility:hidden" : ""}">
              <div  class="nodo ${
    raiz ? "raiz" : ""
  } ${
    !tree.LEFT_CHILD && !tree.RIGHT_CHILD && !raiz ? "hoja" : ""
  }" id="nodo${_id_}" onclick="cambiarNodo('nodo${_id_}')">
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
  if (tree != -1 && (tree.LEFT_CHILD || tree.RIGHT_CHILD)) {
    retornoHTML += generarArbolJSON(tree.LEFT_CHILD, false);
    retornoHTML += generarArbolJSON(tree.RIGHT_CHILD, false);
  }
  retornoHTML += "</ul>";
  retornoHTML += "</li>";
  return retornoHTML;
}
