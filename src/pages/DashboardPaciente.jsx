import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import "../styles/dashboard.css";

const DashboardPaciente = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('sesion');

    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

  }, [navigate]);

  if (!user) {
    return (
      <div className="text-center mt-5">
        <p>Cargando información...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Panel del Paciente</h2>
        <p>Bienvenido, {user?.nombre}</p>
      </div>

      <div className="row">

        {/* COLUMNA IZQUIERDA */}
        <div className="col-md-6">
          <div className="dashboard-card p-3 mb-4">
            <h5>Información Personal</h5>

            <p><strong>Nombre:</strong> {user?.nombre}</p>
            <p><strong>RUT:</strong> {user?.rut}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Teléfono:</strong> {user?.telefono}</p>
            <p><strong>Dirección:</strong> {user?.direccion}</p>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="col-md-6">
          <div className="dashboard-card p-3 mb-4">
            <h5>Información Médica</h5>

            <p><strong>Grupo sanguíneo:</strong> {user?.grupoSanguineo}</p>
            <p><strong>Factor RH:</strong> {user.factorRH}</p>
            <p><strong>Alergias:</strong> {user.alergias}</p>
            <p><strong>Enfermedades:</strong> {user.enfermedadesCronicas}</p>
            <p><strong>Medicamentos:</strong> {user.medicamentos}</p>
          </div>
        </div>

      </div>

      {/* BOTÓN */}
      <button
        className="btn btn-primary mt-3"
        onClick={() => {
          localStorage.removeItem("sesion");
          navigate("/login");
        }}
      >
        Cerrar sesión
      </button>

    </div>
  );
};

export default DashboardPaciente;