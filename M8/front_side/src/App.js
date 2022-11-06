import React from "react";
import Registro from "./components/Registro";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Datos from "./components/Datos";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/datos/:usuario" element={<Datos />} />
      </Routes>
    </Router>
  );
}

export default App;
