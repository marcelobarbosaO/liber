import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { TextMaskModule } from 'angular2-text-mask';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AjudaPage } from '../pages/ajuda/ajuda';
import { AnunciarPage } from '../pages/anunciar/anunciar';
import { AnunciosPage } from '../pages/anuncios/anuncios';
import { AnuncioDetailPage } from '../pages/anuncio-detail/anuncio-detail';
import { ListaDesejoPage } from '../pages/lista-desejo/lista-desejo';
import { MensagensPage } from '../pages/mensagens/mensagens';
import { PerfilPage } from '../pages/perfil/perfil';
import { DetailBookPage } from '../pages/detail-book/detail-book';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ChatPage } from '../pages/chat/chat';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AjudaPage,
    AnunciarPage,
    AnunciosPage,
    AnuncioDetailPage,
    ListaDesejoPage,
    MensagensPage,
    PerfilPage,
    CadastroPage,
    ChatPage,
    DetailBookPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    LazyLoadImageModule,
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AjudaPage,
    AnunciarPage,
    AnunciosPage,
    AnuncioDetailPage,
    ListaDesejoPage,
    MensagensPage,
    PerfilPage,
    CadastroPage,
    ChatPage,
    DetailBookPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
