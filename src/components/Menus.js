import React, {Component} from "react";
import HeaderMenu from "../template/HeaderMenu";
import { ApiMenus } from "../services/apirest";
import axios from 'axios';
import ImageDefault from '../assets/images/defaultimage.png';
import "../assets/css/Login.css";

class Menus extends Component{

    state={
        menu:[]
    } ;


    clickMenus(id){
        this.props.history.push("/editarmenu/"+ id);
    }


    
    componentDidMount(){
            let url = ApiMenus;
            axios.get(url)
            .then(response =>{
                this.setState({
                    menu : response.data.menu
                })
                
            })
    }

    render(){
        
        return(
               
            <React.Fragment>

                <HeaderMenu></HeaderMenu>
                <div className="container">
            <br></br>

                <table id="customers">
                <thead >
                        <tr>
                 
                        <th scope="col">Categoría&nbsp;del&nbsp;menú</th>
                        <th scope="col">Nombre&nbsp;del&nbsp;menú</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Precio</th>
                        <th scope="col">&nbsp;&nbsp;Imagen</th>
                        <th scope="col">Tiempo&nbsp;de&nbsp;preparación</th>

                        <th scope="col"></th>
             
                        </tr>
                    </thead>
                    <tbody> 
                        {this.state.menu.map((value, index) => {
                           return (
                            <tr key={index} onClick={ () => this.clickMenus(value.id)  }  >
                            
                     
                            <td>{value.category.name}</td>
                            <td>{value.name}</td>
                            <td><div style={{width:"80px", overflow: "hidden"}} >{value.description}</div></td>
                            <td>{'$'+value.price.amount}</td>
                            <td> <img  id="Imagefood" src={value.image ? value.image : ImageDefault}  style={{ width: "150px", height: "100px" }}   /> </td>
                            <td>{value.preparation_time+" "+"minutos"}</td>
                           
                            <td><button id="btn-white" >Editar</button></td>
                            </tr>
                            )
                        })}
                         
                 
                    </tbody>
                    </table>
                    <br/>
                    <div>
                        <a className="btn btn-success" href="/IngresarMenu" role="button" style={{marginRight:"10px", float:"right"}}>
                        Ingresar Menú
                            </a>   
                     </div>
                </div>

                    
            </React.Fragment>
          
        );
    }

}


export default Menus;