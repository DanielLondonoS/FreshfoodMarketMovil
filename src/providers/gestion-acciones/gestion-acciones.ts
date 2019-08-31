import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constantes/constantes';


/*
  Generated class for the GestionAccionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GestionAccionesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GestionAccionesProvider Provider');
  }

  registerCallService(objeto:any){
    let headers = new HttpHeaders().set('Content-type','application/json');
    // let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
    //let params = new HttpParams().set('Pedido',JSON.stringify(_pedido)).set('PedidoDetalle',JSON.stringify(_pedidoDetalle));
    let params = JSON.stringify({objeto});
    // let param = new HttpParams().set('Pedido',JSON.stringify(pedido)).set('PedidoDetalle',JSON.stringify(pedidoDetalle));
    // let param : any = dato;
    return this.http.post(URL.Api+"/GestionAcciones/guardarllamadaservicio",{accion:params},{headers:{"Content-Type":"application/json"}})
  }

}
