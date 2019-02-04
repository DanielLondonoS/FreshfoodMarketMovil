import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginModel } from '../../models/login.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegistroProvider } from '../../providers/registro/registro';
import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';
import { MenuPage } from '../menu/menu';
import { VARIABLES } from '../../constantes/constantes'
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formLogin:FormGroup;
  cliente:LoginModel={correo:"",contrasena:""};
  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder,private registroProvider:RegistroProvider,
    public alertCtrl: AlertController,private utilitiesProvider:UtilitiesProvider) {
    this.formLogin = this.fb.group({
      "correo":['',[Validators.required,Validators.email]],
      "contrasena":['',[Validators.required]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    let usuario = localStorage.getItem('usuario');
    console.log(usuario)
    if(usuario){
      this.navCtrl.setRoot(MenuPage,{usuario:usuario})
    }
  }

  LoginUsuario(){
    if(VARIABLES.ModoEjecucion == "Desarrollo"){
      let usuario = Object();
      usuario['id'] = 1;
      usuario['nombre'] = 'Daniel Londoño';
      usuario['correo'] = 'daniellondonosanchez@hotmail.com';
      usuario['direccion'] = 'Calle 37 #38a 29';
      usuario['telefono'] = '3004891905';
      usuario['contrasena'] = '123456';
      localStorage.setItem('usuario',JSON.stringify(usuario));
      this.navCtrl.setRoot(MenuPage,{usuario:usuario})
    }else{
      this.utilitiesProvider.openLoading();
      this.registroProvider.LoginUsuario(this.cliente)
      .subscribe(result => {
        console.log(result);
        this.utilitiesProvider.closeLoading()
        if(result['error'] == 0){
          localStorage.setItem('usuario',JSON.stringify(result['usuario']));
          this.navCtrl.setRoot(MenuPage,{usuario:result['usuario']})
        }else{
          //this.presentToast(result['mensaje'])
          this.utilitiesProvider.presentToast(result['mensaje']);
        }
      },error =>{
        console.log(error);
        this.utilitiesProvider.closeLoading();
        
      })
    }
    
  }

  goToPage(index:number){
    switch(index){
      case 0:

        const prompt = this.alertCtrl.create({
          title: 'Login',
          message: "Para recuperar su contraseña ingrese el correo con el cual se registro en Freshfoodbarf",
          inputs: [
            {
              name: 'Correo',
              placeholder: 'Correo electronico'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Recuperar',
              handler: data => {
                console.log(data)
                this.registroProvider.RecuperarContrasena(data)
                .subscribe(res =>{
                  // this.presentToast(res['mensaje']);
                  this.utilitiesProvider.presentToast(res['mensaje']);
                },error => {
                  console.log(error)
                })
              }
            }
          ]
        });
        prompt.present();
      
      break;
      case 1:
        this.navCtrl.push(RegistroPage)
      break;
    }
    
  }

  // presentToast(mensaje:string) {
  //   const toast = this.toastCtrl.create({
  //     message: mensaje,
  //     duration: 5000
  //   });
  //   toast.present();
  // }
}


