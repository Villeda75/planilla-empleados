import React, { useContext,Component} from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";
import {firestore} from '../firebase';

import TablaEmpleados from './Home/TablaEmpleados';
import FormEmpleado from './Home/FormEmpleado';
import Inicio from './Home/Inicio';

class ProfilePage extends Component
{
  constructor(props) {
    super(props);
    //para subscribirse.collection("empleados")
    this.ref = firestore.collection('empleados').orderBy("name", "desc");
    this.unsubscribe = null;
    var photoURL='';
    this.state = {
     empleados: []
     };
     
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
    auth.signOut();
    window.location = '/';
  };

  myFunction=()=> {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  };

  onCollectionUpdate = (querySnapshot) => {
    const empleados = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
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
   firestore.collection('empleados').add(newUser).then(res=>
    {

      alert('Usuario Agregado');


    })
    .catch(err=>
      {
       alert('Ocurrio un error');
       console.error(err);
        
      })
   }

   
// cuando se presiona el botón editar, se recibe de Users.js
pressEditBtn = (id) => {
  let empleados = this.state.empleados;
  let i=empleados.findIndex(x=>x.id==id)
  empleados[i].isEditing = true;
  this.setState({
      empleados
  });
}

//para cancelar edicion
CancelEdit = (id) => {
  let empleados = this.state.empleados;
  let i=empleados.findIndex(x=>x.id==id)
  empleados[i].isEditing = false;
  this.setState({
      empleados
  });
}

// (i, nombre, edad) se recibe de Users.js
updateUser = (id,newUser) => {
const updateRef = firestore.collection('empleados').doc(id).update(newUser)
.then(()=>{alert('Empleado modificado!')})
.catch(()=>{alert('Ha ocurrido un error!')});
 

}
// (i) se recibe de Users.js
pressDelete = (id) => {
  firestore.collection('empleados').doc(id).delete().then(() => {
  alert("Empleado Eliminado!");
}).catch((error) => {
  alert("Ha ocurrido un error ");
  console.error(error);
});
 
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
              background: `url(${this.photoURL || 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'})  no-repeat center center`,
              backgroundSize: "cover",
              height: "50px",
              width: "50px",
              borderRadius: "20px"
            }}>
          </div>
          </a>

        </div>
      </div>

      <div id="navDemo" className="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style={{ marginTop: + '46px' }}>
        <a href="#tour" className="w3-bar-item w3-button w3-padding-large" onClick={() => {this. myFunction() }}><Link to="/inicio">Inicio</Link></a>
        <a href="#band" className="w3-bar-item w3-button w3-padding-large" onClick={() => { this.myFunction() }}><Link to="/empleados">Empleados</Link></a>
        <a href="#tour" className="w3-bar-item w3-button w3-padding-large" onClick={() => { this.myFunction() }}><Link to="/planilla">Planilla</Link></a>
        <a className="w3-bar-item w3-button w3-padding-large" onClick={() => { this.signOut() }}>Cerrar sesión</a>
      </div>

      <br />
      <div className="container">
        <div style={{ marginTop: "8%" }}>
          <Router>
            <Inicio exact path="/inicio" />
            <TablaEmpleados allUsers={this.state.empleados} pressDelete={this.pressDelete}  pressEditBtn={this.pressEditBtn} updateUser={this.updateUser} CancelEdit={this.CancelEdit} exact path="/planilla" />
            <FormEmpleado addEmpleado={this.addEmpleado} exact path="/empleados" />
          </Router>
        </div>
      </div>
    </div>
      
    );
}


}
export default ProfilePage;

