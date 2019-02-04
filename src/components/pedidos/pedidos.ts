import { Component, Input } from '@angular/core';
import { ClienteModel } from '../../models/cliente.model';
import { NavController } from 'ionic-angular';
import { PedidosPage } from '../../pages/pedidos/pedidos';

/**
 * Generated class for the PedidosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pedidos',
  templateUrl: 'pedidos.html'
})
export class PedidosComponent {
  @Input() usuario:ClienteModel;
  text: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello PedidosComponent Component');
    this.text = 'Hello World';
  }

  PaginaPedido(){
    this.navCtrl.push(PedidosPage,{usuario:this.usuario})
  }

}
