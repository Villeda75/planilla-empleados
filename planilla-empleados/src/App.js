import React from 'react';
import TablaEmpleados from './components/TablaEmpleados'
import FormEmpleado from './components/FormEmpleado'
// Aquí se insertan los demás componentes
function App() {
  return (
    <div className="App">
      <div className="container">
        <TablaEmpleados />
        <FormEmpleado />
      </div>
    </div>
  );
}

export default App;
