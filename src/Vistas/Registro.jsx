import React,{ useEffect, useState} from 'react';
import { Row, Col, Button, Container, Form, Tabs, Tab, Nav } from 'react-bootstrap';
import DatosPersonales from '../Componentes/DatosPersonales';
import Documentos from '../Componentes/Documentos';
import {Variables} from '../Configs/Variables';
import Swal from 'sweetalert2'
import usePrompt from '../Hooks/usePrompt';

export const Registro = () => {
    const [validated, setValidated] = useState(false);
    const [archivos, setArchivos] = useState([]);
    const [cambio, setCambio] = useState(false);

    const [prospecto, setProspecto] = useState({
        IdProspecto: "",
        Nombre: "",
        PrimerApellido: "",
        SegundoApellido: "",
        Telefono: "",
        RFC: "",
        Calle: "",
        Numero: "",
        Colonia: "",
        CodigoPostal: "",
        Status: "",
        Comentarios: ""
    });

    useEffect(() => {
        console.log(prospecto)
    }, [prospecto])
    const PrepararLista = (lista) => {
        setArchivos(lista);
    }

    const subirArchivos  = async (id) => {
          
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
                    console.log(res);
                })
            }catch(e){
                console.log(e);
            }
            
    }

    const handleSubmit = (event) => {          
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }else{
            try{
                const values = event.target;
                
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
                    console.log("Subiendo archivos");
                    subirArchivos(respuesta);
                })
            }catch(e){
                Swal.fire({
                    title: 'Oops!',
                    text: 'Hubo un error inesperado, vuelva a intentarlo más tarde',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
            
        }

        
    };

    const isBlocking = () => {
        return prospecto.Nombre.length > 0 || prospecto.PrimerApellido.length > 0 || prospecto.SegundoApellido.length > 0 ||
               prospecto.Telefono.length > 0 || prospecto.RFC.length > 0 || prospecto.Calle.length > 0 || prospecto.Numero.length > 0 ||
               prospecto.Colonia.length > 0 || prospecto.CodigoPostal.length > 0 || validated === false;
    }
    
    usePrompt("¿Seguro deseas salir?, se perderan los cambios no guardados", isBlocking);
    
    const cambioDeDatos = (valor) => {
        setProspecto(valor)
    }

    return(
        <>
            <br></br>
            <Container >
                <Row className='justify-content-center'>
                    <Col className='col-6'>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Tabs defaultActiveKey="datos" className="mb-3 ">
                                <Tab eventKey="datos" title="Datos del prospecto">
                                    <DatosPersonales cambioDeDatos={(nombre, valor) => cambioDeDatos(nombre, valor)} ></DatosPersonales>       
                                </Tab>
                                <Tab eventKey="documentos" title="Documentos">
                                    <Documentos PrepararLista={(items)=>{PrepararLista(items)}}></Documentos>
                                </Tab>
                            </Tabs>                            

                            <Row className='text-end'>
                                <Col>
                                    <Button type="submit">Envíar</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Registro;