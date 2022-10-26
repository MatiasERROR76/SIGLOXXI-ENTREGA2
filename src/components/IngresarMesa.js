import React, {Component} from "react";
import axios from "axios";
import { createMesa } from "../converters/mesaConverter";
import { ApiMesas1 } from "../services/apirest";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'

class IngresarMesa extends Component{


  state = {
    form:{
          
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



      post = () => {
        let url = ApiMesas1;
        console.log(this.state);
        const body = createMesa(this.state.form);
        axios
          .post(url, body)
          .then((response) => {
            swal(
              'Mesa creada',
              'Mesa registrada con éxito.',
              'success' 
          )
            console.log(response.data);
            this.props.history.push("/mesas");
          })
          .catch((error) => console.log(error.response.data));
      };
    
  



      
      componentDidMount(){
        axios
        .get("https://siglo-xxi-tables.azurewebsites.net/Tables/v1/tables/status")
        .then((response) =>
          this.setState({
            form: { code: response.data.status[0].code },
            status: response.data.status
          })); 
     
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
                     <h3><strong>Ingresar Mesa</strong> </h3>
          </div>
          <br/>
          <div className="container">
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
        
         
 
                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Número&nbsp;de&nbsp;mesa</label>
                     <div className="col-md-6">
                         <input className="form-control" name="number" placeholder="Número de mesa" type="text" 
                         value={form.number  || ''}
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
                <label className="col-md-2 control-label">Estado&nbsp;de&nbsp;mesa</label>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    aria-label="default select example" 
                    name="code"
                    value={this.code}
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
                 onClick={() => this.post()}
                 >
                   Agregar Mesa
                 </button>
 
             
               
           
           </form>
           </div>
         </React.Fragment>
        
               
        );
    }

}


export default IngresarMesa;