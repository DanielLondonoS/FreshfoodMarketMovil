import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { VARIABLES } from '../../constantes/constantes';

/**
 * Generated class for the ServiciosListaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'servicios-lista',
  templateUrl: 'servicios-lista.html'
})
export class ServiciosListaComponent implements OnInit {
  @Output() ServicesClick = new EventEmitter<any>();
  servicios:any[] =[];
  constructor(public serviciosProvider:ServiciosProvider,
    private utilitiesProvider:UtilitiesProvider) {
    console.log('Hello ServiciosListaComponent Component');
    
  }

  ngOnInit(){
    this.cargarServicios();
  }

  onServicesClick(service:any){
    this.ServicesClick.emit(service);
  }

  cargarServicios(){
    if(VARIABLES.ModoEjecucion == "Desarrollo"){
      this.servicios = [
        {
        "servicio":
          {
            "id":"0",
            "descripcion":"Servicio de veterinaria a domicilio",
            "nombre":"Servicio Veterinario",
            "telefono":"30012345689",
            "idProveedor":"",
            "estado":"Activo",
            "fechaPublicacion":"",
            "imagenPrincipal":"../../assets/imgs/nofoto.png"      
          },
          "servicioImagen":[
           {
              "id":1,
              "idServicio":"0",
              "rutaImagen":"../../assets/imgs/nofoto.png"
           }
         ] 
        },
        {
        "servicio":{
            "id":"1",
            "descripcion":"Servicio de paseo canino a domicilio",
            "nombre":"Servicio Paseo Canino",
            "telefono":"30012345689",
            "idProveedor":"",
            "estado":"Activo",
            "fechaPublicacion":"",
            "imagenPrincipal":"../../assets/imgs/nofoto.png"        
          },
         "servicioImagen":[
           {
              "id":2,
              "idServicio":"1",
              "rutaImagen":"../../assets/imgs/nofoto.png"
           }
         ] 
        },
        {
          "servicio":
            {
            "id":"2",
            "descripcion":"Servicio de castracion a domicilio",
            "nombre":"Servicio Castracion",
            "telefono":"30012345689",
            "idProveedor":"",
            "estado":"Activo",
            "fechaPublicacion":"",
            "imagenPrincipal":"../../assets/imgs/nofoto.png"    
          },
          "servicioImagen":[
           {
              "id":3,
              "idServicio":"2",
              "rutaImagen":"../../assets/imgs/nofoto.png"
           }
         ] 
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
        this.utilitiesProvider.closeLoading();
        console.error(error);
        this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
      })
    }
  }



}
