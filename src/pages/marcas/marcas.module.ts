import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarcasPage } from './marcas';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MarcasPage,
  ],
  imports: [
    IonicPageModule.forChild(MarcasPage),
    ComponentsModule
  ],
})
export class MarcasPageModule {}
