import React from 'react';

const FormEmpleado = () => (

  <form className="FormEmpleado mt-3">
    <h4 className="text-center">Registro de empleados</h4>
    <div className="border p-3">
      <div className="form-row">
        <div className="col-2">
          <label for="codigo" class="mr-sm-2">Código:</label>
          <input type="text" className="form-control" id="codigo" placeholder="150" name="cod" />
        </div>
        <div className="col-8">
          <label for="Nombre" class="mr-sm-2">Nombre:</label>
          <input type="text" className="form-control" placeholder="Juan Flores" name="name" />
        </div>
        <div className="col-2">
          <label for="horas" class="mr-sm-2">Horas:</label>
          <input type="number" className="form-control" placeholder="10" name="horas" min="1" max="168" value="1" />
        </div>
      </div>
    </div>
  </form>
);

export default FormEmpleado;