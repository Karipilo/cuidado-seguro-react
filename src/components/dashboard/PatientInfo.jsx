import React from 'react';
import Card from '../ui/Card';

const PatientInfo = ({ patientData }) => {

  if (!patientData) {
    return (
      <Card title="Información del Paciente">
        <p className="text-muted">No hay información del paciente disponible.</p>
      </Card>
    );
  }

  return (
    <div>

      {/* Información Personal */}
      <Card title="Información del Paciente" className="mb-4">

        <p><strong>Nombre:</strong> {patientData.nombres} {patientData.apellidos}</p>

        <p><strong>RUT:</strong> {patientData.numeroDocumento}</p>

        <p><strong>Grupo sanguíneo:</strong> {patientData.grupoSanguineo}</p>

        <p><strong>Factor RH:</strong> {patientData.factorRh}</p>

        <p><strong>Alergias:</strong> {patientData.alergias}</p>

        <p><strong>Enfermedades crónicas:</strong> {patientData.enfermedadesCronicas}</p>

        <p><strong>Medicamentos actuales:</strong> {patientData.medicamentosActuales}</p>

      </Card>

    </div>
  );

  <div className="col-12 mt-4">
  <Card title="Evoluciones médicas">

    {evoluciones.length === 0 ? (
      <p className="text-muted">No hay evoluciones registradas.</p>
    ) : (
      evoluciones.map((ev, index) => (
        <div key={index} className="mb-3 p-2 border rounded">
          <p className="mb-1"><strong>Fecha:</strong> {ev.fecha}</p>
          <p className="mb-0">{ev.texto}</p>
        </div>
      ))
    )}

  </Card>
</div>
};

export default PatientInfo;