import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductoModel } from '../../models/producto.model';
import { UtilitiesTransversal } from '../../transversals/Utilities.transversal';
import { PedidoDetalleModel } from '../../models/pedidoDetalle.model';
import { ToastController, NavController, AlertController } from 'ionic-angular';

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
  constructor( public toastCtrl: ToastController, private navCtrl:NavController, public alertCtrl: AlertController) {
    console.log('Hello ProductosListaComponent Component');
    this.text = 'Hello World';
    this.tipoPanel("grid")
    console.log(this.ListaProductos)
    
  }

  ngOnInit(){
    console.log(this.ListaProductos,'ngOnInitProductosListaComponent ')
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
    if(this._listaProductos[i]['notificarAntesAgregarCarrito'] == 'SI'){
      const prompt = this.alertCtrl.create({
        title: 'Información',
        message: this._listaProductos[i]['mensajeNotificar'],        
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: data => {
              this.makeAgregarCarrito(i);
            }
          }
        ]
      });
      prompt.present();
    }else{
      this.makeAgregarCarrito(i);
    }
  }

  //amenta o disminuye la cantidad del carrito
  cantidad(accion :string,product:ProductoModel,index:number){
    console.log(accion,product,index)
    let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();
    let cantidad :any = this._listaProductos[index]['cantidad'];
    switch(accion){
      case 'dec':
        if(this._listaProductos[index]['cantidad'] > 1){
          this._listaProductos[index]['cantidad'] = parseInt(cantidad) - 1;     
          pedidoDetalle.cantidad = -1;     
        }else{
          return;
        }        
      break;
      case 'inc':
        this._listaProductos[index]['cantidad'] = parseInt(cantidad) + 1;
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
  }

  

  quantityInput(product:ProductoModel,index:number){
    console.log(product,index)
    if(this._listaProductos[index]['cantidad'] >= 1){
      let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();
      let cantidad :any = this._listaProductos[index]['cantidad']
      pedidoDetalle.cantidad = parseInt(cantidad); 
      
      pedidoDetalle.id = "";
      pedidoDetalle.idPedido = "";
      pedidoDetalle.idProducto = this._listaProductos[index]['id'];
      
      pedidoDetalle.valorUnitario = this._listaProductos[index]['precioVenta'];
      pedidoDetalle.valorTotal = this._listaProductos[index]['precioVenta'] * parseInt(cantidad);
      this.utilidades.AgregarAlcarrito(pedidoDetalle,'input');
      this.presentToast("Agregado al carrito.");
    }else{
      this._listaProductos[index]['cantidad'] = 1;
      return;
    }
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

  private makeAgregarCarrito(i){
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

}
