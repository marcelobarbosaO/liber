import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { LivrosService } from '../../providers/livros-service';

import { DetailBookPage } from '../detail-book/detail-book';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[LivrosService]
})
export class HomePage implements OnInit{
  public books:any = [];
  livrosPediu = false;
  public user:any;

  constructor(public navCtrl: NavController, private navParams: NavParams, private livrosService: LivrosService) {

  }

  ngOnInit(){
      this.listaLivros();
  }

  listaLivros(){
    this.livrosService.loadLivros().then(data => {
      for(var key in data){
        this.books.push(data[key]);
      }
    });
  }

  bookSelected(book){
    this.navCtrl.push(DetailBookPage, book);
  }


}
