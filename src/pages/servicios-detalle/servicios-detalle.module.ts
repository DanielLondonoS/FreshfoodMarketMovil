import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiciosDetallePage } from './servicios-detalle';

@NgModule({
  declarations: [
    ServiciosDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(ServiciosDetallePage),
  ],
})
export class ServiciosDetallePageModule {}
