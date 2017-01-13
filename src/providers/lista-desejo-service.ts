import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ListaDesejoService {

  constructor(public http: Http, private alert: AlertController) {
    console.log('Hello ListaDesejoService Provider');
  }

  loadLista(id_user){
        var elementos = {user_id: id_user};
        let search = JSON.stringify(elementos);
        return this.http.post('http://liberapp.com.br/api/lista_desejo',search).map(res => res.json());
  }

  saveDesejo(id_user, titulo){
        var elementos = {user_id: id_user, texto: titulo.titulo};
        let search = JSON.stringify(elementos);
        return this.http.post('http://liberapp.com.br/api/save_desejo',search).map(res => res.json());
  }

   removeDesejo(id){
        var elementos = {id: id};
        let search = JSON.stringify(elementos);
        return this.http.post('http://liberapp.com.br/api/delete_desejo',search).map(res => res.json());
  }

}
