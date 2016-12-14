import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController, NavParams, AlertController, LoadingController, Slides } from 'ionic-angular';
import { Network } from 'ionic-native';

import { LivrosService } from '../../providers/livros-service';

import { DetailBookPage } from '../detail-book/detail-book';

declare let connection: any;
declare let Connection: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[LivrosService]
})
export class HomePage implements OnInit{
  @ViewChild('mySlider') mySlider: any;
  public options: any;
  public books:any = [];
  public resultBusca:any = [];
  livrosPediu = false;
  public user:any;
  public visualizacaoLivro = true;
  public showMessage = false;
  public imageDefault = "./assets/imgs/logo.png";
  public imageError = "./assets/imgs/logo.png";
  public loader: any;
  public showSlides = false;
  public user_d = window.localStorage.getItem('profile_logged');

  constructor(public navCtrl: NavController, private navParams: NavParams, private livrosService: LivrosService, public alert: AlertController, public loading: LoadingController) {
      this.checkNetwork();
      if(Network.connection !== Connection.NONE){
        this.listaLivros();
      } else {
          if(this.showMessage == false){
            this.showMessage = true;
            this.presentAlert("Voce esta offline");
          }
      }

      this.options = {
          slidesPerView:2,
          pager: true
     }
  }

  ngOnInit(){
    let self = this;
     let inp: any = document.getElementById("searchInput");
     let form : any = document.getElementById("formSearch");
     form.addEventListener("submit", function(e){
          let regex=/[^a-zA-Z 0-9]/g;
          if(regex.test(e.key) == false)
          if(inp.value != null && inp.value != "" && inp.value != undefined){
              self.searchLivro(inp.value);
          }
     });

     let result = JSON.parse(this.user_d);
     if(this.user_d != null){
        if(result.first_acess != undefined){
            if(result.first_acess == true){
                this.showSlides = true;
            }
        }
     }
  }

  listaLivros(){
      this.loader = this.loading.create({
            content: 'Carregando, Aguarde...'
      });
      this.loader.present();
      this.livrosService.loadLivros().then(data => {
          for(var key in data){
            this.books.push(data[key]);
          }
          this.loader.dismiss();
      });
  }

  checkNetwork(){
      let onOnline = () => {
        console.log("voce esta online chapa");
        this.showMessage = false;
        this.listaLivros();
      };
    
      let onOffline = () => {
        if(this.showMessage == false){
          this.showMessage = true;
          this.presentAlert("Voce esta offline");
        }
      };

      document.addEventListener('online', onOnline, false);
      document.addEventListener('offline', onOffline, false);
  }

  mudaVisualizacao(){
      this.visualizacaoLivro = !this.visualizacaoLivro;
  }

  bookSelected(book){
    this.navCtrl.push(DetailBookPage, book);
  }

  closeSlides(){
     if(this.user_d != null){
        var cliente = JSON.stringify({logado: true, first_acess: false});
        window.localStorage.setItem('profile_logged',JSON.stringify(cliente));
     }
     this.showSlides = false;
  }
  
  searchLivro(palavra){
        this.livrosService.searchLivros(palavra).then(dataSearch => {
          this.resultBusca = [];
          this.resultBusca = dataSearch;
            //for(var key in data){
              //this.resultBusca.push(data[key]);
            //}
            var btn :any = document.querySelector(".opacityApp");
            btn.classList.remove("hide");
            document.getElementById("resultSearch").classList.add("showDiv");
        });
        console.log(this.resultBusca);
  }

  openSearch(){
      document.querySelector("#searchDiv").classList.add("showDiv");
      document.querySelector("#searchDiv").classList.add("animacao");
      document.querySelector("#searchDiv").classList.add("width-full");
      setTimeout(function(){
        var button:any = document.querySelector("#searchInput");
        button.focus();
      }, 450);
  }

  closeSearch(){
      var btn :any = document.querySelector(".opacityApp");
      btn.classList.add("hide");
      document.getElementById("resultSearch").classList.remove("showDiv");
      document.querySelector("#searchDiv").classList.remove("width-full");
      setTimeout(function(){
        document.querySelector("#searchDiv").classList.remove("animacao");
        document.querySelector("#searchDiv").classList.remove("showDiv");
      }, 350);
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
