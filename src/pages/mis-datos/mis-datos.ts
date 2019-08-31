import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MisDatosProvider } from '../../providers/mis-datos/mis-datos';
import { LoginPage } from '../login/login';
import { ClienteModel } from '../../models/cliente.model';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/**
 * Generated class for the MisDatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-datos',
  templateUrl: 'mis-datos.html',
})
export class MisDatosPage {
  usuario : any = JSON.parse(localStorage.getItem('usuario'))
  datos:ClienteModel = {id:null,nombre:null,contrasena:null,correo:null,direccion:null,telefono:null};
  formRegistro:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private misDatosProvider: MisDatosProvider,
    private utilitiesProvider:UtilitiesProvider, private fb:FormBuilder) {
      this.formRegistro = this.fb.group({
        "nombre":['',[Validators.required]],
        "correo":['',[Validators.required,Validators.email]],
        "direccion":['',[Validators.required]],
        "telefono":['',[Validators.required]],
        "contrasena":['',[Validators.required]]
      })
  }

  ionViewDidLoad() {
    if(this.usuario == undefined || this.usuario == '' || this.usuario == null){
      this.navCtrl.setRoot(LoginPage)
    }
    else{
      this.datos = this.usuario;
    }
  }

  actualizarUsuario(){
    this.utilitiesProvider.openLoading();
    this.misDatosProvider.actualizarCliente(this.datos)
    .subscribe(resultado => {
      this.utilitiesProvider.closeLoading();
      if(resultado['error'] == 0){
        localStorage.setItem('usuario',JSON.stringify(resultado['usuario']));
        this.utilitiesProvider.presentToast(resultado['mensaje']);
      }else{
        this.utilitiesProvider.presentToast(resultado['mensaje']);
      }   
    },error => {
      this.utilitiesProvider.closeLoading();
      console.error(error);
      this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
    })
  
  }

}
