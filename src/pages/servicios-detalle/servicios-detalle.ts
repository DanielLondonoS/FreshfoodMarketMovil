import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { ClienteModel } from '../../models/cliente.model';
import { GestionAccionesProvider } from '../../providers/gestion-acciones/gestion-acciones';

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
  usuario:ClienteModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, 
    private gestionAcciones:GestionAccionesProvider) {
    console.log(navParams)
    this.servicio = navParams.get('servicio');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiciosDetallePage');
  }

  llamar(numero:string,servicio:any){
    this.registrarAccionLlamada(servicio);
    this.callNumber.callNumber(numero.replace(/ /g, ""), true)
    .then(res => {
      console.log('Launched dialer!', res)
    })
    .catch(err => {
      console.log('Error launching dialer', err)
    });
  }

  registrarAccionLlamada(servicio:any){
    console.log('entro a registrar llamada',servicio)
    let modelo = new Object();
    modelo['idServicio'] = servicio['id'];
    modelo['idProveedor'] = servicio['idProveedor'];
    modelo['telefono'] = servicio['telefono'];
    modelo['idUsuario'] = null;
    if(this.usuario){
      modelo['idUsuario'] = this.usuario.id;
    }
    this.gestionAcciones.registerCallService(modelo)
    .subscribe(res => {
      console.log(res);
      console.log('success entro a registrar llamada');
    },error=>{
      console.error(error)
      console.log('error entro a registrar llamada')
    })
  }

}
