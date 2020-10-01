import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService { 

  listas:Lista[] = [];

  constructor() {
    this.cargarStorage();
  }
  
  crearLista(titulo:string){
    
    const nuevaLista= new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    
    return nuevaLista.id;
  }
  
  // Esta funcion no es necesaria, ya que desde el mismo lugar donde edito el objeto lo hago por referencia, lo que quiere decir que desde el compoenente ya estoy modificando los valores de la variable de aca (listas)
  // editarLista(listaEdit:Lista){
    
  //   this.listas.forEach(lista => {
  //     if (lista.id===listaEdit.id) {
  //       lista.title=listaEdit.title;
  //     }

  //     this.guardarStorage();
  //     return this.listas;
  //   });

  //   this.guardarStorage();
  //   return this.listas;
  // }

  borrarLista(lista:Lista){
    this.listas=this.listas.filter(dataLista=>dataLista.id!==lista.id);
    this.guardarStorage();
    return this.listas;
  }
  
  obtenerLista(id:string|number){

    id=Number(id);

    return this.listas.find(listaData=>listaData.id===id)

  }

  getListas(){
    return this.listas;
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }
  
  cargarStorage(){
    // Verificamos que exista algo en el LS
    if (localStorage.getItem('data')) {
      this.listas=JSON.parse(localStorage.getItem('data'));
    }
  }


}


