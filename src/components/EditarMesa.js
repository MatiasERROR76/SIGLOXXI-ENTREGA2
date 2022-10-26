import React, {Component} from "react";
import {ApiMesas} from '../services/apirest';
import axios from 'axios';
import { createMesa } from "../converters/mesaConverter";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'



class EditarMesa extends Component{

    state = {
        form:{
                "id": "",
                "number": "",
                "code":"",
                "name":""
                                    
        },
        error:false,
        errorMsg:"",
        status:[]
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
    
  
      delete = () => {
        let mesaId = this.props.match.params.id;
        let url = ApiMesas + mesaId;
        let datos = {
            mesaId: mesaId,
        };
        swal({
          title: "¿Estás seguro?",
          text: "Eliminarás la mesa seleccionada.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      })
          .then((willDelete) => {
              if (willDelete) {
        axios.delete(url, { headers: datos }).then((response) => {
          swal(
            'Mesa eliminada',
            'La mesa ha sido eliminada exitosamente.',
            'success' 
        )
          this.props.history.push("/mesas");
        });
      } 
    });
      };
  


      patch = () => {
        let mesaId = this.props.match.params.id;
        let url = ApiMesas + mesaId;
        console.log(this.state);
        const body = createMesa(this.state.form);
        axios
          .patch(url, body)
          .then((response) => {
            swal(
              'Mesa modificada',
              'Mesa modificada con éxito.', 
              'success' 
          )
            console.log(response.data);
            this.props.history.push("/mesas");
          })
          .catch((error) => console.log(error.response.data));
      };
    



  componentDidMount(){

    let mesaId = this.props.match.params.id;  
    let url = ApiMesas + mesaId; 
    axios.get(url)
    .then( response => {
       this.setState({
        
            form:{
                id: mesaId,
                number: response.data.table.number,
                code:  response.data.table.status.code,
                name:  response.data.table.status.name  

            },
            
       });
       
    });
    axios
    .get("https://siglo-xxi-tables.azurewebsites.net/Tables/v1/tables/status")
    .then((response) => this.setState({ status: response.data.status }))
    
}



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
         <a id="volver" className="btn btn-dark" href="/mesas" > <FontAwesomeIcon  icon={faArrowAltCircleLeft}/> Volver</a>
<hr></hr>
                    <h3><strong>Editar Mesa</strong> </h3>
         </div>
         <br/>
         <div className="container">
         <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
       






         <div className="row">
                     <div className="col-sm-8">
                    <label className="col-md-2 control-label">Número&nbsp;de&nbsp;mesa</label>
                    <div className="col-md-6">
                        <input className="form-control" name="number" placeholder="Número de mesa" type="text"   
                        value={form.number || ''}
                        onChange={this.manejadorChange}
                        maxLength={2}
                        onKeyPress={(e) => this.numeros(e)}

                        />
                      </div>
               </div>
                </div>
                <br/>

                  

  <div className="row">
              <div className="col-sm-4">
                <label className="col-md-2 control-label">Estado</label>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    aria-label="default select example" 
                    name="code"
                    value={form.code}
                    onChange={this.manejadorChange}
                  >
                    {this.state.status.map((status) => {
                      return <option key={status.code} value={status.code}>{status.name}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>

                  <br />

          <br/>

              <button 
              type="submit"
               className="btn btn-primary"
                style={{ marginRight: "10px" }}
                onClick={() => this.patch()}
                >
                     <FontAwesomeIcon icon={faEdit}/>
                     &nbsp;Editar
                </button>

              <button 
                type="submit"
                className="btn btn-danger"
                style={{ marginRight: "10px" }} 
                onClick={() => this.delete()}
                href="/mesas"
                >
                   <FontAwesomeIcon icon={faTrash}/>
                   &nbsp; Eliminar
                  </button>
              
          
          </form>
          </div>
        </React.Fragment>
        
               
        );
    }

}


export default EditarMesa;