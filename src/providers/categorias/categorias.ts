import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constantes/constantes';

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriasProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CategoriasProvider Provider');
  }

  ListaDeCategorias(){
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this.http.get(`${URL.Api}/categorias/listadecategorias`,{headers:headers});
  }

}
