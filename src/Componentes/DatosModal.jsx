import { useEffect, useState } from 'react';
import { Row, Col, Form, Tab, Tabs, Table, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import {Variables, guardarArchivo, base64ToBlob} from '../Configs/Variables'

export const DatosModal = (props) => {
    const prospecto = props.prospecto;
    const [archivos, setArchivos] = useState([]);

    useEffect(() => {
        fetch(Variables.API_URL+'Archivos/ObtenerArchivosProspecto?ID_PROSPECTO='+prospecto.IdProspecto)
        .then(response=>  response.json()).then(respuesta => {console.log(respuesta); setArchivos(respuesta)});
    }, [])

    const descargarArchivo = (id, formato, nombreArchivo) => {
        try{
            fetch(Variables.API_URL+'Archivos/DescargarArchivo?ID_DOCUMENTO='+id)
            .then(response=>  response.json())
            .then(respuesta => {
                console.log(respuesta);
                const blob = base64ToBlob(respuesta, formato);
                guardarArchivo(blob, nombreArchivo);
            });
        }catch(e){
            console.log(e);
        }
        
    }

    const Tab1Info = () => {
            return (
                <>
                <Row>
                    <Col className='col-6'>
                        <Form.Group className="mb-3" controlId="formInputStatus">
                            <Row className='text-start'>
                            <Form.Label htmlFor='status'>Status:</Form.Label>
                            </Row>
                            <Form.Control disabled type="text" id='status'  value={prospecto.Status}/>
                        </Form.Group>
                    </Col>
                    {
                        prospecto.Status === "RECHAZADO" && 
                        <Col className='col-6'>
                            <Form.Group className="mb-3" controlId="formInputStatus">
                                <Row className='text-start'>
                                <Form.Label htmlFor='comentarios'>Comentarios:</Form.Label>  
                                </Row>
                                <Form.Control disabled as="textarea" rows={3} id='comentarios' value={prospecto.Comentarios}/>
                            </Form.Group>
                        </Col>
                    }
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="formInputNombre">
                        <Row className='text-start'>
                        <Form.Label htmlFor='nombre'>Nombre(s):</Form.Label>
                        </Row>
                        <Form.Control disabled type="text" id='nombre' placeholder="Nombre del prospecto"  value={prospecto.Nombre}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formInputPrimerApellido">
                            <Row className='text-start'>
                                <Form.Label htmlFor='primerApellido'>Primer apellido:</Form.Label>
                            </Row>
                            <Form.Control disabled type="text" id='primerApellido' placeholder="Primer apellido del prospecto" value={prospecto.PrimerApellido} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formInputSegundoApellido">
                        <Row className='text-start'>
                            <Form.Label htmlFor='segundoApellido'>Segundo apellido:</Form.Label>
                        </Row>
                        <Form.Control disabled type="text" id='segundoApellido' placeholder="Segundo apellido del prospecto" value={prospecto.SegundoApellido} />
                        </Form.Group>
                    </Col>    
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formInputTelefono">
                            <Row className='text-start'>
                                <Form.Label htmlFor='telefono'>Teléfono:</Form.Label>
                            </Row>
                            <Form.Control disabled  type="phone" id='telefono' placeholder="Teléfono del prospecto" value={prospecto.Telefono} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formInputRFC">
                            <Row className='text-start'>
                                <Form.Label htmlFor='rfc'>RFC:</Form.Label>
                            </Row>
                            <Form.Control disabled type="text" id='rfc' placeholder="RFC del prospecto" value={prospecto.RFC}/>
                        </Form.Group>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Form.Group className="mb-3" controlId="formInputCalle">
                        <Row className='text-start'>
                            <Form.Label htmlFor='calle'>Calle:</Form.Label>
                        </Row>
                        <Form.Control disabled type="text" id='calle' placeholder="Calle" value={prospecto.Calle}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Col className='col-3'>
                        <Form.Group className="mb-3" controlId="formInputNumero">
                            <Row className='text-start'>
                                <Form.Label htmlFor='numero'>Numero:</Form.Label>
                            </Row>
                            <Form.Control disabled type="text" id='numero' placeholder="Numero" value={prospecto.Numero} />
                        </Form.Group>
                    </Col>
                    <Col className='col-6'>
                        <Form.Group className="mb-3" controlId="formInputColonia">
                            <Row className='text-start'>
                                <Form.Label htmlFor='colonia'>Colonia:</Form.Label>
                            </Row>
                            <Form.Control disabled type="text" id='colonia' placeholder="Colonia" value={prospecto.Colonia} />
                        </Form.Group>
                    </Col>
                    <Col className='col-3'>
                        <Form.Group className="mb-3" controlId="formInputCodigoPostal">
                            <Row className='text-start'>
                                <Form.Label htmlFor='codigoPostal'>Código postal:</Form.Label>
                            </Row>
                            <Form.Control disabled type="text" id='codigoPostal' placeholder="Código postal" value={prospecto.CodigoPostal} />
                        </Form.Group>
                    </Col>
                </Row>        
            </>
            )
    }

    const Tab2Info = () => {
        return (
            <>
            {
                archivos.length === 0 &&
                <Row className='text-center'>
                    <h2>Sin archivos cargados...</h2>
                </Row>
            }
            { archivos.length !== 0 &&
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Archivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            archivos.map((archivo, index) => {
                                return(
                                    <tr id={index.toString()}>
                                        <td>
                                            <span>{index+1}</span>
                                        </td>
                                        <td>  
                                            <span>{archivo.Nombre+archivo.Extension}</span>   
                                        </td>
                                        <td>
                                            <span> </span>
                                            <Button variant="primary" className='btn-rounded' onClick={() => descargarArchivo(archivo.IdDocumento, archivo.Formato, archivo.Nombre)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                            </svg>
                                            </Button>
                                        </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            }
            </>
        )
    }


    return (
        <>
            <Tabs defaultActiveKey="tab1Info" className="mb-3 ">
                <Tab eventKey="tab1Info" title="Datos del prospecto">
                    <Tab1Info></Tab1Info>
                </Tab>
                <Tab eventKey="documentos" title="Documentos">
                    <Tab2Info></Tab2Info>
                </Tab>
            </Tabs>
        </>
        )
}

export default DatosModal;