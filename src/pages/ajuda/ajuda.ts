import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Ajuda page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ajuda',
  templateUrl: 'ajuda.html'
})
export class AjudaPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AjudaPage Page');
  }

}
