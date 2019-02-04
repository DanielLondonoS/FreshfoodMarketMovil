import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductoModel } from '../../models/producto.model';
import { UtilitiesTransversal } from '../../transversals/Utilities.transversal';
import { PedidoDetalleModel } from '../../models/pedidoDetalle.model';
import { ToastController, NavController } from 'ionic-angular';

/**
 * Generated class for the ProductosListaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'productos-lista',
  templateUrl: 'productos-lista.html'
})
export class ProductosListaComponent implements OnInit{
  @Input() set ListaProductos(value:ProductoModel[]){
    this._listaProductos = value;
    if(this._listaProductos != undefined){
      this.formatoListaProducto(this._listaProductos)
    }
  }

  get subCategorie(): any { 
    return this._listaProductos; 
  } 


  // @Input() ListaProductos : ProductoModel[] ;
  @Output() ProductsClick = new EventEmitter<ProductoModel>();
  text: string;
  panel:any[]=[];
  utilidades = new UtilitiesTransversal();
  _listaProductos : ProductoModel[];
  constructor( public toastCtrl: ToastController, private navCtrl:NavController) {
    console.log('Hello ProductosListaComponent Component');
    this.text = 'Hello World';
    this.tipoPanel("grid")
    console.log(this.ListaProductos)
    
  }

  ngOnInit(){
    console.log(this.ListaProductos,'did load')
    // if(this.ListaProductos != undefined && this.ListaProductos != null){
    //   let _listProducts = this.ListaProductos;
    //   let _result:any[]=[]
      // let carrito = this.utilidades.ObtenerCarritoDetalle();
      // _listProducts.forEach(r=> {
        // if(carrito != []){
        //   let busqueda = carrito.find(it => it.IdProducto == r.Id);
        //   if(busqueda != undefined && busqueda != null){
        //     r['cantidad'] = busqueda.Cantidad;
        //     r['disable_buy_button'] = true;
        //   }else{
        //     r['cantidad'] = 0;
        //     r['disable_buy_button'] = false;
        //   }
        // }else{
          // r['cantidad'] = 0;
          // r['disable_buy_button'] = false;
        // }
        
    //     _result.push(r)
    //   })
    //   this.ListaProductos = _result;
    // }
  }

  formatoListaProducto(lista:ProductoModel[]){
    if(lista != undefined && lista != null){
      let _listProducts = lista;
      let _result:ProductoModel[]=[]
      let carrito = this.utilidades.ObtenerCarritoDetalle();
      _listProducts.forEach(r=> {
        if(carrito != []){
          let busqueda = carrito.find(it => it['idProducto'] == r['id']);
          if(busqueda != undefined && busqueda != null){
            r['cantidad'] = busqueda.cantidad;
            r['disable_buy_button'] = true;
          }else{
            r['cantidad'] = 0;
            r['disable_buy_button'] = false;
          }
        }else{
          r['cantidad'] = 0;
          r['disable_buy_button'] = false;
        }
        
        _result.push(r)
      })
      this._listaProductos = _result;
    }
  }

  tipoPanel(panel:string){
    switch(panel){
      case 'grid':
        this.panel['grid'] = true;
        this.panel['list'] = false;
      break;
      case 'list':
        this.panel['grid'] = false;
        this.panel['list'] = true;
      break;
      default:
        this.panel['grid'] = false;
        this.panel['list'] = true;
      break;
    }
  }

  agregarCarrito(i){
    console.log(i)
    this._listaProductos[i]['disable_buy_button'] = true;
    this._listaProductos[i]['cantidad'] = 1;   
    let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();
    pedidoDetalle.cantidad = 1;
    pedidoDetalle.id = "";
    pedidoDetalle.idPedido = "";
    pedidoDetalle.idProducto = this._listaProductos[i]['id'];
    
    pedidoDetalle.valorUnitario = this._listaProductos[i]['precioVenta'];
    pedidoDetalle.valorTotal = this._listaProductos[i]['precioVenta'] * this._listaProductos[i]['cantidad'];
    this.utilidades.AgregarAlcarrito(pedidoDetalle,'step');
    this.presentToast("Acción exitosa.");
  }
  //amenta o disminuye la cantidad del carrito
  cantidad(accion :string,product:ProductoModel,index:number){
    console.log(accion,product,index)
    let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();
    switch(accion){
      case 'dec':
        if(this._listaProductos[index]['cantidad'] > 0){
          this._listaProductos[index]['cantidad'] = this._listaProductos[index]['cantidad'] - 1;     
          pedidoDetalle.cantidad = -1;     
        }        
      break;
      case 'inc':
        this._listaProductos[index]['cantidad'] = this._listaProductos[index]['cantidad'] + 1;
        pedidoDetalle.cantidad = 1;
      break;
    }

    
    pedidoDetalle.id = "";
    pedidoDetalle.idPedido = "";
    pedidoDetalle.idProducto = this._listaProductos[index]['id'];
    
    pedidoDetalle.valorUnitario = this._listaProductos[index]['precioVenta'];
    pedidoDetalle.valorTotal = this._listaProductos[index]['precioVenta'] * this._listaProductos[index]['cantidad'];
    this.utilidades.AgregarAlcarrito(pedidoDetalle,'step');
    this.presentToast("Agregado al carrito.");
    
    // let busquedaEnCarro = this.user_shopping_cart.find(g => g.product.id == this.listProducts[index]['id'])
    // if(busquedaEnCarro == undefined){
    //   this.addCart(product);
    // }else{
    //   // let index = this.user_shopping_cart.indexOf(busquedaEnCarro);
    //   busquedaEnCarro.quantity = this.listProducts[index]['cart_quantity'];
    //   this.updateCart(busquedaEnCarro.id,busquedaEnCarro)
    // }
  }

  quantityInput(product:ProductoModel,index:number){
    console.log(product,index)
    let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();
    
    pedidoDetalle.cantidad = this._listaProductos[index]['cantidad'];     
    
    pedidoDetalle.id = "";
    pedidoDetalle.idPedido = "";
    pedidoDetalle.idProducto = this._listaProductos[index]['id'];
    
    pedidoDetalle.valorUnitario = this._listaProductos[index]['precioVenta'];
    pedidoDetalle.valorTotal = this._listaProductos[index]['precioVenta'] * this._listaProductos[index]['cantidad'];
    this.utilidades.AgregarAlcarrito(pedidoDetalle,'input');
    this.presentToast("Agregado al carrito.");
  }
  //emite un evento y pasa el producto seleccionado a la pagina 
  onProductsClick(products:ProductoModel){
    this.ProductsClick.emit(products);
  }

  presentToast(mensaje:string) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }

}
