import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ListaDesejo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lista-desejo',
  templateUrl: 'lista-desejo.html'
})
export class ListaDesejoPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ListaDesejoPage Page');
  }

}
