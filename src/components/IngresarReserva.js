import React, {Component} from "react";
import axios from "axios";
import { createReservation } from "../converters/reservationConverter";
import { ApiurlUsers } from "../services/apirest";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'



class IngresarReserva extends Component{

  state = {
    form:{
          "number_people": "",
          "code": ""
    },
    error:false,
    errorMsg:"",
    dates:[],
    hours:[]
}

  
post = () => {
  var email = localStorage.getItem('email')
  let url = ApiurlUsers  + email+  ("/reservations");
  const body = createReservation(this.state.form);
  axios
    .post(url, body)
    .then((response) => {
      swal(
        'Reserva agendada',
        'Reserva agendada con éxito.',
        'success' 
    )
      console.log(response.data);
      this.props.history.push("/reservaciones");
    })
    .catch( error => {
      console.log(error);
      this.setState({
          error : true,
          errorMsg : error.response.data.message
      });
      

  })
};

loadHours = (dateId) =>{
  if (!dateId) return
  const url = `https://siglo-xxi-reservations.azurewebsites.net/Reservations/v1/reservations/dates/${dateId}`
  axios.get(url)
    .then((response) => this.setState({hours: response.data.hours}))
    .catch(error => console.log(error))
}

componentDidMount(){
  axios
  .get("https://siglo-xxi-reservations.azurewebsites.net/Reservations/v1/reservations/dates")
  .then((response) =>
    this.setState({
      form: { code: response.data.dates[0].code },
      dates: response.data.dates
    })); 

}

    manejadorChange = async (e) => {
        await this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
          }
        });
      };

      manejadorSubmit = (e) => {
        e.preventDefault();
      };

      numeros(e) {
        const re = /[0123456789]+/g;
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
          <a id="volver" className="btn btn-dark" href="/reservaciones" > <FontAwesomeIcon  icon={faArrowAltCircleLeft}/> Volver</a>
          <hr></hr>
                     <h3><strong>Ingresar Reserva</strong> </h3>
          </div>
          <br/>
          <div className="container">
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>

      <div className="row">
              <div className="col-sm-6">
                <label className="col-md-2 control-label">Fecha&nbsp;de&nbsp;reserva</label>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    aria-label="default select example" 
                    name="code"
                    value={this.code}
                    onChange={e => this.loadHours(e.target.value)}
                  >
                    <option selected>Seleccionar Fecha</option>   
         
                    {this.state.dates.map((date) => {
                      return <option key={date.code} value={date.code}>{date.name}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>


<br></br>

            <div className="row">
              <div className="col-sm-6">
                <label className="col-md-2 control-label">Hora&nbsp;de&nbsp;reserva</label>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    aria-label="default select example" 
                    name="code"
                    value={this.code}
                    onChange={this.manejadorChange}
                  >
                    <option selected>Seleccionar Hora</option>   
                    {this.state.hours.map((hour) => {
                      return <option key={hour.code} value={hour.code}>{hour.name}</option>
                    })}
                   
                  </select>
                </div>
              </div>
            </div>




            <br></br>

            <div className="row">
                     <div className="col-sm-8">
                    <label className="col-md-2 control-label">Número&nbsp;de&nbsp;personas</label>
                    <div className="col-md-6">
                        <input className="form-control" name="number_people" placeholder="Número de personas" type="text" 
                        value={form.number_people  || ''}
                        onChange={this.manejadorChange}
                      
                        maxLength={2}
                        onKeyPress={(e) => this.numeros(e)}
                     

                        />
                      </div>
               </div>
                </div>
                <div className="row">
                     <div className="col-sm-6">
                {this.state.error === true &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                        </div>

                    }
              </div>
              </div>

<br></br>
               <button 
               type="submit"
                className="btn btn-primary"
                 onClick={() => this.post()}
                 >
                   Agendar reserva
                 </button>

           </form>


           </div>
         </React.Fragment>
        
               
        );
    }

}


export default IngresarReserva;