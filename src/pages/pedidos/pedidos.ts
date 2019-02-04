import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime, ToastController } from 'ionic-angular';
import { PedidoModel } from '../../models/pedido.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClienteModel } from '../../models/cliente.model';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoModel } from '../../models/producto.model';
import { UtilitiesTransversal } from '../../transversals/Utilities.transversal';
import { PedidoDetalleModel } from '../../models/pedidoDetalle.model';
import { VARIABLES } from '../../constantes/constantes';
import { HomePage } from '../home/home';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { PublicacionesProvider } from '../../providers/publicaciones/publicaciones';


/**
 * Generated class for the PedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {
  pedido:PedidoModel[]=[];
  ProductosLista:ProductoModel[]=[];
  formPedido:FormGroup;
  usuario:ClienteModel;
  ListaCarrito:any[]=[]
  utilidades = new UtilitiesTransversal();
  totalPedido:number = 0;
  mensaje = "";
  listPromotions:any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb:FormBuilder,public pedidosProvider:PedidosProvider,
    public productosProvider:ProductosProvider, public toastCtrl: ToastController,
    private utilitiesProvider:UtilitiesProvider,private publicacionesProvider:PublicacionesProvider) {
    this.formPedido = this.fb.group({
      "producto":['',[Validators.required]],
      "cantidad":['',[Validators.required]],

    });    
    this.usuario = this.navParams.get('usuario');
    if(!this.usuario){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  ionViewWillEnter() {
    this.cargarPublicidad();    
  }

  cargarDatosCarrito(){
    console.log('ionViewDidLoad PedidosPage');
    let listaCarrito = this.utilidades.ObtenerCarritoDetalle();
    if(listaCarrito.length > 0){
      this.ArmarListaCarrito(listaCarrito);
    }else{
      this.mensaje = "Aun no hay productos en tu carrito."
    }
  }

  cargarPublicidad(){
    this.utilitiesProvider.openLoading()
    this.publicacionesProvider.listaPublicaciones()
    .subscribe(res => {
      this.utilitiesProvider.closeLoading();
      if(res['estado']){
        this.listPromotions = res['publicaciones']
        // this.slides._autoplaying = true
        // this.slides.autoplay = 5000;
        // this.slides.startAutoplay();
        console.log(this.listPromotions)
        this.cargarDatosCarrito();
      }
    })
  }

  ArmarListaCarrito(carritoActual:PedidoDetalleModel[]){
    if(VARIABLES.ModoEjecucion == 'Desarrollo'){
      this.ProductosLista=[
        {id:"0", nombre:"Pollo verduras", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/pollo.png",disable_buy_button:false,cantidad:0},
        {id:"1", nombre:"Cordero", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:7000, inventario:10,imagen:"../../assets/imgs/productos/cordero.png",disable_buy_button:false,cantidad:0},
        {id:"2", nombre:"Res", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:4500, inventario:10,imagen:"../../assets/imgs/productos/res.png",disable_buy_button:false,cantidad:0},
        {id:"3", nombre:"Salmon", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/salmon.png",disable_buy_button:false,cantidad:0},
        {id:"4", nombre:"Galletas", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/galletas.png",disable_buy_button:false,cantidad:0},
        {id:"5", nombre:"Salsas", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/salsa.png",disable_buy_button:false,cantidad:0},
        {id:"6", nombre:"Probioticos", descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", presentacion:"Libra", costo:6000, precioVenta:6500, inventario:10,imagen:"../../assets/imgs/productos/probioticos.png",disable_buy_button:false,cantidad:0}
      ];

      let listaCarrito:any[]=[];
        carritoActual.forEach(item => {
          let busqueda = this.ProductosLista.find(it => it.id == item.idProducto);
          if(busqueda != undefined){
            let _lista:any[]=[];
            _lista['producto'] = busqueda;
            _lista['producto']['pedido_detalle'] = item;
            this.totalPedido += _lista['producto']['pedido_detalle']['valorTotal'] 
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
      },error=>{
        console.log(error)
        this.utilitiesProvider.closeLoading();
      })
    }
  }

  HacerPedido(){
    if(VARIABLES.ModoEjecucion == 'Desarrollo'){

    }else{
      let pedido_detalle:PedidoDetalleModel[] = [];
      let pedido:PedidoModel = new PedidoModel();
      pedido.id = "";
      pedido.estado = 'Nuevo';
      pedido.fecha = new Date();
      pedido.idUsuario = this.usuario.id;
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
          this.utilidades.VaciarCarrito();
          this.navCtrl.setRoot(HomePage)
        }
      },error => {
        console.log(error)
        this.utilitiesProvider.closeLoading();
      })
    }    
  }

  // cantidadEvent(producto:any,index:number){
  //   let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();     
  //     pedidoDetalle.cantidad = this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']; 
  //     this.totalPedido += (this.ListaCarrito[index]['producto']['precioVenta'] * this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] ) 
  //     pedidoDetalle.id = "";
  //     pedidoDetalle.idPedido = "";
  //     pedidoDetalle.idProducto = this.ListaCarrito[index]['producto']['id'];      
  //     pedidoDetalle.valorUnitario = this.ListaCarrito[index]['producto']['pedido_detalle']['precioVenta'];
  //     pedidoDetalle.valorTotal = this.ListaCarrito[index]['producto']['pedido_detalle']['precioVenta'] * this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'];       
  //     this.utilidades.AgregarAlcarrito(pedidoDetalle);   
  //     let listaCarrito = this.utilidades.ObtenerCarritoDetalle();
  //     this.ArmarListaCarrito(listaCarrito); 
  // }

  quantityInput(product:ProductoModel,index:number){
    console.log(product,index)
    let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();    
    pedidoDetalle.cantidad = parseInt(this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']);    
    pedidoDetalle.id = "";
    pedidoDetalle.idPedido = "";
    pedidoDetalle.idProducto = this.ListaCarrito[index]['producto']['id'];    
    pedidoDetalle.valorUnitario = this.ListaCarrito[index]['producto']['precioVenta'];
    pedidoDetalle.valorTotal = this.ListaCarrito[index]['producto']['precioVenta'] * this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']; 
    this.utilidades.AgregarAlcarrito(pedidoDetalle,'input');
    this.presentToast("Agregado al carrito.");
    let listaCarrito = this.utilidades.ObtenerCarritoDetalle();
    this.ArmarListaCarrito(listaCarrito);
  }

  //amenta o disminuye la cantidad del carrito
  cantidad(accion :string,product:ProductoModel,index:number){
    console.log(accion,product,index, this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'])
    let pedidoDetalle : PedidoDetalleModel = new PedidoDetalleModel();
    switch(accion){
      case 'dec':
        if(this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] > 0){
          this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] = this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] - 1;     
          pedidoDetalle.cantidad = -1; 
          // this.totalPedido -= this.ListaCarrito[index]['producto']['precioVenta']  
        }        
      break;
      case 'inc':
        this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] = this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad'] + 1;
        pedidoDetalle.cantidad = 1;
        // this.totalPedido += this.ListaCarrito[index]['producto']['precioVenta']
      break;
    }        
    pedidoDetalle.id = "";
    pedidoDetalle.idPedido = "";
    pedidoDetalle.idProducto = this.ListaCarrito[index]['producto']['id'];    
    pedidoDetalle.valorUnitario = this.ListaCarrito[index]['producto']['pedido_detalle']['precioVenta'];
    pedidoDetalle.valorTotal = this.ListaCarrito[index]['producto']['pedido_detalle']['precioVenta'] * this.ListaCarrito[index]['producto']['pedido_detalle']['cantidad']; 
    this.utilidades.AgregarAlcarrito(pedidoDetalle,'step');
    let listaCarrito = this.utilidades.ObtenerCarritoDetalle();
    this.ArmarListaCarrito(listaCarrito);
  }

  presentToast(mensaje:string) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }



}
