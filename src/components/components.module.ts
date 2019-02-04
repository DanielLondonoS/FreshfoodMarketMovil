
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PedidosComponent } from './pedidos/pedidos';
import { ProductosListaComponent } from './productos-lista/productos-lista';

import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PublicidadComponent } from './publicidad/publicidad';
@NgModule({
	declarations: [
        PedidosComponent,
        ProductosListaComponent,
        PublicidadComponent
    ],
	imports: [CommonModule, IonicModule ],
	exports: [
        PedidosComponent,
        ProductosListaComponent,
        PublicidadComponent
    ]
})
export class ComponentsModule {}
