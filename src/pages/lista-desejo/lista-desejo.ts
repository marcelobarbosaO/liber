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
      this.listaDesejoService.loadLista(result.id_user).subscribe(data => {
          if(data.status == 0){
              this.desejos = [];
              this.desejos = data.lista;
          } else {
              this.msgAlert("Ops...","Você ainda não tem nenhum item na lista de desejo.");
          }
          this.loader.dismiss();
      }, error => {
          this.loader.dismiss();
          this.msgAlert("Ops...","Não foi possível se comunicar com o servidor. Tente mais tarde.");
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
      this.listaDesejoService.saveDesejo(result.id_user, titulo).subscribe(data => {
        if(data.status == 0){
            this.msgAlert("Item Salvo", "Item armazenado com sucesso.");
            this.loadLista();
        } else {
            this.msgAlert("Ops...","Houve um erro ao salvar o item");
        }
      }, error =>{
            this.msgAlert("Ops...","Não foi possível se comunicar com o servidor. Tente mais tarde.");
      });
  }

  removeItem(id){
      this.listaDesejoService.removeDesejo(id).subscribe(data => {
        if(data.status == 0){
            this.msgAlert("Item removido com sucesso", "Esse item foi removido permanentemente.");
            this.loadLista();
        } else {
            this.msgAlert("Ops...","Houve um erro ao remover o item");
        }
      }, error => {
          this.msgAlert("Ops...","Não foi possível se comunicar com o servidor. Tente mais tarde.");
      });
  }

  msgAlert(title, message) {
    let alertt = this.alerta.create({
      title: title,
      subTitle: message,
      buttons: ['fechar']
    });
    alertt.present();
  }

}
