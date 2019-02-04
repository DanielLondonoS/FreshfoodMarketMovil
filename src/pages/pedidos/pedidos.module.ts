import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosPage } from './pedidos';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosPage),
    ComponentsModule
  ],
})
export class PedidosPageModule {}
