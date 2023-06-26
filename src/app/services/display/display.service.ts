import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor() { }


  public getHeaderImageForType(type) {
    if (type == 1) {
      return "assets/IDIOMAS.jpg"
    }
    if (type == 2) {
      return "assets/MUSICA.jpg"
    }
    if (type == 3) {
      return "assets/MUSICA.jpg"
    }
    if (type == 4) {
      return "assets/MUSICA.jpg"
    }
    if (type == 5) {
      return "assets/DEPORTE.jpg"
    }
    if (type == 6) {
      return "assets/DEPORTE.jpg"
    }
    if (type == 7) {
      return "assets/ARTE.jpg"
    }
    if (type == 8) {
      return "assets/APOYO.jpg"
    }
    if (type == 9) {
      return "assets/CENTROS.jpg"
    }

  }
}
