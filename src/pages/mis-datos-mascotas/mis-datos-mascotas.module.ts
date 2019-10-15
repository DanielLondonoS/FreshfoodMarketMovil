import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisDatosMascotasPage } from './mis-datos-mascotas';
// import { File } from '@ionic-native/File';
import { Camera } from '@ionic-native/Camera';
import { FilePath } from '@ionic-native/file-path';

@NgModule({
  declarations: [
    MisDatosMascotasPage,
  ],
  imports: [
    IonicPageModule.forChild(MisDatosMascotasPage),
  ],
  providers:[
    // File,
    Camera,
    FilePath
  ]
})
export class MisDatosMascotasPageModule {}
