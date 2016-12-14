import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController  } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AjudaPage } from '../pages/ajuda/ajuda';
import { AnunciarPage } from '../pages/anunciar/anunciar';
import { AnunciosPage } from '../pages/anuncios/anuncios';
import { ListaDesejoPage } from '../pages/lista-desejo/lista-desejo';
import { MensagensPage } from '../pages/mensagens/mensagens';
import { PerfilPage } from '../pages/perfil/perfil';
import { CadastroPage } from '../pages/cadastro/cadastro';

import firebase from 'firebase';
import { UserService } from '../providers/user-service';


@Component({
  templateUrl: 'app.html',
  providers:[UserService]
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;
    //public rootPage: any = LoginPage;
    public rootPage: any = HomePage;
    public usuario: any;

  constructor(platform: Platform, private userService: UserService, public alert: AlertController) {
    firebase.initializeApp({
      apiKey: "AIzaSyB5lV754U8uhWU_rCYbkzehx-2kxdGwuZU",
      authDomain: "liber-81400.firebaseapp.com",
      databaseURL: "https://liber-81400.firebaseio.com",
      storageBucket: "liber-81400.appspot.com",
      messagingSenderId: "773323694037"
    });

    platform.ready().then(() => {
        //StatusBar.styleDefault();
        //StatusBar.overlaysWebView(false);
        //StatusBar.styleLightContent();
        StatusBar.hide()
        Splashscreen.hide();
    });
  }

  ngOnInit(){
     //this.autentica();
  }

  autentica(){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            this.nav.setRoot(LoginPage);//vai pra tela de login, se nao estiver logado
        } else {
            this.usuario = user;
            let u = window.localStorage.getItem('profile');
            let u_l = window.localStorage.getItem('profile_logged');
            if(u == null || u == undefined){
                window.localStorage.setItem('profile', JSON.stringify(user));
                this.validaUser(user.email, user.providerData[0].uid);
            } else {
                if(u_l != null && u_l != undefined){
                    var result = JSON.parse(u_l);
                    if(result.logado == true){
                        this.nav.setRoot(HomePage);//se ja tiver cadastrado vai pra home    
                    } else {
                        this.nav.setRoot(CadastroPage);//caso nao tenha feito o cadastro
                    }
                } else {
                    this.validaUser(user.email, user.providerData[0].uid);
                }
            }
        }
      });
  }
  
  openPage(page){
      switch(page){
        case "ajuda":
            this.nav.setRoot(AjudaPage);
            break;
        case "perfil":
            this.nav.setRoot(PerfilPage);
            break;
        case "anunciar":
            this.nav.setRoot(AnunciarPage);
            break;
        case "anuncios":
            this.nav.setRoot(AnunciosPage);
            break;
        case "lista":
            this.nav.setRoot(ListaDesejoPage);
            break;
        case "mensagens":
            this.nav.setRoot(MensagensPage);
            break;
        case "cadastro":
            this.nav.setRoot(CadastroPage);
            break;
        default:
            this.nav.setRoot(HomePage);
      }
  }

  logOut(){
    firebase.auth().signOut().then(function() {
        this.nav.setRoot(LoginPage);
        console.log('volta pra LoginPage');
    }, function(error) {
        this.presentAlert(error.message);
    });
  }

  validaUser(email, idUser){
      this.userService.validarUsuario(email, idUser).then(data => {
            if(data.status == true){
                if(data.logado == true){
                    var cliente = JSON.stringify({logado: true});
                    window.localStorage.setItem('profile_logged', JSON.stringify(cliente));
                    this.nav.setRoot(HomePage);//jogar para tela inicial, pois ja possui cadastro
                } else {
                    var cliente = JSON.stringify({logado: false});
                    window.localStorage.setItem('profile_logged', JSON.stringify(cliente));
                    this.nav.setRoot(CadastroPage);//jogar para tela de cadastro
                }
            } else {
                this.presentAlert("Não foram enviados os dados do usuario para logar");
            }
      });
  }

  presentAlert(message) {
    let alerta = this.alert.create({
      title: 'Ops. Houve um erro',
      subTitle: message,
      buttons: ['fechar']
    });
    alerta.present();
  }
}
