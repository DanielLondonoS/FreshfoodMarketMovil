import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { ProductoModel } from '../../models/producto.model';
import { ProductoDetallePage } from '../producto-detalle/producto-detalle';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  categoria:any;
  listaProductosCategoria:any[] = [];
  title:any="";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private productosProvider:ProductosProvider,
    private utilidadesProvider:UtilitiesProvider
    ) {
    this.categoria = this.navParams.get('categoria');
    this.title = this.categoria['nombre']
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad CategoriasPage');
    this.cargarProductosPorCategoria(this.categoria['id']);
  }

  cargarProductosPorCategoria(idCategoria:any){
    this.utilidadesProvider.openLoading();
    this.productosProvider.productosPorIdCategoria(idCategoria)
    .subscribe(res => {
      this.utilidadesProvider.closeLoading();
      if(res['error'] == 0){
        if(res['listaProductos'].length > 0){
          this.listaProductosCategoria = res['listaProductos'];
        }
      }
    },error => {
      this.utilidadesProvider.closeLoading();
      this.utilidadesProvider.vibrarDispositivo();
      this.utilidadesProvider.presentToast('Ocurrio un problema.')
    })
  }

  onProductClick(product:ProductoModel){
    console.log(product)
    this.navCtrl.push(ProductoDetallePage,{producto:product})
  }

}
