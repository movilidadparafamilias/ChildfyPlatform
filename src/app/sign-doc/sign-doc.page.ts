import { Component, OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sign-doc',
  templateUrl: './sign-doc.page.html',
  styleUrls: ['./sign-doc.page.scss'],
})
export class SignDocPage implements OnInit {
  padDeFirma: SignaturePad;
  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let canvas = document.querySelector("canvas");
      this.padDeFirma = new SignaturePad(canvas);
      function resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
      }
      
      window.onresize = resizeCanvas;
      resizeCanvas();
    }, 1000);
    
  }

  reset(){
    this.padDeFirma.clear();
  }

  cancel(){
this.modalController.dismiss();
  }

  save(){

    let signature = this.padDeFirma.toDataURL();
    this.modalController.dismiss({
     signature
    });

  }

}
