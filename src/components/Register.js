import React, {Component} from "react";
import { createClient } from "../converters/clientConverter";

//css
import "../assets/css/Login.css";
import logo from '../assets/images/LOGOPRO.png';
import {Apiurl} from '../services/apirest';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import  {Link} from 'react-router-dom';
import swal from "sweetalert";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Register extends Component{


    constructor(props){
        super(props);
    }


    state={
        form:{
            "name": "",
            "birthdate": "",
            "email": "",
            "password": "",
            "code": 2    

        },
        error:false,
        errorMsg:""
    }




    manejadorSubmit = e => {
        e.preventDefault();
    }


    manejadorChange = async e => {
            await this.setState({
                form:{
                    ...this.state.form,
                    [e.target.name]: e.target.value
                }
            })
         
    }


    

    post = () => {
        let url = ("https://siglo-xxi-users.azurewebsites.net/Users/v1/users");
        const body = createClient(this.state.form);
        axios
          .post(url, body)
          .then((response) => {
            
          swal(
            'Bienvenido',
            'Ya puedes iniciar sesión',
            'success' 
        )
        
            this.props.history.push("/");
          })
          .catch((error) => console.log(error.response.data));
      };



    
    render(){

        return(
               
        <React.Fragment>

                    <div id="fondito" className="wrapper fadeInDown">
                        
                    <div id="formContent">
                    <a id="volverlogin" style={{position:"relative"}} className="btn btn-link" href="/" > <FontAwesomeIcon  icon={faXmark}/> </a>
<br></br>
                    <p id="tituloregistro"><strong>Registrarte</strong></p>        
                        <p id="subtituloregistro" style={{marginTop:"-10px"}}>Es rápido y fácil.</p>

                        <div className="fadeIn first">
                    
<hr></hr>
                   

                 <div className="row">
                      <div className="col-bg-8">
                     <div className="col-bg-6">
                         <input className="form-control" name="email" placeholder="Ingresa tu correo electrónico" type="email" id="correito" 
                         onChange={this.manejadorChange}
                
                         
                         />
                       </div>
                </div>
                 </div>
                 <br/>


                        <div className="row">
                      <div className="col-bg-8">
                     <div className="col-bg-6">
                         <input className="form-control" name="name" placeholder="Ingresa tu nombre" type="text"  maxLength={20}
                         onChange={this.manejadorChange}
                         
                         />
                       </div>
                </div>
                 </div>
                 <br/>



                 <div className="row">
                      <div className="col-bg-8">
                     <label className="col-md-8 control-label">Fecha&nbsp;de&nbsp;nacimiento</label>
                     <div className="col-bg-6">
                         <input className="form-control" name="birthdate"  type="date" id="correito"
                         onChange={this.manejadorChange}
                         
                         />
                       </div>
                </div>
                 </div>
                 <br/>

                 <div className="row">
                      <div className="col-bg-8">
                     <div className="col-bg-6">
                         <input className="form-control" name="password" placeholder="Crea tu contraseña" type="password"  maxLength={50}
                         onChange={this.manejadorChange}
                         
                         />
                       </div>
                </div>
                 </div>
                 <br/>


          



                 <input id="iniciarsesion1" type="submit" className="fadeIn fourth" value="Registrarte"    onClick={() => this.post()}  />



                        </div>

                      

                    </div>
                    </div>

                   
        </React.Fragment>
        
               
        );
    }

}


export default Register;