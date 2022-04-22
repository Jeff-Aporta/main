cargarPreguntas();

function cargarPreguntas() {
  let ID = 0;
  let html = "";

  for (const p of baseDePreguntas) {
    let opciones = [...p.distractores];
    opciones.push(p.respuesta);
    for (let i = 0; i < 4; i++) {
      opciones.sort(() => Math.random() - 0.5);
    }
    html += `
     <div id="encabezado-pregunta">
          ${
            p.ayuda
              ? `
               <a class="btn btn-primary" onclick="
                    Swal.fire({
                         title: 'Ayuda',
                         html: '${p.ayuda}',
                         imageUrl: '${p.ayudaImg}',
                         imageHeight: 200,
                    })
               ">
                    Ayuda
               </a>
               `
              : ""
          }
          <div id="pregunta" style="margin: 20px;">
               ${p.pregunta}
          </div>
          ${
            p.imagen
              ? `
               <img src="${p.imagen}" style="width: 90%;height: 200px;object-fit: contain;">
               `
              : ""
          }
     </div>

     <div>
          <input type="radio" name="opcion-${ID}" id="opcion1-${ID}">
          <label for="opcion1-${ID}" id="label1-${ID}"> ${opciones[0]} </label>
     </div>
     <div>
          <input type="radio" name="opcion-${ID}" id="opcion2-${ID}">
          <label for="opcion2-${ID}" id="label2-${ID}"> ${opciones[1]} </label>
     </div>
     <div>
          <input type="radio" name="opcion-${ID}" id="opcion3-${ID}">
          <label for="opcion3-${ID}" id="label3-${ID}"> ${opciones[2]} </label>
     </div>
     <div>
          <input type="radio" name="opcion-${ID}" id="opcion4-${ID}">
          <label for="opcion4-${ID}" id="label4-${ID}"> ${opciones[3]} </label>
     </div>
     `;
    ID++;
  }
  document.getElementById("contenedor").innerHTML = html;
}

async function heFinalizado() {
  let contadorPuntos = 0;
  let html = `<ol style="display: inline-block;">`;
  for (let i = 0; i < baseDePreguntas.length; i++) {
    p = baseDePreguntas[i];
    for (let j = 1; j <= 5; j++) {
      if (j == 5) {
        await Swal.fire({
          title: "Advercia",
          text: "faltan preguntas por responder",
          icon: "warning",
        });
        return;
      }
      if (document.getElementById(`opcion${j}-${i}`).checked) {
        let txt = document.getElementById(`label${j}-${i}`).innerHTML;
        if (p.respuesta.trim() == txt.trim()) {
          html += `<li>Correcta</li>`;
          contadorPuntos++;
        } else {
          html += `<li>Incorrecta - (${p.respuesta})</li>`;
        }
        break;
      }
    }
  }
  html += `</ol>`;
  puntaje = (100 * contadorPuntos) / baseDePreguntas.length;
  html = `<h1>Puntaje: ${puntaje.toFixed(2)}%</h1>` + html;
  document.getElementById("resumen").innerHTML = html;
  swal.fire({
    title: "Resumen",
    html,
    icon: puntaje < 60 ? "error" : "success",
  });
}
