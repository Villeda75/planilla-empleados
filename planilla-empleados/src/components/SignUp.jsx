import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, generateUserDocument } from "../firebase";

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event) => {

    event.preventDefault(); // POST , GET , PHP, JAVA , ASP, ETC

    setError("");
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, { displayName });
    }
    catch (error) {
      setError('' + error);
    }
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
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
          {error !== null && (
            <div className="bg-red-600 w-full text-danger text-center mt-3">
              {error}
            </div>
          )}
          <form className="p-5">
            <h3 class="text-center">Crear cuenta</h3> <hr />

            <label htmlFor="displayName" className="block">
              Nombre:
          </label>
            <div className="form-group">
              <input type="text" className="form-control"
                name="displayName"
                placeholder="Juan Flores"
                onChange={(event) => onChangeHandler(event)} />
            </div>

            <label htmlFor="userEmail" className="block">
              Correo:
          </label>
            <div className="form-group">
              <input type="email" className="form-control"
                name="userEmail"
                id="userEmail"
                value={email}
                placeholder="juanflores@gmail.com"
                onChange={(event) => onChangeHandler(event)} />
            </div>

            <label htmlFor="userPassword" className="block">
              Contraseña :
          </label>
            <div className="form-group">
              <input type="password" className="form-control"
                name="userPassword"
                id="userEmail"
                value={password}
                placeholder="contraseña"
                onChange={(event) => onChangeHandler(event)} />
            </div>

            <button className="btn btn-dark btn-block"
              onClick={event => {
                createUserWithEmailAndPasswordHandler(event);
              }}>Guardar</button>
          </form>
          <p className="text-center">
            <Link to="/" className="btn btn-primary btn-md">&larr; Regresar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
