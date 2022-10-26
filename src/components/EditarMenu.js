import React, {Component} from "react";
import {ApiMenus,ApiCategory} from '../services/apirest';
import axios from 'axios';
import { createMenu } from "../converters/menuConverter";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'




class EditarMenu extends Component{

    state = {
        form:{
        
            "name": "",
            "description": "",
            "amount": "",
            "image": "",
            "is_available": "",
            "preparation_time": "",
            "code": ""
                                   
        },
        error:false,
        errorMsg:"",
        categories:[]

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
    
  
      
  patch = () => {
    let idMenu = this.props.match.params.id;
    let url = ApiMenus + idMenu;
    console.log(this.state);
    const body = createMenu(this.state.form);
    axios
      .patch(url, body)
      .then((response) => {
        swal(
          'Menú modificado',
          'Menú modificado con éxito.',
          'success' 
      )
        console.log(response.data);
        this.props.history.push("/menus");
      })
      .catch((error) => console.log(error.response.data));
  };









      delete = () => {
        let menuId = this.props.match.params.id;
        let url = ApiMenus + menuId;
        let datos = {
          menuId: menuId,
        };
        swal({
          title: "¿Estás seguro?",
          text: "Eliminarás el menú seleccionado.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      })
          .then((willDelete) => {
              if (willDelete) {
        axios.delete(url, { headers: datos }).then((response) => {
          swal(
            'Menú eliminado',
            'El menú ha sido eliminado exitosamente.',
            'success' 
        )
          this.props.history.push("/menus");
        });
      } 
    });
      };




  componentDidMount(){


    let idMenu = this.props.match.params.id;  
    let url = ApiMenus + idMenu; 
    axios.get(url)
    .then( response => {
       this.setState({
            form:{
               
                name: response.data.menu.name,
                description:  response.data.menu.description,
                amount:  response.data.menu.price.amount,
                image: response.data.menu?.image?? "",
                is_available:  response.data.menu?.is_available?? "",
                preparation_time: response.data.menu.preparation_time,
                code: response.data.menu.category.code

              },
            
       });
       
    });
     

    axios
      .get(ApiCategory)
      .then((response) => this.setState({ categories: response.data.categories }));
    
}


xMethod(e) {
  const re = /[a-zA-Z" "ñÑ0123456789]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

description(e) {
  const re = /[a-zA-Z" "ñÑ0123456789.,¡!]+/g;
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



    render(){

        const form = this.state.form;

        return(
               
         <React.Fragment>

         <br/>

         <div className="container">
         <a id="volver" className="btn btn-dark" href="/menus" > <FontAwesomeIcon  icon={faArrowAltCircleLeft}/> Volver</a>
<hr></hr>
                    <h3><strong>Editar Menú</strong></h3>
         </div>
         <br/>
         <div className="container">
         <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
       
  


         <div className="row">
              <div className="col-sm-4">
                <label className="col-md-2 control-label">Categoría</label>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    name="code"
                    value={this.state.form.code}
                    onChange={this.manejadorChange}
                  >
                    {this.state.categories.map((category) => {
                      return <option key={category.code} value={category.code}>{category.name}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>

            <br />      
            




                <div className="row">
                     <div className="col-sm-8">
                    <label className="col-md-2 control-label">Nombre&nbsp;del&nbsp;menú</label>
                    <div className="col-md-6">
                        <input className="form-control" name="name" placeholder="Nombre del menú" type="text" 
                      value={form.name || ''}
                      onChange={this.manejadorChange}
                      onKeyPress={(e) => this.xMethod(e)}
                      maxLength={30}
                        />
                      </div>
               </div>
                </div>
                <br/>


                <div className="row">
                      <div className="col-sm-8">
                     <label className="col-md-2 control-label">Tiempo&nbsp;de&nbsp;preparación&nbsp;(minutos)</label>
                     <div className="col-md-6">
                         <input className="form-control" name="preparation_time" placeholder="Tiempo de preparación" type="text" 
                         value={form.preparation_time  || ''}
                         onChange={this.manejadorChange}
                         maxLength={2}
                         onKeyPress={(e) => this.numeros(e)}

                         />
                       </div>
                </div>
                 </div>
                 <br/>



                <div className="row">
                     <div className="col-sm-8">
                    <label className="col-md-2 control-label">Precio&nbsp;del&nbsp;menú</label>
                    <div className="col-md-6">
                        <input className="form-control" name="amount" placeholder="Precio del menú" type="text" 
                     value={form.amount || ''}
                     onChange={this.manejadorChange}
                     onKeyPress={(e) => this.numeros(e)}
                     maxLength={6}
                        />
                      </div>
               </div>
                </div>
                <br/>





                <div className="row">
                     <div className="col-sm-8">
                    <label className="col-md-2 control-label">Descripción&nbsp;del&nbsp;menú</label>
                    <div className="col-md-8">
                        <textarea className="form-control" name="description" placeholder="Descripción del menú (máximo 100 caracteres)." type="text" 
                      value={form.description || ''}
                      onChange={this.manejadorChange}
                      maxLength={100}
                      onKeyPress={(e) => this.description(e)}

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


export default EditarMenu;