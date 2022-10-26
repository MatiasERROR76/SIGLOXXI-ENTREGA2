import React, {Component} from "react";
import Header from "../template/Header";
import { ApiurlUsers } from "../services/apirest";
import axios from 'axios';


class Dashboard extends Component{

    state={
        users:[]
    } ;


    clickUsers(email){
        this.props.history.push("/editar/"+ email);
    }


    
    componentDidMount(){
            let url = ApiurlUsers;
            axios.get(url)
            .then(response =>{
                this.setState({
                    users : response.data.users
                })
                
            })
    }

    render(){
        
        return(
               
            <React.Fragment>

              
                <Header></Header>
<br></br>
                <div className="container">
                    

                <table id="customers" className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Nombre del usuario</th>
                        <th scope="col">Correo electrónico</th>
                        <th scope="col">Rol</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody> 
                        {this.state.users.map((value, index) => {
                           return (
                            <tr key={index} onClick={ () => this.clickUsers(value.contact.email)  }  >
                            <td>{value.name+" "+value.last_name  }</td>
                            <td>{value.contact.email}</td>
                            <td>{value.role.name}</td>
                           
                            <td>
                                <button >
                                Editar
                                </button>
                                </td>
                            </tr>
                            )
                        })}
                         
                 
                    </tbody>
                    </table>
                    <div>
                        <a 
                        className="btn btn-success" 
                         href="/IngresarUsuario"
                         role="button"
                          style={{marginRight:"10px", float:"right"}}>
                            Ingresar usuario
                            </a>   
                     </div>
                </div>

                    
            </React.Fragment>
          
        );
    }

}


export default Dashboard;