import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {
  loader:any;
  constructor(
    public http: HttpClient,
    public loadingCtrl : LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public vibratioin: Vibration) {
    console.log('Hello UtilitiesProvider Provider');
  }
  /**
   * Abre un cargador de pagina
   */
  openLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Cargando...",
    });
    this.loader.present();
  }

  closeLoading(){
    this.loader.dismiss();
  }

  presentAlert(title:string,message:string,buttonText:string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [buttonText]
    });
    alert.present();
  }

  presentToast(mensaje:string) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }

  addSesion(name:string, value:any){    
    localStorage.setItem(name,JSON.stringify(value));    
  }

  deleteSesion(name:string){
    localStorage.removeItem(name);
  }

  updateSesion(name:string,value:any){
    localStorage.removeItem(name);
    localStorage.setItem(name,JSON.stringify(value));    
  }

  getSesion(name:string):any{
    return JSON.parse(localStorage.getItem(name));
  }

  // calculatePriceTotalCart(shopping_cart:ShoppingCartItemDto):number{
  // calculatePriceTotalCart(shopping_cart:ShoppingCartItemDto[]):number{
  //   let priceTotal:number=0;
  //   let cart = Object.create(shopping_cart);
  //   cart.forEach(el =>{
  //     let qu = el.quantity;
  //     let pr = el.product.price
  //     priceTotal += (qu * pr);
  //   })
  //   return priceTotal;
    
  // }

  obtenerFechas(numDias:number=0,numMeses:number=0,numAnos:number=0):any[any]{
    let date :Date = new Date();
    let hoy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    let ayer = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()-1, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    let mañana = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()+1, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    let especial = new Date(Date.UTC(date.getFullYear()+numAnos, date.getMonth()+numMeses, date.getDate()+numDias, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    
    return new Object(
      {
        fechas:{
          date:date,
          hoy:hoy,
          ayer:ayer,
          mañana:mañana,
          especial:especial
        }
      }
    ) 

    
    // let date :Date = new Date();
    // let date2:Date = new Date();
    // let hoy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    // let ayer = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()-1, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    // let manana = new Date(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()+1, date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds()));
  }

  vibrarDispositivo(tiempo:any=1000){
      this.vibratioin.vibrate(tiempo)
  }

  formatoFechas(fecha:Date):any{
    let _fecha = new Date();
    let _fecha_ = new Date(_fecha);
    let _fechai = new Date().toLocaleString('es-CO')
    let _fechai_ = new Date(_fechai).toLocaleString('es-CO')
    let f = "08/04/2017";
    let ff = '2017-04-08'
    let _fechaf = new Date(f);
    let _fecha_ff = new Date(ff);
    let _fechaif = new Date(_fechaf).toLocaleString('es-CO')
    let _fechai_ff = new Date(_fecha_ff).toLocaleString('es-CO')
    
    let strfecha :string = fecha.toLocaleString('es-CO');
    let dia:any = fecha.getDate();
    let mes:any = fecha.getMonth();
    let ano:any = fecha.getFullYear();
    mes = (parseInt(mes)+1);
    dia = dia < 10 ? `0${dia}` : dia;
    mes = mes < 10 ? `0${mes}` : mes;
    console.log(strfecha)
    let resultado : any = {
      'dd-mm-yyyy':`${dia}-${mes}-${ano}`,
      'dd/mm/yyyy':`${dia}/${mes}/${ano}`,
      'mm-dd-yyyy':`${mes}-${dia}-${ano}`,
      'mm/dd/yyyy':`${mes}/${dia}/${ano}`,
      'yyyy-mm-dd':`${ano}-${mes}-${dia}`,
      'yyyy/mm/dd':`${ano}/${mes}/${dia}`,
      'strFecha':strfecha,
      'dd':dia,
      'mm':mes,
      'yyyy':ano,
      'fecha'     :fecha
      
    }

    return resultado;
  }
}
