import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MisDatosMascotaFormularioPage } from '../mis-datos-mascota-formulario/mis-datos-mascota-formulario';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { MisDatosProvider } from '../../providers/mis-datos/mis-datos';

/**
 * Generated class for the MisDatosMascotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-datos-mascotas',
  templateUrl: 'mis-datos-mascotas.html',
})
export class MisDatosMascotasPage {
  datosUsuario:any = JSON.parse(localStorage.getItem('usuario'));
  listaMascotas:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,
    private misDatosProvider:MisDatosProvider, private utilitiesProvider:UtilitiesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisDatosMascotasPage');
  }

  ionViewDidEnter(){
    this.cargarListaMascotas();
  }

  crearMascota(){
    console.log('click')
    this.navCtrl.push(MisDatosMascotaFormularioPage,{accion:'nuevo'})
  }

  cargarListaMascotas(){
    this.utilitiesProvider.openLoading();
    this.misDatosProvider.MascotasPorIdUsuario(this.datosUsuario['id'])
    .subscribe(resultado=>{
      console.log(resultado);
      this.utilitiesProvider.closeLoading();
      if(resultado['error'] == 0){
        // this.utilitiesProvider.presentToast(resultado['mensaje']);
        this.listaMascotas = resultado['listaMascotas']
      }else{
        this.utilitiesProvider.presentToast(resultado['mensaje']);
      }   
    },error => {
      this.utilitiesProvider.closeLoading();
      console.error(error);
      this.utilitiesProvider.presentAlert('Información','El servidor no responde o no se tiene una conexion a internet. Validelo y vuelva a intentarlo','Ok')
    })
  }

  eliminarMascota(mascota:any){
    const confirm = this.alertCtrl.create({
      title: 'Esta eliminando la mascota!!!',
      message: 'Esta mascota esta a punto de ser eliminada y se perdera toda la información suministrada, realmente desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Continuar',
          handler: () => {
            this.utilitiesProvider.openLoading();
            console.log(mascota)
            let objeto = new Object();
            objeto['id'] = mascota['id'] || null;
            objeto['usuarioId'] = mascota['usuarioId'] || null;
            objeto['foto'] = mascota['foto'] || null;
            objeto['nombre'] = mascota['nombre'] || null;
            objeto['raza'] = mascota['raza'] || null;
            objeto['edad'] = mascota['edad'] || null;
            objeto['peso'] = mascota['peso'] || null;
            objeto['actividadFisica'] = mascota['actividadFisica'] || null;
            objeto['porcionDiaria'] = mascota['porcionDiaria'] || null;
            objeto['fechaUltimaDesparacitada'] = mascota['fechaUltimaDesparacitada'] || null;
            objeto['antecedentesMedicos'] = mascota['antecedentesMedicos'] || null;
            this.misDatosProvider.EliminarMascota(objeto)
            .subscribe(resultado=>{
              console.log(resultado);
              this.utilitiesProvider.closeLoading();
              if(resultado['error'] == 0){
                this.utilitiesProvider.presentToast(resultado['mensaje']);
                this.cargarListaMascotas();
                // this.listaMascotas = resultado['listaMascotas']
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
      ]
    });
    confirm.present();
  }
  

  editarMascota(mascota:any){
    console.log(mascota)
    this.navCtrl.push(MisDatosMascotaFormularioPage,{accion:'editar',mascota:mascota})
  }

}
