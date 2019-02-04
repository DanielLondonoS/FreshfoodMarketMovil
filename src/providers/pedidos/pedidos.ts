import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, ɵQueryBindingType } from '@angular/core';
import { PedidoModel } from '../../models/pedido.model';
import { PedidoDetalleModel } from '../../models/pedidoDetalle.model';
import { URL } from '../../constantes/constantes';

export interface LPedido{
  Id:string;
  IdUsuario:string;
  Fecha:Date;
  Estado:string;
}

export interface LPedidoDetalle{
  Id:string;
  IdPedido:string;
  IdProducto:string;
  Cantidad:number;
  ValorUnitario:number;
  ValorTotal:number;
}
/*
  Generated class for the PedidosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PedidosProvider Provider');
  }

  GuardarPedido(pedido:PedidoModel,pedidoDetalle:PedidoDetalleModel[]){
    let dato = new Object();
    //dato['pedidosApiModel'] = {'Pedido':pedido,'PedidoDetalle':pedidoDetalle};
    let _pedidoDetalle:any[] = [];
    let _pedido = new Object();
    _pedido['Id'] = pedido.id;
    _pedido['Estado'] = pedido.estado;
    _pedido['Fecha'] = pedido.fecha;
    _pedido['IdUsuario'] = pedido.idUsuario;    
    pedidoDetalle.forEach(item => {
      _pedidoDetalle.push(
        {
          Id:"",
          IdPedido:"",
          IdProducto:item.idProducto,
          Cantidad:item.cantidad,
          ValorUnitario:item.valorUnitario,
          ValorTotal:item.valorTotal
        })
    })
    dato['pedido'] = _pedido;
    dato['pedidoDetalle'] = _pedidoDetalle;

    let headers = new HttpHeaders().set('Content-type','application/json');
    // let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
    //let params = new HttpParams().set('Pedido',JSON.stringify(_pedido)).set('PedidoDetalle',JSON.stringify(_pedidoDetalle));
    let params = new HttpParams().set('pedidosApiModel',JSON.stringify({Pedido:pedido,PedidoDetalle:pedidoDetalle}))
    // let param = new HttpParams().set('Pedido',JSON.stringify(pedido)).set('PedidoDetalle',JSON.stringify(pedidoDetalle));
    // let param : any = dato;
    return this.http.post(URL.Api+"/Pedidos/guardarpedido",{pedidosApiModel:{pedido:pedido,pedidoDetalle:pedidoDetalle}},{headers:{"Content-Type":"application/json"}}
     )
  }

  

}
