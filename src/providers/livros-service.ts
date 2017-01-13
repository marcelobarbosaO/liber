import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {  AlertController } from 'ionic-angular';
//import * as firebase from 'firebase';

@Injectable()
export class LivrosService {
  //public fireAuth: any;
  //public userProfile: any;

  constructor(public http: Http, public alert: AlertController) {

      //this.fireAuth = firebase.auth();
      //this.userProfile = firebase.database().ref('Usuarios');

  }

  loadLivros(id_user){
        let search = JSON.stringify({id: id_user});
        return this.http.post('http://liberapp.com.br/api/publicacoes', search).map(res => res.json())
  }

  searchLivros(busca){
        let search = JSON.stringify({palavra: busca});
        return this.http.post('http://liberapp.com.br/api/busca',search).map(res => res.json());
  }

  sendDenuncia(id_user, id_livro, id_denuncia){
        let search = JSON.stringify({livro_id: id_livro, user_id: id_user, denuncia_id: id_denuncia});
        return this.http.post('http://liberapp.com.br/api/denunciar',search).map(res => res.json());
  }

  meusAnuncios(id_user){
        let search = JSON.stringify({id: id_user});
        return this.http.post('http://liberapp.com.br/api/meus_anuncios', search).map(res => res.json());
  }

  removeAnuncio(id){
        let search = JSON.stringify({id: id});
        return this.http.post('http://liberapp.com.br/api/remove_livro', search).map(res => res.json());
  }

}
