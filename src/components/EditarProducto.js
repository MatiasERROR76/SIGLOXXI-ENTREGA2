import React, {Component} from "react";
import {Apiproduct} from '../services/apirest';
import axios from 'axios';
import { createProduct } from "../converters/productConverter";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'


class EditarProducto extends Component{

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
    
  
      delete = () => {
        let productId = this.props.match.params.id;
        let url = Apiproduct + productId;
        let datos = {
          productId: productId,
        };
        swal({
          title: "¿Estás seguro?",
          text: "Eliminarás el producto seleccionado.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      })
          .then((willDelete) => {
              if (willDelete) {
        axios.delete(url, { headers: datos }).then((response) => {
          swal(
            'Producto eliminado',
            'El producto ha sido eliminado exitosamente.',
            'success' 
        )
          this.props.history.push("/productos");
        });
      }
      
    
    });
      };
  


      patch = () => {
        let idProduct = this.props.match.params.id;
        let url = Apiproduct + idProduct;
        console.log(this.state);
        const body = createProduct(this.state.form);
        axios
          .patch(url, body)
          .then((response) => {
            swal(
              'Producto modificado',
              'Producto modificado con éxito.',
              'success' 
          )
            console.log(response.data);
            this.props.history.push("/productos");
          })
          .catch((error) => console.log(error.response.data));
      };
    



  componentDidMount(){

    let idProduct = this.props.match.params.id;  
    let url = Apiproduct + idProduct; 
    axios.get(url)
    .then( response => {


       this.setState({
        
            form:{
                name:  response.data.product.name,
                code: response.data.product.measure.code,
                stock:  response.data.product.stock,
                minimum_stock: response.data.product.minimum_stock 

            },
            
       });
       
    });
    axios
    .get("https://siglo-xxi-products.azurewebsites.net/Products/v1/measures")
    .then((response) => this.setState({ measures: response.data.measures }))
    
     
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




    render(){

        
        const form = this.state.form;
    
        return(
               
         <React.Fragment>

         <br/>
         
         <div className="container">
         <a id="volver" className="btn btn-dark" href="/productos" > <FontAwesomeIcon  icon={faArrowAltCircleLeft}/> Volver</a>
<hr></hr>
                    <h3><strong>Editar Producto</strong> </h3>
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
                    value={form.code}
                    onChange={this.manejadorChange}
                  >
                    {this.state.measures.map((measure) => {
                      return <option key={measure.code} value={measure.code}>{measure.name}</option>
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
                        value={form.name  || ''}
                        onChange={this.manejadorChange}
                        maxLength={50}
                        onKeyPress={(e) => this.fourthMethod(e)}

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
                        value={form.minimum_stock  || ''}
                        onChange={this.manejadorChange}
                        maxLength={3}
                        onKeyPress={(e) => this.numeros(e)}
                        />
                      </div>
               </div>
                </div>
                <br/>


          <br/>


          <div className="row">
                     <div className="col-sm-8">
                    <label className="col-md-2 control-label">Cantidad&nbsp;disponible</label>
                    <div className="col-md-6">
                        <input className="form-control" name="stock" placeholder="Cantidad disponible" type="text" 
                        value={form.stock  || ''}
                        onChange={this.manejadorChange}
                        maxLength={3}
                        onKeyPress={(e) => this.numeros(e)}
                        />
                      </div>
               </div>
                </div>
                <br/>

                
                

<div className="container">
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
                href="/productos"
                >
                 <FontAwesomeIcon icon={faTrash}/>
                   &nbsp; Eliminar
                  </button>
              
          </div>
          </form>
          </div>
        </React.Fragment>
        
               
        );
    }

}


export default EditarProducto;