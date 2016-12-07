import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import * as firebase from 'firebase';

@Injectable()
export class LivrosService {
  private data: any;
  //public fireAuth: any;
  //public userProfile: any;

  constructor(public http: Http) {

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
          });
      });
  }

}
