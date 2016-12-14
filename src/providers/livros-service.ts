import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {  AlertController } from 'ionic-angular';
//import * as firebase from 'firebase';

@Injectable()
export class LivrosService {
  private data: any;
  private dataSearch: any;
  //public fireAuth: any;
  //public userProfile: any;

  constructor(public http: Http, public alert: AlertController) {

      //this.fireAuth = firebase.auth();
      //this.userProfile = firebase.database().ref('Usuarios');

  }


  loadLivros(){
      if(this.data){
          return Promise.resolve(this.data);
      }
      return new Promise(resolve => {
          this.http.get('http://liberapp.com.br/api/publicacoes').map(res => res.json()).subscribe(data => {
            this.data = data;
            resolve(this.data);
          }, error => {
               this.presentAlert("Houve um erro ao recuperar a lista de livros");
          });
      });
  }

  searchLivros(busca){
      let search = JSON.stringify({palavra: busca});
      if(this.dataSearch){
          return Promise.resolve(this.dataSearch);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/busca',search).map(res => res.json()).subscribe(dataSearch => {
            this.dataSearch = dataSearch;
            resolve(this.dataSearch);
            this.dataSearch = false;
          }, error => {
              this.presentAlert("Houve um erro ao fazer a busca");
          });
      });
  }

  presentAlert(message) {
    let alerta = this.alert.create({
      title: 'Ops...',
      subTitle: message,
      buttons: ['fechar']
    });
    alerta.present();
  }

}
