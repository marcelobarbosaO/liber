import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Anunciar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-anunciar',
  templateUrl: 'anunciar.html'
})
export class AnunciarPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AnunciarPage Page');
  }

}
