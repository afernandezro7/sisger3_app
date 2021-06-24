import { Pipe, PipeTransform } from '@angular/core';
import { Bulto } from '../interfaces/container.interface';

@Pipe({
  name: 'client'
})
export class ClientPipe implements PipeTransform {

  constructor() {

  }

  transform(bulto: Bulto): string {

    const remitente = bulto.concepto_bultoToconcepto.client_clientToconcepto_remitente
    const consignado = bulto.concepto_bultoToconcepto.client_clientToconcepto_consignado

    if(!remitente && !consignado){
      return 'Sin Remitente ni destinatario'
    }

    if(!remitente || !consignado){
      return `${ remitente ? remitente?.firstName+" "+ remitente?.lastName : ""} ${consignado && `enviado a ${consignado.firstName} ${consignado.lastName}`}`
    }

    if (remitente.id === consignado.id) {
      
      return `${consignado.firstName} ${consignado.lastName}`;
    }else {
      return `${remitente.firstName} ${remitente.lastName} a ${consignado.firstName} ${consignado.lastName}`
    }


    

  }

}
