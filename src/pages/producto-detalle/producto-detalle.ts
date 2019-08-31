import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UtilitiesTransversal } from '../../transversals/Utilities.transversal';
import { PedidoDetalleModel } from '../../models/pedidoDetalle.model';
import { ProductoModel } from '../../models/producto.model';
import { ProductosProvider } from '../../providers/productos/productos';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';

/**
 * Generated class for the ProductoDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-producto-detalle',
  templateUrl: 'producto-detalle.html',
})
export class ProductoDetallePage {
  producto:ProductoModel;
  imagenesProducto:any[] = [];
  cantidad:number = 1;
  utilidades = new UtilitiesTransversal();
  idProducto:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public productosProvider:ProductosProvider,public utilities:UtilitiesProvider) {
    this.producto = this.navParams.get('producto') || [];
    this.idProducto = this.navParams.get('id')
    console.log(this.producto)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoDetallePage');
    let producto:any = this.producto;
    if(this.producto == undefined || this.producto == null || producto.length == 0){
      this.cargarProducto();
    }else{
      if(this.producto['cantidad'] != 0){
        this.cantidad = this.producto['cantidad'];
      }
      this.cargarImagenesProducto();
    }
    
  }
  
  cargarProducto(){
    this.utilities.openLoading();
    this.productosProvider.productoPorId(this.idProducto)
    .subscribe(res => {
      this.utilities.closeLoading()
      if(res['error'] == 0){
        if(res['producto']){
          this.producto = res['producto'];
          if(this.producto['cantidad'] != 0){
            this.cantidad = this.producto['cantidad'];
          }
          this.cargarImagenesProducto();
        }
      }
    },error => {
      this.utilities.closeLoading();
      this.utilities.vibrarDispositivo();
      this.utilities.presentToast('Ocurrio un problema.')
    })
  }

  cargarImagenesProducto(){
    this.utilities.openLoading();
    this.productosProvider.imagenesPorProducto(this.producto.id)
    .subscribe(res => {
      this.utilities.closeLoading();

      if(res['error'] == 0){
        this.imagenesProducto = res['imagenes'];
      }
      
      console.log(res);
    },error => {
      this.utilities.closeLoading();
      this.utilities.vibrarDispositivo();
      this.utilities.presentToast('Ocurrio un problema.')
      console.log('error '+error)
    })
  }

  addPedido(){
    let cant:any = this.cantidad;
    if(cant >= 1){
      let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();
      pedidoDetalle.id = "";
      pedidoDetalle.idPedido = "";
      pedidoDetalle.idProducto = this.producto.id;

      pedidoDetalle.cantidad = parseInt(cant);
      pedidoDetalle.valorUnitario = this.producto.precioVenta;
      pedidoDetalle.valorTotal = this.producto.precioVenta * cant;
      this.utilidades.AgregarAlcarrito(pedidoDetalle,'input');
      this.presentToast('Producto agregado.')
    }else{
      this.presentToast('Valor no permitido');
      return;
    }
    

  }

   //amenta o disminuye la cantidad del carrito
   onCantidad(accion :string){
    switch(accion){
      case 'dec':
        if(this.cantidad > 1){
          this.cantidad = this.cantidad - 1;          
        }        
      break;
      case 'inc':
        this.cantidad = this.cantidad + 1;
      
      break;
    }
  }

  presentToast(mensaje:string) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }

}
