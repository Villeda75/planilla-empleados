import React, { Component} from "react";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";
import {firestore} from '../firebase';

import TablaEmpleados from './Home/TablaEmpleados';
import FormEmpleado from './Home/FormEmpleado';
import Inicio from './Home/Inicio';
import { showSuccessAlert, showErrorAlert } from "./ServiceAlertas";
class ProfilePage extends Component
{
  constructor(props) {
    super(props);
    //para subscribirse.collection("empleados")
    this.ref = firestore.collection('empleados').orderBy("name", "desc");
    this.unsubscribe = null;
    this.state = {
     empleados: []
     };
     this.photoURL = localStorage.getItem('photoURL');
   /* database.collection('Clientes').onSnapshot((querySnapshot)=>
    {
        querySnapshot.forEach((doc)=>
        {
        //se almacenan los datos desde firebase a un array local
        CurrentClientes.push({...doc.data(),id:doc.id});

        })
       
    });
   */
   
  }

  signOut = () => {
    
    showSuccessAlert('Sesión cerrada correctamente!');
    auth.signOut();
    setTimeout(() => {  window.location = '/'; }, 1700);
    //window.location = '/';
    localStorage.clear();
    
  };

  myFunction=()=> {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") === -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  };

  onCollectionUpdate = (querySnapshot) => {
    const empleados = [];
    querySnapshot.forEach((doc) => {
      empleados.push({...doc.data(),id:doc.id,isEditing:false});
    });
    this.setState({
      empleados
   });
 
  }

  //esto sirve para mostrar los datos
   componentDidMount() {
this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

}



  //SE RECIBE DEL FORMULARIO EMPLEADO
  addEmpleado = (newUser) => {
    delete newUser.isEditing;
   /* let newUsers = this.state.users;
    newUsers.push(newUser);
   this.setState({newUsers});*/
   let isValid = true
   this.state.empleados.forEach(el =>{
     if(el.code == newUser.code) isValid = false
   })
   if(isValid){
    firestore.collection('empleados').add(newUser).then(res=>
      {

        //alert('Usuario Agregado');
        showSuccessAlert('Empleado agregado');

      })
      .catch(err=>
        {
        //alert('Ocurrio un error');
        showErrorAlert('Ha ocurrido un error');
        console.error(err);
          
        })
   }
  else{
    //alert("Codigo de empleado repetido")
    showErrorAlert('Ha ocurrido un error');
  }}

   
// cuando se presiona el botón editar, se recibe de Users.js
pressEditBtn = (id) => {
  let empleados = this.state.empleados;
  let i=empleados.findIndex(x=>x.id===id)
  empleados[i].isEditing = true;
  this.setState({
      empleados
  });
}

//para cancelar edicion
CancelEdit = (id) => {
  let empleados = this.state.empleados;
  let i=empleados.findIndex(x=>x.id===id)
  empleados[i].isEditing = false;
  this.setState({
      empleados
  });
}

// (i, nombre, edad) se recibe de Users.js
updateUser = (id,newUser) => {
const updateRef = firestore.collection('empleados').doc(id).update(newUser)
.then(()=>{showSuccessAlert('Empleado modificado!')})
.catch(()=>{showErrorAlert('Ha ocurrido un error!')});
 

}
// (i) se recibe de Users.js  
pressDelete = (id) => {
  firestore.collection('empleados').doc(id).delete().then(() => {
  showSuccessAlert("Empleado Eliminado!");
}).catch((error) => {
  showErrorAlert("Ha ocurrido un error ");
  console.error(error);
}); 
}


getCodigoEmpleado = () => {
  let lastCode = 0
  this.state.empleados.forEach(el => {
    let cod = Number(el.code)
    if( cod > lastCode ) lastCode = cod
  })
  return lastCode
}

render() {
    return (
      <div className="Principal">

      <div className="w3-top text-white">
        <div className="w3-bar w3-black w3-card">
          <a className="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onClick={() => { this.myFunction() }} title="Toggle Navigation Menu"><i className="fa fa-bars"></i></a>
          <a href="/inicio" className="mt-2 w3-bar-item w3-button w3-padding-large">Planilla Empleados</a>
          <a className="mt-2 w3-bar-item w3-button w3-padding-large w3-hide-small"><Link to="/inicio">Inicio</Link> </a>
          <a className="mt-2 w3-bar-item w3-button w3-padding-large w3-hide-small"><Link to="/empleados">Empleados</Link></a>
          <a className="mt-2 w3-bar-item w3-button w3-padding-large w3-hide-small"><Link to="/planilla">Planilla</Link></a>
          <a onClick={() => { this.signOut() }} className="mt-2 w3-padding-large w3-hide-small w3-right">Cerrar sesión</a>
          <a className="w3-right mt-2"> <div
            style={{
              background: `url(${this.photoURL || 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'})  no-repeat center center`,
              backgroundSize: "cover",
              height: "50px",
              width: "50px",
              backgroundColor: "white",
              borderRadius: "30px"
            }}>
          </div>
          </a>

        </div>
      </div>

      <div id="navDemo" className="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style={{ marginTop: '46px' }}>
        <a href="#tour" className="w3-bar-item w3-button w3-padding-large" onClick={() => {this. myFunction() }}><Link to="/inicio">Inicio</Link></a>
        <a href="#band" className="w3-bar-item w3-button w3-padding-large" onClick={() => { this.myFunction() }}><Link to="/empleados">Empleados</Link></a>
        <a href="#tour" className="w3-bar-item w3-button w3-padding-large" onClick={() => { this.myFunction() }}><Link to="/planilla">Planilla</Link></a>
        <a className="w3-bar-item w3-button w3-padding-large" onClick={() => { this.signOut() }}>Cerrar sesión</a>
      </div>

      <br />
      <div className="container">
        <div className="mt-5 pt-5">
          <Router>
            <Inicio exact path="/inicio" />
            <TablaEmpleados allUsers={this.state.empleados} pressDelete={this.pressDelete}  pressEditBtn={this.pressEditBtn} updateUser={this.updateUser} CancelEdit={this.CancelEdit} exact path="/planilla" />
            <FormEmpleado last={this.getCodigoEmpleado()} addEmpleado={this.addEmpleado} exact path="/empleados" />
          </Router>
        </div>
      </div>
    </div>
      
    );
}


}
export default ProfilePage;

