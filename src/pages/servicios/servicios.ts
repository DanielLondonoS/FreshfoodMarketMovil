import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VARIABLES } from '../../constantes/constantes';
import { ServiciosDetallePage } from '../servicios-detalle/servicios-detalle';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';

/**
 * Generated class for the ServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {
  servicios:any[] =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public serviciosProvider:ServiciosProvider,
    private utilitiesProvider:UtilitiesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiciosPage');
    //this.cargarServicios();
  }

  // cargarServicios(){
  //   if(VARIABLES.ModoEjecucion == "Desarrollo"){
  //     this.servicios = [
  //       {
  //       "servicio":
  //         {
  //           "id":"0",
  //           "descripcion":"Servicio de veterinaria a domicilio",
  //           "nombre":"Servicio Veterinario",
  //           "telefono":"30012345689",
  //           "idProveedor":"",
  //           "estado":"Activo",
  //           "fechaPublicacion":"",
  //           "imagenPrincipal":"../../assets/imgs/nofoto.png"      
  //         },
  //         "servicioImagen":[
  //          {
  //             "id":1,
  //             "idServicio":"0",
  //             "rutaImagen":"../../assets/imgs/nofoto.png"
  //          }
  //        ] 
  //       },
  //       {
  //       "servicio":{
  //           "id":"1",
  //           "descripcion":"Servicio de paseo canino a domicilio",
  //           "nombre":"Servicio Paseo Canino",
  //           "telefono":"30012345689",
  //           "idProveedor":"",
  //           "estado":"Activo",
  //           "fechaPublicacion":"",
  //           "imagenPrincipal":"../../assets/imgs/nofoto.png"        
  //         },
  //        "servicioImagen":[
  //          {
  //             "id":2,
  //             "idServicio":"1",
  //             "rutaImagen":"../../assets/imgs/nofoto.png"
  //          }
  //        ] 
  //       },
  //       {
  //         "servicio":
  //           {
  //           "id":"2",
  //           "descripcion":"Servicio de castracion a domicilio",
  //           "nombre":"Servicio Castracion",
  //           "telefono":"30012345689",
  //           "idProveedor":"",
  //           "estado":"Activo",
  //           "fechaPublicacion":"",
  //           "imagenPrincipal":"../../assets/imgs/nofoto.png"    
  //         },
  //         "servicioImagen":[
  //          {
  //             "id":3,
  //             "idServicio":"2",
  //             "rutaImagen":"../../assets/imgs/nofoto.png"
  //          }
  //        ] 
  //       }
          
  //       ];

  //     console.log(this.servicios)
  //   }else{
  //     this.utilitiesProvider.openLoading();
  //     this.serviciosProvider.listaServicios()
  //     .subscribe(resultado => {
  //       this.utilitiesProvider.closeLoading();
  //       if(resultado["error"] == 0){
  //         this.servicios = resultado["servicios"]
  //       }
  //     },error => {
  //       this.utilitiesProvider.closeLoading();
  //       console.error(error);
  //       this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
  //     })
  //   }
  // }

  onServiceClick(servicio:any){
    this.navCtrl.push(ServiciosDetallePage,{servicio:servicio})
  }

}
