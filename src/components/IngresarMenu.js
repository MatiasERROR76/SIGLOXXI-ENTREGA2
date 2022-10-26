import React, {Component} from "react";
import axios from "axios";
import { createMenu } from "../converters/menuConverter";
import { ApiMenus1 } from "../services/apirest";
import { ApiCategory } from "../services/apirest";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'



class IngresarMenu extends Component{



  state = {
    form:{
    "code": "",
    "name": "", 
    "description": "",
    "amount": "",
    "image": "",
    "prepartion_time": "",
    "is_available": true
                                
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



      post = () => {
        let url = ApiMenus1;
        console.log(this.state);
        const body = createMenu(this.state.form);
        axios
          .post(url, body)
          .then((response) => {
            swal(
              'Menú creado',
              'Menú registrado con éxito.',
              'success' 
          )
            console.log(response.data);
            this.props.history.push("/menus");
          })
          .catch((error) => console.log(error.response.data));
      };
    
      



      componentDidMount(){
        axios
        .get(ApiCategory)
        .then((response) =>
          this.setState({
            form: { code: response.data.categories[0].code },
            categories: response.data.categories
          })
        )
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
                     <h3><strong>Ingresar Menú</strong></h3>
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
                         value={form.name  || ''}
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
                         value={form.amount  || ''}
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
                         value={form.description  || ''}
                         onChange={this.manejadorChange}
                         maxLength={100}
                         onKeyPress={(e) => this.description(e)}

                         />
                       </div>
                </div>
                 </div>
                 <br/>
 






                 


 



      
               <button 
               type="submit"
                className="btn btn-primary"
                 style={{ marginRight: "10px" }}
                 onClick={() => this.post()}
                 >
                   Agregar Menú
                 </button>
 
             
               
           
           </form>
           </div>
         </React.Fragment>
        
               
        );
    }

}


export default IngresarMenu;