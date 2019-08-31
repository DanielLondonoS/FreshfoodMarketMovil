import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  ListaDeMascotas(){
    return this.http.get(URL.Api+"/Mascotas/listademascotas",{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
  }

  MascotasPorId(id : string){
    return this.http.get(`${URL.Api}/Mascotas/mascotasporid?idMascota=${id}`,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
  }

  MascotasPorIdUsuario(id : string){
    return this.http.get(`${URL.Api}/Mascotas/mascotasporidusuario?idUsuario=${id}`,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
  }

  ActualizarMascota(mascota : any){
    let url:any = `${URL.Api}/Mascotas/actualizamascota`;
    let header = new HttpHeaders().set('Content-type','Application/json')
    return this.http.put(url,JSON.stringify(mascota),{headers:header});
  }

  CrearMascota(mascota:any){
    let url:any = `${URL.Api}/Mascotas/crearmascota`;
    let header = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(url,mascota,{headers:header});
  }

  EliminarMascota(mascota:any){
    let url:any = `${URL.Api}/Mascotas/eliminarmascota`;
    let header = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(url,mascota,{headers:header});
  }
}
