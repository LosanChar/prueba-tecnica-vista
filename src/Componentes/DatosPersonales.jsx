import { Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';

export const DatosPersonales = (props) => {
    const {cambioDeDatos} = props;
    const [prospecto, setProspecto] = useState({
        Nombre: "",
        PrimerApellido: "",
        SegundoApellido: "",
        Telefono: "",
        RFC: "",
        Calle: "",
        Numero: "",
        Colonia: "",
        CodigoPostal: ""
    });

    const actualizar = (nombre, valor) => {
        let tmp = prospecto;
        tmp[nombre] = valor;
        setProspecto(tmp)
        cambioDeDatos(tmp);
    }
    return (
        <>
        <Row>
            <Form.Group className="mb-3" controlId="formInputNombre">
                                <Row className='text-start'>
                                    <Form.Label htmlFor='nombre'>Nombre:</Form.Label>
                                </Row>
                                <Form.Control required type="text" id='nombre' placeholder="Nombre del prospecto" 
                                onChange={(e) => actualizar("Nombre", e.target.value)} />
            </Form.Group>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formInputPrimerApellido">
                    <Row className='text-start'>
                        <Form.Label htmlFor='primerApellido'>Primer apellido:</Form.Label>
                    </Row>
                    <Form.Control required type="text" id='primerApellido' placeholder="Primer apellido del prospecto"
                    onChange={(e) => actualizar("PrimerApellido", e.target.value)} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formInputSegundoApellido">
                <Row className='text-start'>
                    <Form.Label htmlFor='segundoApellido'>Segundo apellido:</Form.Label>
                </Row>
                <Form.Control type="text" id='segundoApellido' placeholder="Segundo apellido del prospecto" />
                </Form.Group>
            </Col>    
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formInputTelefono">
                    <Row className='text-start'>
                        <Form.Label htmlFor='telefono'>Teléfono:</Form.Label>
                    </Row>
                    <Form.Control required type="phone" id='telefono' placeholder="Teléfono del prospecto" 
                    onChange={(e) => actualizar("Telefono", e.target.value)}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formInputRFC">
                    <Row className='text-start'>
                        <Form.Label htmlFor='rfc'>RFC:</Form.Label>
                    </Row>
                    <Form.Control required type="text" id='rfc' placeholder="RFC del prospecto" 
                    onChange={(e) => actualizar("RFC", e.target.value)}/>
                </Form.Group>
            </Col>
        </Row>
        <hr></hr>
        <Row>
            <Form.Group className="mb-3" controlId="formInputCalle">
                <Row className='text-start'>
                    <Form.Label htmlFor='calle'>Calle:</Form.Label>
                </Row>
                <Form.Control required type="text" id='calle' placeholder="Calle" 
                onChange={(e) => actualizar("Calle", e.target.value)}/>
            </Form.Group>
        </Row>
        <Row>
            <Col className='col-3'>
                <Form.Group className="mb-3" controlId="formInputNumero">
                    <Row className='text-start'>
                        <Form.Label htmlFor='numero'>Numero:</Form.Label>
                    </Row>
                    <Form.Control required type="text" id='numero' placeholder="Numero" 
                    onChange={(e) => actualizar("Numero", e.target.value)}/>
                </Form.Group>
            </Col>
            <Col className='col-6'>
                <Form.Group className="mb-3" controlId="formInputColonia">
                    <Row className='text-start'>
                        <Form.Label htmlFor='colonia'>Colonia:</Form.Label>
                    </Row>
                    <Form.Control required type="text" id='colonia' placeholder="Colonia" 
                    onChange={(e) => actualizar("Colonia", e.target.value)}/>
                </Form.Group>
            </Col>
            <Col className='col-3'>
                <Form.Group className="mb-3" controlId="formInputCodigoPostal">
                    <Row className='text-start'>
                        <Form.Label htmlFor='codigoPostal'>Código postal:</Form.Label>
                    </Row>
                    <Form.Control required type="text" id='codigoPostal' placeholder="Código postal" 
                    onChange={(e) => actualizar("CodigoPostal", e.target.value)}/>
                </Form.Group>
            </Col>
        </Row>        
    </>)
}

export default DatosPersonales; 