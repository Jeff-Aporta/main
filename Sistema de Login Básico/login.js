/*
Esta es una base de datos de prueba,
en un caso real, esto no se estructura así,
se usa un protocolo más estricto con la seguridad,
esto debería estar en la parte del servidor y no del cliente,
pero es un bosquejo para que ustedes sepan cómo es el algoritmo
*/

let link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
link.media = "all";
document.getElementsByTagName("head")[0].appendChild(link);

baseDeDatosLogin = JSON.parse(localStorage.getItem("sistema-de-login"));

let usuarioLogueado


if (!baseDeDatosLogin) {
  cargarDatosInicialesDeLaBaseDeDatosLogin();
}

function guardarDatosDeLaBaseDeDatosLogin() {
  localStorage.setItem("sistema-de-login", JSON.stringify(baseDeDatosLogin));
}

function cargarDatosInicialesDeLaBaseDeDatosLogin() {
  baseDeDatosLogin = {
    1234567890: {
      //Aquí se ponen los elementos por defecto del usuario
      contraseña: "abc",
      puntaje: 0,
    },
    "0987654321": {
      //Aquí se ponen los elementos por defecto del usuario
      contraseña: "def",
      puntaje: 0,
    },
    98765434567: {
      //Aquí se ponen los elementos por defecto del usuario
      contraseña: "ghi",
      puntaje: 0,
    },
  };
}

async function menúBásico() {
  opción_menúBásico = -1;
  await swal.fire({
    title: "Menú",
    showConfirmButton: false,
    html: `
        <button class="swal2-confirm swal2-styled" onclick='opción_menúBásico=0;Swal.close()'>
            Registrar nuevo usuario
        </button>
        <br>
        <button class="swal2-confirm swal2-styled" onclick='opción_menúBásico=1;Swal.close()'>
            Login
        </button>
        `,
  });
  switch (opción_menúBásico) {
    case 0:
      registrarNuevoUsuario();
      break;
    case 1:
      login();
      break;
    default:
      await menúBásico();
      break;
  }
}

async function mostrarUsuariosPorTabla(...propiedades) {
  if(!usuarioLogueado){
    return
  }
  let html = `
  <table class="table table-light table-striped">
    <theader>
    <th>
      Usuario
    </th>
  `;
  if (propiedades[0] == "*") {
    for (const usuario in baseDeDatosLogin) {
      for (const propiedad in baseDeDatosLogin[usuario]) {
        html += "<th>";
        html += propiedad;
        html += "</th>";
      }
      break;
    }
  } else {
    for (const propiedad of propiedades) {
      html += "<th>";
      html += propiedad;
      html += "</th>";
    }
  }
  html += "</theader><tbody>";
  for (const usuario in baseDeDatosLogin) {
    html += "<tr>";
    html += "<td>";
    html += usuario;
    html += "</td>";
    if (propiedades[0] == "*") {
      for (const propiedad in baseDeDatosLogin[usuario]) {
        html += "<td>";
        html += baseDeDatosLogin[usuario][propiedad];
        html += "</td>";
      }
    } else {
      for (const propiedad of propiedades) {
        html += "<td>";
        html += baseDeDatosLogin[usuario][propiedad];
        html += "</td>";
      }
    }

    html += "</tr>";
  }
  await swal.fire({
    text: "Usuarios",
    confirmButtonText: "Cerrar",
    html,
  });
}

async function registrarNuevoUsuario() {
  opción_registrarNuevoUsuario = -1;
  await swal.fire({
    title: "Registrar",
    showConfirmButton: false,
    html: `
        <input class="swal2-input" placeholder="Usuario" id="usuario">
        <input type="password" class="swal2-input" placeholder="Contraseña" id="contraseña">
        <button class="swal2-confirm swal2-styled" onclick='opción_registrarNuevoUsuario=0;Swal.clickConfirm()'>
            Crear
        </button>
        <button class="swal2-confirm swal2-styled" onclick='opción_registrarNuevoUsuario=1;Swal.close()'>
            Cancelar
        </button>
        `,
    preConfirm: () => {
      let usuario = document.getElementById("usuario").value;
      let contraseña = document.getElementById("contraseña").value;
      if (!usuario) {
        Swal.showValidationMessage("No hay usuario");
        return false;
      }
      if (!contraseña) {
        Swal.showValidationMessage("No hay contraseña");
        return false;
      }
      baseDeDatosLogin[usuario] = {};
      baseDeDatosLogin[usuario].contraseña = contraseña;
      baseDeDatosLogin[usuario].puntaje = 0;
      guardarDatosDeLaBaseDeDatosLogin();
      return true;
    },
  });
  switch (opción_registrarNuevoUsuario) {
    case 0:
      menúBásico();
      break;
    case 1:
      menúBásico();
      break;
    default:
      menúBásico();
      break;
  }
}

async function login() {
  await swal.fire({
    title: "Bienvenido",
    confirmButtonText: "Login",
    html: `
        <div style="margin:5px">
            <input class="swal2-input" placeholder="usuario" id="usuario">
            <input type="password" class="swal2-input" placeholder="contraseña" id="contraseña">
        </div>
        `,
    preConfirm: () => {
      let usuario = document.getElementById("usuario").value;
      let contraseña = document.getElementById("contraseña").value;
      if (!usuario) {
        Swal.showValidationMessage("No hay usuario");
        return false;
      }
      if (!contraseña) {
        Swal.showValidationMessage("No hay contraseña");
        return false;
      }
      let datos = baseDeDatosLogin[usuario];
      if (!datos) {
        Swal.showValidationMessage("El usuario no existe");
        return false;
      }
      if (datos.contraseña != contraseña) {
        Swal.showValidationMessage("Contraseña incorrecta");
        return false;
      }
      usuarioLogueado = datos
      return true;
    },
  });
}
