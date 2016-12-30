import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from 'ionic-angular';

import { AnuncioDetailPage } from '../anuncio-detail/anuncio-detail';

import { LivrosService } from '../../providers/livros-service';

@Component({
  selector: 'page-anuncios',
  templateUrl: 'anuncios.html',
  providers:[LivrosService]
})
export class AnunciosPage {
  public user_d = window.localStorage.getItem('profile_logged');
  public loader: any;
  public anuncios:any = [];

  constructor(public navCtrl: NavController, private modal: ModalController, private alert: AlertController, private loading: LoadingController, private livrosService:LivrosService) {
    this.meusAnuncios();
  }

  ionViewDidLoad() {
    console.log('Hello AnunciosPage Page');
  }

  meusAnuncios(){
      let result = JSON.parse(this.user_d);
      this.loader = this.loading.create({
            content: 'Carregando, Aguarde...'
      });
      this.loader.present();
      this.livrosService.meusAnuncios(result.id_user).then(data => {
          this.anuncios = [];
          if(data.status == 0){
            for(var key in data){
              if(data[key] != 0){
                this.anuncios.push(data[key]);
              }
            }
            this.loader.dismiss();
          } else if(data.status == 1){
            this.loader.dismiss();
            this.presentAlert("Voceê ainda não possui anúncios cadastrados.");
        } else {
          this.loader.dismiss();
            this.presentAlert("Houve um erro ao trazer seus anuncios");
        }
      });
  }

  detailAnuncio(livro){
       let mod = this.modal.create(AnuncioDetailPage, livro);
       mod.present();
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
