import { ListaItem } from './listaItem.model';

export class Lista {

  id:number;
  title:string;
  started:Date;
  finished:Date;
  completed:boolean;
  items:ListaItem[];

  constructor(title:string){
    
    this.title=title;

    this.started= new Date();
    this.completed= false;
    this.items=[];

    this.id=new Date().getTime();
  }

}