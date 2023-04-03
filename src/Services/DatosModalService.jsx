import {Variables} from '../Configs/Variables'
import {guardarArchivo, base64ToBlob, Error} from '../Utils/Utils'

export const ObtenerArchivosProspecto = (idProspecto) => {
    return fetch(Variables.API_URL+'Archivos/ObtenerArchivosProspecto?ID_PROSPECTO=' + idProspecto)
        .then(response=>  response.json())
        .then(respuesta => {
             return respuesta
        }).catch(e => {
            Error();
        });
}

export const DescargarArchivo = (idDocumento, formato, nombreArchivo) => {
    try{
        return fetch(Variables.API_URL+'Archivos/DescargarArchivo?ID_DOCUMENTO='+idDocumento)
        .then(response=>  response.json())
        .then(respuesta => {
            const blob = base64ToBlob(respuesta, formato);
            guardarArchivo(blob, nombreArchivo);
        }).catch((e) => {
            Error();
        });
    }catch(e){
        Error();
    }
}