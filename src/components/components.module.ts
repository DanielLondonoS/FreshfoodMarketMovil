
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PedidosComponent } from './pedidos/pedidos';
import { ProductosListaComponent } from './productos-lista/productos-lista';

import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PublicidadComponent } from './publicidad/publicidad';
import { CategoriasSlideComponent } from './categorias-slide/categorias-slide';
import { MarcasSlideComponent } from './marcas-slide/marcas-slide';
import { ServiciosListaComponent } from './servicios-lista/servicios-lista';
@NgModule({
	declarations: [
        PedidosComponent,
        ProductosListaComponent,
        PublicidadComponent,
    CategoriasSlideComponent,
    MarcasSlideComponent,
    ServiciosListaComponent
    ],
	imports: [CommonModule, IonicModule ],
	exports: [
        PedidosComponent,
        ProductosListaComponent,
        PublicidadComponent,
    CategoriasSlideComponent,
    MarcasSlideComponent,
    ServiciosListaComponent
    ]
})
export class ComponentsModule {}
