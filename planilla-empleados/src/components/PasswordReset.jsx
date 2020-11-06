import React, { useState } from "react";
import { auth } from "../firebase";
import { Link } from "@reach/router";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
      })
      .catch(() => {
        setError("Debe ingresar un correo válido");
      });
  };
  return (
    <div className="container mt-3">
      <nav class="navbar navbar-inverse">
        <ul class="nav navbar-nav">
        </ul>
      </nav>
      <div className="mt-8">
        <div className="border border-blue-300 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8 mt-5">
          <form className="p-5">
            {emailHasBeenSent && (
              <div className="py-3 bg-green-400 w-full text-danger text-center mb-3">
                Por favor revisar su correo electrónico
              </div>
            )}
            {error !== null && (
              <div className="py-3 bg-red-600 w-full text-danger text-center mb-3">
                {error}
              </div>
            )}
            <h3 className="text-center"> Cambiar contraseña</h3> <hr/>

            <label htmlFor="userEmail" className="w-full block">
              Correo:
          </label>
            <div className="form-group">
              <input type="email" className="form-control"
                name="userEmail"
                id="userEmail"
                value={email}
                placeholder="usuario@gmail.com"
                onChange={(event) => onChangeHandler(event)} />
            </div>
            <button className="btn btn-dark btn-block" onClick={event => { sendResetEmail(event); }}><i class="fa fa-save"></i>Solicitar contraseña</button>
          </form>

          <p className="text-center">
          <Link to="/" className="btn btn-primary btn-md">&larr; Regresar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;