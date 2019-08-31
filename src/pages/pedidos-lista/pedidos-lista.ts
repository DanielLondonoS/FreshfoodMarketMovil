import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { ClienteModel } from '../../models/cliente.model';
import { PedidosListaDetallePage } from '../pedidos-lista-detalle/pedidos-lista-detalle';
import { VARIABLES } from '../../constantes/constantes';
import { UtilitiesTransversal } from '../../transversals/Utilities.transversal';
import { HomePage } from '../home/home';
import { PedidoDetalleModel } from '../../models/pedidoDetalle.model';
import { PedidoModel } from '../../models/pedido.model';

/**
 * Generated class for the PedidosListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-lista',
  templateUrl: 'pedidos-lista.html',
})
export class PedidosListaPage {
  usuario:ClienteModel;
  listaPedidos:any[]=[];
  utilidades = new UtilitiesTransversal();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private utilitiesProvider:UtilitiesProvider,
    private pedidosProvider: PedidosProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosListaPage');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.cargarListaPedidos(this.usuario.id);
  }
  
  cargarListaPedidos(idCliente:string){
    this.utilitiesProvider.openLoading()
    this.pedidosProvider.ListaPedidosPorCliente(idCliente)
    .subscribe((res:any) => {
      this.utilitiesProvider.closeLoading();
      if(res != []){
        this.listaPedidos = res;
        // this.slides._autoplaying = true
        // this.slides.autoplay = 5000;
        // this.slides.startAutoplay();
        console.log(res)
      }
    },error => {
      this.utilitiesProvider.closeLoading();
      console.error(error);
      this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
    })
  }

  onDetalleClick(item:any){
    this.navCtrl.push(PedidosListaDetallePage,{pedido:item})
  }

  onReordenarClick(item:any){
  console.log(item)
  if(VARIABLES.ModoEjecucion == 'Desarrollo'){
    this.presentToast("Pedido exitoso");
    this.utilidades.VaciarCarrito();
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
        item['pedidoDetalle'].forEach(item => {
          pedido_detalle.push(
            {
              id:"",
              idPedido:"",
              idProducto:item.idProducto,
              cantidad:item.cantidad,
              valorUnitario:item.valorUnitario,
              valorTotal:item.valorTotal
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
