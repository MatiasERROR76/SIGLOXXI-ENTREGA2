import React from "react";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'

class Header extends Component{
    render(){
        return (

                                <nav className="navbar navbar-dark bg-dark">
                                                                        <a id="volver" style={{marginLeft: "30px"}} className="btn btn-secondary " href="/main">
                     <FontAwesomeIcon  icon={faArrowAltCircleLeft}  /> <strong>Inicio</strong></a>
                                    <a className="navbar-brand" href="/pedidos" style={{marginRight: "550px"}} >  Lista de Pedidos</a>

                                </nav>
        );
    }
}

export default Header;