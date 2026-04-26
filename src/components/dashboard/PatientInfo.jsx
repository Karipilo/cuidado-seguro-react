import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

/**
 * Componente para mostrar información detallada del paciente
 * Muestra datos personales, diagnóstico, medicamentos y controles
 */
const PatientInfo = ({ patientData }) => {
  if (!patientData) {
    return (
      <Card title="Información del Paciente">
        <div className="text-center text-muted">
          <p>No hay información del paciente disponible.</p>
        </div>
      </Card>
    );
  }

  return (
    <div>
      {/* Información Personal */}
      <Card title="Información Personal" className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-primary mb-2">
                <i className="bi bi-person-fill me-2"></i>
                Nombre Completo
              </h6>
              <p className="mb-3 fw-bold">{patientData.nombre}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-primary mb-2">
                <i className="bi bi-hash me-2"></i>
                ID Paciente
              </h6>
              <p className="mb-3 fw-bold">{patientData.id}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-primary mb-2">
                <i className="bi bi-calendar-date me-2"></i>
                Edad
              </h6>
              <p className="mb-3 fw-bold">{patientData.edad} años</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-card">
              <h6 className="text-primary mb-2">
                <i className="bi bi-person-badge-fill me-2"></i>
                Médico Tratante
              </h6>
              <p className="mb-3 fw-bold">{patientData.medicoTratante}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Diagnóstico */}
      <Card title="Diagnóstico" className="mb-4">
        <div className="info-card">
          <h6 className="text-danger mb-2">
            <i className="bi bi-clipboard2-pulse-fill me-2"></i>
            Diagnóstico Principal
          </h6>
          <p className="mb-2 fw-bold">{patientData.diagnostico}</p>
          <small className="text-muted">
            Fecha de diagnóstico: {new Date(patientData.fechaDiagnostico).toLocaleDateString('es-ES')}
          </small>
        </div>
      </Card>

      {/* Medicamentos */}
      <Card title="Medicamentos Activos" className="mb-4">
        {patientData.medicamentos && patientData.medicamentos.length > 0 ? (
          <div className="row">
            {patientData.medicamentos.map((medicamento, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="info-card">
                  <h6 className="text-primary mb-2">
                    <i className="bi bi-capsule me-2"></i>
                    {medicamento.nombre}
                  </h6>
                  <div className="mb-1">
                    <strong>Dosis:</strong> {medicamento.dosis}
                  </div>
                  <div className="mb-1">
                    <strong>Frecuencia:</strong> {medicamento.frecuencia}
                  </div>
                  <div className="mb-1">
                    <strong>Vía:</strong> {medicamento.via}
                  </div>
                  <div className="mb-0">
                    <strong>Inicio:</strong> {new Date(medicamento.inicio).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No hay medicamentos registrados.</p>
        )}
      </Card>

      {/* Controles Médicos */}
      <Card title="Controles Médicos">
        {patientData.controles && patientData.controles.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Tipo de Control</th>
                  <th>Fecha</th>
                  <th>Profesional</th>
                  <th>Estado</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {patientData.controles.map((control, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{control.tipo}</td>
                    <td>{new Date(control.fecha).toLocaleDateString('es-ES')}</td>
                    <td>{control.profesional}</td>
                    <td>
                      <span className={`badge ${
                        control.estado === 'Completado' 
                          ? 'bg-success' 
                          : 'bg-warning'
                      }`}>
                        {control.estado}
                      </span>
                    </td>
                    <td>
                      <small>{control.observaciones}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">No hay controles programados.</p>
        )}
      </Card>
    </div>
  );
};

export default PatientInfo;
