import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { LivrosService } from '../../providers/livros-service';

@Component({
  selector: 'page-anuncio-detail',
  templateUrl: 'anuncio-detail.html',
  providers: [LivrosService]
})
export class AnuncioDetailPage {
  public livro:any;
  constructor(public navCtrl: NavController, private livrosService: LivrosService, private alert: AlertController, public params: NavParams, public viewCtrl: ViewController) {
      this.livro = params.data;
  }

  ionViewDidLoad() {
      console.log('Hello AnuncioDetailPage Page');
  }

  dismiss() {
      this.viewCtrl.dismiss();
  }

  deletarLivro(livro){
      let confirm = this.alert.create({
          title: 'Tem certeza que deseja remover?',
          message: 'Esse anúncio será removido permanentemente',
          buttons: [
              {
                  text: 'Cancelar'
              },
              {
                  text: 'Remover',
                  handler: () => {
                      this.removeLivro(livro.id);
                  }
              }
          ]
      });
      confirm.present();
  }

  removeLivro(id){
      this.livrosService.removeAnuncio(id).subscribe(data => {
          if(data.status == 0){
              this.viewCtrl.dismiss();
              this.alertaMsg("Anúncio Removido",'Esse anúncio foi removido permanentemente do sistema.');
          } else {
              if(data.status == 1){
                  this.alertaMsg("Ops...",'Anuncio nao encontrado no sistema');
              }
          }
      }, error =>{
          this.alertaMsg("Ops...","Não foi possível se comunicar com o servidor. Tente mais tarde");
      });
  }

  alertaMsg(title, mensagem){
      let alerta = this.alert.create({
          title: title,
          subTitle:mensagem,
          buttons: ['fechar']
      });
      alerta.present();
  }

}
