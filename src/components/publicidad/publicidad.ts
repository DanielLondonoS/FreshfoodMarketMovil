import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
export class PublicidadComponent implements OnInit{
  @Input() set listSlides(name: any[]) {
    if (name.length > 0){
      this.listPromotions = name;
      this.viewSlide = true;
    }
    
  }
 
  get listSlides(): any[] { return this.listPromotions; }

  @ViewChild(Slides) slides: Slides;
  listPromotions:any[] =[];
  viewSlide:boolean = false;
  // [
  //   { estado: "Activo",fechaPublicacion: new Date(),id: "",idProveedor: "",nombre: "promosion 1",rutaImagen: "../../assets/imgs/publicidad/publicidad_slide1.png" },
  //   { estado: "Activo",fechaPublicacion: new Date(),id: "",idProveedor: "",nombre: "promosion 2",rutaImagen: "../../assets/imgs/publicidad/publicidad_slide2.png" },
  //   { estado: "Activo",fechaPublicacion: new Date(),id: "",idProveedor: "",nombre: "promosion 3",rutaImagen: "../../assets/imgs/publicidad/publicidad_slide3.png" },
  // ]
    // {image:"../../assets/imgs/publicidad/publicidad_slide1.png",name:"promosion 1"},
    // {image:"../../assets/imgs/publicidad/publicidad_slide2.png", name:"promosion 2"},
    // {image:"../../assets/imgs/publicidad/publicidad_slide3.png",name:"promosion 3"}
  @Output() publicidadClick = new EventEmitter<any>();
  constructor(private publicacionesProvider:PublicacionesProvider,private utilidades:UtilitiesProvider) {
    console.log('Hello PromotionsSlideComponent Component');
  }

  ngOnInit() {
    
  }

  /**
   * Metodo que se ejecuta cuando se hace click en una promosión,
   * este metodo llevaria a la ventana de promosiones
   */
  onPromotionsClick(promosion:any){
    this.publicidadClick.emit(promosion)
  }

}
