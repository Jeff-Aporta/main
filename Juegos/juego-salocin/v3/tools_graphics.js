function comerBorde(img) {
     img.loadPixels();
     pixeles = [...img.pixels]
     for (let x = 0; x < img.width; x++) {
          for (let y = 0; y < img.height; y++) {
               let index = (x + y * img.width) * 4;
               if (img.pixels[index + 3] > 0) {
                    for (let c = -1; c <= 1; c++) {
                         for (let f = -1; f <= 1; f++) {
                              if (c == 0 && f == 0) {
                                   continue
                              }
                              let dx = constrain(x + c, 0, img.width)
                              let dy = constrain(y + f, 0, img.height)
                              let di = (dx + dy * img.width) * 4;
                              if (img.pixels[di + 3] < 255) {
                                   pixeles[index + 3] = 0
                              }
                         }
                    }
               }
          }
     }
     for (let i = 0; i < pixeles.length; i++) {
          img.pixels[i] = pixeles[i];
     }
     img.updatePixels();
}
