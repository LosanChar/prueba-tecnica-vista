import {Variables} from '../Configs/Variables'
import { Error } from '../Utils/Utils';

export const ObtenerProspectos = () => {
    return fetch(Variables.API_URL+'Prospectos/ObtenerProspectos')
            .then(response=>  response.json())
            .then(respuesta => {
                return respuesta
            }).catch(e => {
                Error();
            });
}

export const validarFormatoStatus = (Status) => {
    switch(Status){
        case "ENVIADO":
            return "text-muted";
        case "AUTORIZADO":
            return "text-success";
        case "RECHAZADO":
            return "text-danger";
    }
}