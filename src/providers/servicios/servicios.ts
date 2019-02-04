import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constantes/constantes';

/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServiciosProvider Provider');
  }

  listaServicios(){
    return this.http.get(URL.Api+"/Servicios/listadeservicios",{headers:{"Content-Type":"application/json"}})
  }

}
