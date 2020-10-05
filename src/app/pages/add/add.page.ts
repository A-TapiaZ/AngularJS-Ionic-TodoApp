import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { ListaItem } from '../../models/listaItem.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  lista:Lista;
  nombreItem='';

  constructor(private deseosService:DeseosService, private route:ActivatedRoute) {
    
    // Esta linea permite leer los parametros de la url. 
    const listaID=this.route.snapshot.paramMap.get('ListaID');
    
    this.lista=this.deseosService.obtenerLista(listaID);
  }

  ngOnInit() {
  }

  agregarItem(){

    if (this.nombreItem.length===0) {
      return;
    }

    const nuevoItem= new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem=''; 
    this.deseosService.guardarStorage();
  }
  
  cambioCheck(item:ListaItem){

    // Me va a retornar los items que no estan completos.
    const pendientes = this.lista.items.filter(itemData => !itemData.complete).length;
    
    if (pendientes===0) {
      this.lista.finished=new Date();
      this.lista.completed=true;
    }else{
      this.lista.finished=null;
      this.lista.completed=false;
    }

    this.deseosService.guardarStorage();
    console.log(this.deseosService.listas);
  }
  
  deleteItem(i:number){
    this.lista.items.splice(i,1);
    this.deseosService.guardarStorage();
  }

}
