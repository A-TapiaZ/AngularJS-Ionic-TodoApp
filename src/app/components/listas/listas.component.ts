import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) listaSlide:IonList;
  @Input() completed=true; 
  
  listas:Lista[];

  constructor(public deseosService:DeseosService, private router:Router, private alertCtrl:AlertController) { 
    this.listas= this.deseosService.getListas();
  }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){
    // console.log(lista);

    if (this.completed) {
      this.router.navigateByUrl(`/tabs/tab2/add/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${lista.id}`);
    }
  }

  deleteLista(lista:Lista){
    this.listas=this.deseosService.borrarLista(lista);
  }

  async EditarNombreLista(lista:Lista){

    const alert = await this.alertCtrl.create({
      header:'Editar lista',
      inputs:[
        {
          name:'titulo',
          type:'text',
          value:lista.title,
          placeholder:'Nombre de la lista'
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          handler: () => {
            console.log('Cancelar');
            this.listaSlide.closeSlidingItems();
          }
        },
        {
          text:'Editar',
          handler: (data) => {
            // console.log(data.titulo);
            // console.log(lista.title);

            if (data.titulo.length===0 || data.titulo===lista.title) {
              return;
            }else{
              lista.title=data.titulo;
            }
            
            // Tengo que guardar el item editado la lista
            // Esta era mi solucion, pero al recordar que los valores se pasan por referencia en JS, no es necesario cambiar los valores en el deseo.services ya que desde aqui mismo lo estoy modificando.
            // this.listas=this.deseosService.editarLista(lista);
            
            this.deseosService.guardarStorage();
            this.listaSlide.closeSlidingItems();
          }
        },
      ]   
    });

    alert.present();
  }
}

