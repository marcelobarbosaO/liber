import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform  } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AjudaPage } from '../pages/ajuda/ajuda';
import { AnunciarPage } from '../pages/anunciar/anunciar';
import { AnunciosPage } from '../pages/anuncios/anuncios';
import { ListaDesejoPage } from '../pages/lista-desejo/lista-desejo';
import { MensagensPage } from '../pages/mensagens/mensagens';
import { PerfilPage } from '../pages/perfil/perfil';

import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = LoginPage;
  public usuario: any;

  constructor(platform: Platform) {
    firebase.initializeApp({
      apiKey: "AIzaSyB5lV754U8uhWU_rCYbkzehx-2kxdGwuZU",
      authDomain: "liber-81400.firebaseapp.com",
      databaseURL: "https://liber-81400.firebaseio.com",
      storageBucket: "liber-81400.appspot.com",
      messagingSenderId: "773323694037"
    });

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit(){
      this.autentica();
  }

  autentica(){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            this.nav.setRoot(LoginPage);
        } else {
            this.usuario = user;
            this.nav.setRoot(HomePage);
            console.log('vai para home pow');
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
        default:
            this.nav.setRoot(HomePage);
      }
  }

  logOut(){
    firebase.auth().signOut().then(function() {
        this.nav.setRoot(LoginPage);
        console.log('volta pra LoginPage');
    }, function(error) {
        console.error('Sign Out Error', error.message);
    });
  }
}
