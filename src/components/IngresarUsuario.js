import React, {Component} from "react";
import axios from "axios";
import { createUser } from "../converters/userConverter";
import { ApiurlUsers1 } from "../services/apirest";
import { ApiurlRoles } from "../services/apirest";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'


class IngresarUsuario extends Component{



  state = {
    form:{
          
            "number": "",
            "validator": "",
            "name": "",
            "last_name": "",
            "second_last_name": "",
            "birthdate": "",
            "email": "",
            "password": "",
            
                                
    },
    error:false,
    errorMsg:"",
    roles:[]
   
}




    manejadorChange = async (e) => {
        await this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
          },
        });
      };


      manejadorSubmit = (e) => {
        e.preventDefault();
      };

componentDidMount(){
  axios
  .get('https://siglo-xxi-users.azurewebsites.net/Users/v1/roles')
  .then((response) =>
    this.setState({
      form: { code: response.data.roles[0].code },
      roles: response.data.roles
    })
  )
}

      post = () => {
        let url = ApiurlUsers1;
        const body = createUser(this.state.form);
        axios
          .post(url, body)
          .then((response) => {
            
          swal(
            'Usuario creado',
            'Usuario registrado con éxito.',
            'success' 
        )
        
            console.log(response.data);
            this.props.history.push("/dashboard");
          })
          .catch((error) => console.log(error.response.data));
      };
      
      firstMethod(e) {
        const re = /[0123456789kK]+/g;
        if (!re.test(e.key)) {
          e.preventDefault();
        }
      }

      fourthMethod(e) {
        const re = /[a-zA-Z" "ñÑ]+/g;
        if (!re.test(e.key)) {
          e.preventDefault();
        }
      }

    render(){   
      const form = this.state.form;

      
        return(
               
          <React.Fragment>

          <br/>
          
          <div className="container">
         <a id="volver" className="btn btn-dark" href="/dashboard" > <FontAwesomeIcon  icon={faArrowAltCircleLeft}/> Volver</a>
<hr></hr>
                     <h3><strong>Ingresar usuario</strong>  </h3>
          </div>
          <br/>
          <div className="container">
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>

                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Rut</label>
                     <div className="col-md-6">
                         <input className="form-control" name="number" placeholder="Rut" type="text" maxLength={8} 
                         onChange={this.manejadorChange}
                         onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                         />
                       </div>
                </div>
                 </div>
                 <br/>
                 <br/>
                 

                 
                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Digito&nbsp;verificador</label>
                     <div className="col-md-6">
                         <input className="form-control" name="validator" placeholder="Digito verificador" type="text"  maxLength={1}
                         onChange={this.manejadorChange}
                         onKeyPress={(e) => this.firstMethod(e)}

                         />
                       </div>
                </div>
                 </div>
                 <br/>
                 <br/>
            
                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Nombre</label>
                     <div className="col-md-6">
                         <input className="form-control" name="name" placeholder="Nombre" type="text"  maxLength={20}
                         onChange={this.manejadorChange}
                         onKeyPress={(e) => this.fourthMethod(e)}
                         
                         />
                       </div>
                </div>
                 </div>
                 <br/>
                 <br/>
 

                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Apellido&nbsp;paterno</label>
                     <div className="col-md-6">
                         <input className="form-control" name="last_name" placeholder="Apellido paterno" type="text" maxLength={20} 
                         onChange={this.manejadorChange}
                         onKeyPress={(e) => this.fourthMethod(e)}

                         />
                       </div>
                </div>
                 </div>
                 <br/>
                 <br/>
 
                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Apellido&nbsp;materno</label>
                     <div className="col-md-6">
                         <input className="form-control" name="second_last_name" placeholder="Apellido materno" type="text"  maxLength={20}
                         onChange={this.manejadorChange}
                         onKeyPress={(e) => this.fourthMethod(e)}

                         />
                       </div>
                </div>
                 </div>
                 <br/>
                 <br/>
 
            
                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Fecha&nbsp;de&nbsp;nacimiento</label>
                     <div className="col-md-6">
                         <input className="form-control" name="birthdate" placeholder="Fecha de nacimiento" type="date" 
                         onChange={this.manejadorChange}
                         
                         />
                       </div>
                </div>
                 </div>
                 <br/>
                 <br/>
 
            
                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Correo&nbsp;electrónico</label>
                     <div className="col-md-6">
                         <input className="form-control" name="email" placeholder="Correo electrónico" type="text" 
                         onChange={this.manejadorChange}
                         maxLength={40}
                         />
                       </div>
                </div>
                 </div>
                 <br/>
                 <br/>

                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Contraseña</label>
                     <div className="col-md-6">
                         <input className="form-control" name="password" placeholder="Contraseña" type="password" 
                         onChange={this.manejadorChange}
                         maxLength={40}
                         />
                       </div>
                </div>
                 </div>
                 <br/>
                 <br/>
 
                
                 <div className='row'>
              <div className='col-sm-4'>
                <label className='col-md-2 control-label'>Rol</label>
                <div className='col-md-6'>
                  <br/>
                  <select
                    className='form-select'
                    name='code'
                    onChange={this.manejadorChange}>
                    {this.state.roles.map((role) => {
                      return (
                        <option key={role.code} value={role.code}>
                          {role.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>

            <br />
            <br />      
            

               <button 
               type="submit"
                className="btn btn-primary"
                 style={{ marginRight: "10px" }}
                 onClick={() => this.post()}
                 >
                   Agregar usuario
                 </button>
  
           </form>
           </div>
         </React.Fragment>
        
               
        );
    }

}


export default IngresarUsuario;