import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { UserService } from '../../providers/user-service';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers: [UserService]
})
export class CadastroPage implements OnInit {
  public user: any;
  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(public navCtrl: NavController, public userService: UserService, public alert: AlertController) {
      // this.user = JSON.parse(window.localStorage.getItem('profile'));
      this.user = {displayName: "Marcelo Barbosa", "photoURL": "http://servidorteste.tvnoar.tv/thumbs/meucanal/palestrantes/1/1.jpg", email: "tuf-marcelo@hotmail.com"};
  }

  ionViewDidLoad() {
    console.log('Hello CadastroPage Page');
  }

  ngOnInit(){
      let self = this;
      let form : any = document.getElementById("cadForm");
      let nome : any = document.getElementById("nome");
      let email : any = document.getElementById("email");
      let fone : any = document.getElementById("fone");
      form.addEventListener("submit", function(e){
          self.cadastrarUser(nome.value, email.value, fone.value);
          console.log(e);
      });
  }

  cadastrarUser(nome, email, fone){
      let user:any = window.localStorage.getItem('profile');
      this.userService.cadUsuario(nome, email, fone, user.providerData[0].uid, user.photoURL).then(data => {
          if(data.status == true){
              var cliente = JSON.stringify({logado: true, first_acess: true});
              window.localStorage.setItem('profile_logged', JSON.stringify(cliente));

              let alerta = this.alert.create({
                title: 'Cadastro Realizado',
                subTitle: "Seu cadastro foi feito com sucesso. Agora desfrute de tudo que o Liber pode lhe oferecer.",
                buttons: [
                  {
                    text: 'iniciar',
                    handler: () =>{
                        this.navCtrl.setRoot(HomePage);
                    }
                  }
                  ]
              });
              alerta.present();
          } else {
            //nao conseguiu cadastrar o user
          }
      });
  } 

}
