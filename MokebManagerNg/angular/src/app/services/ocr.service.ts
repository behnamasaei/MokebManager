import { Injectable } from '@angular/core';
import pica from 'pica';
const Tesseract = require('tesseract.js');

@Injectable({
  providedIn: 'root',
})
export class OcrService {
  constructor() {}

  preprocessImage(image: File): Promise<string> {
    const picaInstance = pica();
    const canvas = document.createElement('canvas');
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const width = 800; // Desired width
        const height = Math.round((img.height / img.width) * width);
        canvas.width = width;
        canvas.height = height;
        picaInstance
          .resize(img, canvas)
          .then(() => {
            resolve(canvas.toDataURL());
          })
          .catch(reject);
      };
      img.src = URL.createObjectURL(image);
    });
  }

  recognize(image: string | File) {
    return Tesseract.recognize(image, 'eng', {
      workerPath: Tesseract.workerPath,
      langPath: Tesseract.langPath,
      corePath: Tesseract.corePath,
      logger: m => console.log(m),
    });
  }

  // processImage(image: File): Promise<string> {
  //   return this.preprocessImage(image).then(preprocessedImage => {
  //     return this.recognizeImage(preprocessedImage);
  //   });
  // }
}
