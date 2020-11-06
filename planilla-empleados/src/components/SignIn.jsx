import React, { useState } from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const signInWithEmailAndPasswordHandler = (event) => {

    event.preventDefault(); 

    const user = auth.signInWithEmailAndPassword(email, password).then( result =>{
      window.location = '/inicio';
    })
    .catch(error => {
      setError("Error, por favor revisar credenciales.");
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };


  return (
    <div className="container mt-3">
      <nav className="navbar navbar-inverse">
        <ul className="nav navbar-nav">
        </ul>
      </nav>
      <div className="mt-8">
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8 mt-5">
          <form className="p-5">
            {error !== null && (
              <div className="py-4 bg-red-600 w-full text-danger text-center mb-3">
                {error}
              </div>
            )}
            <div className="form-group">
              <h3 class="text-center">Inicio de sesión</h3> <hr />

              <label>Correo Electrónico:</label>
              <input type="email" className="form-control"
                name="userEmail"
                placeholder="usuario@gmail.com"
                onChange={(event) => onChangeHandler(event)} />
            </div>

            <div className="form-group">
              <label>Contraseña:</label>
              <input type="password" className="form-control"
                name="userPassword"
                placeholder="contraseña"
                onChange={(event) => onChangeHandler(event)} />
            </div>

            <button type="submit" className="btn btn-dark btn-block" onClick={(event) => { signInWithEmailAndPasswordHandler(event) }}><i className="fa fa-lock"></i> Ingresar</button>
          </form>
          <div class="d-flex justify-content-center mb-5">
                <div class="p-2"><Link to="signUp" className="btn btn-primary btn-block">Registrarme</Link></div>
                <div class="p-2"><button className="btn btn-danger btn-block" onClick={() => { signInWithGoogle(); }}>Ingresar con Google</button></div>
                <div class="p-2"><Link to="passwordReset" className="btn btn-primary btn-block">Olvidé la contraseña</Link></div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
