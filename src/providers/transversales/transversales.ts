import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constantes/constantes';


/*
  Generated class for the TransversalesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransversalesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TransversalesProvider Provider');
  }

  listaRazas(){
    return this.http.get(URL.Api+"/Razas/listaderazas",{headers:{"Content-Type":"application/json"}})
  }

}
