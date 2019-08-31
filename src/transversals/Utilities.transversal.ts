import { ProductoModel } from "../models/producto.model";
import { PedidoDetalleModel } from "../models/pedidoDetalle.model";

export class UtilitiesTransversal{
    /**
     *
     */
    constructor() {
        
        
    }

    AgregarAlcarrito(Detalle:PedidoDetalleModel,type:string){
        let datosLocales:PedidoDetalleModel[] = JSON.parse(localStorage.getItem('carrito')) || [];
        if(datosLocales != undefined && datosLocales.length > 0){
            let busqueda = datosLocales.find(item=> item.idProducto == Detalle.idProducto);
            if(busqueda != undefined && busqueda != null){
                let index = datosLocales.indexOf(busqueda);
                if(type == "input"){
                    datosLocales[index].cantidad = Detalle.cantidad;
                    datosLocales[index].valorTotal = Detalle.valorTotal;
                }else{
                    datosLocales[index].cantidad = busqueda.cantidad + (Detalle.cantidad);
                    datosLocales[index].valorTotal = busqueda.valorUnitario * (busqueda.cantidad);
                }                
            }else{
                datosLocales.push(Detalle)
            }            
        }else{
            datosLocales.push(Detalle)
        }
        localStorage.setItem('carrito',JSON.stringify(datosLocales));
        return datosLocales;
    }

    ObtenerCarritoDetalle(){
        let datosLocales:PedidoDetalleModel[] = JSON.parse(localStorage.getItem('carrito'));
        if(datosLocales != undefined && datosLocales.length > 0){
            return datosLocales;         
        }else{
            return [];
        }
    }

    VaciarCarrito(){
        localStorage.removeItem("carrito");
    }

    EliminarItemCarrito(producto){
        let datosLocales:PedidoDetalleModel[] = JSON.parse(localStorage.getItem('carrito'));
        if(datosLocales != undefined && datosLocales.length > 0){
            let datos : any = datosLocales;
            let item = datos.find(r=>r['idProducto'] == producto['pedido_detalle']['idProducto'])
            
            let respuesta = false
            if(item != undefined){
                let index = datos.indexOf(item);
                if(index > -1){
                    datosLocales.splice(index,1)
                    respuesta = true;
                    localStorage.setItem('carrito',JSON.stringify(datosLocales));
                } 
            }
             
            return respuesta;    
        }else{
            return false;
        }
    }

    
}