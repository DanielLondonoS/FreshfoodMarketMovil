import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { URL } from '../../constantes/constantes';

/*
  Generated class for the RegistroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegistroProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RegistroProvider Provider');
  }

  RegistroCliente(cliente:any){
    return this.http.post(URL.Api+"/Usuarios/AgregarUsuario",JSON.stringify(cliente),{headers:{"Content-Type":"application/x-www-form-urlencoded"},params:cliente})
  }

  LoginUsuario(cliente:LoginModel){
    let param:any = cliente;
    return this.http.post(URL.Api+"/Usuarios/loginusuario",JSON.stringify(cliente),{headers:{"Content-Type":"application/x-www-form-urlencoded"},params:param})
  }

  RecuperarContrasena(Correo:string){
    let param:any = Correo;
    return this.http.post(URL.Api+"/Usuarios/recuperarcontrasena",JSON.stringify(Correo),{headers:{"Content-Type":"application/x-www-form-urlencoded"},params:param})
  }

}
