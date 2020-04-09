import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App, Platform } from 'ionic-angular';
import { RegistroProvider } from '../../providers/registro/registro';
import { ClienteModel } from '../../models/cliente.model';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';
import { PedidosPage } from '../pedidos/pedidos';
import { ServiciosPage } from '../servicios/servicios';
import { MisDatosPage } from '../mis-datos/mis-datos';
import { PedidosListaPage } from '../pedidos-lista/pedidos-lista';
import { MisDatosPanelPage } from '../mis-datos-panel/mis-datos-panel';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  usuario:ClienteModel;
  pages = [
    { title: 'Inicio', page: HomePage, icon: 'home' },
    { title: 'Mis Datos', page: MisDatosPanelPage, icon: 'contact' },
    { title: 'Mi Carrito', page: PedidosPage, icon: 'cart' },
    { title: 'Mis Pedidos', page: PedidosListaPage, icon:'ios-basket'},
    { title: 'Servicios', page: ServiciosPage, icon: 'paw' }
  ];
  versionApp:any;

  @ViewChild(Nav) nav : Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appCtrl :App,private appVersion: AppVersion,public platform: Platform) {
    this.usuario = navParams.get('usuario');
    if(!this.usuario){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.appVersion.getVersionNumber().then(res => {
        this.versionApp = res;
      });
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillLoad MenuPage',this.usuario);
    if(this.usuario){
      this.openPage(HomePage)
    }else{
      // this.logout();
      this.navCtrl.setRoot(HomePage);
    }
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page){
    if(page === HomePage){
      this.nav.setRoot(page);
    }else{
      this.nav.push(page);
    }
    
  }

  logout(){
    localStorage.removeItem('usuario');
    this.appCtrl.getRootNav().setRoot(LoginPage)
  }

  openIdeaCreativa(){
    window.open('https://ideacreativasp.com','_system','location=yes');
  }
}
