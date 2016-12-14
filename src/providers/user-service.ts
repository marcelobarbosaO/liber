import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {  AlertController } from 'ionic-angular';

@Injectable()
export class UserService {
  private data: any;
  private dataNewUser : any;

  constructor(public http: Http, public alert: AlertController) {}

  validarUsuario(email, id){
      let search = JSON.stringify({email: email, id: id});
      if(this.data){
          return Promise.resolve(this.data);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/validaUser',search).map(res => res.json()).subscribe(data => {
              this.data = data;
              resolve(this.data);
          }, error => {
              console.log(JSON.stringify(error.message));
              this.presentAlert("Houve um erro ao validar o usuario");
          });
      });
  }

  cadUsuario(nome, email, fone, id_face, foto){
      let search = JSON.stringify({nome: nome, email: email, id: id_face, fone: fone, foto: foto});
      if(this.dataNewUser){
          return Promise.resolve(this.dataNewUser);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/cadUser',search).map(res => res.json()).subscribe(dataNewUser => {
              this.dataNewUser = dataNewUser;
              resolve(this.dataNewUser);
          }, error => {
              console.log(JSON.stringify(error.message));
              this.presentAlert("Houve um erro ao cadastrar o usuario");
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
