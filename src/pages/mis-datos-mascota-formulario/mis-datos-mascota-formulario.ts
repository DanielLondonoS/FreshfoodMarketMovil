import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MisDatosProvider } from '../../providers/mis-datos/mis-datos';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { TransversalesProvider } from '../../providers/transversales/transversales';

/**
 * Generated class for the MisDatosMascotaFormularioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-datos-mascota-formulario',
  templateUrl: 'mis-datos-mascota-formulario.html',
})
export class MisDatosMascotaFormularioPage {
  title:any = 'Crear Mascota';
  formularioMascota:FormGroup;
  datos:any[] = [];
  listaRazas:any[] = [];
  parametroIn:any=null;
  datosUsuario:any = JSON.parse(localStorage.getItem('usuario'));
  constructor(public navCtrl: NavController, public navParams: NavParams,private fb : FormBuilder,
    private misDatosProvider:MisDatosProvider, private utilitiesProvider:UtilitiesProvider,private transversalesProvider:TransversalesProvider) {
    this.parametroIn = this.navParams.get('accion');
    if(this.parametroIn != null && this.parametroIn != undefined){
      if(this.parametroIn == 'nuevo'){
        this.title = 'Crear Mascota';
      }else{
        this.title = 'Editar Mascota';
        let datos = this.navParams.get('mascota');
        console.log({datos:datos})
        this.datos = datos;
      }
    }
    console.log({mascota:this.datos,parametroIn:this.parametroIn})
    this.formularioMascota = this.fb.group({
      'foto':['',[Validators]],
      'nombre':['',[Validators,Validators.required]],
      'raza':['',[Validators,Validators.required]],
      'edad':['',[Validators,Validators.required]],
      'peso':['',[Validators,Validators.required]],
      'actividadFisica':['',[Validators,Validators.required]],
      'porcionDiaria':['',[Validators]],
      'fechaUltimaDesparacitada':['',[Validators,Validators.required]],
      'antecedentesMedicos':['',[Validators]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisDatosMascotaFormularioPage');
    this.ListadoDeRazas();
  }

  submitForm(){
    console.log(this.datos)
    if(this.parametroIn != null){
      switch(this.parametroIn){
        case 'nuevo':
        this.datos['usuarioId'] = this.datosUsuario['id']
        this.utilitiesProvider.openLoading();
        let objeto = new Object();
          objeto['id'] = null;
          objeto['usuarioId'] = this.datos['usuarioId']
          objeto['foto'] = this.datos['foto']
          objeto['nombre'] = this.datos['nombre']
          objeto['raza'] = this.datos['raza']
          objeto['edad'] = this.datos['edad']
          objeto['peso'] = this.datos['peso']
          objeto['actividadFisica'] = this.datos['actividadFisica']
          objeto['porcionDiaria'] = this.datos['porcionDiaria']
          objeto['fechaUltimaDesparacitada'] = this.datos['fechaUltimaDesparacitada']
          objeto['antecedentesMedicos'] = this.datos['antecedentesMedicos'] || null;
          this.misDatosProvider.CrearMascota(objeto)
          .subscribe(resultado=>{
            console.log(resultado);
            this.utilitiesProvider.closeLoading();
            if(resultado['error'] == 0){
              this.utilitiesProvider.presentToast(resultado['mensaje']);
            }else{
              this.utilitiesProvider.presentToast(resultado['mensaje']);
            }   
          },error => {
            this.utilitiesProvider.closeLoading();
            console.error(error);
            this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
          })

        break;
        case 'editar':
          this.utilitiesProvider.openLoading();
          this.misDatosProvider.ActualizarMascota(this.datos)
          .subscribe(resultado=>{
            console.log(resultado);
            this.utilitiesProvider.closeLoading();
            if(resultado['error'] == 0){
              this.utilitiesProvider.presentToast(resultado['mensaje']);
            }else{
              this.utilitiesProvider.presentToast(resultado['mensaje']);
            }   
          },error => {
            this.utilitiesProvider.closeLoading();
            console.error(error);
            this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
          })
        break;
      }
    }
  }

  ListadoDeRazas(){
    this.utilitiesProvider.openLoading();
    this.transversalesProvider.listaRazas()
    .subscribe(resultado=>{
      console.log(resultado);
      this.utilitiesProvider.closeLoading();
      if(resultado['error'] == 0){
        this.listaRazas = resultado['listaRazas'];
      }else{
        this.utilitiesProvider.presentToast(resultado['mensaje']);
      }   
    },error => {
      this.utilitiesProvider.closeLoading();
      console.error(error);
      this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
    })
  }

  validarPorcion(){
    if(this.datos['peso'] != null || this.datos['peso'] != undefined){
      if(this.datos['edad'] != null || this.datos['edad'] != undefined){
        if(this.datos['actividadFisica'] != null || this.datos['actividadFisica'] != undefined){
          let peso :any = this.datos['peso'];
          let edad :any = this.datos['edad'];
          let actividadFisica :any = this.datos['actividadFisica'] ;
          let porcentaje:any =0;
          let porcion:any=0;
          switch(actividadFisica){
            case 'alta':
              if(edad <= 12){
                porcentaje = 0.09;
              }
              if(edad > 12 && edad <= 15){
                porcentaje = 0.08;
              }
              if(edad > 15 && edad <= 18){
                porcentaje = 0.07;
              }
              if(edad > 18 ){
                porcentaje = 0.06;
              }
            break;
            case 'media':
              if(edad <= 12){
                porcentaje = 0.08;
              }
              if(edad > 12 && edad <= 15){
                porcentaje = 0.07;
              }
              if(edad > 15 && edad <= 18){
                porcentaje = 0.06;
              }
              if(edad > 18 ){
                porcentaje = 0.05;
              }
            break;
            case 'baja':
              if(edad <= 12){
                porcentaje = 0.07;
              }
              if(edad > 12 && edad <= 15){
                porcentaje = 0.06;
              }
              if(edad > 15 && edad <= 18){
                porcentaje = 0.05;
              }
              if(edad > 18 ){
                porcentaje = 0.04;
              }
            break;
          }
          porcion = (parseFloat(peso) * parseFloat(porcentaje)).toLocaleString('es')
          console.log({
            peso:peso,
            edad:edad,
            actividadFisica:actividadFisica,
            porcentaje:porcentaje,
            porcion:porcion
          })
          

          this.datos['porcionDiaria'] = porcion;
        }
      }
    }
  }

}
