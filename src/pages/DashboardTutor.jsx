import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import { usuarios } from '../data/usuario';

const DashboardTutor = () => {

  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {

    const sesion = JSON.parse(localStorage.getItem("sesion"));

    if (!sesion) {
      navigate('/login');
      return;
    }

    setTutor(sesion);

    // buscar pacientes asociados
    if (sesion.rutPaciente) {

      const paciente = usuarios.find(
        (u) =>
          u.tipoUsuario === "PACIENTE" &&
          u.numeroDocumento === sesion.rutPaciente
      );

      if (paciente) {
        setPacientes([paciente]);
      }
    }

  }, [navigate]);

  if (!tutor) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-4">

      <h1>Dashboard Tutor</h1>

      <p>Bienvenido {tutor.nombres}</p>

      <h4 className="mt-4">Paciente asociado</h4>

      {pacientes.length === 0 ? (
        <p>No hay paciente asociado</p>
      ) : (
        pacientes.map((p, index) => (
          <Card key={index} className="p-3 mb-3">

            <p><strong>Nombre:</strong> {p.nombres} {p.apellidos}</p>
            <p><strong>RUT:</strong> {p.numeroDocumento}</p>
            <p><strong>Grupo sanguíneo:</strong> {p.grupoSanguineo}</p>
            <p><strong>Alergias:</strong> {p.alergias}</p>
            <p><strong>Enfermedades:</strong> {p.enfermedadesCronicas}</p>
            <p><strong>Medicamentos:</strong> {p.medicamentosActuales}</p>

          </Card>
        ))
      )}

    </div>
  );
};

export default DashboardTutor;