import React, {Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faCheckToSlot, faBellConcierge} from '@fortawesome/free-solid-svg-icons';
import { ApiDePedidos } from "../services/apirest";
import axios from 'axios';
import io from 'socket.io-client'
import HeaderPedidos from "../template/HeaderPedidos";
const socket = io('https://siglo-xxi-orders.azurewebsites.net')



class Pedidos extends Component{
    
    state={
        order_details:[]
    } ;
    
    clickPedidos(id){
        // this.props.history.push("/pedidos/"+id);
    }
    
    componentDidMount(){
        let url = ApiDePedidos;
        axios.get(url)
        .then(response =>{
            this.setState({
                order_details : response.data.order_details
            })
            
        })
        socket.on('orderDetails', (data) => {
            const orders = this.state.order_details
            orders.unshift(data)
            this.setState({
                order_details: orders
            })
        })
    }

    tomarPedido(id) {

        let url = ("https://siglo-xxi-orders.azurewebsites.net/Orders/v1/details/"+ id + "/take-order");
        axios
          .put(url)
          .then((response) => {

          
          const newOrder_details = this.state.order_details.filter(order_details => order_details.id !== id)
          this.setState({order_details: newOrder_details})


          })
          .catch((error) => console.log(error.response.data));

    }

    entregarPedido(id) {

        let url = ("https://siglo-xxi-orders.azurewebsites.net/Orders/v1/details/"+ id + "/deliver");
        axios
          .put(url)
          .then((response) => {

          
          const newOrder_details = this.state.order_details.filter(order_details => order_details.id !== id)
          this.setState({order_details: newOrder_details})


          })
          .catch((error) => console.log(error.response.data));
      
    }



    render(){
        
        return(
               
            <React.Fragment>

                <HeaderPedidos></HeaderPedidos>
                <div className="container">
            <br></br>

                <table id="customers" className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Nombre de menú</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Número de orden</th>
                        <th scope="col">Número de mesa</th>
                        <th scope="col">Tomar</th>
                        <th scope="col">Entregar</th>

                        </tr>
                    </thead>
                    
                    <tbody> 
                        {this.state.order_details.map((value, index) => {
                           return (
                            <tr key={index}  >
                            <td>{value.menu.name}</td>
                            <td>{value.quantity}</td>
                            <td>{value.status.name}</td>
                            <td>{value.id}</td>
                            <td>{value.table.number}</td>
                            <td>
                    
                            <button 
               type="submit"
                className="btn btn-primary"
                 onClick={() => this.tomarPedido(value.id) }
                 >
                   <FontAwesomeIcon icon={faBellConcierge}/>

                   Tomar
                 </button>
                            
                            </td>
                            <td>

                            <button 
               type="submit"
                className="btn btn-success"
                 onClick={() => this.entregarPedido(value.id) }
                 > 
                   <FontAwesomeIcon icon={faCheckToSlot}/>
                   Entregar
                 </button>

                            </td>
                            </tr>
                            )
                        })}
                         
                 
                    </tbody>
                    </table>
                
                </div>

                    
            </React.Fragment>
          
        );
    }

}


export default Pedidos;