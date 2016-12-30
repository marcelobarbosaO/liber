import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { ListaDesejoService } from '../../providers/lista-desejo-service';

@Component({
  selector: 'page-lista-desejo',
  templateUrl: 'lista-desejo.html',
  providers:[ListaDesejoService]
})
export class ListaDesejoPage {
  public desejos:any = [];
  public user_d = window.localStorage.getItem('profile_logged');
  public loader: any;

  constructor(public navCtrl: NavController, private loading:LoadingController, private alerta:AlertController, private listaDesejoService: ListaDesejoService) {
    this.loadLista();
  }

  ionViewDidLoad() {
    console.log('Hello ListaDesejoPage Page');
  }
  
  loadLista(){
      let result = JSON.parse(this.user_d);
      this.loader = this.loading.create({
            content: 'Carregando, Aguarde...'
      });
      this.loader.present();
      this.listaDesejoService.loadLista(result.id_user).then(data => {
        if(data.status == 0){
           this.desejos = [];
          for(var key in data){
            if(data[key] != 0){
                this.desejos.push(data[key]);
            }
          }
        }
          this.loader.dismiss();
      });
  }

  openModal(){
      let prompt = this.alerta.create({
      title: 'Lista de Desejo',
      message: "Digite o título do livro desejado no campo abaixo",
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Título do livro'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            this.saveDesejo(data);
          }
        }
      ]
    });
    prompt.present();
  }

  saveDesejo(titulo){
      let result = JSON.parse(this.user_d);
      this.listaDesejoService.saveDesejo(result.id_user, titulo).then(data => {
        if(data.status == 0){
            this.msgAlert("Item salvo com sucesso");
            this.loadLista();
        } else {
            this.msgAlert("Houve um erro ao salvar o item");
        }
      });
  }

  removeItem(id){
      this.listaDesejoService.removeDesejo(id).then(data => {
        if(data.status == 0){
            this.msgAlert("Item removido com sucesso");
            this.loadLista();
        } else {
            this.msgAlert("Houve um erro ao remover o item");
        }
      });
  }

  msgAlert(message) {
    let alertt = this.alerta.create({
      title: message,
      buttons: ['fechar']
    });
    alertt.present();
  }

}
