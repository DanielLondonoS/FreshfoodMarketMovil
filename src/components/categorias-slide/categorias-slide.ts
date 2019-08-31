import { Component } from '@angular/core';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { CategoriasPage } from '../../pages/categorias/categorias';
import { NavController } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';

/**
 * Generated class for the CategoriasSlideComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'categorias-slide',
  templateUrl: 'categorias-slide.html'
})
export class CategoriasSlideComponent {

  text: string;
  listaCategorias:any[] =[];

  constructor(private categoriasProvider: CategoriasProvider,private navCtrl:NavController,private utilidadesProvider:UtilitiesProvider) {
    console.log('Hello CategoriasSlideComponent Component');
    this.text = 'Hello World';
    this.cargarListaDeCategorias();
  }

  cargarListaDeCategorias(){
    this.utilidadesProvider.openLoading();
    this.categoriasProvider.ListaDeCategorias()
    .subscribe(res => {
      this.utilidadesProvider.closeLoading();
      if(res['error'] == 0){
        if(res['listaCategorias'].length > 0){
          this.listaCategorias = res['listaCategorias'];
        }
      }
    },error => {
      this.utilidadesProvider.closeLoading();
      this.utilidadesProvider.vibrarDispositivo();
      this.utilidadesProvider.presentToast('Ocurrio un problema.')
    })
  }

  itemSelected(item){
    console.log(item)
    this.navCtrl.push(CategoriasPage,{categoria:item})
  }

}
