import React,{useEffect, useState} from 'react';
import { Table, Row, Col, Button, Modal } from 'react-bootstrap';
import DatosModal from '../Componentes/DatosModal';

import { ObtenerProspectos, validarFormatoStatus } from '../Services/ListaService';


export const Lista = () =>{
    const [prospectos, setProspectos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [prospecto, setProspecto] = useState();

    useEffect(() => {
        ObtenerProspectos().then((respuesta) => {
            setProspectos(respuesta);
        });
    }, []);
    
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
                                        <Button variant="primary" onClick={e => {setShowModal(true); setProspecto(prospecto)}} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-minus" viewBox="0 0 16 16">
                                        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
                                        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
                                        <path d="M6 8a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6Z"/>
                                        </svg>   
                                        </Button>   
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>


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

export default Lista;