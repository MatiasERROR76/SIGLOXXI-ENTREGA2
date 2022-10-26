import React, { Component } from "react";
import { ApiurlUsers } from "../services/apirest";
import axios from "axios";
import { createUser } from "../converters/userConverter";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'


class Editar extends Component {
  state = {
    form: {
      number: "",
      validator: "",
      name: "",
      birthdate: "",
      email: "",
      code: "",
      namerole: "",
      last_name: "",
      second_last_name: "",
    },
    error: false,
    errorMsg: "",
    roles: [],
  };

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
    let UserEmail = this.props.match.params.id;
    let url = ApiurlUsers + UserEmail;
    console.log(this.state);
    const body = createUser(this.state.form);
    axios
      .patch(url, body)
      .then((response) => {

          swal(
            'Usuario modificado',
            'Usuario modificado con éxito.',
            'success' 
        )
        

        console.log(response.data);
        this.props.history.push("/dashboard");
      })
      .catch((error) => console.log(error.response.data));
  };

  delete = () => {
    let userId = this.props.match.params.id;
    let url = ApiurlUsers + userId;
    let datos = {
      userId: userId,
    };
    swal({
      title: "¿Estás seguro?",
      text: "Eliminarás el usuario seleccionado.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  })
      .then((willDelete) => {
          if (willDelete) {
    axios.delete(url, { headers: datos }).then((response) => {
      swal(
        'Usuario eliminado',
        'El usuario ha sido eliminado exitosamente.',
        'success' 
    )
    
      this.props.history.push("/dashboard");
    });
  } 
});

  };

  componentDidMount() {
    let UserEmail = this.props.match.params.id;
    let url = ApiurlUsers + UserEmail;
    axios.get(url).then((response) => {
      
      this.setState({
        form: {
          number: response.data.user?.identification_document?.number ?? "",
          validator:
            response.data.user?.identification_document?.validator ?? "",
          name: response.data.user.name,
          birthdate: response.data.user?.birthdate ?? "",
          email: response.data.user.contact.email,
          code: response.data.user.role.code,
          namerole: response.data.user.role.name,
          last_name: response.data.user.last_name ?? "",
          second_last_name: response.data.user.second_last_name ?? "",
        },
        
      });
  
    });

    axios
      .get("https://siglo-xxi-users.azurewebsites.net/Users/v1/roles")
      .then((response) => this.setState({ roles: response.data.roles }));
  }



  firstMethod(e) {
    const re = /[0123456789kK]+/g;
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


 



  
  render() {
    const form = this.state.form;
   
    return (
      <React.Fragment>

        <div className="container">
          <br></br>
        <a id="volver" className="btn btn-dark" href="/dashboard" > <FontAwesomeIcon  icon={faArrowAltCircleLeft}/> Volver</a>
        <hr></hr>
          <h3><strong>Editar usuario</strong> </h3>
        </div>

        <div className="container">
          <br />
          <form className="form horizontal" onSubmit={this.manejadorSubmit}>
      
            <br />


            <div className="row">
              <div className="col-sm-8">
                <label className="col-md-2 control-label">Rut</label>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="number"
                    placeholder="Rut"
                    type="text"
                    value={form.number}
                    onChange={this.manejadorChange}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <br />


            <div className="row">
              <div className="col-sm-8">
                <label className="col-md-2 control-label">Digito verificador</label>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    name="validator"
                    placeholder="Digito verificador"
                    type="text"
                    value={form.validator}
                    onChange={this.manejadorChange}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <br />



            <div className="row">
              <div className="col-sm-8">
                <label className="col-md-2 control-label">Nombre</label>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Nombre"
                    type="text"
                    maxLength={20}
                    onKeyPress={(e) => this.fourthMethod(e)}
                         
                    value={form.name}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-sm-8">
                <label className="col-md-2 control-label">
                  Apellido&nbsp;paterno
                </label>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="last_name"
                    placeholder="Apellido paterno"
                    type="text"
                    value={form.last_name}
                    onChange={this.manejadorChange}
                    onKeyPress={(e) => this.fourthMethod(e)}
                    maxLength={20}

                  />
                </div>
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-sm-8">
                <label className="col-md-2 control-label">
                  Apellido&nbsp;materno
                </label>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="second_last_name"
                    placeholder="Apellido materno"
                    type="text"
                    value={form.second_last_name}
                    onChange={this.manejadorChange}
                    onKeyPress={(e) => this.fourthMethod(e)}
                    maxLength={20}

                  />
                </div>
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-sm-8">
                <label className="col-md-2 control-label">
                  Fecha&nbsp;de&nbsp;nacimiento
                </label>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="birthdate"
                    placeholder="Fecha de nacimiento"
                    type="date"
                    value={form.birthdate}
                    onChange={this.manejadorChange}
                    
                  />
                </div>
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-sm-8">
                <label className="col-md-2 control-label">Correo&nbsp;electrónico</label>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="email"
                    placeholder="Correo electrónico"
                    type="text"
                    value={form.email}
                    onChange={this.manejadorChange}
                    maxLength={40}

                  />
                </div>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-sm-4">
                <label className="col-md-2 control-label">Rol</label>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    aria-label="default select example"
                    name="code"
                    value={this.state.form.code}
                    onChange={this.manejadorChange}
                  >
                    {this.state.roles.map((role) => {
                      return <option key={role.code} value={role.code}>{role.name}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>

            <br />
            
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

export default Editar;
