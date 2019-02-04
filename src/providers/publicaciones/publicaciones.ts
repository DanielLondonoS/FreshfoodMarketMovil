import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constantes/constantes';

/*
  Generated class for the PublicacionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PublicacionesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PublicacionesProvider Provider');
  }

  listaPublicaciones(){
    return this.http.get(URL.Api+"/Publicaciones/listadepublicaciones",{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
  }

}
