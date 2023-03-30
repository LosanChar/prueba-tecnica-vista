import logo from './logo.svg';
import './App.css';
import {Lista} from './Vistas/Lista';
import {Autorizaciones} from './Vistas/Autorizaciones';
import { Registro } from './Vistas/Registro';
import {BrowserRouter, Route, Switch, NavLink, Routes} from 'react-router-dom';
import { renderIntoDocument } from 'react-dom/test-utils';

function App() {
  return (
    <BrowserRouter>
    <div className="App container ">        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Registro">
              Registro
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Lista">
              Lista de prospectos
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Autorizaciones">
              Autorizaciones
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Registro/>} />
        <Route path='/Registro' element={<Registro/>} />
        <Route path='/Lista' element={<Lista/>}/>
        <Route path='/Autorizaciones' element={<Autorizaciones/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
