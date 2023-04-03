import React,{ useState} from 'react';
import { Row, Col, Button, Container, Form, Tabs, Tab } from 'react-bootstrap';
import DatosPersonales from '../Componentes/DatosPersonales';
import Documentos from '../Componentes/Documentos';
import usePrompt from '../Componentes/usePrompt';
import { Bloquear, RegistrarProspecto } from '../Services/RegistroService';

export const Registro = () => {
    const [validated, setValidated] = useState(false);
    const [archivos, setArchivos] = useState([]);

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

    usePrompt("¿Seguro deseas salir?, se perderan los cambios no guardados", Bloquear(prospecto));

    const PrepararLista = (lista) => {
        setArchivos(lista);
    }

    const handleSubmit = (event) => {          
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }else{
            const values = event.target;
            RegistrarProspecto(values, archivos);
        }
    };
    
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