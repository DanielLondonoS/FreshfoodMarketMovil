import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MisDatosPage } from '../mis-datos/mis-datos';
import { MisDatosMascotasPage } from '../mis-datos-mascotas/mis-datos-mascotas';

/**
 * Generated class for the MisDatosPanelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-datos-panel',
  templateUrl: 'mis-datos-panel.html',
})
export class MisDatosPanelPage {
  tab1: any = MisDatosPage;
  tab2: any = MisDatosMascotasPage
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisDatosPanelPage');
    // this.tab1 = MisDatosPage;
    // this.tab2 = MisDatosMascotasPage;
  }

}
