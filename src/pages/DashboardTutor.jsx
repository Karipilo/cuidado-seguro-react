import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PatientInfo from '../components/dashboard/PatientInfo';
import MessageSection from '../components/dashboard/MessageSection';

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
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Simular carga de datos del paciente
    loadPatientData(parsedUser);
  }, [navigate]);

  // Cargar datos del paciente (simulación)
  const loadPatientData = (userData) => {
    setTimeout(() => {
      // Datos mock del paciente
      const mockPatientData = {
        id: userData.idPaciente || 'P001',
        nombre: 'Ana María González',
        edad: 8,
        diagnostico: 'Trastorno del Espectro Autista - Nivel 2',
        fechaDiagnostico: '2022-03-15',
        medicoTratante: 'Dra. Carla Rodríguez',
        medicamentos: [
          {
            nombre: 'Risperidona',
            dosis: '0.5 mg',
            frecuencia: 'Cada 12 horas',
            via: 'Oral',
            inicio: '2022-04-01'
          },
          {
            nombre: 'Melatonina',
            dosis: '3 mg',
            frecuencia: 'Antes de dormir',
            via: 'Oral',
            inicio: '2022-05-15'
          }
        ],
        controles: [
          {
            tipo: 'Evaluación Neurológica',
            fecha: '2024-01-15',
            profesional: 'Dra. Carla Rodríguez',
            estado: 'Completado',
            observaciones: 'Buena respuesta al tratamiento'
          },
          {
            tipo: 'Terapia Ocupacional',
            fecha: '2024-02-20',
            profesional: 'Lic. María López',
            estado: 'Pendiente',
            observaciones: 'Evaluación de habilidades motoras finas'
          }
        ]
      };

      setPatientData(mockPatientData);
      setLoading(false);
    }, 1000);
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
            <p className="mb-0">Bienvenido, {user?.nombre}</p>
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
                {patientData?.medicamentos?.length || 0}
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
