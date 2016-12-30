import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


import { ChatPage } from '../chat/chat';
import { LivrosService } from '../../providers/livros-service';

@Component({
  selector: 'page-detail-book',
  templateUrl: 'detail-book.html',
  providers:[LivrosService]
})
export class DetailBookPage {
  public livro: any;
  constructor(public navCtrl: NavController, private livrosService:LivrosService, private alert: AlertController, private navParams: NavParams) {
    this.livro = navParams.data;
  }

  ionViewDidLoad() {
    console.log('Hello DetailBookPage Page');
  }

  chatOpen(book){
    this.navCtrl.push(ChatPage, book);
  }

  denunciarLivro(book){
    let alerta = this.alert.create();
    alerta.setTitle('Qual o motivo da denúncia?');
    alerta.addInput({
      type: 'radio',
      label: 'Não é um anúncio de livro',
      value: 'Não é um anúncio de livro',
      checked: true
    });
    alerta.addInput({
      type: 'radio',
      label: 'Atos de Repudialismo',
      value: 'Atos de Repudialismo',
    });
    alerta.addInput({
      type: 'radio',
      label: 'Está me incomodando',
      value: 'Está me incomodando',
    });
    alerta.addButton('Cancelar');
    alerta.addButton({
      text: 'Enviar',
      handler: data => {
        this.sendDenuncia(data);
      }
    });
    alerta.present();

  }

  sendDenuncia(result){
    var user_atual = window.localStorage.getItem('profile_logged');
    let user_detail = JSON.parse(user_atual);
    console.log("RESULTADO:: ",result);
    this.livrosService.sendDenuncia(user_detail.id_user,this.livro.id, result).then(data => {
       if(data.status == 0){
          this.alertaMsg('Denuncia feita com sucesso');
       } else {
         if(data.status == 1){
            this.alertaMsg('Você já denunciou essa publicação');
         }
      }
    });
  }

  alertaMsg(mensagem){
    let alerta = this.alert.create({
      title: mensagem,
      buttons: ['fechar']
    });
    alerta.present();
  }

}
