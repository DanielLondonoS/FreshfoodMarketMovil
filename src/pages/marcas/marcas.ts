import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { ProductoModel } from '../../models/producto.model';
import { ProductoDetallePage } from '../producto-detalle/producto-detalle';

/**
 * Generated class for the MarcasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marcas',
  templateUrl: 'marcas.html',
})
export class MarcasPage {
  marca:any;
  listaProductosMarca:any[] = [];
  title:any="";
  idMarca:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productosProvider:ProductosProvider,
    private utilidadesProvider:UtilitiesProvider
    ) {
    this.marca = this.navParams.get('marca');
    this.idMarca = this.navParams.get('id');
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad MarcasPage');
    if(this.marca == undefined || this.marca == null){
      this.title = 'Productos';
      this.cargarProductosPorMarca(this.idMarca)
    }else{
      this.title = this.marca['nombre']
      this.cargarProductosPorMarca(this.marca['id'])
    }
  }

  cargarProductosPorMarca(idMarca:any){
    this.utilidadesProvider.openLoading();
    this.productosProvider.productosPorIdMarca(idMarca)
    .subscribe(res => {
      this.utilidadesProvider.closeLoading();
      if(res['error'] == 0){
        if(res['listaProductos'].length > 0){
          this.listaProductosMarca = res['listaProductos'];
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
