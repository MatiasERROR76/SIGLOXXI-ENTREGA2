import React, {Component} from "react";
//css
import "../assets/css/Login.css";
import logo from '../assets/images/LOGOPRO.png';
import {Apiurl} from '../services/apirest';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import  {Link} from 'react-router-dom';

class Login extends Component{


    constructor(props){
        super(props);
    }


    state={
        form:{
            "username": "", 
            "password": ""
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


    manejadorBoton=()=>{
        //roles setearlos en los estados un estado rol quizas ir validando si ese rol puede entrar a esa pagina
        let url = Apiurl;
        axios.post(url,this.state.form)
        .then( response => {{
                localStorage.setItem("token", response.data.token); 
                localStorage.setItem("email", this.state.form.username); 
                localStorage.setItem("name", response.data.user.name); 
                
                this.props.history.push("/main");

            }
        }).catch( error => {
            console.log(error);
            this.setState({
                error : true,
                errorMsg : error.response.data.message
            });
            

        })
    }



    
    render(){



        
        return(
               
        <React.Fragment>

                    <div id="fondito" className="wrapper fadeInDown">
                    <div id="formContent">
                    
                        <div className="fadeIn first">
                        <img src={logo} width="120px" alt="logotipo"    style={{ marginTop: "10px" }} />
                        </div>

                       <form onSubmit={this.manejadorSubmit}  >
<br></br>
                    
                       
                     
                      <p>Correo electrónico  <input
                       type="email" id="correito" className="fadeIn second" name="username" placeholder="Ingresa tu correo electrónico"  maxLength={50} onChange={this.manejadorChange}
                       /> 
                        </p>
                       <p >Contraseña<input type="password"  className="fadeIn third" name="password" placeholder="Ingresa tu contraseña"  maxLength={30} onChange={this.manejadorChange}/></p>
                       <input id="iniciarsesion" type="submit" className="fadeIn fourth" value="Iniciar Sesión" onClick={this.manejadorBoton}/>
                  
                        <h6 >¿Aún no tienes cuenta?</h6>
                        <p><a href="/register">Regístrate aquí</a></p>

                        </form>
                       
                          
                  
                    {this.state.error === true &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                        </div>

                    }

                    </div>
                    </div>

                   
        </React.Fragment>
        
               
        );
    }

}


export default Login;