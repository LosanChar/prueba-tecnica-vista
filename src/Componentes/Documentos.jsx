import { useEffect, useState } from "react";
import {Table, Form, Button, Row, Col} from 'react-bootstrap';

export const Documentos =  (props) => {
    const {PrepararLista} = props;
    const [archivos, setArchivos] = useState([]);
    const [archivo, setArchivo] = useState();
    const [archivosBuffer, setArchivosBuffer] = useState([]);

    const agregarArchivo = () =>{
        const row = {
            nombre: "",
            archivo: "Ningun archivo adjunto"
        }
        setArchivos([...archivos, row]);        
    }

    const eliminarEvidencia = (index) => {
        console.log(index);
        const rows = [...archivos];
        rows.splice(index, 1);
        setArchivos( rows );

        const filesBuff = [...archivosBuffer];
        filesBuff.splice(index, 1);
        setArchivosBuffer(filesBuff);

        PrepararLista(filesBuff);
    }

    const seleccionarArchivo = (index, e) => {
        try{
            const file = e.target.files[0];
            
            const filesBuff = [...archivosBuffer];
            filesBuff[index] = file;
            setArchivosBuffer(filesBuff);

            const nombre = file.name;
            const rows = [...archivos];
            rows[index].nombre = nombre;
            setArchivos(rows);

            PrepararLista(filesBuff);
        }catch(e){
        }
    }

    useEffect(() => {
        console.log(archivosBuffer);
    }, [archivosBuffer]);
    return (
        <>
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
                                                        <a href="">{archivos[index].nombre}</a>   
                                                    </td>
                                                    <td>
                                                        <Form.Label htmlFor={"subirArchivo"+ index.toString()}>
                                                        <Form.Control 
                                                            required
                                                            type="file" 
                                                            id={"subirArchivo"+index.toString()} 
                                                            name={"subirArchivo"+index.toString()} 
                                                            placeholder="Nombre del prospecto" 
                                                            onChange={(e)=> seleccionarArchivo(index, e)}
                                                            style={{ display: "none" }}/>
                                                            <div style={{ display: "inline" }}>
                                                                    <div className='btn btn-primary'>{"Cargar archivo"}</div>
                                                            </div>
                                                        </Form.Label>
                                                        <span> </span>
                                                        <Button variant="danger" className='btn-rounded' onClick={() => eliminarEvidencia(index)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                            </svg>
                                                        </Button>
                                                    </td>
                                            </tr>)
                        })
                    }
                </tbody>
            </Table>

            <Row >
                        <Col>
                            <Button variant="primary" className='btn-rounded' onClick={agregarArchivo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                </svg>
                            </Button>
                        </Col>
                    </Row>
        </>
    )
}

export default Documentos;