import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-detail-book',
  templateUrl: 'detail-book.html'
})
export class DetailBookPage {
  public livro: any;
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.livro = navParams.data;
  }

  ionViewDidLoad() {
    console.log('Hello DetailBookPage Page');
  }

  chatOpen(book){
    this.navCtrl.push(ChatPage, book);
  }

}
