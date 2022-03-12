init_lightbox1();

function init_lightbox1() {
  let style = document.createElement("style");
  style.innerHTML = `
          .img-LaTeX-lightbox1 {
              padding: 5px;
          }

          .img-LaTeX-lightbox1:hover {
              background-color: white;
              transform: scale(1.2);
              cursor:pointer;
          }

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
               border:3px solid white;
          }
          .img-lightbox-modal-lightbox1-LaTeX {
               background:rgba(255,255,255,0.9);
               padding:10px;
               height: 90vh;
               width: 90vw;
               object-fit: contain;
               border:3px solid white;
          }
     `;
  document.head.appendChild(style);
}

class lightbox1_LaTeX  {
  constructor(separador = "", ...rutas) {
    this.slideIndex_lightbox1 = 0;

    this.id = (Math.random() + "").replace("0.", "");
    set_lightboxes_lightbox1[this.id] = this;

    let html = `<div>`;
    for (let i = 0; i < rutas.length; i++) {
      const img = rutas[i];
      html += `
          <img 
               class="img-LaTeX-lightbox1"
               src="${lightbox1_LaTeX.LaTeX(img)}" 
               onclick="
                    set_lightboxes_lightbox1['${this.id}'].openModal();
                    set_lightboxes_lightbox1['${this.id}'].currentSlide(${i});
               "
          >
          `;
      html += separador;
    }
    html += `</div>`;

    this.html = html;
    html = "";
    html += `
     <div id="mymodal-lightbox1-${this.id}" class="modal-lightbox1">
          <span class="close-lightbox1" onclick="set_lightboxes_lightbox1['${this.id}'].closeModal()">&times;</span>
          <div class="modal-lightbox1-content">
     `;
    for (let i = 0; i < rutas.length; i++) {
      const img = rutas[i];
      html += `
               <div class="mySlides-lightbox1">
                    <img src="${lightbox1_LaTeX.LaTeX(
                      img,
                      "\\huge"
                    )}" class="img-lightbox-modal-lightbox1-LaTeX">
               </div>
          `;
    }
    if (rutas.length > 1) {
      html += `
      <a class="prev-lightbox1" onclick="set_lightboxes_lightbox1['${this.id}'].plusSlides(-1)">&#10094;</a>
      <a class="next-lightbox1" onclick="set_lightboxes_lightbox1['${this.id}'].plusSlides(1)">&#10095;</a>
      `;
    }
    html += `
          </div>
     </div>
     `;
    this.html_modal = html;
  }

  insertarHTMLenDocument() {
    document.body.innerHTML += this.html_modal;
    this.cargarControles();
  }

  cargarControles() {
    this.element_myModal_lightbox1 = document.getElementById(
      "mymodal-lightbox1-" + this.id
    );
    this.slides =
      this.element_myModal_lightbox1.getElementsByClassName(
        "mySlides-lightbox1"
      );
    this.showSlides(this.slideIndex_lightbox1);
  }

  static LaTeX(latex, sz = "", onlyurl = false) {
    return `https://latex.codecogs.com/svg.image?${sz}&space;${escape(latex)}`;
  }

  openModal() {
    this.element_myModal_lightbox1.style.display = "flex";
  }

  closeModal() {
    this.element_myModal_lightbox1.style.display = "none";
  }

  plusSlides(n) {
    this.slideIndex_lightbox1 += n;
    this.showSlides(this.slideIndex_lightbox1);
  }

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