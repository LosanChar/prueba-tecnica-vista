import './App.css';
import Rutas from './Routes/Rutas';
import NavBar from './Componentes/NavBar';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container ">        
        <NavBar/>
        <Rutas/>
      </div>
    </BrowserRouter>
  );
}

export default App;
