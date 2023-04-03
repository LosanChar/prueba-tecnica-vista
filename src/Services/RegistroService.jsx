import {Variables} from '../Configs/Variables';
import Swal from 'sweetalert2'
import { Error } from '../Utils/Utils';

export const subirArchivos  = async (id, archivos) => {
          
    try{
        const formData=new FormData();
        formData.append("ID_PROSPECTO", id);
        archivos.forEach((archivo) => {
            formData.append("ARCHIVOS",archivo);
        })

        fetch(Variables.API_URL+'Archivos/SubirArchivos',{
            method:'POST',
            body:formData
        })
        .then(res=>{
            res.json();
        }).catch(e => {
            Error();
        })
    }catch(e){
        Error();
    }
    
}

export const RegistrarProspecto = async (values, archivos) => {
    try{        
        fetch(Variables.API_URL+'Prospectos/AltaProspecto',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                IdProspecto: "",
                Nombre: values.nombre.value,
                PrimerApellido: values.primerApellido.value,
                SegundoApellido: values.segundoApellido.value,
                Calle: values.calle.value,
                Numero: values.numero.value,
                Colonia: values.colonia.value,
                CodigoPostal: values.codigoPostal.value,
                Telefono: values.telefono.value,
                RFC: values.rfc.value,
                Status: "",
                Comentarios: ""
            })
        })
        .then(response => response.json()).then((respuesta) => {
            subirArchivos(respuesta, archivos);
        }).catch(e => {
            Error();
        })
    }catch(e){
        Error();
    }
}

export const Bloquear = (prospecto) => {
    return prospecto.Nombre.length > 0 || prospecto.PrimerApellido.length > 0 || prospecto.SegundoApellido.length > 0 ||
           prospecto.Telefono.length > 0 || prospecto.RFC.length > 0 || prospecto.Calle.length > 0 || prospecto.Numero.length > 0 ||
           prospecto.Colonia.length > 0 || prospecto.CodigoPostal.length > 0 ;
}