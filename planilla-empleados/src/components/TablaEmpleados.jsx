import React from 'react';

const TablaEmpleados = () => (
  
      <div className="TablaEmpleados text-center">
        <div className="table-responsive mt-3">
        <h4>Pago líquido de empleados</h4>
        <hr />
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Código</th>
              <th>Empleado</th>
              <th>Horas</th>
              <th>ISSS</th>
              <th>AFP</th>
              <th>RENTA</th>
              <th>SUELDO L</th>
              <th>SUELDO NETO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>150</td>
              <td>Marcos Ayala</td>
              <td>80</td>
              <td>$10</td>
              <td>$20</td>
              <td>$30</td>
              <td>$500</td>
              <td>$440</td>
            </tr>
            <tr>
              <td>150</td>
              <td>Marcos Ayala</td>
              <td>80</td>
              <td>$10</td>
              <td>$20</td>
              <td>$30</td>
              <td>$500</td>
              <td>$440</td>
            </tr>
            <tr>
              <td>150</td>
              <td>Marcos Ayala</td>
              <td>80</td>
              <td>$10</td>
              <td>$20</td>
              <td>$30</td>
              <td>$500</td>
              <td>$440</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
);

export default TablaEmpleados;