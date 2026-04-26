import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PatientSearch from '../components/dashboard/PatientSearch';
import PatientDetails from '../components/dashboard/PatientDetails';
import ClinicalNotes from '../components/dashboard/ClinicalNotes';

/**
 * Dashboard para Profesionales de la Salud
 * Permite buscar pacientes y gestionar notas clínicas
 */
const DashboardProfesional = () => {
  const [user, setUser] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Obtener datos del usuario al montar el componente
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setLoading(false);
  }, [navigate]);

  // Manejar selección de paciente
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="mb-2">Dashboard Profesional</h1>
            <p className="mb-0">Bienvenido, Dr(a). {user?.nombre}</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="badge bg-white text-primary fs-6">
              <i className="bi bi-hospital me-2"></i>
              {user?.institucion}
            </div>
            <div className="badge bg-white text-secondary fs-6 ms-2">
              <i className="bi bi-award me-2"></i>
              {user?.tipoProfesional}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Búsqueda de Pacientes */}
        <div className="col-lg-4">
          <PatientSearch onPatientSelect={handlePatientSelect} />
          
          {/* Estadísticas Rápidas */}
          <Card title="Mi Actividad" className="mt-4">
            <div className="text-center">
              <div className="row">
                <div className="col-6 mb-3">
                  <i className="bi bi-people-fill text-primary fs-2"></i>
                  <h5 className="mt-2">24</h5>
                  <small className="text-muted">Pacientes activos</small>
                </div>
                <div className="col-6 mb-3">
                  <i className="bi bi-clipboard-check text-success fs-2"></i>
                  <h5 className="mt-2">8</h5>
                  <small className="text-muted">Notas esta semana</small>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <i className="bi bi-calendar-event text-info fs-2"></i>
                  <h5 className="mt-2">5</h5>
                  <small className="text-muted">Citas hoy</small>
                </div>
                <div className="col-6">
                  <i className="bi bi-clock-history text-warning fs-2"></i>
                  <h5 className="mt-2">3</h5>
                  <small className="text-muted">Pendientes</small>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Detalles del Paciente y Notas Clínicas */}
        <div className="col-lg-8">
          {selectedPatient ? (
            <>
              <PatientDetails patient={selectedPatient} />
              <ClinicalNotes 
                patient={selectedPatient} 
                professional={user}
                className="mt-4"
              />
            </>
          ) : (
            <Card>
              <div className="text-center text-muted py-5">
                <i className="bi bi-search fs-1 mb-3"></i>
                <h4>Seleccione un Paciente</h4>
                <p>Busque un paciente por RUT para ver su información clínica</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfesional;
