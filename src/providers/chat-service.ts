import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ChatService {

  constructor(public http: Http, private alert: AlertController) {
    console.log('Hello ChatService Provider');
  }

  loadMsgs(id_livro, id_user){
      var elementos = {id_livro: id_livro, user_id: id_user};
      let search = JSON.stringify(elementos);
      return this.http.post("http://liberapp.com.br/api/msgs_chat", search).map(res => res.json());
  }

  novaMsg(id_livro, msg, id_user){
    var elementos = {livro_id: id_livro, msg: msg, user_id: id_user};
    let search = JSON.stringify(elementos);
    return this.http.post("http://liberapp.com.br/api/new_msg_chat", search).map(res => res.json());
  }

}
