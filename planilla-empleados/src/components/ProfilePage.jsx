import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";

import TablaEmpleados from './Home/TablaEmpleados';
import FormEmpleado from './Home/FormEmpleado';
import Inicio from './Home/Inicio';

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();
    window.location = '/';
  };

  function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }

  return (
    <div className="Principal">

      <div class="w3-top text-white">
        <div class="w3-bar w3-black w3-card">
          <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onClick={() => { myFunction() }} title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
          <a href="/inicio" className="mt-2 w3-bar-item w3-button w3-padding-large">Planilla Empleados</a>
          <a className="mt-2 w3-bar-item w3-button w3-padding-large w3-hide-small"><Link to="/inicio">Inicio</Link> </a>
          <a className="mt-2 w3-bar-item w3-button w3-padding-large w3-hide-small"><Link to="/empleados">Empleados</Link></a>
          <a className="mt-2 w3-bar-item w3-button w3-padding-large w3-hide-small"><Link to="/planilla">Planilla</Link></a>
          <a onClick={() => { signOut() }} class="mt-2 w3-padding-large w3-hide-small w3-right">Cerrar sesión</a>
          <a className="w3-right mt-2"> <div
            style={{
              background: `url(${photoURL || 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'})  no-repeat center center`,
              backgroundSize: "cover",
              height: "50px",
              width: "50px",
              borderRadius: "20px"
            }}>
          </div>
          </a>

        </div>
      </div>

      <div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style={{ marginTop: + '46px' }}>
        <a href="#tour" class="w3-bar-item w3-button w3-padding-large" onClick={() => { myFunction() }}><Link to="/inicio">Inicio</Link></a>
        <a href="#band" class="w3-bar-item w3-button w3-padding-large" onClick={() => { myFunction() }}><Link to="/empleados">Empleados</Link></a>
        <a href="#tour" class="w3-bar-item w3-button w3-padding-large" onClick={() => { myFunction() }}><Link to="/planilla">Planilla</Link></a>
        <a class="w3-bar-item w3-button w3-padding-large" onClick={() => { signOut() }}>Cerrar sesión</a>
      </div>

      <br />
      <div className="container">
        <div style={{ marginTop: "8%" }}>
          <Router>
            <Inicio exact path="/inicio" />
            <TablaEmpleados exact path="/planilla" />
            <FormEmpleado exact path="/empleados" />
          </Router>
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;

