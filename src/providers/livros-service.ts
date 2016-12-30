import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {  AlertController } from 'ionic-angular';
//import * as firebase from 'firebase';

@Injectable()
export class LivrosService {
  private data: any;
  private dataSearch: any;
  public dataDenuncia: any;
  public anuncios: any;
  public removeLivro: any;
  //public fireAuth: any;
  //public userProfile: any;

  constructor(public http: Http, public alert: AlertController) {

      //this.fireAuth = firebase.auth();
      //this.userProfile = firebase.database().ref('Usuarios');

  }


  loadLivros(id_user){
    let search = JSON.stringify({id: id_user});
      if(this.data){
          return Promise.resolve(this.data);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/publicacoes', search).map(res => res.json()).subscribe(data => {
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

  sendDenuncia(id_user, id_livro, id_denuncia){
        let search = JSON.stringify({livro_id: id_livro, user_id: id_user, denuncia_id: id_denuncia});
        if(this.dataDenuncia){
          return Promise.resolve(this.dataDenuncia);
        }
        return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/denunciar',search).map(res => res.json()).subscribe(dataDenuncia => {
            this.dataDenuncia = dataDenuncia;
            resolve(this.dataDenuncia);
            this.dataDenuncia = false;
          }, error => {
              this.presentAlert("Houve um erro ao fazer a denuncia");
          });
      });
  }

  meusAnuncios(id_user){
    let search = JSON.stringify({id: id_user});
      if(this.anuncios){
          return Promise.resolve(this.anuncios);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/meus_anuncios', search).map(res => res.json()).subscribe(anuncios => {
            this.anuncios = anuncios;
            resolve(this.anuncios);
          }, error => {
               this.presentAlert("Houve um erro ao recuperar a lista de livros");
          });
      });
  }

  removeAnuncio(id){
        let search = JSON.stringify({id: id});
        if(this.removeLivro){
          return Promise.resolve(this.removeLivro);
        }
        return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/remove_livro', search).map(res => res.json()).subscribe(removeLivro => {
            this.removeLivro = removeLivro;
            resolve(this.removeLivro);
            this.removeLivro = false;
          }, error => {
               this.presentAlert("Houve um erro ao remover o livro");
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
