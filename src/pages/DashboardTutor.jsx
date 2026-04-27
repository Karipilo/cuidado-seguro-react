import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PatientInfo from '../components/dashboard/PatientInfo';
import MessageSection from '../components/dashboard/MessageSection';
import { usuarios } from '../data/usuario';
/**
 * Dashboard para Tutores
 * Muestra información del paciente y sección de mensajes
 */
const DashboardTutor = () => {
  const [user, setUser] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Obtener datos del usuario y paciente al montar el componente
  useEffect(() => {
    const userData = localStorage.getItem('sesion');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Simular carga de datos del paciente
    loadPatientData(parsedUser);
  }, [navigate]);

  const loadPatientData = (userData) => {

    const paciente = usuarios.find(
      (u) =>
        u.tipoUsuario === "PACIENTE" &&
        u.numeroDocumento === userData.rutPaciente
    );

    if (!paciente) {
      setPatientData(null);
    } else {
      setPatientData(paciente);
    }

    setLoading(false);
  };



  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando información del paciente...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="mb-2">Dashboard del Tutor</h1>
            
          </div>
          <div className="col-md-6 text-md-end">
            <div className="badge bg-white text-primary fs-6">
              <i className="bi bi-person-fill me-2"></i>
              {user?.parentesco}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Información del Paciente */}
        <div className="col-lg-8">
          <PatientInfo patientData={patientData} />
        </div>

        {/* Sección de Mensajes */}
        <div className="col-lg-4">
          <MessageSection user={user} />
        </div>
      </div>

      {/* Resumen Rápido */}
      <div className="row mt-4">
        <div className="col-md-4">
          <Card className="text-center">
            <div className="card-body">
              <i className="bi bi-capsule text-primary fs-1 mb-3"></i>
              <h5 className="card-title">Medicamentos</h5>
              <p className="card-text fs-2 fw-bold text-primary">
                {patientData?.medicamentosActuales ? 1 : 0}
              </p>
              <p className="text-muted">Medicamentos activos</p>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="text-center">
            <div className="card-body">
              <i className="bi bi-calendar-check text-success fs-1 mb-3"></i>
              <h5 className="card-title">Próximo Control</h5>
              <p className="card-text">
                {patientData?.controles?.filter(c => c.estado === 'Pendiente')[0]?.fecha ||
                  'No hay controles pendientes'}
              </p>
              <p className="text-muted">
                {patientData?.controles?.filter(c => c.estado === 'Pendiente')[0]?.tipo || ''}
              </p>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="text-center">
            <div className="card-body">
              <i className="bi bi-person-badge text-info fs-1 mb-3"></i>
              <h5 className="card-title">Médico Tratante</h5>
              <p className="card-text fw-bold">
                {patientData?.medicoTratante || 'No asignado'}
              </p>
              <p className="text-muted">Profesional a cargo</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardTutor;
