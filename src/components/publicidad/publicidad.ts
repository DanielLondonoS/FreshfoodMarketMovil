import { Component, Input } from '@angular/core';
import { PublicacionesProvider } from '../../providers/publicaciones/publicaciones';
import { UtilitiesProvider } from '../../providers/Utilities/Utilities';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the PublicidadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publicidad',
  templateUrl: 'publicidad.html'
})
export class PublicidadComponent {
  @Input()
  set listSlides(name: any[]) {
    if (name.length < 0){
      this.listPromotions = name;
    }
    
  }
 
  get listSlides(): any[] { return this.listPromotions; }

  @ViewChild(Slides) slides: Slides;
  listPromotions:any[] = [];
  // [{
  //   estado: "",fechaPublicacion: "",id: "",idProveedor: "",nombre: "",rutaImagen: ""
  // }]
    // {image:"../../assets/imgs/publicidad/publicidad_slide1.png",name:"promosion 1"},
    // {image:"../../assets/imgs/publicidad/publicidad_slide2.png", name:"promosion 2"},
    // {image:"../../assets/imgs/publicidad/publicidad_slide3.png",name:"promosion 3"}
  
  constructor(private publicacionesProvider:PublicacionesProvider,private utilidades:UtilitiesProvider) {
    console.log('Hello PromotionsSlideComponent Component');
    
  }

  ngAfterViewInit() {
    // this.cargarPublicidad();
  }

  cargarPublicidad(){
    this.utilidades.openLoading()
    this.publicacionesProvider.listaPublicaciones()
    .subscribe(res => {
      this.utilidades.closeLoading();
      if(res['estado']){
        this.listPromotions = res['publicaciones']
        // this.slides._autoplaying = true
        // this.slides.autoplay = 5000;
        // this.slides.startAutoplay();
        console.log(this.listPromotions)
      }
    })
  }

  /**
   * Metodo que se ejecuta cuando se hace click en una promosión,
   * este metodo llevaria a la ventana de promosiones
   */
  onPromotionsClick(){

  }

}