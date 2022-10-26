
import './assets/css/App.css';
import Login from './components/Login';

import { Switch, BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import Dashboard from './components/Dashboard';
import Nuevo from './components/Nuevo';
import Editar from './components/Editar';
import EditarProducto from './components/EditarProducto';

import Productos from './components/Productos';
import Menus from './components/Menus';
import EditarMenu from './components/EditarMenu';
import EditarMesa from './components/EditarMesa';

import Main from './components/Main';
import IngresarProducto from './components/IngresarProducto';
import IngresarUsuario from './components/IngresarUsuario';
import IngresarMenu from './components/IngresarMenu';
import IngresarMesa from './components/IngresarMesa';

import Error from './components/Error';
import Mesas from './components/Mesas';

import {Redirect} from 'react-router-dom';
import Reservaciones from './components/Reservaciones';
import IngresarReserva from './components/IngresarReserva';
import Pedidos from './components/Pedidos';
import Register from './components/Register';




function App() {
  const Logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    return <Redirect to="/"/>
  }
  return (
<React.Fragment>
    <BrowserRouter>  
    <Switch>
    <Route path="/pedidos" exact render = { props=> (<Pedidos {...props}/>)}></Route>
    
    <Route path="/reservaciones" exact render = { props=> (<Reservaciones {...props}/>)}></Route>
    <Route path="/ingresarreserva" exact render = { props=> (<IngresarReserva {...props}/>)}></Route>

      
    <Route path="/logout" exact component={Logout}/>
    <Route path="/register" exact render = { props=> (<Register {...props}/>)}></Route>

    <Route path="/" exact render = { props=> (<Login {...props}/>)}></Route>
    <Route path="/dashboard" exact render = { props=> (<Dashboard {...props}/>)}></Route>
    <Route path="/nuevo" exact render = { props=> (<Nuevo {...props}/>)}></Route>
    <Route path="/editar/:id" exact render = { props=> (<Editar {...props}/>)}></Route>
    <Route path="/editarproducto/:id" exact render = { props=> (<EditarProducto {...props}/>)}></Route>

    <Route path="/productos" exact render = { props=> (<Productos {...props}/>)}></Route>
    <Route path="/menus" exact render = { props=> (<Menus {...props}/>)}></Route>
    <Route path="/editarmenu/:id" exact render = { props=> (<EditarMenu {...props}/>)}></Route>
    <Route path="/editarmesa/:id" exact render = { props=> (<EditarMesa {...props}/>)}></Route>
    
    <Route path="/main" exact render = { props=> (<Main {...props}/>)}></Route>
    <Route path="/IngresarProducto" exact render = { props=> (<IngresarProducto {...props}/>)}></Route>
    <Route path="/IngresarUsuario" exact render = { props=> (<IngresarUsuario {...props}/>)}></Route>
    <Route path="/IngresarMenu" exact render = { props=> (<IngresarMenu {...props}/>)}></Route>
    <Route path="/IngresarMesa" exact render = { props=> (<IngresarMesa {...props}/>)}></Route>


    <Route path="/Mesas" exact render = { props=> (<Mesas {...props}/>)}></Route>


    
    <Route component={Error} />

    </Switch>

      
    </BrowserRouter>
    



</React.Fragment>
  );
}

export default App;
