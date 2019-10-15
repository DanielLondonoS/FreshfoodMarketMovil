import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { MisDatosMascotaFormularioPage } from '../mis-datos-mascota-formulario/mis-datos-mascota-formulario';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { MisDatosProvider } from '../../providers/mis-datos/mis-datos';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

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
  images:any;
  avatarMascota:any ='../../assets/imgs/logo.png';
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,
    private misDatosProvider:MisDatosProvider, private utilitiesProvider:UtilitiesProvider,
    private camera: Camera,private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,private platform:Platform) {
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
        let result = resultado['listaMascotas'];
        let r:any[]=[];
        result.forEach(element => {
          let fecha = new Date(element['fechaUltimaDesparacitada'])
          element['fechaUltimaDesparacitada'] = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() ;
          r.push(element);
        });
        console.log(r);
        this.listaMascotas = r;
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

  selectImage(index:any) {
    const actionSheet = this.actionSheetCtrl.create({
        title: "Seleccionar imagen",
        buttons: [{
                text: 'Archivos',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,index);
                }
            },
            {
                text: 'Usar camara',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA,index);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    actionSheet.present();
}
 
takePicture(sourceType: PictureSourceType,index:any) {
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
    console.log({takePicture_sourceType:sourceType})
    this.camera.getPicture(options).then(imagePath => {
      debugger;
      console.log({takePicture_imagePath:imagePath})
      this.listaMascotas[index]['foto'] = imagePath;
      this.convertToDataURLviaCanvas(imagePath, "image/jpeg")
.then( base64Img => {
   //do whatever you need here, with the base64 data
   console.log(base64Img)
})
      //this.dataURItoBlob("data:image/jpeg;base64," +imagePath);
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),index);
                });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),index);
        }
    },error => {
      console.log({takePicture:error})
    });
 
  }
  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
}
 
  copyFileToLocalDir(namePath, currentName, newFileName,index) {
    console.log({copyFileToLocalDir_name:namePath,currentName:currentName,newFiileName:newFileName})
    let f = new File();
    f.readAsDataURL(namePath,currentName)
    .then(res => {
      console.log(res);
    })

    f.readAsBinaryString(namePath,currentName)
    .then(res => {
      console.log(res);
    })

    f.copyFile(namePath,currentName,f.dataDirectory,newFileName)
    .then(res => {
      console.log(res)
      this.listaMascotas[index]['foto'] = res.nativeURL;;
      
    })
    let z = f.readAsDataURL(namePath,currentName)
    
    // this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
    //     this.updateStoredImages(newFileName);
    // }, error => {
    //     console.log(error)
    // });
  }
 
  updateStoredImages(name) {
    // this.storage.get(STORAGE_KEY).then(images => {
      let images:any;
        let arr = JSON.parse(images);
        if (!arr) {
            let newImages = [name];
            // this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
        } else {
            arr.push(name);
            // this.storage.set(STORAGE_KEY, JSON.stringify(arr));
        }
 
        //let filePath = this.file.dataDirectory + name;
        //let resPath = this.pathForImage(filePath);
 
        let newEntry = {
            name: name,
            //path: resPath,
            //filePath: filePath
        };
 
        this.images = [newEntry, ...this.images];
        //this.ref.detectChanges(); // trigger change detection cycle
    // });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    console.log({
      funcion:'dataURItoBlob',
      byteString:byteString,
      arrayBuffer:arrayBuffer,
      int8Array:int8Array,
      blob:blob
    })
    return blob;
 }
 convertToDataURLviaCanvas(url, outputFormat){
	return new Promise( (resolve, reject) => {
		let img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function(){
			let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
			ctx = canvas.getContext('2d'),
			dataURL;
			canvas.height = 500;
			canvas.width = 500;
			ctx.drawImage(img, 0, 0);
			dataURL = canvas.toDataURL(outputFormat);
			//callback(dataURL);
			canvas = null;
			resolve(dataURL); 
		};
		img.src = url;
	});
}
}
