import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * Dashboard para Pacientes
 * Vista simple con información personal y médica
 */
const DashboardPaciente = () => {
  const [user, setUser] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Obtener datos del usuario y paciente
  useEffect(() => {
    const userData = localStorage.getItem('sesion'); // CORREGIDO

    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    loadPatientData(parsedUser);
  }, [navigate]);

  // Datos simulados
  const loadPatientData = (userData) => {
    setTimeout(() => {
      const mockPatientData = {
        id: 'P001',
        nombre: userData.nombres || userData.username, // usa datos reales si existen
        edad: 25,
        fechaNacimiento: '2000-01-01',
        rut: userData.numeroDocumento || 'No disponible',
        direccion: userData.direccion || 'No disponible',
        telefono: userData.telefono || 'No disponible',
        email: userData.email,
        diagnostico: 'Sin diagnóstico registrado',
        fechaDiagnostico: '2024-01-01',
        medicoTratante: 'No asignado',
        especialidad: '',
        medicamentos: [],
        terapias: [],
        controles: [],
        tutor: {
          nombre: 'No registrado',
          parentesco: '-',
          telefono: '-',
          email: '-'
        }
      };

      setPatientData(mockPatientData);
      setLoading(false);
    }, 500);
  };

  // formato fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Cargando información...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h1>Dashboard Paciente</h1>
      <p>Bienvenido, {patientData?.nombre}</p>

      <div className="row mt-4">

        {/* Datos personales */}
        <div className="col-md-6">
          <Card title="Información Personal">
            <p><strong>Nombre:</strong> {patientData.nombre}</p>
            <p><strong>RUT:</strong> {patientData.rut}</p>
            <p><strong>Email:</strong> {patientData.email}</p>
            <p><strong>Teléfono:</strong> {patientData.telefono}</p>
            <p><strong>Dirección:</strong> {patientData.direccion}</p>
          </Card>
        </div>

        {/* Datos médicos */}
        <div className="col-md-6">
          <Card title="Información Médica">
            <p><strong>Diagnóstico:</strong> {patientData.diagnostico}</p>
            <p><strong>Médico:</strong> {patientData.medicoTratante}</p>
          </Card>
        </div>

      </div>

      {/* botón logout */}
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