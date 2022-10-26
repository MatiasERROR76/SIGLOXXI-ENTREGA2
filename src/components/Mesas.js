import React, {Component} from "react";
import { ApiMesas } from "../services/apirest";
import axios from 'axios';
import HeaderMesas from "../template/HeaderMesas";


 
class Mesas extends Component{

    state={
        tables:[]
    } ;


    clickMesas(id){
        this.props.history.push("/editarmesa/"+ id);
    }


    
    componentDidMount(){
            let url = ApiMesas;
            axios.get(url)
            .then(response =>{
                this.setState({
                    tables : response.data.tables
                })
                
            })
    }

    render(){
        
        return(
               
            <React.Fragment>

                <HeaderMesas></HeaderMesas>
                <div className="container">
            <br></br>

                <table id="customers" className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Número de mesa</th>
                        <th scope="col">Estado de mesa</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody> 
                        {this.state.tables.map((value, index) => {
                           return (
                            <tr key={index} onClick={ () => this.clickMesas(value.id)  }  >
                            <td>{value.number}</td>
                            <td>{value.status.name}</td>

                            <td><button id="btn-white">Editar</button></td>
                            </tr>
                            )
                        })}
                         
                 
                    </tbody>
                    </table>
                    <div>
                        <a className="btn btn-success" href="/IngresarMesa" role="button" style={{marginRight:"10px", float:"right"}}>
                        Ingresar Mesa
                            </a>   
                     </div>
                </div>

                    
            </React.Fragment>
          
        );
    }

}


export default Mesas;