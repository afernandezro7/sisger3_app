import { Client } from './client.interface';


export interface Contenedor {
    id:             number;
    tipo:           number;
    mes:            number;
    codigo:         string;
    sello:          string;
    estado:         string;
    volumenM3:      number;
    maxPesoKg:      number;
    motonave:       string;
    mbl:            string;
    puertoSalida:   string;
    puertoEntrada:  string;
    fechaEntrada:   Date;
    fechaSalida:    Date;
    indice:         number;
    indiceAnual:    number;
    tipocontenedor: Tipocontenedor;
    concepto:       Concepto[];
}

export interface Bulto {
    id:                       number;
    concepto:                 number;
    sisgerCode:               string;
    indice:                   number;
    concepto_bultoToconcepto: Concepto;
    dentro:                   Boolean;
    pared:                    number | null;
    mercancia:                Mercancia[];
}

export interface Concepto {
    id:            number;
    remitente:     number | null;
    consignado:    number;
    fechaCreacion: Date;
    tipo:          Tipo;
    sisgerCode:    string;
    discr:         Discr;
    contenedor:    number;
    estado:        Estado;
    fechaHBL:      Date;
    expediente:    number;
    bulto?:        Bulto[];
    client_clientToconcepto_consignado?: Client | null;
    client_clientToconcepto_remitente?:  Client | null;
}


export interface Mercancia {
    id:                number;
    bulto:             number;
    fechaCreacion:     Date;
    descripcion:       string;
    cantidad:          number;
    volumenM3:         number;
    pesoKg:            number;
    pesoLb:            number;
    relacion:          number;
    arancel:           number;
    tarifa:            null;
    alturaCm:          number;
    anchoCm:           number;
    profundidadCm:     number;
    tarifaAlternativa: null;
    miRelacionada:     number | null;
    other_mercancia?:  Mercancia[];
}

export enum Discr {
    Ena = "ena",
    Envio = "envio",
    Menaje = "Menaje"
}

export enum Estado {
    Hbl = "HBL",
}

export enum Tipo {
    Ena = "ENA",
    Envio = "Envio",
    Menaje = "Menaje"
}

export interface Tipocontenedor {
    id:        number;
    nombre:    string;
    volumenM3: number;
    pesoKg:    number;
}
