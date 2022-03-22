window.addEventListener("load", () => {
  lightbox_load();
});

let style = document.createElement("style");

lightbox_update_style({});

function lightbox_update_style(obj) {
  style.innerHTML = `
             #lightbox3-modal {
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
   
             #lightbox3-current-image, #lightbox3-iframe {
                  display:none;
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
                  background: ${obj.background2 ?? "rgba(255, 255, 255, 0.7)"};
                  padding: 10px;
                  box-sizing: border-box;
             }
   
             #lightbox3-close,
             #lightbox3-left,
             #lightbox3-right {
                  color: ${obj.colorButtons ?? "black"};
                  width: 7.5vw;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: fixed;
                  font-size: 5vw;
                  cursor: pointer;
             }
   
             #lightbox3-left,
             #lightbox3-right {
                  height: 80vh;
                  top: 10%;
             }
   
             #lightbox3-left:hover,
             #lightbox3-right:hover,
             #lightbox3-close:hover {
                  background: rgba(255, 255, 255, 0.2);
             }
   
             #lightbox3-close {
                  right: 0;
                  height: 10vh;
             }
   
             #lightbox3-left {
                  left: 0;
             }
   
             #lightbox3-right {
                  right: 0;
             }
        `;
}

function lightbox_load() {
  document.head.appendChild(style);

  let div = document.createElement("div");
  div.id = "lightbox3-modal";
  div.innerHTML = `
             <img src="" id="lightbox3-current-image">
             <iframe src="" id="lightbox3-iframe"></iframe>
             <span id="lightbox3-left" onclick="lightbox3_change(-1)">&#10094;</span>
             <span id="lightbox3-right" onclick="lightbox3_change(1)">&#10095;</span>
             <span id="lightbox3-close" onclick="lightbox3_closeModal()">&times;</span>
  `;
  document.body.appendChild(div);

  for (let i = 0; i < lightbox3_imagenes.length; i++) {
    const img = lightbox3_imagenes[i];
    if (!img.dataset.lightbox && !img.dataset.lightboxGroup) {
      continue;
    }
    if (!img.dataset.lightbox) {
      img.dataset.lightbox = img.src;
    }
    if (!img.dataset.lightboxGroup) {
      img.dataset.lightboxGroup = "0";
    }
    if (!lightbox3_grupos[img.dataset.lightboxGroup]) {
      lightbox3_grupos[img.dataset.lightboxGroup] = [];
    }
    lightbox3_grupos[img.dataset.lightboxGroup].push(img);
    img.dataset.lightbox3Index =
      lightbox3_grupos[img.dataset.lightboxGroup].length - 1;
    img.addEventListener("click", () => {
      lightbox3_setImg(img);
      lightbox3_grupo = img.dataset.group;
      lightbox3_currentImage = img;
      lightbox3_openModal();
    });
    document.getElementById("lightbox3-current-image").src = img.src;
  }

  document.addEventListener("keyup", controles_lightbox_teclas);

  function controles_lightbox_teclas(event) {
    if (div.style.display != "none") {
      switch (event.key) {
        case "ArrowLeft":
          lightbox3_change(-1);
          break;
        case "ArrowRight":
          lightbox3_change(1);
          break;
        case "Escape":
          lightbox3_closeModal();
          break;
      }
    }
  }
}

let lightbox3_imagenes = document.getElementsByTagName("img");
let lightbox3_grupos = [];
let lightbox3_grupo = "0";
let lightbox3_currentImage;

function lightbox3_setImg(img) {
  if (img.dataset.depth) {
    document.getElementById("lightbox3-current-image").style.display = "none";
    document.getElementById("lightbox3-iframe").style.display = "flex";
    document.getElementById("lightbox3-iframe").src =
      "https://jeff-aporta.github.io/main/00Libs/Lightbox/3/map-depth.html?img=" +
      img.src +
      "&map=" +
      img.dataset.depth +
      "&auto=no";
  } else {
    document.getElementById("lightbox3-current-image").src = img.src;
    document.getElementById("lightbox3-current-image").style.display = "flex";
    document.getElementById("lightbox3-iframe").style.display = "none";
  }
  lightbox3_currentImage = img;
}

function lightbox3_openModal() {
  document.getElementById("lightbox3-modal").style.display = "flex";
  if (
    lightbox3_grupos[lightbox3_currentImage.dataset.lightboxGroup].length <= 1
  ) {
    document.getElementById("lightbox3-left").style.display = "none";
    document.getElementById("lightbox3-right").style.display = "none";
  } else {
    document.getElementById("lightbox3-left").style.display = "flex";
    document.getElementById("lightbox3-right").style.display = "flex";
  }
}

function lightbox3_closeModal() {
  document.getElementById("lightbox3-modal").style.display = "none";
}

function lightbox3_change(dn) {
  let n = Number(lightbox3_currentImage.dataset.lightbox3Index) + dn;
  let lenght_group =
    lightbox3_grupos[lightbox3_currentImage.dataset.lightboxGroup].length;
  if (n >= lenght_group) {
    n = 0;
  }
  if (n < 0) {
    n = lenght_group - 1;
  }
  lightbox3_setImg(
    lightbox3_grupos[lightbox3_currentImage.dataset.lightboxGroup][n]
  );
}
