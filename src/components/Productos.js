import React, {Component} from "react";
import HeaderProducts from "../template/HeaderProducts";
import { Apiproduct } from "../services/apirest";
import axios from 'axios';

 
class  Productos extends Component{

    state={
        products:[]
    } ;


    clickProducts(id){
        this.props.history.push("/editarproducto/"+ id);
    }

    
    componentDidMount(){
            let url = Apiproduct;
            axios.get(url)
            .then(response =>{
                this.setState({
                    products : response.data.products
                })
                
            })
    }

    render(){
        
        return(
               
            <React.Fragment>

                <HeaderProducts></HeaderProducts>
                <div className="container">
            <br></br>

                <table id="customers" className="table table-striped">
                    <thead>
                        <tr>
                        
                        <th scope="col">Nombre&nbsp;del&nbsp;producto</th>
                        <th scope="col">Cantidad&nbsp;disponible</th>
                        <th scope="col">Cantidad&nbsp;mínima</th>
                        <th scope="col">Medida</th>

                        <th scope="col"></th>
             
                        </tr>
                    </thead>
                    <tbody> 
                        {this.state.products.map((value, index) => {
                           return (
                            <tr key={index} onClick={ () => this.clickProducts(value.id)  }  >
                            <td>{value.name}</td>
                            <td>{value.stock}</td>
                            <td>{value.minimum_stock}</td>
                            <td>{value.measure.name}</td>

                            <td><button id="btn-white">Editar</button></td>
                            </tr>
                            )
                        })}
                         
                 
                    </tbody>
                    </table>
                    <div>
                        <a className="btn btn-success" href="/IngresarProducto" role="button" style={{marginRight:"10px", float:"right"}}>
                        Ingresar Producto
                            </a>   
                     </div>
                </div>

                    
            </React.Fragment>
          
        );
    }

}


export default Productos;