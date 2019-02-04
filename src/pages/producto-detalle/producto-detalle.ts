import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UtilitiesTransversal } from '../../transversals/Utilities.transversal';
import { PedidoDetalleModel } from '../../models/pedidoDetalle.model';
import { ProductoModel } from '../../models/producto.model';

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
  cantidad:number = 1;
  utilidades = new UtilitiesTransversal();
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.producto = this.navParams.get('producto');
    console.log(this.producto)

    if(this.producto['cantidad'] != 0){
      this.cantidad = this.producto['cantidad'];
    }
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoDetallePage');
  }

  addPedido(){
    let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();
    pedidoDetalle.id = "";
    pedidoDetalle.idPedido = "";
    pedidoDetalle.idProducto = this.producto.id;
    pedidoDetalle.cantidad = this.cantidad;
    pedidoDetalle.valorUnitario = this.producto.precioVenta;
    pedidoDetalle.valorTotal = this.producto.precioVenta * this.cantidad;
    this.utilidades.AgregarAlcarrito(pedidoDetalle,'input');
    this.presentToast('Producto agregado.')

  }

   //amenta o disminuye la cantidad del carrito
   onCantidad(accion :string){
    switch(accion){
      case 'dec':
        if(this.cantidad > 0){
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
