import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiciosPage } from './servicios';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ServiciosPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiciosPage),
    ComponentsModule
  ],
})
export class ServiciosPageModule {}
