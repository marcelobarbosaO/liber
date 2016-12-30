import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ListaDesejoService {
  private data: any;
  private newDesejo: any;
  private deleteDesejo: any;

  constructor(public http: Http, private alert: AlertController) {
    console.log('Hello ListaDesejoService Provider');
  }

  loadLista(id_user){
    var elementos = {user_id: id_user};
     let search = JSON.stringify(elementos);
      if(this.data){
          return Promise.resolve(this.data);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/lista_desejo',search).map(res => res.json()).subscribe(data => {
            this.data = data;
            resolve(this.data);
            this.data = false;
          }, error => {
              this.presentAlert("Houve um erro ao recuperar a lista");
          });
      });
  }

  saveDesejo(id_user, titulo){
    var elementos = {user_id: id_user, texto: titulo.titulo};
     let search = JSON.stringify(elementos);
      if(this.newDesejo){
          return Promise.resolve(this.newDesejo);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/save_desejo',search).map(res => res.json()).subscribe(newDesejo => {
            this.newDesejo = newDesejo;
            resolve(this.newDesejo);
            this.newDesejo = false;
          }, error => {
              this.presentAlert("Houve um erro ao salvar o item");
          });
      });
  }

   removeDesejo(id){
    var elementos = {id: id};
     let search = JSON.stringify(elementos);
      if(this.deleteDesejo){
          return Promise.resolve(this.deleteDesejo);
      }
      return new Promise(resolve => {
          this.http.post('http://liberapp.com.br/api/delete_desejo',search).map(res => res.json()).subscribe(deleteDesejo => {
            this.deleteDesejo = deleteDesejo;
            resolve(this.deleteDesejo);
            this.deleteDesejo = false;
          }, error => {
              this.presentAlert("Houve um erro ao deletar o desejo");
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
