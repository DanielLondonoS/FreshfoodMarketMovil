import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constantes/constantes';
/*
  Generated class for the MisDatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MisDatosProvider {
  
  constructor(public http: HttpClient) {
    console.log('Hello MisDatosProvider Provider');
  }

  obtenerDatosUsuario(id : string){
    return this.http.get(URL.Api+"/Usuarios/obtenerusuario?idUsuario="+id,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
    
  }

  actualizarCliente(cliente:any){
    return this.http.post(URL.Api+"/Usuarios/actualizarusuario",JSON.stringify(cliente),{headers:{"Content-Type":"application/x-www-form-urlencoded"},params:cliente})
  }

  guardarUUId(Uuid:any){
    return this.http.post(URL.Api+"/UsuarioDispositivo/agregardispositivo",JSON.stringify(Uuid),{headers:{"Content-Type":"application/x-www-form-urlencoded"},params:Uuid})
  }

  ActualizarUUId(Uuid:any){
    return this.http.post(URL.Api+"/UsuarioDispositivo/actualizardispositivo",JSON.stringify(Uuid),{headers:{"Content-Type":"application/x-www-form-urlencoded"},params:Uuid})
  }

}
