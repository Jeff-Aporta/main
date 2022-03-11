init_lightbox1();

function init_lightbox1() {
  let style = document.createElement("style");
  style.innerHTML = `
          .miniatur-lightbox1 {
               display: inline-block;
               object-fit: cover;
               width: 100px;
               height: 100px;
               cursor: pointer;
          }

          .miniatur-lightbox1:hover {
               filter: brightness(1.1);
               transform: scale(1.1);
          }

          .modal-lightbox1 {
               display: none;
               position: fixed;
               z-index: 1;
               left: 0;
               top: 0;
               width: 100vw;
               height: 100vh;
               overflow: hidden;
               background-color: rgba(0, 0, 0, 0.5);
          }

          .modal-lightbox1-content {
               margin: auto;
               padding: 0;
               width: 90vw;
               height: 90vh;
          }

          .close-lightbox1 {
               display:flex;
               justify-content:center;
               align-items:center;
               color: white;
               position: fixed;
               top: 0px;
               right: 0px;
               font-size: 5vw;
               widht: 5vw;
               height: 5vw;

               font-weight: bold;
          }

          .close-lightbox1:hover,
          .close-lightbox1:focus {
               color: #999;
               background:rgba(0,0,0,0.25);
               text-decoration: none;
               cursor: pointer;
          }

          .mySlides-lightbox1 {
               display: none;
          }

          .prev-lightbox1,
          .next-lightbox1 {
               display: flex;
               justify-content: center;
               align-items: center;
               cursor: pointer;
               position: absolute;
               top: 55%;
               transform:translateY(-50%);
               height: 50vh;
               width:5vw;
               padding: 16px;
               margin-top: -50px;
               color: white;
               font-weight: bold;
               font-size: 300%;
               user-select: none;
               -webkit-user-select: none;
          }

          .prev-lightbox1{
               left: 0px;
          }

          .next-lightbox1 {
               right: 5px;
               border-radius: 3px 0 0 3px;
          }

          .prev-lightbox1:hover,
          .next-lightbox1:hover {
               color: #999;
               background-color: rgba(0, 0, 0, 0.25);
          }

          img.hover-shadow {
               transition: 0.3s;
          }

          .img-lightbox-modal-lightbox1 {
               height: 90vh;
               width: 90vw;
               object-fit: contain;
               border:3px solid black;
               background:rgba(0,0,0,0.25);
          }
     `;
  document.head.appendChild(style);
}

let set_lightboxes_lightbox1 = [];
let n_set_lightbox_lightbox1 = 0;

class lightbox1 {
  constructor(...imagenes) {
    setInterval(() => {
      console.log("funcionando");
    }, 1000);
    this.slideIndex_lightbox1 = 0;

    this.id = (Math.random() + "").replace("0.", "-");
    set_lightboxes_lightbox1[this.id] = this;

    this.modal = document.createElement("div");
    for (let i = 0; i < imagenes.length; i++) {
      const img = imagenes[i];
      document.write(`
          <img 
               class="miniatur-lightbox1" 
               src="${img}" 
               onclick="
                    set_lightboxes_lightbox1['${this.id}'].openModal();
                    set_lightboxes_lightbox1['${this.id}'].currentSlide(${i});
               "
          >
          `);
    }
    let html = `
     <div id="mymodal-lightbox1-${this.id}" class="modal-lightbox1">
          <span class="close-lightbox1" onclick="set_lightboxes_lightbox1['${this.id}'].closeModal()">&times;</span>
          <div class="modal-lightbox1-content">
     `;
    for (let i = 0; i < imagenes.length; i++) {
      const img = imagenes[i];
      html += `
               <div class="mySlides-lightbox1">
                    <img src="${img}" class="img-lightbox-modal-lightbox1">
               </div>
          `;
    }
    if (imagenes.length>1) {
      html += `
      <a class="prev-lightbox1" onclick="set_lightboxes_lightbox1['${this.id}'].plusSlides(-1)">&#10094;</a>
      <a class="next-lightbox1" onclick="set_lightboxes_lightbox1['${this.id}'].plusSlides(1)">&#10095;</a>
      `;
    }
    html += `
          </div>
     </div>
     `;
    this.modal.innerHTML = html;
    document.body.appendChild(this.modal);
    this.element_myModal_lightbox1 = document.getElementById(
      "mymodal-lightbox1-" + this.id
    );
    this.slides =
      this.element_myModal_lightbox1.getElementsByClassName(
        "mySlides-lightbox1"
      );

    this.showSlides(this.slideIndex_lightbox1);
  }

  // Open the Modal
  openModal() {
    this.element_myModal_lightbox1.style.display = "flex";
  }

  // Close the Modal
  closeModal() {
    this.element_myModal_lightbox1.style.display = "none";
  }

  // Next/previous controls
  plusSlides(n) {
    this.slideIndex_lightbox1 += n;
    this.showSlides(this.slideIndex_lightbox1);
  }

  // Thumbnail image controls
  currentSlide(n) {
    this.slideIndex_lightbox1 = n;
    this.showSlides(this.slideIndex_lightbox1);
  }

  showSlides(n) {
    if (n >= this.slides.length) {
      this.slideIndex_lightbox1 = 0;
    }
    if (n < 0) {
      this.slideIndex_lightbox1 = this.slides.length - 1;
    }
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
    }
    this.slides[this.slideIndex_lightbox1].style.display = "block";
  }
}

document.addEventListener("keyup", controles_lightbox_teclas);

function controles_lightbox_teclas(event) {
  for (const key in set_lightboxes_lightbox1) {
    s = set_lightboxes_lightbox1[key];
    if (s.element_myModal_lightbox1.style.display != "none") {
      switch (event.key) {
        case "ArrowLeft":
          s.plusSlides(-1);
          break;
        case "ArrowRight":
          s.plusSlides(1);
          break;
        case "Escape":
          s.closeModal();
          break;
      }
    }
  }
}
