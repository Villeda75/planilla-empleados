import React from 'react';
import Application from "../src/components/Application";
import UserProvider from "../src/providers/UserProvider";

// Aquí se insertan los demás componentes
function App() {
  return (
        <UserProvider>
          <Application />
        </UserProvider>
  );
}

export default App;
