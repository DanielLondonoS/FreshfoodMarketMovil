import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { ClienteModel } from '../../models/cliente.model';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoModel } from '../../models/producto.model';
import { VARIABLES } from '../../constantes/constantes';
import { UtilitiesTransversal } from '../../transversals/Utilities.transversal';
import { HomePage } from '../home/home';
import { PedidoDetalleModel } from '../../models/pedidoDetalle.model';
import { PedidoModel } from '../../models/pedido.model';

/**
 * Generated class for the PedidosListaDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-lista-detalle',
  templateUrl: 'pedidos-lista-detalle.html',
})
export class PedidosListaDetallePage {
  usuario:ClienteModel;
  pedido:any[]=[];
  ProductosLista:ProductoModel[]=[];
  totalPedido:number = 0;
  ListaCarrito:any[]=[];
  utilidades = new UtilitiesTransversal();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private utilitiesProvider:UtilitiesProvider,
    private pedidosProvider: PedidosProvider,
    private productosProvider:ProductosProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
      this.pedido = this.navParams.get('pedido');
      console.log(this.pedido)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosListaDetallePage');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.cargarListadoProductos();
    
  }

  cargarListadoProductos(){
    this.utilitiesProvider.openLoading();
    this.productosProvider.listaDeProductos()
    .subscribe((res:ProductoModel[]) => {
      console.log({ListaPrductos:res})
      this.utilitiesProvider.closeLoading();
      if(res['estado']){
        this.ProductosLista = res['listaProductos'];
        let listaCarrito:any[]=[];
        this.totalPedido = 0;
        this.pedido['pedidoDetalle'].forEach(item => {
          let busqueda = this.ProductosLista.find(it => it.id == item.idProducto);
          if(busqueda != undefined){
            let _lista:any[]=[];
            _lista['producto'] = busqueda;
            _lista['producto']['pedido_detalle'] = item;
            this.totalPedido = this.totalPedido + item['valorUnitario'] * item['cantidad']// _lista['producto']['pedido_detalle']['valorTotal']; 
            listaCarrito.push(_lista);
          }            
        })
        if(this.totalPedido > 0){
          this.totalPedido = this.totalPedido + 7000;
        }
        this.ListaCarrito = listaCarrito;
        console.log(listaCarrito);          
      }        
    },error => {
      this.utilitiesProvider.closeLoading();
      console.error(error);
      this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
    })
  }

  HacerPedido(){
    if(this.ListaCarrito.length > 0){
      if(VARIABLES.ModoEjecucion == 'Desarrollo'){
        this.presentToast("Pedido exitoso");
        // this.utilidades.VaciarCarrito();
        this.navCtrl.setRoot(HomePage)
      }else{
        
        let alert = this.alertCtrl.create();
        alert.setTitle('Método de pago');
        alert.setMessage('Seleccione solo una opción')

        alert.addInput({
          type: 'checkbox',
          label: 'Contra entrega',
          value: 'ContraEntrega',
          checked: false          
        });

        alert.addInput({
          type: 'checkbox',
          label: 'Transferencia Cuenta ahorros Bancolombia 55190844438',
          value: 'Transferencia',
          checked: false
        });

        alert.addButton('Cancelar');
        alert.addButton({
          text: 'Continuar',
          handler: data => {
            let pedido_detalle:PedidoDetalleModel[] = [];
            let pedido:PedidoModel = new PedidoModel();
            pedido.id = "";
            pedido.estado = 'Nuevo';
            pedido.fecha = new Date();
            pedido.idUsuario = this.usuario.id;
            pedido.metodoPago = data[0];
            this.ListaCarrito.forEach(item => {
              pedido_detalle.push(
                {
                  id:"",
                  idPedido:"",
                  idProducto:item.producto.id,
                  cantidad:item.producto.pedido_detalle.cantidad,
                  valorUnitario:item.producto.pedido_detalle.valorUnitario,
                  valorTotal:item.producto.pedido_detalle.valorTotal
                })
            })
            console.log({pedido:pedido,pedido_detalle:pedido_detalle})
            this.utilitiesProvider.openLoading();
            this.pedidosProvider.GuardarPedido(pedido,pedido_detalle)
            .subscribe(res => {
              console.log(res);
              this.utilitiesProvider.closeLoading();
              if(res['estado']){
                this.presentToast(res['mensaje']);
                //this.utilidades.VaciarCarrito();
                let hora = new Date().getHours();
                
                if(hora >= 15){
                  this.presentAlert('Información','Freshfood Market te informa que por cuestiones de logistica este pedido sera despachado el dia de mañana')
                }
                this.navCtrl.setRoot(HomePage)
              }
            },error => {
              console.log(error)
              this.utilitiesProvider.closeLoading();
            })
          }
        });
        alert.present();        
      }  
    }else{
      this.presentToast("No hay productos en el carrito");
    }  
  }

  quantityInput(product:ProductoModel,index:number){
    console.log(product,index)
    if(parseInt(this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']) >= 1){
      let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();    
      pedidoDetalle.cantidad = parseInt(this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']);    
      pedidoDetalle.id = "";
      pedidoDetalle.idPedido = "";
      pedidoDetalle.idProducto = this.ListaCarrito[index]['producto']['id'];    
      pedidoDetalle.valorUnitario = parseInt(this.ListaCarrito[index]['producto']['precioVenta']);
      pedidoDetalle.valorTotal = parseInt(this.ListaCarrito[index]['producto']['precioVenta']) * parseInt(this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']); 
      this.utilidades.AgregarAlcarrito(pedidoDetalle,'input');
      this.presentToast("Agregado al carrito.");
      let listaCarrito = this.utilidades.ObtenerCarritoDetalle();
      this.ArmarListaCarrito(listaCarrito);
    }else{
      this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] = 1;
      return;
    }
    
  }

  //amenta o disminuye la cantidad del carrito
  cantidad(accion :string,product:ProductoModel,index:number){
    console.log(accion,product,index, this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'])
    let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();
    switch(accion){
      case 'dec':
        if(this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] > 1){
          this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] = parseInt(this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']) - 1;     
          pedidoDetalle.cantidad = -1; 
          // this.totalPedido -= this.ListaCarrito[index]['producto']['precioVenta']  
        }else{
          return;
        }        
      break;
      case 'inc':
        this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] = parseInt(this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']) + 1;
        pedidoDetalle.cantidad = 1;
        // this.totalPedido += this.ListaCarrito[index]['producto']['precioVenta']
      break;
    }        
    pedidoDetalle.id = "";
    pedidoDetalle.idPedido = "";
    pedidoDetalle.idProducto = this.ListaCarrito[index]['producto']['id'];    
    pedidoDetalle.valorUnitario = parseInt(this.ListaCarrito[index]['producto']['pedido_detalle']['valorUnitario']);
    pedidoDetalle.valorTotal = parseInt(this.ListaCarrito[index]['producto']['pedido_detalle']['valorUnitario']) * parseInt(this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']); 
    this.utilidades.AgregarAlcarrito(pedidoDetalle,'step');
    let listaCarrito = this.utilidades.ObtenerCarritoDetalle();
    this.ArmarListaCarrito(listaCarrito);
  }

  ArmarListaCarrito(carritoActual:PedidoDetalleModel[]){
    if(VARIABLES.ModoEjecucion == 'Desarrollo'){
      this.ProductosLista=[
        {id:"0", nombre:"Pollo verduras", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/pollo.png",disable_buy_button:false,cantidad:0,notificarAntesAgregarCarrito:'NO',mensajeNotificar:""},
        {id:"1", nombre:"Cordero", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:7000, inventario:10,imagen:"../../assets/imgs/productos/cordero.png",disable_buy_button:false,cantidad:0,notificarAntesAgregarCarrito:'NO',mensajeNotificar:""},
        {id:"2", nombre:"Res", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:4500, inventario:10,imagen:"../../assets/imgs/productos/res.png",disable_buy_button:false,cantidad:0,notificarAntesAgregarCarrito:'NO',mensajeNotificar:""},
        {id:"3", nombre:"Salmon", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/salmon.png",disable_buy_button:false,cantidad:0,notificarAntesAgregarCarrito:'NO',mensajeNotificar:""},
        {id:"4", nombre:"Galletas", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/galletas.png",disable_buy_button:false,cantidad:0,notificarAntesAgregarCarrito:'NO',mensajeNotificar:""},
        {id:"5", nombre:"Salsas", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/salsa.png",disable_buy_button:false,cantidad:0,notificarAntesAgregarCarrito:'NO',mensajeNotificar:""},
        {id:"6", nombre:"Probioticos", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/probioticos.png",disable_buy_button:false,cantidad:0,notificarAntesAgregarCarrito:'NO',mensajeNotificar:""}
      ];
      this.totalPedido = 0;
      let listaCarrito:any[]=[];
        carritoActual.forEach(item => {
          let busqueda = this.ProductosLista.find(it => it.id == item.idProducto);
          if(busqueda != undefined){
            let _lista:any[]=[];
            _lista['producto'] = busqueda;
            _lista['producto']['pedido_detalle'] = item;
            this.totalPedido = this.totalPedido + item['valorUnitario'] * item['cantidad'] 
            listaCarrito.push(_lista);
          }
          
        })
        if(this.totalPedido > 0){
          this.totalPedido += 7000;
        }
        this.ListaCarrito = listaCarrito;
        console.log(listaCarrito);
    }else{
      this.utilitiesProvider.openLoading();
      this.productosProvider.listaDeProductos()
      .subscribe((res:ProductoModel[]) => {
        console.log({ListaPrductos:res})
        this.utilitiesProvider.closeLoading();
        if(res['estado']){
          this.ProductosLista = res['listaProductos'];
          let listaCarrito:any[]=[];
          this.totalPedido = 0;
          carritoActual.forEach(item => {
            let busqueda = this.ProductosLista.find(it => it.id == item.idProducto);
            if(busqueda != undefined){
              let _lista:any[]=[];
              _lista['producto'] = busqueda;
              _lista['producto']['pedido_detalle'] = item;
              this.totalPedido = this.totalPedido + item['valorUnitario'] * item['cantidad']// _lista['producto']['pedido_detalle']['valorTotal']; 
              listaCarrito.push(_lista);
            }            
          })
          if(this.totalPedido > 0){
            this.totalPedido = this.totalPedido + 7000;
          }
          this.ListaCarrito = listaCarrito;
          console.log(listaCarrito);          
        }        
      },error => {
        this.utilitiesProvider.closeLoading();
        console.error(error);
        this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
      })
    }
  }

  presentToast(mensaje:string) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }

  presentAlert(titulo:string,mensaje:string){
    const prompt = this.alertCtrl.create({
      title: titulo,
      message:mensaje,      
      buttons: ['OK']
    });
    prompt.present();
  }
  

}
