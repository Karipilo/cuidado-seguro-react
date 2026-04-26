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
        id: 'P001',
        nombre: 'Ana María González',
        edad: 8,
        fechaNacimiento: '2015-09-15',
        rut: '12.345.678-9',
        direccion: 'Calle Principal 123, Santiago',
        telefono: '+56 9 8765 4321',
        email: 'ana.gonzalez@ejemplo.com',
        diagnostico: 'Trastorno del Espectro Autista - Nivel 2',
        fechaDiagnostico: '2022-03-15',
        medicoTratante: 'Dra. Carla Rodríguez',
        especialidad: 'Neurología Infantil',
        medicamentos: [
          {
            nombre: 'Risperidona',
            dosis: '0.5 mg',
            frecuencia: 'Cada 12 horas',
            via: 'Oral',
            inicio: '2022-04-01',
            proxCita: '2024-02-15'
          },
          {
            nombre: 'Melatonina',
            dosis: '3 mg',
            frecuencia: 'Antes de dormir',
            via: 'Oral',
            inicio: '2022-05-15',
            proxCita: '2024-01-30'
          }
        ],
        terapias: [
          {
            tipo: 'Terapia Ocupacional',
            profesional: 'Lic. María López',
            frecuencia: 'Semanal',
            proximaSesion: '2024-01-25 10:00',
            estado: 'Activa'
          },
          {
            tipo: 'Terapia del Lenguaje',
            profesional: 'Lic. Ana González',
            frecuencia: 'Quincenal',
            proximaSesion: '2024-02-02 14:00',
            estado: 'Activa'
          }
        ],
        controles: [
          {
            tipo: 'Control Neurológico',
            profesional: 'Dra. Carla Rodríguez',
            fecha: '2024-02-15',
            hora: '11:30',
            estado: 'Programado'
          },
          {
            tipo: 'Evaluación Psicológica',
            profesional: 'Lic. Pedro Morales',
            fecha: '2024-03-10',
            hora: '09:00',
            estado: 'Programado'
          }
        ],
        tutor: {
          nombre: 'Carlos González',
          parentesco: 'Padre',
          telefono: '+56 9 1234 5678',
          email: 'carlos.gonzalez@ejemplo.com'
        }
      };

      setPatientData(mockPatientData);
      setLoading(false);
    }, 1000);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Formatear fecha y hora
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando tu información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="mb-2">Mi Información</h1>
            <p className="mb-0">Bienvenido, {patientData?.nombre}</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="badge bg-white text-primary fs-6">
              <i className="bi bi-person-fill me-2"></i>
              Paciente
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Información Personal */}
        <div className="col-lg-6">
          <Card title="Información Personal" className="mb-4">
            <div className="info-card mb-3">
              <h6 className="text-primary mb-3">
                <i className="bi bi-person-fill me-2"></i>
                Datos Personales
              </h6>
              <div className="mb-2">
                <strong>Nombre Completo:</strong> {patientData.nombre}
              </div>
              <div className="mb-2">
                <strong>RUT:</strong> {patientData.rut}
              </div>
              <div className="mb-2">
                <strong>Edad:</strong> {patientData.edad} años
              </div>
              <div className="mb-2">
                <strong>Fecha de Nacimiento:</strong> {formatDate(patientData.fechaNacimiento)}
              </div>
              <div className="mb-2">
                <strong>Dirección:</strong> {patientData.direccion}
              </div>
              <div className="mb-2">
                <strong>Teléfono:</strong> {patientData.telefono}
              </div>
              <div className="mb-0">
                <strong>Email:</strong> {patientData.email}
              </div>
            </div>

            <div className="info-card">
              <h6 className="text-primary mb-3">
                <i className="bi bi-people-fill me-2"></i>
                Información del Tutor
              </h6>
              <div className="mb-2">
                <strong>Nombre:</strong> {patientData.tutor.nombre}
              </div>
              <div className="mb-2">
                <strong>Parentesco:</strong> {patientData.tutor.parentesco}
              </div>
              <div className="mb-2">
                <strong>Teléfono:</strong> {patientData.tutor.telefono}
              </div>
              <div className="mb-0">
                <strong>Email:</strong> {patientData.tutor.email}
              </div>
            </div>
          </Card>
        </div>

        {/* Información Médica */}
        <div className="col-lg-6">
          <Card title="Información Médica" className="mb-4">
            <div className="info-card mb-3">
              <h6 className="text-danger mb-3">
                <i className="bi bi-clipboard2-pulse-fill me-2"></i>
                Diagnóstico
              </h6>
              <div className="mb-2">
                <strong>Diagnóstico Principal:</strong> {patientData.diagnostico}
              </div>
              <div className="mb-2">
                <strong>Fecha de Diagnóstico:</strong> {formatDate(patientData.fechaDiagnostico)}
              </div>
              <div className="mb-0">
                <strong>Médico Tratante:</strong> {patientData.medicoTratante}
                <br />
                <small className="text-muted">{patientData.especialidad}</small>
              </div>
            </div>

            <div className="info-card">
              <h6 className="text-primary mb-3">
                <i className="bi bi-capsule me-2"></i>
                Medicamentos Activos
              </h6>
              {patientData.medicamentos.length > 0 ? (
                patientData.medicamentos.map((medicamento, index) => (
                  <div key={index} className="mb-3 pb-3 border-bottom">
                    <div className="mb-1">
                      <strong>{medicamento.nombre}</strong>
                    </div>
                    <div className="mb-1">
                      <small>Dosis: {medicamento.dosis} - {medicamento.frecuencia}</small>
                    </div>
                    <div className="mb-1">
                      <small>Vía: {medicamento.via}</small>
                    </div>
                    <div className="mb-0">
                      <small>Próximo control: {formatDate(medicamento.proxCita)}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No hay medicamentos registrados.</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Terapias y Próximas Citas */}
      <div className="row">
        <div className="col-lg-6">
          <Card title="Mis Terapias">
            {patientData.terapias.length > 0 ? (
              patientData.terapias.map((terapia, index) => (
                <div key={index} className="info-card mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="text-primary mb-1">{terapia.tipo}</h6>
                      <div className="mb-1">
                        <small>
                          <i className="bi bi-person me-1"></i>
                          {terapia.profesional}
                        </small>
                      </div>
                      <div className="mb-1">
                        <small>
                          <i className="bi bi-calendar me-1"></i>
                          {terapia.frecuencia}
                        </small>
                      </div>
                      <div className="mb-0">
                        <small>
                          <i className="bi bi-clock me-1"></i>
                          Próxima sesión: {formatDateTime(terapia.proximaSesion)}
                        </small>
                      </div>
                    </div>
                    <span className="badge bg-success">
                      {terapia.estado}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No hay terapias activas.</p>
            )}
          </Card>
        </div>

        <div className="col-lg-6">
          <Card title="Próximos Controles">
            {patientData.controles.length > 0 ? (
              patientData.controles.map((control, index) => (
                <div key={index} className="info-card mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="text-primary mb-1">{control.tipo}</h6>
                      <div className="mb-1">
                        <small>
                          <i className="bi bi-person me-1"></i>
                          {control.profesional}
                        </small>
                      </div>
                      <div className="mb-0">
                        <small>
                          <i className="bi bi-calendar-check me-1"></i>
                          {formatDate(control.fecha)} a las {control.hora}
                        </small>
                      </div>
                    </div>
                    <span className="badge bg-warning">
                      {control.estado}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No hay controles programados.</p>
            )}
          </Card>
        </div>
      </div>

      {/* Resumen de Actividad */}
      <div className="row mt-4">
        <div className="col-md-3">
          <Card className="text-center">
            <div className="card-body">
              <i className="bi bi-capsule text-primary fs-1 mb-3"></i>
              <h5 className="card-title">{patientData.medicamentos.length}</h5>
              <p className="card-text">Medicamentos</p>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <div className="card-body">
              <i className="bi bi-heart-pulse text-success fs-1 mb-3"></i>
              <h5 className="card-title">{patientData.terapias.length}</h5>
              <p className="card-text">Terapias Activas</p>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <div className="card-body">
              <i className="bi bi-calendar-check text-info fs-1 mb-3"></i>
              <h5 className="card-title">{patientData.controles.length}</h5>
              <p className="card-text">Próximos Controles</p>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <div className="card-body">
              <i className="bi bi-person-badge text-warning fs-1 mb-3"></i>
              <h5 className="card-title">{patientData.medicoTratante}</h5>
              <p className="card-text">Médico Tratante</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPaciente;
