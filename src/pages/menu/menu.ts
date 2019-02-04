import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App } from 'ionic-angular';
import { RegistroProvider } from '../../providers/registro/registro';
import { ClienteModel } from '../../models/cliente.model';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';
import { PedidosPage } from '../pedidos/pedidos';
import { ServiciosPage } from '../servicios/servicios';
import { MisDatosPage } from '../mis-datos/mis-datos';

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
    { title: 'Mis Datos', page: MisDatosPage, icon: 'contact' },
    { title: 'Mi Pedido', page: PedidosPage, icon: 'cart' },
    { title: 'Servicios', page: ServiciosPage, icon: 'paw' }
  ];

  @ViewChild(Nav) nav : Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams,private appCtrl :App) {
    this.usuario = navParams.get('usuario');
    if(!this.usuario){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillLoad MenuPage',this.usuario);
    if(this.usuario){
      this.openPage(HomePage)
    }else{
      this.logout();
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

}
