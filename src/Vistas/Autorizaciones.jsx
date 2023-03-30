import React,{Component, useEffect, useState} from 'react';
import { Table, Row, Col, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import DatosModal from '../Componentes/DatosModal';
import {Variables} from '../Configs/Variables'
import './Autorizaciones.css'
import Swal from 'sweetalert2'

export const Autorizaciones = () =>{

    const [prospectos, setProspectos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalRechazo, setShowModalRechazo] = useState(false);
    const [prospecto, setProspecto] = useState({
        IdProspecto: "",
        Nombre: "",
        PrimerApellido: "",
        SegundoApellido: "",
        Calle: "",
        Numero: "",
        Colonia: "",
        CodigoPostal: "",
        Telefono: "",
        RFC: "",
        Status: "",
        Comentarios: ""
    });

   
    useEffect(() => {
        fetch(Variables.API_URL+'Prospectos/ObtenerProspectos')
        .then(response=>  response.json()).then(respuesta => {console.log(respuesta); setProspectos(respuesta)})
    }, []);


    const validarFormatoStatus = (Status) => {
        switch(Status){
            case "ENVIADO":
                return "text-muted";
            case "AUTORIZADO":
                return "text-success";
            case "RECHAZADO":
                return "text-danger";
        }
    }

    const CambiarStatus = (id, status, comentarios) => {

        try{
            fetch(Variables.API_URL+'Prospectos/CambiarStatus',{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    IdProspecto: id,
                    Nombre: "",
                    PrimerApellido: "",
                    SegundoApellido: "",
                    Calle: "",
                    Numero: "",
                    Colonia: "",
                    CodigoPostal: "",
                    Telefono: "",
                    RFC: "",
                    Status: status,
                    Comentarios: comentarios
                })
            })
            .then(res=>{
                res.json(); 
                console.log(res)
                fetch(Variables.API_URL+'Prospectos/ObtenerProspectos')
                .then(response=>  response.json()).then(respuesta => {console.log(respuesta); setProspectos(respuesta)})
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

    const RechazarProspecto = (event) => {
        const values = event.target;
        CambiarStatus(prospecto.IdProspecto, "RECHAZADO", values.comentarios.value);
    }
    return(
        <>
        <br></br>
            <Row className='mb-3'>
                <Col>
                    <Table bordered size='sm' responsive striped hover> 
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Primer apellido</th>
                                <th>Segundo apellido</th>
                                <th>Status</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prospectos.map((prospecto, index) => (
                                <tr key={index.toString()}>
                                    <td>{prospecto.Nombre}</td>
                                    <td>{prospecto.PrimerApellido}</td>
                                    <td>{prospecto.SegundoApellido}</td>
                                    <td>
                                        <span className={validarFormatoStatus(prospecto.Status)}>{prospecto.Status}</span>
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" className='btn-rounded' data-toggle="dropdown" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                                </svg>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => {setShowModal(true); setProspecto(prospecto)}}>Ver detalles</Dropdown.Item>
                                                <Dropdown.Item
                                                    disabled={prospecto.Status === "AUTORIZADO"? true: false}
                                                    onClick={() => CambiarStatus(prospecto.IdProspecto, "AUTORIZADO", "")}>Autorizar</Dropdown.Item>
                                                <Dropdown.Item 
                                                    disabled={prospecto.Status === "AUTORIZADO" || prospecto.Status === "RECHAZADO"? true: false}
                                                    onClick={() => {setProspecto({IdProspecto: prospecto.IdProspecto}); setShowModalRechazo(true)}}>Rechazar</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>  
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>


            

            <Modal size='md' centered show={showModalRechazo} onHide={()=>{
                setShowModalRechazo(false)
                }}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Form onSubmit={RechazarProspecto}>
                <Modal.Body>
                    <Row className='text-center'>
                        <h3>¿Deseas rechazar al prospecto?</h3>
                        
                        <Form.Group className="mb-3" controlId="formInputComentarios">
                            <Row className='text-start'>
                            <Form.Label htmlFor='comentarios'>Comentarios:</Form.Label>
                            </Row>
                            <Form.Control required as="textarea" rows={3 } id='comentarios'/>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' className='btn-danger' onClick={() => setShowModalRechazo(false)}>Cancelar</Button>
                    <Button type='submit' className='btn-primary'>Enviar</Button>
                </Modal.Footer>
                </Form>
            </Modal>

            <Modal size='lg' centered show={showModal} onHide={()=>{
                setShowModal(false)
                }}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Detalles de prospecto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DatosModal prospecto={prospecto}></DatosModal>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Autorizaciones;