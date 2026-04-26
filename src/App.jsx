import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import DashboardTutor from './pages/DashboardTutor';
import DashboardProfesional from './pages/DashboardProfesional';
import DashboardPaciente from './pages/DashboardPaciente';
import "./styles/variables.css";
import "./styles/base.css";
import "./styles/navbar.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import "./styles/cards.css";
import "./styles/dashboard.css";
import "./styles/home.css";
/**
 * Componente principal de la aplicación
 * Configura las rutas y la estructura general
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* Ruta principal - página de inicio */}
            <Route path="/" element={<Home />} />
            
            {/* Rutas de autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            
            {/* Rutas de dashboards según rol */}
            <Route path="/dashboard-tutor" element={<DashboardTutor />} />
            <Route path="/dashboard-profesional" element={<DashboardProfesional />} />
            <Route path="/dashboard-paciente" element={<DashboardPaciente />} />
            
            {/* Ruta por defecto - redirige a home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
