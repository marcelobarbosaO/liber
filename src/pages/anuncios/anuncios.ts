import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Anuncios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-anuncios',
  templateUrl: 'anuncios.html'
})
export class AnunciosPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AnunciosPage Page');
  }

}
