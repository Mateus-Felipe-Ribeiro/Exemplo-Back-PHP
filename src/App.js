import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Home } from './pages/home';
import { Cadastrar } from './pages/Cadastrar';
import { Visualizar } from './pages/Visualizar';
import { Editar } from './pages/Editar';
import { Login } from './pages/Login';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/visualizar/:id" element={<Visualizar />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
