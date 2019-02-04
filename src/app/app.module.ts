import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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

import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CallNumber } from '@ionic-native/call-number';


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
    MisDatosPageModule
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
    RegistroProvider,
    PedidosProvider,
    ProductosProvider,
    UtilitiesProvider,
    MisDatosProvider,
    ServiciosProvider,
    PublicacionesProvider,
    Uid,
    AndroidPermissions,
    CallNumber

  ]
})
export class AppModule {}
