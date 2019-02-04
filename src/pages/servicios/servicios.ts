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
    this.cargarServicios();
  }

  cargarServicios(){
    if(VARIABLES.ModoEjecucion == "Desarrollo"){
      this.servicios = [{
        "id":"",
        "descripcion":"",
        "nombre":"",
        "telefono":"",
        "idProveedor":"",
        "estado":"",
        "fechaPublicacion":"",
        "ImagenPrincipal":""
      },{

        "id":"0",
        "imagen":"../../assets/imgs/nofoto.png",
        "titulo":"Servicio Veterinario",
        "descripcion":"Servicio de veterinaria a domicilio",
        "telefono":"30012345689"        
      },
      {
        "id":"1",
        "imagen":"../../assets/imgs/nofoto.png",
        "titulo":"Servicio Paseo Canino",
        "descripcion":"Servicio de paseo canino a domicilio",
        "telefono":"30012345689"        
      },
      {
        "id":"2",
        "imagen":"../../assets/imgs/nofoto.png",
        "titulo":"Servicio Castracion",
        "descripcion":"Servicio de castracion a domicilio",
        "telefono":"30012345689"        
      }
      ];

      console.log(this.servicios)
    }else{
      this.utilitiesProvider.openLoading();
      this.serviciosProvider.listaServicios()
      .subscribe(resultado => {
        this.utilitiesProvider.closeLoading();
        if(resultado["error"] == 0){
          this.servicios = resultado["servicios"]
        }
      },error => {
        console.log({serviciosListadoError:error})
        this.utilitiesProvider.closeLoading();
      })
    }
  }

  servicioClick(servicio:any,index:number){
    this.navCtrl.push(ServiciosDetallePage,{servicio:servicio})
  }

}
