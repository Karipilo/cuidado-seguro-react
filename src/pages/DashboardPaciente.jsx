import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

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
    <div className="container mt-4">

      <h1>Dashboard Paciente</h1>
      

      <div className="row mt-4">

        {/* Datos personales */}
        <div className="col-md-6">
          <Card title="Información Personal">
            <p><strong>Nombre:</strong> {user.nombres} {user.apellidos}</p>
            <p><strong>RUT:</strong> {user.numeroDocumento}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> {user.telefono}</p>
            <p><strong>Dirección:</strong> {user.direccion}</p>
          </Card>
        </div>

        {/* Datos médicos */}
        <div className="col-md-6">
          <Card title="Información Médica">
            <p><strong>Grupo sanguíneo:</strong> {user.grupoSanguineo}</p>
            <p><strong>Factor RH:</strong> {user.factorRh}</p>
            <p><strong>Alergias:</strong> {user.alergias}</p>
            <p><strong>Enfermedades:</strong> {user.enfermedadesCronicas}</p>
            <p><strong>Medicamentos:</strong> {user.medicamentosActuales}</p>
          </Card>
        </div>

      </div>

      <div className="mt-4">
        <Button
          onClick={() => {
            localStorage.removeItem("sesion");
            navigate("/login");
          }}
        >
          Cerrar Sesión
        </Button>
      </div>

    </div>
  );
};

export default DashboardPaciente;