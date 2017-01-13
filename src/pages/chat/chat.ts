import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers:[ChatService]
})
export class ChatPage {
  public livro: any;
  public loader: any;
  public msgs: any = [];
  public user_atual = window.localStorage.getItem('profile_logged');
  public user_detail:any;
  public conversa_iniciada = false;

  constructor(public navCtrl: NavController, private params: NavParams, private loading:LoadingController, private chatService:ChatService, public alerta: AlertController) {
     this.livro = params.data;
     this.loader = this.loading.create({
              content: 'Carregando, Aguarde...'
     });
     this.loader.present();
     this.loadMsgs();
     this.user_detail = JSON.parse(this.user_atual);
     console.log(this.user_detail);
  }

  ionViewDidLoad() {
    let self = this;
      let inp: any = document.getElementById("msg_chat_input");
      let form : any = document.getElementById("msg_chat");
      form.addEventListener("submit", function(e){
            let regex=/[^a-zA-Z 0-9]/g;
            if(regex.test(e.key) == false)
            if(inp.value != null && inp.value != "" && inp.value != undefined){
                self.sendMessage(inp.value);
                inp.value = "";
            } else {
                console.log("Caracteres invalidos")
            }
      });
  }

  loadMsgs(){
      let self = this;
      let idLivro = this.livro.id;
      let result = JSON.parse(this.user_atual);
      if(this.user_atual != null){
          if(result.id_user != undefined){
              this.chatService.loadMsgs(idLivro, result.id_user).subscribe(data => {
                    if(data.status == 0){
                        self.conversa_iniciada = true;
                        this.msgs = [];
                        this.msgs = data.msgs;
                        this.loader.dismiss();//verificar se da erro quando enviar nova mensagem, esse arquivo estar aqui, senao criar validacao ou nova funcao para corrigir
                    } else {
                        this.loader.dismiss();
                        //this.presentAlert("Ops...","Houve um erro ao listar a conversa")
                    }
              }, error =>{
                  this.loader.dismiss();
                  this.presentAlert("Ops...","Houve um erro ao listar a conversa");
              })
          } else {
              this.loader.dismiss();
              console.log("NAO EXISTE ESSE ID USER");
              console.log(result);
          }
      } else {
          this.loader.dismiss();
          console.log("NAO EXISTE ESSE SESSION");
      }
  }

  sendMessage(msg){
      let result = JSON.parse(this.user_atual);
      let idLivro = this.livro.id;
      if(this.user_atual != null){
          if(result.id_user != undefined){
                this.chatService.novaMsg(idLivro, msg, result.id_user).subscribe( data => {
                    if(data.status == 0){
                        this.loadMsgs();
                    }
                }, error => {
                    this.presentAlert("Ops...","Houve um erro ao enviar a mensagem.");
                });
          }
      }
  }

  presentAlert(title, message){
      let alert = this.alerta.create({
          title: title,
          subTitle: message,
          buttons: ['Fechar']
      });
      alert.present();
  }
  

}
