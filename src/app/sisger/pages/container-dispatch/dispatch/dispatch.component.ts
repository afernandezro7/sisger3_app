import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ContainerService } from '../../../services/container.service';
import { Bulto, Concepto, Contenedor } from '../../../interfaces/container.interface';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {
  title = 'Despacho de contenedores';
  expedientes   : Concepto[] = []
  warehouseItems: Bulto[] = [];
  containerItems: Bulto[] = [];


  constructor(
    private containerService:ContainerService
  ) { }

  ngOnInit(): void {
    this.containerService.getContainerById(54)
      .subscribe( ( contenedor: Contenedor ) => { 
        this.expedientes = contenedor.concepto

        this.expedientes.map( (expediente: Concepto) => {
          if(expediente.bulto)this.warehouseItems.push(...expediente.bulto)

        })
      })
  }


  

  
  drop(event: CdkDragDrop<any[]>) {

 
    console.log(event.container.data)
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  
  }

}
