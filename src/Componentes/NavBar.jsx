import {BrowserRouter, Route, Switch, NavLink, Routes} from 'react-router-dom';

export const NavBar = () => {
  return (
    <>
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
    </>
  )
    
}

export default NavBar;