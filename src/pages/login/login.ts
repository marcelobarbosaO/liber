import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';

//import { HomePage } from '../home/home';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public emailUser : any;
  public idUser : any;
  constructor(public navCtrl: NavController, public alert: AlertController) {}

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  facebookLogin(){
    Facebook.login(['email']).then( (response) => {
        let facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential).then((success) => {
            //console.log("Firebase success: " + JSON.stringify(success));
            
        }).catch((error) => {
            //console.log("Firebase failure: " + JSON.stringify(error));
            this.presentAlert("Houve um erro ao lhe autenticar.");
        });

    }).catch((error) => {
        this.presentAlert("Houve um erro ao logar com facebook.");
    });
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
