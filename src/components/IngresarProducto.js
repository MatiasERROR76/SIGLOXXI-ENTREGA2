import React, {Component} from "react";
import axios from "axios";
import { createProduct } from "../converters/productConverter";
import { Apiproduct1 } from "../services/apirest";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'


class IngresarProducto extends Component{

  state = {
    form:{
      
            "name": "",
            "code": "",
            "stock": "",
            "minimum_stock": ""
                                
    },
    error:false,
    errorMsg:"",
    measures:[]
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
        let url = Apiproduct1;
        console.log(this.state);
        const body = createProduct(this.state.form);
        axios
          .post(url, body)
          .then((response) => {
            swal(
              'Producto creado',
              'Producto registrado con éxito.',
              'success' 
          )
            console.log(response.data);
            this.props.history.push("/productos");
          })
          .catch( error => {
            console.log(error);
            this.setState({
                error : true,
                errorMsg : error.response.data.message
            });
            console.log(this.state.form)
            console.log('hola', body)

        })
      };
      
      firstMethod(e) {
        const re = /[0123456789kK]+/g;
        if (!re.test(e.key)) {
          e.preventDefault();
        }
      }

      numeros(e) {
        const re = /[0123456789]+/g;
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


      componentDidMount(){
        axios
        .get("https://siglo-xxi-products.azurewebsites.net/Products/v1/measures")
        .then((response) =>
          this.setState({
            form: { code: response.data.measures[0].code },
            measures: response.data.measures
          })
        )
        axios
        .get("https://siglo-xxi-tables.azurewebsites.net/Tables/v1/tables/status")
        .then((response) => this.setState({ status: response.data.status }))
      }


    render(){   
      const form = this.state.form;
        return(

          
          <React.Fragment>

          <br/>
          
          <div className="container">
          <a id="volver" className="btn btn-dark" href="/productos" > <FontAwesomeIcon  icon={faArrowAltCircleLeft}/> Volver</a>
          <hr></hr>
                     <h3><strong>Ingresar Producto </strong></h3>
          </div>
          <br/>
          <div className="container">
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>


          <div className="row">
              <div className="col-sm-4">
                <label className="col-md-2 control-label">Medida</label>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    aria-label="default select example" 
                    name="code"
                    onChange={this.manejadorChange}
                  >
                    {this.state.measures.map((measures) => {
                      return <option key={measures.code} value={measures.code}>{measures.name}</option>
                    })}
                  </select>
                </div>
              </div>
              </div>

            <br/>

     
          <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Nombre&nbsp;del&nbsp;producto</label>
                     <div className="col-md-6">
                         <input className="form-control" name="name" placeholder="Nombre del producto" type="text" 
                         onChange={this.manejadorChange}
                         onKeyPress={(e) => this.fourthMethod(e)}
                         maxLength={50}
                         />
                       </div>
                </div>
                 </div>

                 <br/>

                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Cantidad&nbsp;mínima</label>
                     <div className="col-md-6">
                         <input className="form-control" name="minimum_stock" placeholder="Cantidad mínima" type="text" 
                         onChange={this.manejadorChange}
                         onKeyPress={(e) => this.numeros(e)}
                         maxLength={3}
                         />
                       </div>
                </div>
                 </div>
                 <br/>
   
                 <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Cantidad&nbsp;disponible</label>
                     <div className="col-md-6">
                         <input className="form-control" name="stock" placeholder="Cantidad disponible" type="text" 
                         onChange={this.manejadorChange}
                         onKeyPress={(e) => this.numeros(e)}
                         maxLength={3}
                         />
                       </div>
                </div>
                 </div>
                 <br/>

     

                 <br/>

               <button 
               type="submit"
                className="btn btn-primary"
                 style={{ marginRight: "10px" }}
                 onClick={() => this.post()}
                 >
                   Agregar producto
                 </button>

           </form>
           </div>
         </React.Fragment>
        
               
        );
    }

}


export default IngresarProducto;