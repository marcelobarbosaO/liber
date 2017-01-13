import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {  AlertController } from 'ionic-angular';

@Injectable()
export class UserService {

  constructor(public http: Http, public alert: AlertController) {}

  validarUsuario(email, id){
      let search = JSON.stringify({email: email, id: id});
      return this.http.post('http://liberapp.com.br/api/validaUser',search).map(res => res.json());
  }

  cadUsuario(nome, email, fone, id_face, foto){
      let search = JSON.stringify({nome: nome, email: email, id: id_face, fone: fone, foto: foto});
      return this.http.post('http://liberapp.com.br/api/cadUser',search).map(res => res.json());
  }

}
