import { Component } from '@angular/core';
import { MarcasProvider } from '../../providers/marcas/marcas';
import { NavController } from 'ionic-angular';
import { MarcasPage } from '../../pages/marcas/marcas';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';

/**
 * Generated class for the MarcasSlideComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'marcas-slide',
  templateUrl: 'marcas-slide.html'
})
export class MarcasSlideComponent {
  listaMarcas:any[]=[];

  constructor(private marcasProvider:MarcasProvider,private navCtrl:NavController,private utilidadesProvider:UtilitiesProvider) {
    console.log('Hello MarcasSlideComponent Component');

    this.cargarListaDeMarcas()
  }

  cargarListaDeMarcas(){
    this.utilidadesProvider.openLoading();
    this.marcasProvider.ListaDeMarcas()
    .subscribe(res => {
      this.utilidadesProvider.closeLoading();
      if(res['error'] == 0){
        if(res['listaMarcas'].length > 0){
          this.listaMarcas = res['listaMarcas'];
        }
      }
    },error => {
      this.utilidadesProvider.closeLoading();
      this.utilidadesProvider.vibrarDispositivo();
      this.utilidadesProvider.presentToast('Ocurrio un problema.')
    })
  }

  itemSelected(marca){
    console.log(marca)
    this.navCtrl.push(MarcasPage,{marca:marca})
    
  }

}
