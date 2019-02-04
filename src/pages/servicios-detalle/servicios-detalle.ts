import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ServiciosDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-servicios-detalle',
  templateUrl: 'servicios-detalle.html',
})
export class ServiciosDetallePage {
  servicio:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
    console.log(navParams)
    this.servicio = navParams.get('servicio');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiciosDetallePage');
  }

  llamar(numero:string){
    this.callNumber.callNumber(numero.replace(/ /g, ""), true)
    .then(res => {
      console.log('Launched dialer!', res)
    })
    .catch(err => {
      console.log('Error launching dialer', err)
    });
  }

}
