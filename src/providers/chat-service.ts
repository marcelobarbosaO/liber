import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ChatService {
  private data: any;
  private newMsg: any;

  constructor(public http: Http, private alert: AlertController) {
    console.log('Hello ChatService Provider');
  }

  loadMsgs(id_livro, id_user){
    var elementos = {id_livro: id_livro, user_id: id_user};
     let search = JSON.stringify(elementos);
      if(this.data){
          return Promise.resolve(this.data);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/msgs_chat',search).map(res => res.json()).subscribe(data => {
            this.data = data;
            resolve(this.data);
            this.data = false;
          }, error => {
              this.presentAlert("Houve um erro ao fazer a busca");
          });
      });
  }

  novaMsg(id_livro, msg, id_user){
    var elementos = {livro_id: id_livro, msg: msg, user_id: id_user};
    let search = JSON.stringify(elementos);
    if(this.newMsg){
          return Promise.resolve(this.newMsg);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/new_msg_chat',search).map(res => res.json()).subscribe(newMsg => {
            this.newMsg = newMsg;
            resolve(this.newMsg);
            this.newMsg = false;
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
