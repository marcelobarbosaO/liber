import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AjudaPage } from '../pages/ajuda/ajuda';
import { AnunciarPage } from '../pages/anunciar/anunciar';
import { AnunciosPage } from '../pages/anuncios/anuncios';
import { ListaDesejoPage } from '../pages/lista-desejo/lista-desejo';
import { MensagensPage } from '../pages/mensagens/mensagens';
import { PerfilPage } from '../pages/perfil/perfil';
import { DetailBookPage } from '../pages/detail-book/detail-book';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AjudaPage,
    AnunciarPage,
    AnunciosPage,
    ListaDesejoPage,
    MensagensPage,
    PerfilPage,
    DetailBookPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AjudaPage,
    AnunciarPage,
    AnunciosPage,
    ListaDesejoPage,
    MensagensPage,
    PerfilPage,
    DetailBookPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
