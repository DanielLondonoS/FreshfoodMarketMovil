import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constantes/constantes';

/*
  Generated class for the ProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProductosProvider Provider');
  }
  /**
   * Recupera una lista con los productos de la base de datos.
   */
  listaDeProductos(){
    return this.http.get(URL.Api+"/Productos/listadeproductos",{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
  }

}
