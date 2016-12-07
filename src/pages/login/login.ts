import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  facebookLogin(){
    Facebook.login(['email']).then( (response) => {
        let facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential).then((success) => {
            //console.log("Firebase success: " + JSON.stringify(success));
            console.log("logou entra na home page");
            this.navCtrl.setRoot(HomePage);
            //jogar usuario pra tela inicial home do app
        }).catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => {
      console.log(error)
    });
  }

}
