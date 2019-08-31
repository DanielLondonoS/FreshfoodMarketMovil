import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosListaDetallePage } from './pedidos-lista-detalle';

@NgModule({
  declarations: [
    PedidosListaDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosListaDetallePage),
  ],
})
export class PedidosListaDetallePageModule {}
