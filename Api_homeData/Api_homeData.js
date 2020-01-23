/*Llamada a toda la informacion de un area en especifico a un metodo en forma de un Json en
orden de tener toda la Info de la aplicacion de forma centralizada, en una sola carpeta */

import negocioData from "../data/negociosData";
import promoProducto from "../data/promoProducData";
import promoPrdtComercio from "../data/promoPrdtComData";

export function negocio() {
  return negocioData;
}

export function promoPrdto() {
  return promoProducto;
}

export function promoPrdtComercioPrdto() {
  return promoPrdtComercio;
}
