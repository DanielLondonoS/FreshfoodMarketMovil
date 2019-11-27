import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroProvider } from '../../providers/registro/registro';
import { ClienteModel } from '../../models/cliente.model';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { LoginPage } from '../login/login';
import { MisDatosProvider } from '../../providers/mis-datos/mis-datos';
import { Uid } from '@ionic-native/uid';
// import { Uid } from '@ionic-native/uid';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  formRegistro:FormGroup;
  cliente:ClienteModel = {id:"",nombre:"",contrasena:"",correo:"",direccion:"",telefono:"",confirmarContrasena:""};
  // cliente_online : any = JSON.parse(localStorage.getItem('usuario'))
  title:any = "Registro"
  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder,
      private registroProvider:RegistroProvider,private utilitiesProvider:UtilitiesProvider,
      private misDatosProvider:MisDatosProvider, private uid: Uid) {//, private uid: Uid
    this.formRegistro = this.fb.group({
      "nombre":['',[Validators.required]],
      "correo":['',[Validators.required,Validators.email]],
      "direccion":['',[Validators.required]],
      "telefono":['',[Validators.required]],
      "contrasena":['',[Validators.required]],
      "confirmarContrasena":['',[Validators.required]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
    // if(this.cliente_online != undefined && this.cliente != null){
    //   this.title = "Mis Datos"
    //   console.log(this.cliente_online)
    //   this.cliente = this.cliente_online
    //   console.log(this.cliente)
    // }
  }

  GuardarInformacion(){
    console.log(this.cliente)
    if(this.cliente.contrasena === this.cliente.confirmarContrasena){
      this.utilitiesProvider.openLoading();
      this.cliente.uuid = (this.uid.UUID == null || this.uid.UUID == undefined) ? 'N/A': this.uid.UUID;
      this.registroProvider.RegistroCliente(this.cliente)
      .subscribe(resultado => {
        console.log(resultado);
        this.utilitiesProvider.closeLoading();
        if(resultado['error'] == 0){
          this.utilitiesProvider.presentToast(resultado['mensaje']);
          // let usuario:any = {
          //   id:"",
          //   idUsuario:resultado['usuario']['id'],
          //   uuid:this.uid.IMEI,
          //   imei:this.uid.IMEI,
          //   imsi:this.uid.IMSI,
          //   iccid:this.uid.ICCID,
          //   mac:this.uid.MAC
          // }
          // this.misDatosProvider.ActualizarUUId(usuario)
          // .subscribe(resultado => {
          //   console.log('dispositivo ok',resultado)
          //   if(resultado['estado']){

          //   }
          // },error => console.log('dispositivo error'+error))
          this.navCtrl.setRoot(LoginPage);
        }else{
          this.utilitiesProvider.presentToast(resultado['mensaje']);
        }     

      },error => {
        this.utilitiesProvider.closeLoading();
        console.error(error);
        this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
      })
    }else{
      this.utilitiesProvider.presentAlert('Información','Las contraseñas no coinciden','OK')
    }
    
  }

}
