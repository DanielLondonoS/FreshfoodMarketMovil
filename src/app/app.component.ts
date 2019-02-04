import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RegistroPage } from '../pages/registro/registro';
import { LoginPage } from '../pages/login/login';
import { MisDatosProvider } from '../providers/mis-datos/mis-datos';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private misDatosProvider:MisDatosProvider,private uid: Uid, private androidPermissions: AndroidPermissions) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //this.getImei();
    });
  }

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
   
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
   
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
   
      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
    // let usuario:any = {
    //   id:"",
    //   idUsuario:"",
    //   uuid:this.uid.IMEI,
    //   imei:this.uid.IMEI,
    //   imsi:this.uid.IMSI,
    //   iccid:this.uid.ICCID,
    //   mac:this.uid.MAC
    // }
    // this.misDatosProvider.guardarUUId(usuario)
    // .subscribe(resultado => {
    //   console.log('dispositivo ok',resultado)
    // },error => {console.log('dispositivo error'+error)})

     return true
   }
}

