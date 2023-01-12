console.log("lightbox v2 load")

let style = document.createElement("style");

lightbox_update_style({})

function lightbox_update_style(obj) {
  style.innerHTML = `
             #lightbox2-modal {
                  display: none;
                  background-color: ${
                    obj.background ?? "rgba(255, 255, 255, 0.5)"
                  };
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100vw;
                  height: 100vh;
                  z-index:99999;
             }
   
             #lightbox2-current-image {
                  width: 85vw;
                  height: 90vh;
                  position: fixed;
                  left: 50%;
                  top: 50%;
                  transform: translateY(-50%) translateX(-50%);
                  object-fit: contain;
                  border: 3px solid ${
                    obj.colorBorder ?? "rgba(255, 255, 255, 1)"
                  };
                  background: ${
                    obj.background2 ?? "rgba(255, 255, 255, 0.7)"
                  };
                  padding: 10px;
                  box-sizing: border-box;
             }
   
             #lightbox2-close,
             #lightbox2-left,
             #lightbox2-right {
                  color: ${
                    obj.colorButtons ?? "black"
                  };
                  width: 7.5vw;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: fixed;
                  font-size: 5vw;
                  cursor: pointer;
             }
   
             #lightbox2-left,
             #lightbox2-right {
                  height: 80vh;
                  top: 10%;
             }
   
             #lightbox2-left:hover,
             #lightbox2-right:hover,
             #lightbox2-close:hover {
                  background: rgba(255, 255, 255, 0.2);
             }
   
             #lightbox2-close {
                  right: 0;
                  height: 10vh;
             }
   
             #lightbox2-left {
                  left: 0;
             }
   
             #lightbox2-right {
                  right: 0;
             }
        `;
}

function lightbox_load() {
  document.head.appendChild(style);

  let div = document.createElement("div");
  div.id = "lightbox2-modal";
  div.innerHTML = `
             <img src="" id="lightbox2-current-image">
             <span id="lightbox2-left" onclick="lightbox2_change(-1)">&#10094;</span>
             <span id="lightbox2-right" onclick="lightbox2_change(1)">&#10095;</span>
             <span id="lightbox2-close" onclick="lightbox2_closeModal()">&times;</span>
     `;
  document.body.appendChild(div);

  for (let i = 0; i < lightbox2_imagenes.length; i++) {
    const img = lightbox2_imagenes[i];
    if (!img.dataset.lightbox && !img.dataset.lightboxGroup) {
      continue;
    }
    if (!img.dataset.lightbox) {
      img.dataset.lightbox = img.src;
    }
    if (!img.dataset.lightboxGroup) {
      img.dataset.lightboxGroup = "0";
    }
    if (!lightbox2_grupos[img.dataset.lightboxGroup]) {
      lightbox2_grupos[img.dataset.lightboxGroup] = [];
    }
    lightbox2_grupos[img.dataset.lightboxGroup].push(img);
    img.dataset.lightbox2Index =
      lightbox2_grupos[img.dataset.lightboxGroup].length - 1;
    img.addEventListener("click", () => {
      lightbox2_setImg(img);
      lightbox2_grupo = img.dataset.group;
      lightbox2_currentImage = img;
      lightbox2_openModal();
    });
    document.getElementById("lightbox2-current-image").src = img.src;
  }

  document.addEventListener("keyup", controles_lightbox_teclas);

  function controles_lightbox_teclas(event) {
    if (div.style.display != "none") {
      switch (event.key) {
        case "ArrowLeft":
          lightbox2_change(-1);
          break;
        case "ArrowRight":
          lightbox2_change(1);
          break;
        case "Escape":
          lightbox2_closeModal();
          break;
      }
    }
  }
}

let lightbox2_imagenes = document.getElementsByTagName("img");
let lightbox2_grupos = [];
let lightbox2_grupo = "0";
let lightbox2_currentImage;

function lightbox2_setImg(img) {
  document.getElementById("lightbox2-current-image").src = img.src;
  lightbox2_currentImage = img;
}

function lightbox2_openModal() {
  document.getElementById("lightbox2-modal").style.display = "flex";
  if (
    lightbox2_grupos[lightbox2_currentImage.dataset.lightboxGroup].length <= 1
  ) {
    document.getElementById("lightbox2-left").style.display = "none";
    document.getElementById("lightbox2-right").style.display = "none";
  } else {
    document.getElementById("lightbox2-left").style.display = "flex";
    document.getElementById("lightbox2-right").style.display = "flex";
  }
}

function lightbox2_closeModal() {
  document.getElementById("lightbox2-modal").style.display = "none";
}

function lightbox2_change(dn) {
  let n = Number(lightbox2_currentImage.dataset.lightbox2Index) + dn;
  let lenght_group =
    lightbox2_grupos[lightbox2_currentImage.dataset.lightboxGroup].length;
  if (n >= lenght_group) {
    n = 0;
  }
  if (n < 0) {
    n = lenght_group - 1;
  }
  lightbox2_setImg(
    lightbox2_grupos[lightbox2_currentImage.dataset.lightboxGroup][n]
  );
}
