import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistroProvider } from '../providers/registro/registro';

import { RegistroPageModule } from '../pages/registro/registro.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageModule } from '../pages/login/login.module';
import { ComponentsModule } from '../components/components.module';
import { PedidosPageModule } from '../pages/pedidos/pedidos.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { PedidosProvider } from '../providers/pedidos/pedidos';
import { ProductosProvider } from '../providers/productos/productos';
import { ProductoDetallePageModule } from '../pages/producto-detalle/producto-detalle.module';
import { ServiciosPageModule } from '../pages/servicios/servicios.module';
import { ServiciosDetallePageModule } from '../pages/servicios-detalle/servicios-detalle.module';
import { UtilitiesProvider } from '../providers/Utilities/Utilities';
import { MisDatosProvider } from '../providers/mis-datos/mis-datos';
import { MisDatosPageModule } from '../pages/mis-datos/mis-datos.module';
import { ServiciosProvider } from '../providers/servicios/servicios';
import { PublicacionesProvider } from '../providers/publicaciones/publicaciones';
import { PedidosListaPageModule } from '../pages/pedidos-lista/pedidos-lista.module';
import { PedidosListaDetallePageModule } from '../pages/pedidos-lista-detalle/pedidos-lista-detalle.module';
import { MarcasPageModule } from '../pages/marcas/marcas.module';
import { CategoriasPageModule } from '../pages/categorias/categorias.module';

import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CallNumber } from '@ionic-native/call-number';
import { OneSignal } from '@ionic-native/onesignal';
import { Vibration } from '@ionic-native/vibration';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { MarcasProvider } from '../providers/marcas/marcas';
import { GestionAccionesProvider } from '../providers/gestion-acciones/gestion-acciones';
import { MisDatosPanelPageModule } from '../pages/mis-datos-panel/mis-datos-panel.module';
import { MisDatosMascotasPageModule } from '../pages/mis-datos-mascotas/mis-datos-mascotas.module';
import { MisDatosMascotaFormularioPageModule } from '../pages/mis-datos-mascota-formulario/mis-datos-mascota-formulario.module';
import { TransversalesProvider } from '../providers/transversales/transversales';


registerLocaleData(es);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    RegistroPageModule,
    LoginPageModule,
    ComponentsModule,
    PedidosPageModule,
    MenuPageModule,
    ProductoDetallePageModule,
    ServiciosPageModule,   
    ServiciosDetallePageModule,
    MisDatosPageModule,
    PedidosListaPageModule,
    PedidosListaDetallePageModule,
    MarcasPageModule,
    CategoriasPageModule,
    MisDatosPanelPageModule,
    MisDatosMascotasPageModule,
    MisDatosMascotaFormularioPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: "es-ES" },
    RegistroProvider,
    PedidosProvider,
    ProductosProvider,
    UtilitiesProvider,
    MisDatosProvider,
    ServiciosProvider,
    PublicacionesProvider,
    Uid,
    AndroidPermissions,
    CallNumber,
    OneSignal,
    Vibration,
    CategoriasProvider,
    MarcasProvider,
    GestionAccionesProvider,
    TransversalesProvider

  ]
})
export class AppModule {}
