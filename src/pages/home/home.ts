import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClienteModel } from '../../models/cliente.model';
import { LoginPage } from '../login/login';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { ProductoModel } from '../../models/producto.model';
import { ProductosProvider } from '../../providers/productos/productos';
import { VARIABLES } from '../../constantes/constantes';
import { ProductoDetallePage } from '../producto-detalle/producto-detalle';
import { PedidosPage } from '../pedidos/pedidos';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { PublicacionesProvider } from '../../providers/publicaciones/publicaciones';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario:ClienteModel;
  ProductosLista:ProductoModel[]=[
    // {Id:"0", Nombre:"Pollo verduras", Descripcion:"", Presentacion:"Libra", Costo:6000, PrecioVenta:6500, Inventario:10,Imagen:"../../assets/imgs/productos/pollo.png",disable_buy_button:false,cantidad:0},
    // {Id:"1", Nombre:"Cordero", Descripcion:"", Presentacion:"Libra", Costo:6000, PrecioVenta:7000, Inventario:10,Imagen:"../../assets/imgs/productos/cordero.png",disable_buy_button:false,cantidad:0},
    // {Id:"2", Nombre:"Res", Descripcion:"", Presentacion:"Libra", Costo:6000, PrecioVenta:4500, Inventario:10,Imagen:"../../assets/imgs/productos/res.png",disable_buy_button:false,cantidad:0},
    // {Id:"3", Nombre:"Salmon", Descripcion:"", Presentacion:"Libra", Costo:6000, PrecioVenta:6500, Inventario:10,Imagen:"../../assets/imgs/productos/salmon.png",disable_buy_button:false,cantidad:0},
    // {Id:"4", Nombre:"Galletas", Descripcion:"", Presentacion:"Libra", Costo:6000, PrecioVenta:6500, Inventario:10,Imagen:"../../assets/imgs/productos/galletas.png",disable_buy_button:false,cantidad:0},
    // {Id:"5", Nombre:"Salsas", Descripcion:"", Presentacion:"Libra", Costo:6000, PrecioVenta:6500, Inventario:10,Imagen:"../../assets/imgs/productos/salsa.png",disable_buy_button:false,cantidad:0},
    // {Id:"6", Nombre:"Probioticos", Descripcion:"", Presentacion:"Libra", Costo:6000, PrecioVenta:6500, Inventario:10,Imagen:"../../assets/imgs/productos/probioticos.png",disable_buy_button:false,cantidad:0}
  ];

  listPromotions:any[] =[];
  constructor(public navCtrl: NavController,public navParm:NavParams,public pedidosProvider:PedidosProvider, 
    public productosProvider:ProductosProvider,private utilitiesProvider:UtilitiesProvider,
    private publicacionesProvider: PublicacionesProvider) {
    this.usuario = this.navParm.get('usuario');
  }
  
  ionViewDidEnter(){
    this.listaDeProductos();
  }

  logout(){
    this.navCtrl.setRoot(LoginPage)
  }

  listaDeProductos(){
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
    }else{
      this.productosProvider.listaDeProductos()
      .subscribe((res:ProductoModel[]) => {
        console.log({ListaPrductos:res})
        if(res['estado']){        
          let _ProductosLista = res['listaProductos'];
          let lista:ProductoModel[]=[];
          _ProductosLista.forEach(item => {
            let product : ProductoModel;
            product = item;
            product['disble_buy_button'] = false;
            product['cantidad'] = 0;
            lista.push(product);
          })
          this.ProductosLista = lista;
          console.log(this.ProductosLista)
        }
        
      },error=>{
        console.log(error)
      })
    }
    

  }

  onProductClick(product:ProductoModel){
    console.log(product)
    this.navCtrl.push(ProductoDetallePage,{producto:product})
  }
  
  goToCart(){
    this.navCtrl.push(PedidosPage)
  }
}
