import {Route, Routes} from 'react-router-dom';
import {Lista} from '../Vistas/Lista';
import {Autorizaciones} from '../Vistas/Autorizaciones';
import { Registro } from '../Vistas/Registro';

export const Rutas = () => {
    return (
      <>
        <Routes>
          <Route path='/' element={<Registro/>} />
          <Route path='/Registro' element={<Registro/>} />
          <Route path='/Lista' element={<Lista/>}/>
          <Route path='/Autorizaciones' element={<Autorizaciones/>}/>
        </Routes>
      </>
    )
}

export default Rutas;