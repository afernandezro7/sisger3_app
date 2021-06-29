import { Injectable, QueryList, ChangeDetectorRef } from '@angular/core';
import { Bulto } from '../interfaces/container.interface';
import { CdkDragDrop, moveItemInArray, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
import { BultoService } from './bulto.service';

interface Box {
  title: string;
  name: string;
  ref: string;
  data: Bulto[]
}

interface BoxGroup {
  [name: string] : Box
}


@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  containerReferences!: QueryList<CdkDropList<Bulto[]>>;
  warehouseRef!: CdkDropList<Bulto[]> ;

  audio:HTMLAudioElement = new Audio('../../../../../assets/audios/new-ticket.mp3')

  warehouseBox: Box = {
    title:"Afuera",
    name: "warehouse",
    ref: "cdk-drop-list-0",
    data:[]
  }
  
  containersCount:number = 1

  containersBox:Box[] = [
    {
      title: "Pared No.1",
      name: 'container1',
      ref: "cdk-drop-list-1",
      data:[]
    }
  ]

  constructor(
    private detector:ChangeDetectorRef,
    private bultoService: BultoService) 
  { }


  drop(event: CdkDragDrop<Bulto[]>) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {      
      this.moveItemInterColumn(event)
    }
  
  }

  moveItemInterColumn(event: CdkDragDrop<Bulto[]>) {
    const groupRef = event.container.id

    
    //Copia del contenedor destino sin el item
    const insideContainer = this.containerReferences.find( item => item.id === groupRef ) 
    let previousGroupItems:Bulto[] = insideContainer ? [...insideContainer.data] : [ ...this.warehouseRef.data]
 
    //transferir item al contenedor destino
    transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
    


    // Recorrer el contenedor destino 
    event.container.data.forEach( (bulto:Bulto) => {

      let exist = previousGroupItems.find( element => element.id === bulto.id )

      if(!exist){

        if(groupRef==="cdk-drop-list-0"){
          bulto.dentro = false
          
        }else{
          bulto.dentro = true
          bulto.pared = parseInt(groupRef.split('-')[3])

        }

        // todo save in db "dentro" status and pared number
        const resp = this.bultoService.updateBultoById(bulto.id,bulto).subscribe( resp=> this.audio.play())
        
      }
    });
  }

  connectDragListTogether() {
    this.warehouseRef.connectedTo = this.containerReferences.toArray()
    this.containerReferences.forEach( item => {
        item.connectedTo =[ 
            this.warehouseRef,
            ...this.containerReferences.filter( el => el.id !== item.id  )
        ]
    })
  }

  relocateBulto(bulto:Bulto){


    if(bulto.dentro && bulto.pared){
      const pared: number = bulto.pared;

      if(pared > this.containersCount){
        const totalToCreate:number = pared - this.containersCount;
        this.createContainer(totalToCreate)
      }

      this.containersBox[pared-1].data.push(bulto)


    }else{
      this.warehouseBox.data.push(bulto)
    }
  }

  createContainer(totalContainer:number=1) {

    for (let i = 0; i < totalContainer; i++) {
      this.containersCount++

      const newContainer:Box = {
        title:`Pared No.${this.containersCount}`,
        name: 'container'+this.containersCount,
        ref: `cdk-drop-list-${this.containersCount}`,
        data:[]
      }
      this.containersBox.push(newContainer)
      this.detector.detectChanges()

      this.connectDragListTogether()
    }
    
  }
}
