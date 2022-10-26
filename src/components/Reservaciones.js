import React, {Component} from "react";
import HeaderReservas from "../template/HeaderReservas";
import { ApiurlUsers, ApiDeleteReserva } from "../services/apirest";
import axios from 'axios';
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRectangleXmark} from '@fortawesome/free-solid-svg-icons';


class Reservaciones extends Component{

    state={
        reservations: [],
    };

    clickReservation(id){
        this.props.history.push("/reservaciones/");

    }
    

    
    componentDidMount(){
        var email = localStorage.getItem('email')
             let url = ApiurlUsers  + email+  ("/reservations");
            axios.get(url)
            .then(response =>{
                this.setState({
                    reservations : response.data.reservations,
                })
            })
    }

 
   

    delete = (id) => {

        let url = ApiDeleteReserva + id
    
        swal({
          title: "¿Estás seguro?",
          text: "Cancelarás la reserva agendada.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      })
          .then((willDelete) => {
              if (willDelete) {
        axios.delete(url).then((response) => {
          swal(
            'Reserva cancelada',
            'La reserva ha sido cancelada exitosamente.',
            'success' 
        )
            const newReservations = this.state.reservations.filter(reservation => reservation.id !== id)
            this.setState({reservations: newReservations})
          // this.props.history.push("/reservaciones/");
        });
      }
    });
      };



    render(){
        
        return(
              
            <React.Fragment>        
                <HeaderReservas></HeaderReservas>
                <br></br>
                <div className="container">                   

                <table id="customers" className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Número&nbsp;de&nbsp;reserva</th>
                        <th scope="col">Nombre </th>
                        <th scope="col">Número de personas</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Hora</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody> 
                        {this.state.reservations.map((value, index) => {
                           return (
                            <tr key={index} onClick={ () => this.clickReservation(value.id)  }   >
                                
                            <td>{value.id}</td>
                            <td>{value.user.name}</td>
                            <td>{value.number_people}</td>
                            <td>{value.date.name}</td>
                            <td>{value.hour.name}</td>
                           
                            <td>                              
                           
                                <button 
                            className="btn btn-danger" 
                              onClick={() => this.delete(value.id)}
                              
                             >
                             <FontAwesomeIcon icon={faRectangleXmark}/>Cancelar 
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
                         href="/ingresarReserva"
                         role="button"
                          style={{marginRight:"10px", float:"right"}}>
                            Ingresar reserva
                            </a>   
                     </div>
                </div>

                    
            </React.Fragment>
          
        );
    }

}


export default Reservaciones;