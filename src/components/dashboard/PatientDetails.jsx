import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

/**
 * Componente para mostrar detalles completos del paciente
 * Muestra información personal, contacto y datos clínicos básicos
 */
const PatientDetails = ({ patient }) => {
  if (!patient) {
    return null;
  }

  return (
    <Card title={`Ficha Clínica - ${patient.nombre}`}>
      {/* Información Personal */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h6 className="text-primary mb-3">
            <i className="bi bi-person-fill me-2"></i>
            Información Personal
          </h6>
          <div className="info-card">
            <div className="mb-2">
              <strong>RUT:</strong> {patient.rut}
            </div>
            <div className="mb-2">
              <strong>Edad:</strong> {patient.edad} años
            </div>
            <div className="mb-2">
              <strong>Fecha de Nacimiento:</strong> {new Date(patient.fechaNacimiento).toLocaleDateString('es-ES')}
            </div>
            <div className="mb-2">
              <strong>Dirección:</strong> {patient.direccion}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h6 className="text-primary mb-3">
            <i className="bi bi-telephone-fill me-2"></i>
            Información de Contacto
          </h6>
          <div className="info-card">
            <div className="mb-2">
              <strong>Teléfono:</strong> {patient.telefono}
            </div>
            <div className="mb-2">
              <strong>Email:</strong> {patient.email}
            </div>
          </div>
        </div>
      </div>

      {/* Información del Tutor */}
      <div className="row mb-4">
        <div className="col-12">
          <h6 className="text-primary mb-3">
            <i className="bi bi-people-fill me-2"></i>
            Información del Tutor
          </h6>
          <div className="info-card">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-2">
                  <strong>Nombre:</strong> {patient.tutor}
                </div>
                <div className="mb-2">
                  <strong>Parentesco:</strong> {patient.parentesco}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-2">
                  <strong>Teléfono:</strong> {patient.telefonoTutor}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información Médica */}
      <div className="row">
        <div className="col-12">
          <h6 className="text-primary mb-3">
            <i className="bi bi-clipboard2-pulse-fill me-2"></i>
            Información Médica
          </h6>
          <div className="info-card">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-2">
                  <strong>Diagnóstico Principal:</strong>
                  <div className="mt-1 text-danger">{patient.diagnostico}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-2">
                  <strong>Médico Tratante:</strong> {patient.medicoTratante}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historial Clínico Resumido */}
      <div className="row mt-4">
        <div className="col-12">
          <h6 className="text-primary mb-3">
            <i className="bi bi-clock-history me-2"></i>
            Historial Clínico Reciente
          </h6>
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo de Consulta</th>
                  <th>Profesional</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15/01/2024</td>
                  <td>Control Neurológico</td>
                  <td>Dra. Carla Rodríguez</td>
                  <td>Paciente estable, buena respuesta al tratamiento</td>
                </tr>
                <tr>
                  <td>20/12/2023</td>
                  <td>Terapia Ocupacional</td>
                  <td>Lic. María López</td>
                  <td>Mejora en habilidades motoras finas</td>
                </tr>
                <tr>
                  <td>10/12/2023</td>
                  <td>Evaluación Psicológica</td>
                  <td>Lic. Ana González</td>
                  <td>Progreso en comunicación social</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="d-flex gap-2">
            <Button variant="primary" size="sm">
              <i className="bi bi-file-earmark-medical me-2"></i>
              Historial Completo
            </Button>
            <Button variant="outline-primary" size="sm">
              <i className="bi bi-capsule me-2"></i>
              Medicamentos
            </Button>
            <Button variant="outline-primary" size="sm">
              <i className="bi bi-calendar-check me-2"></i>
              Próximos Controles
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientDetails;
