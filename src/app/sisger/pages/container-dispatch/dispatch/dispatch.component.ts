import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ContainerService } from '../../../services/container.service';
import { Bulto, Concepto, Contenedor } from '../../../interfaces/container.interface';

interface Box {
  name: string;
  ref: string;
  data: Bulto[]
}

interface BoxGroup {
  [name: string] : Box
}


@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {
  title = 'Despacho de contenedores';
  expedientes   : Concepto[] = []
  @ViewChildren('container') containerReferences!: QueryList<CdkDropList>;
  @ViewChild('warehouse') warehouseRef!: CdkDropList ;

  warehouseBox: Box = {
    name: "warehouse",
    ref: "cdk-drop-list-0",
    data:[]
  }

  containersCount:number = 1

  containersBox:Box[] = [
    {
      name: 'container1',
      ref: "cdk-drop-list-1",
      data:[]
    }
  ]



  constructor( 
    private containerService:ContainerService,
    private detector:ChangeDetectorRef) { }


  ngOnInit(): void {
    this.containerService.getContainerById(54)
      .subscribe( ( contenedor: Contenedor ) => { 
        if(contenedor){
          this.expedientes = contenedor.concepto
          
          this.expedientes.map( (expediente: Concepto) => {
            if(expediente.bulto)this.warehouseBox.data.push(...expediente.bulto)
            
            //Connect dragsList one together
            this.connectDragListTogether()

          })
          
        }
      })


  }



  
  drop(event: CdkDragDrop<Bulto[]>) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {      
      this.moveItemInterColumn(event)
    }
  
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


  moveItemInterColumn(event: CdkDragDrop<Bulto[]>) {
    const groupRef = event.container.id
    let previousGroupItems:Bulto[] = []

    previousGroupItems = [
      ...this.containerReferences.find( item => item.id === groupRef )?.data || []
    ]

    transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      

    event.container.data.forEach( (bulto:Bulto) => {

      let exist = previousGroupItems.find( element => element.id === bulto.id )

      if(!exist){
        if(groupRef==="cdk-drop-list-0"){
          bulto.dentro = false
        }else{
          bulto.dentro = true
        }
      }
    });
  }

  createContainer() {
    this.containersCount++

    const newContainer:Box = {
      name: 'container'+this.containersCount,
      ref: `cdk-drop-list-${this.containersCount}`,
      data:[]
    }

    this.containersBox.push(newContainer)
    this.detector.detectChanges()

    this.connectDragListTogether()
  }

}


