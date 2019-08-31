import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosListaPage } from './pedidos-lista';

@NgModule({
  declarations: [
    PedidosListaPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosListaPage),
  ],
})
export class PedidosListaPageModule {}
